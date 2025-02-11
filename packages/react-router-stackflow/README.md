# react-router-stackflow

Leverage React Router v7's serving + Loader logic for Stackflow SSR.

## How to install

1. Change `route()` to `activity()` in `routes.ts` of react-router.

```typescript
// routes.ts

// as-is:
import { route } from "@react-router/dev/routes";

export default [
  route("/articles/:articleId", "routes/article.tsx"),
];

// to-be:
import { activity } from "react-router-stackflow";

export default [
  activity({
    path: "/articles/:articleId",
    file: "./activities/article.tsx",
    activityName: "ArticleDetailActivity",
    activityComponent: React.lazy(() => import("./activities/article")),
  }),
];
```

2. Remove the use of `<Outlet />` in the implementation within the `<App />` component in `root.tsx` and use `<Stack />`.

```tsx
// root.tsx

// as-is:
export default function App() {
  return <Outlet />
}

// to-be:
import { basicUIPlugin } from "@stackflow/plugin-basic-ui";
import { historySyncPlugin } from "@stackflow/plugin-history-sync";
import { basicRendererPlugin } from "@stackflow/plugin-renderer-basic";
import { Stack } from "react-router-stackflow";
import routes from "./routes";

export default function App() {
  return (
    <Stack
      routes={routes}
      plugins={({ config }) => ([
        basicRendererPlugin(),
        basicUIPlugin({
          theme: "android",
        }),
        historySyncPlugin({
          config,
          fallbackActivity: () => "HelloActivity",
        }),
      ])}
    />
  );
}
```

> If you use `@stackflow/plugin-basic-ui`, don't forget to import the corresponding CSS.

3. (Optional) To utilize Stackflow's Context in the `AppLoadContext` of the React Router environment, call `assignStackflowContext()` in the loader.

```typescript
// root.tsx

import { assignStackflowContext } from "react-router-stackflow";
import type { Route } from "./+types/root";
import routes from "./routes";

export function loader(args: Route.LoaderArgs) {
  assignStackflowContext(routes, args);
}
```

## Important

- If you have installed react-router-stackflow, you cannot use react-router's useLoaderData. Use stackflow's useLoaderData.

  ```typescript
  // don't
  import { useLoaderData } from "react-router";

  // do
  import { useLoaderData } from "react-router-stackflow";
  ```

- This library aims to leverage the **serving** functionality of react-router, and unfortunately cannot utilize various framework features of react-router such as actions, forms, etc. It is unclear whether there will be any support for it in the future.


## To-do
- [ ] Integrate activity parameters in loader with `AppLoadContext`

  ```typescript
  export function loader({ context }: Route.LoaderArgs) {
    console.log(context.activityParams);
  }
  ```
