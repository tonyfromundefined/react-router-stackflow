import type { RouteConfigEntry } from "@react-router/dev/routes";
import type { RegisteredActivityName } from "@stackflow/config";
import type { ActivityComponentType } from "@stackflow/react/future";

export interface StackflowRouteConfigEntry extends RouteConfigEntry {
  $activityName: string;
  $activityComponent: ActivityComponentType<RegisteredActivityName>;
  path: string;
}
