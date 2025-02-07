import {
  type ActivityDefinition,
  type Config,
  type RegisteredActivityName,
  defineConfig,
} from "@stackflow/config";
import { makeTemplate } from "@stackflow/plugin-history-sync";
import { UNSAFE_decodeViaTurboStream } from "react-router";
import type { StackflowRouteConfig } from "./StackflowRouteConfig";

export function routesToConfig({
  routes,
  transitionDuration,
}: {
  routes: StackflowRouteConfig;
  transitionDuration: number;
}): Config<ActivityDefinition<RegisteredActivityName>> {
  const activities: ActivityDefinition<RegisteredActivityName>[] = routes.map(
    (route) => ({
      name: route.$activityName,
      route: route.path,
      async loader({ params }) {
        if (typeof window === "undefined") {
          return null;
        }

        const template = makeTemplate({
          path: route.path,
        });

        const response = await fetch(singleFetchUrl(template.fill(params)));

        if (!response.body) {
          return null;
        }

        const decoded = await UNSAFE_decodeViaTurboStream(
          response.body,
          globalThis,
        );

        const routeId = route.$activityName as "$activityName";

        if (
          !isObject(decoded.value) ||
          !(routeId in decoded.value) ||
          !isObject(decoded.value[routeId]) ||
          !("data" in decoded.value[routeId])
        ) {
          return null;
        }

        return decoded.value[routeId].data;
      },
    }),
  );

  return defineConfig({
    activities,
    transitionDuration,
  });
}

/**
 * https://github.com/remix-run/react-router/blob/5a1ca081ef49475ac9e23b6ea6ca6f365db58597/packages/react-router/lib/dom/ssr/single-fetch.tsx#L395-L415
 */
function singleFetchUrl(reqUrl: string) {
  const url =
    typeof reqUrl === "string"
      ? new URL(
          reqUrl,
          typeof window === "undefined"
            ? "server://singlefetch/"
            : window.location.origin,
        )
      : reqUrl;
  if (url.pathname === "/") {
    url.pathname = "_root.data";
  } else {
    url.pathname = `${url.pathname.replace(/\/$/, "")}.data`;
  }
  return url;
}

function isObject<T>(t: T) {
  return typeof t === "object" && t !== null;
}
