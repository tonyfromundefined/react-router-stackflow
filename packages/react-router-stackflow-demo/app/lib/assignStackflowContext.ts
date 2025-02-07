import type {
  ActivityDefinition,
  Config,
  RegisteredActivityName,
} from "@stackflow/config";
import type { LoaderFunctionArgs } from "react-router";
import type { AppLoadContext } from "react-router";
import type { StackflowRouteConfig } from "./StackflowRouteConfig";
import { routesToConfig } from "./routesToConfig";

declare module "react-router" {
  interface AppLoadContext {
    config: Config<ActivityDefinition<RegisteredActivityName>>;
  }
}

export function assignStackflowContext(
  routes: StackflowRouteConfig,
  loaderArgs: LoaderFunctionArgs<AppLoadContext>,
) {
  const config = routesToConfig({ routes, transitionDuration: 0 });

  if (loaderArgs.context) {
    loaderArgs.context.config = config;
  }
}
