import { AppScreen } from "@stackflow/plugin-basic-ui";
import { useFlow, useLoaderData } from "@stackflow/react/future";

export function loader() {
  return {
    message: "hello",
  };
}

export default function HelloActivity() {
  const { push } = useFlow();
  const loaderData = useLoaderData();

  console.log("Hello", loaderData);

  return (
    <AppScreen>
      Hello, World
      <button
        type="button"
        onClick={() => {
          push("WorldActivity", {});
        }}
      >
        to world
      </button>
    </AppScreen>
  );
}
