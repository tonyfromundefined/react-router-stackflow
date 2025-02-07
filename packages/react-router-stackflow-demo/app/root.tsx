import "./app.css";

import { basicUIPlugin } from "@stackflow/plugin-basic-ui";
import { historySyncPlugin } from "@stackflow/plugin-history-sync";
import { basicRendererPlugin } from "@stackflow/plugin-renderer-basic";
import { stackflow } from "@stackflow/react/future";
import { useContext } from "react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  UNSAFE_DataRouterContext,
  useLocation,
} from "react-router";
import { routesToComponents } from "./lib/routesToComponents";
import { routesToConfig } from "./lib/routesToConfig";
import routes from "./routes";

const config = routesToConfig({
  routes,
  transitionDuration: 270,
});
const components = routesToComponents({ routes });

const { Stack } = stackflow({
  config,
  components,
  plugins: [
    basicRendererPlugin(),
    basicUIPlugin({
      theme: "android",
    }),
    historySyncPlugin({
      config,
      fallbackActivity: () => "",
    }),
  ],
});

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

export default function App() {
  const location = useLocation();
  const dataRouterContext = useContext(UNSAFE_DataRouterContext);
  const initialLoaderData = dataRouterContext
    ? dataRouterContext.router.state.loaderData
    : null;

  return (
    <Stack
      initialContext={{ req: { path: location.pathname + location.search } }}
      initialLoaderData={initialLoaderData}
    />
  );
}
