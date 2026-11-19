# @@scriptName@@

An Octarine script for @@gameTitle@@: TypeScript that the launcher builds from this folder and the game
runs. The SDK's declarations are in `@@sdkDir@@/`; the entry is `index.ts` → `src/index.ts`.

- `src/menu.ts` makes the script's page in the menu (`Page`) and its master switch (`State`). Every
  feature imports both and returns early while `State.value` is false.
- `src/features/<name>.ts` holds one feature; `src/index.ts` imports each one. A file nothing imports is
  left out of the build.
- `scripts_files/translations/{ru,cn}.json` translate the menu: the key is the English text exactly as
  the code writes it.
