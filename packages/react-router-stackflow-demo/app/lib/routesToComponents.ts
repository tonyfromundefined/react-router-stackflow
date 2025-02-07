import type { RegisteredActivityName } from "@stackflow/config";
import type { ActivityComponentType } from "@stackflow/react";
import type { StackflowRouteConfig } from "./StackflowRouteConfig";

export function routesToComponents({
  routes,
}: { routes: StackflowRouteConfig }): {
  [activityName in RegisteredActivityName]: ActivityComponentType<object>;
} {
  return routes.reduce((acc, route) => {
    return Object.assign(acc, {
      [route.$activityName]: route.$activityComponent,
    });
  }, {});
}
