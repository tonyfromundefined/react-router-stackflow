import "@stackflow/plugin-basic-ui/index.css";

import { basicUIPlugin } from "@stackflow/plugin-basic-ui";
import { historySyncPlugin } from "@stackflow/plugin-history-sync";
import { basicRendererPlugin } from "@stackflow/plugin-renderer-basic";
import { Links, Meta, Scripts } from "react-router";
import { StackOutlet, assignStackflowContext } from "react-router-stackflow";
import type { Route } from "./+types/root";
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
    <StackOutlet
      routes={routes}
      plugins={({ config }) => [
        basicRendererPlugin(),
        basicUIPlugin({
          theme: "android",
        }),
        historySyncPlugin({
          config,
          fallbackActivity: () => "HelloActivity",
        }),
      ]}
    />
  );
}
