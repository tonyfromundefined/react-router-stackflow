import type { RouteConfig } from "@react-router/dev/routes";
import React from "react";
import { activity } from "./lib/activity";

export default [
  activity({
    path: "/hello",
    file: "./activities/hello.tsx",
    activityName: "HelloActivity",
    activityComponent: React.lazy(() => import("./activities/hello")),
  }),
] satisfies RouteConfig;
