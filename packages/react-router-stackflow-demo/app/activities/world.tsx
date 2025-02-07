import { AppScreen } from "@stackflow/plugin-basic-ui";
import { useLoaderData } from "@stackflow/react/future";

export function loader() {
  return {
    message: "world",
  };
}

export default function WorldActivity() {
  const loaderData = useLoaderData();

  console.log("World", loaderData);

  return <AppScreen>World</AppScreen>;
}
