# @@scriptName@@

@@description@@

An Octarine script for @@gameTitle@@, made from the launcher's template.

## Working on it

- The launcher builds this folder whenever a file changes: save, then reload scripts in the client.
  A build that fails keeps the previous one running and shows a notification in the client.
- `@@sdkDir@@/` holds the SDK's declarations (`.d.ts` only). Everything in them is global: nothing is
  imported from the SDK. `@@packageManager@@ run update-sdk` brings them up to date.
- Node.js 20.19 or newer. `@@packageManager@@ install` once, then `@@packageManager@@ run check`: types,
  lint, circular imports, and that every file is reachable from `index.ts` (an unreachable file is left
  out of the build without a word).

## Layout

- `index.ts` → `src/index.ts`: the entry; every feature is imported there.
- `src/menu.ts`: the script's page in the menu and its master switch.
- `src/features/`: one file a feature.
- `scripts_files/translations/`: the menu's words in Russian and Chinese (the key is the English text).
