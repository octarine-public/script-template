---
name: octarine-sdk-surface
description: Use when looking for a class, global object, enum, event or method of the game's SDK, or when unsure whether an API exists.
---

# Finding things in the SDK

The SDK is declarations only, in `@@sdkDir@@/`. Every class, enum and object there is global; the
scripting host's functions are under `SharedSDK.`.

1. Search the declarations: `@@sdkDir@@/**/*.d.ts` for the name (`class PlayerPawn`, `declare const`,
   `enum E…`). Events are the keys of `interface EventsMap` (search `EventsMap`).
2. Read the TSDoc above the declaration: units, when a value is valid, what to call first.
3. Prefer what working scripts use; an API with no TSDoc and no users is likely internal.
4. Never declare your own copy of an SDK type, and never import from `@@sdkDir@@/`.
