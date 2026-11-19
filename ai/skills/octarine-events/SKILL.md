---
name: octarine-events
description: Use when subscribing to game events or deciding what runs per tick and what per frame.
---

# Events

- Subscribe once, at the top of the module: `<Events>.on("Name", handler)` (the event object and the names
  are in the SDK's `EventsMap`).
- Per tick (`PostDataUpdate`): game state, decisions, orders. Per frame (`Draw`): drawing only.
- `GameStarted` / `GameEnded` bracket a match: clear per-match state on `GameEnded`.
- `EntityCreated` / `EntityDestroyed` keep your own sets of entities current; check the class with
  `instanceof` and forget the entity when it is destroyed.
- Return early while `State.value` (and the feature's own switch) is off.
