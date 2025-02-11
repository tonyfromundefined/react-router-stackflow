import type { RegisteredActivityName } from "@stackflow/config";
import type { ActivityComponentType } from "@stackflow/react";
import type { StackflowRouteConfig } from "./StackflowRouteConfig";

type Components = {
  [activityName in RegisteredActivityName]: ActivityComponentType<object>;
};
export function routesToComponents({
  routes,
}: { routes: StackflowRouteConfig }): Components {
  return routes.reduce((acc, route) => {
    return Object.assign(acc, {
      [route.$activityName]: route.$activityComponent,
    });
  }, {} as Components);
}
