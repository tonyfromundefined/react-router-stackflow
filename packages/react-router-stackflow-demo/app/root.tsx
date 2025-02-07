import "@stackflow/plugin-basic-ui/index.css";
import "./app.css";

import { basicUIPlugin } from "@stackflow/plugin-basic-ui";
import { basicRendererPlugin } from "@stackflow/plugin-renderer-basic";
import { Links, Meta, Scripts } from "react-router";
import type { Route } from "./+types/root";
import Stack from "./lib/Stack";
import { assignStackflowContext } from "./lib/assignStackflowContext";
import routes from "./routes";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

export function loader(args: Route.LoaderArgs) {
  assignStackflowContext(routes, args);
}

export default function App() {
  return (
    <Stack
      routes={routes}
      fallbackActivity={() => "HelloActivity"}
      plugins={() => [
        basicRendererPlugin(),
        basicUIPlugin({
          theme: "android",
        }),
      ]}
    />
  );
}
