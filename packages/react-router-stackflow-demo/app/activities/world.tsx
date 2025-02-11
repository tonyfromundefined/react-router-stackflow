import { AppScreen } from "@stackflow/plugin-basic-ui";
import { useLoaderData } from "@stackflow/react/future";
import type { Route } from "./+types/world";

export function loader({ params, context }: Route.LoaderArgs) {
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

  return <AppScreen>World</AppScreen>;
}
