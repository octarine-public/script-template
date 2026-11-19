# Rules for this script

- Nothing is imported from the SDK. Every class, enum and object it declares in `@@sdkDir@@/` is
  global: write `new Vector2()`, `EntityManager`, `MenuSDK.Canvas` directly. Import only this
  project's own files, by relative paths.
- `@@sdkDir@@/` is generated: never edit it. `npm run update-sdk` replaces it with the latest.
- Look an API up in `@@sdkDir@@/**/*.d.ts` before using it: names differ between games, and a name that
  is not declared there does not exist. The TSDoc above a declaration says when and how to use it.
- Every source file must be reachable from `index.ts`; add a new feature's import to `src/index.ts`.
- Keep per-frame (`Draw`) work to drawing; compute state on the tick (`PostDataUpdate`) and reuse
  objects (`Vector2`, `Vector3`) instead of allocating them every frame.
- Code style: tabs, double quotes, no semicolons (Prettier); no default exports; `npm run lint` fixes
  the order of imports and the formatting.
- Before saying a change is done: `npm run check` (types, lint, circular imports, reachability) passes.
- A change that "does nothing" in game is usually a build that failed: the client keeps the previous
  build running and shows a notification. Fix the error, save, reload scripts.
