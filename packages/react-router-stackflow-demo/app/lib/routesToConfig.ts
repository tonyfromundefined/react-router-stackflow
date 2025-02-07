import {
  type ActivityDefinition,
  type Config,
  type RegisteredActivityName,
  defineConfig,
} from "@stackflow/config";
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
      route: route.path as string,
    }),
  );

  return defineConfig({
    activities,
    transitionDuration,
  });
}
