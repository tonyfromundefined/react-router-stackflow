import { AppScreen } from "@stackflow/plugin-basic-ui";
import { useLoaderData } from "@stackflow/react/future";
import type { Route } from "./+types/world";

export function loader({ params, context }: Route.LoaderArgs) {
  console.log(context.config);
  return {
    message: "world",
  };
}

declare module "@stackflow/config" {
  interface Register {
    WorldActivity: {
      thisway: string;
    };
  }
}

export default function WorldActivity() {
  const loaderData = useLoaderData();

  console.log("World", loaderData);

  return <AppScreen>World</AppScreen>;
}
