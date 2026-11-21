---
name: octarine-events
description: Use when subscribing to game events or deciding what runs per tick and what per frame.
---

# Events

- Subscribe once, at the top of the module: `Events.on("Name", handler)`. The names and their arguments
  are the keys of the SDK's `EventsMap`.
- Per tick (`PostDataUpdate`, with the time since the last one): game state and decisions. How a script
  acts is the game's own: read the octarine-orders skill.
- Drawing has three passes, each only while `GameState.CanDrawOverlays`: `Draw` every frame (what moves
  with the camera or the frame), `Draw2D` once a tick (overlays that change only with the game state),
  `WorldDraw` for the `WorldDraw.*` shapes in world units.
- `GameStarted` / `GameEnded` bracket a match: clear per-match state on `GameEnded`.
- `EntityCreated` / `EntityDestroyed` keep a set of your own current when you need a filtered subset;
  check the class with `instanceof` and forget the entity when it is destroyed. For all entities of a
  class, `EntityManager.GetEntitiesByClass(Class)` already is that list.
- Return early while `State.value` (and the feature's own switch) is off.
