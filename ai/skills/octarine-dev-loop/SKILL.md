---
name: octarine-dev-loop
description: Use when a change does not show in the game, a build fails, or before handing work back.
---

# The development loop

- The launcher builds this folder whenever a file is saved; reload scripts in the client to run the new
  build. A failed build keeps the previous one running and shows a notification in the client.
- If nothing changes in game: read the client's notification (the build error), run
  `@@packageManager@@ run check-types`, and make sure the edited file is imported from `src/index.ts`
  (`@@packageManager@@ run check-bundle`).
- Before saying a change is done: `@@packageManager@@ run check`.
