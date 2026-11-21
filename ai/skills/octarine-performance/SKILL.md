---
name: octarine-performance
description: Use when writing code that runs every frame or tick, or when the game stutters with the script on.
---

# Performance

- Per frame: no allocation, no JSON or string building that the tick could do once.
- `EntityManager.GetEntitiesByClass(Class)` is a list the SDK already keeps current: read it, never change
  it, and do not copy it. Keep a set of your own only for a filtered subset (enemies in range, units with a
  modifier), updated on `EntityCreated` / `EntityDestroyed` or on the tick.
- Loop with an index (`for (let i = 0, end = list.length; i < end; i++)`) over arrays the SDK returns.
- In Dota 2 a screen panel that changes only with the game state draws in `Draw2D` (about 30 times a
  second, and it stays on screen between passes), not in `Draw`. In Deadlock and Counter-Strike 2 canvases
  draw in `Draw`.
- Return early as soon as the script, the feature or the overlay is off.
