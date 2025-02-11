import type {
  ActivityDefinition,
  Config,
  RegisteredActivityName,
} from "@stackflow/config";
import { type StackflowReactPlugin, stackflow } from "@stackflow/react/future";
import { useContext, useMemo } from "react";
import { UNSAFE_DataRouterContext, useLocation } from "react-router";
import type { StackflowRouteConfig } from "./StackflowRouteConfig";
import { routesToComponents } from "./routesToComponents";
import { routesToConfig } from "./routesToConfig";

export default function Stack({
  routes,
  plugins,
}: {
  routes: StackflowRouteConfig;
  plugins: (args: {
    config: Config<ActivityDefinition<RegisteredActivityName>>;
  }) => StackflowReactPlugin[];
}) {
  // biome-ignore lint/correctness/useExhaustiveDependencies:
  const Stack = useMemo(() => {
    const config = routesToConfig({
      routes,
      transitionDuration: 270,
    });
    const components = routesToComponents({ routes });

    const { Stack } = stackflow({
      config,
      components,
      plugins: [...plugins({ config })],
    });

    return Stack;
  }, []);

  const location = useLocation();
  const dataRouterContext = useContext(UNSAFE_DataRouterContext);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const initialLoaderData = useMemo(() => {
    const state = dataRouterContext
      ? dataRouterContext.router.state.loaderData
      : {};

    const routeId = Object.keys(state).filter((k) => k !== "root")[0];
    return (routeId && state[routeId]) ?? null;
  }, []);

  return (
    <Stack
      initialContext={{ req: { path: location.pathname + location.search } }}
      initialLoaderData={initialLoaderData}
    />
  );
}
