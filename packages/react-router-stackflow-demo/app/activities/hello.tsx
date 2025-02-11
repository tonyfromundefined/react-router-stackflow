import { AppScreen } from "@stackflow/plugin-basic-ui";
import { useFlow, useLoaderData } from "@stackflow/react/future";
import type { Route } from "./+types/hello";

export function loader({ request, context, params }: Route.LoaderArgs) {
  return {
    message: "hello",
  };
}

declare module "@stackflow/config" {
  interface Register {
    HelloActivity: {};
  }
}

export default function HelloActivity() {
  const { push } = useFlow();
  const loaderData = useLoaderData();

  return (
    <AppScreen>
      Hello, World
      <button
        type="button"
        onClick={() => {
          push("WorldActivity", { thisway: "1234" });
        }}
      >
        to world
      </button>
    </AppScreen>
  );
}
