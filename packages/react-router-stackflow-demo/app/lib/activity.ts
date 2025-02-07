import { route } from "@react-router/dev/routes";
import type { RegisteredActivityName } from "@stackflow/config";
import type { ActivityComponentType } from "@stackflow/react/future";
import type { StackflowRouteConfigEntry } from "./StackflowRouteConfigEntry";

export function activity({
  path,
  file,
  activityName,
  activityComponent,
}: {
  path: string;
  file: string;
  activityName: string;
  activityComponent: ActivityComponentType<RegisteredActivityName>;
}): StackflowRouteConfigEntry {
  const routeConfigEntry = route(path, file);

  return {
    ...routeConfigEntry,
    path,
    $activityName: activityName,
    $activityComponent: activityComponent,
  };
}
