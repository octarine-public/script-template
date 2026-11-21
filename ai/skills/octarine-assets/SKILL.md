---
name: octarine-assets
description: Use when a script reads its own files (images, JSON, translations) or keeps data between runs.
---

# The package's files and stored data

- A script's own files live under `scripts_files/` in its folder and ship with it; nothing else does.
- Read JSON with `SharedSDK.readJSON<T>("path/inside/scripts_files.json")` (the path is relative to
  `scripts_files/`); look the other readers up in `@@sdkDir@@` (search `SharedSDK`).
- Translations: `scripts_files/translations/{en,ru,cn}.json`, a map from the English text to the language's;
  `src/translations.ts` registers them as localization units.
- The package's files are read-only at run time. Settings belong in the menu's rows, which keep their
  values. Other data kept between runs goes in the script's own store:
  `const store = await SharedSDK.openLocalStorage("<package name>")`, then `store.get(key)` /
  `store.set(key, value)` (search `openLocalStorage` in `@@sdkDir@@` for the details).
