---
name: octarine-performance
description: Use when writing code that runs every frame or tick, or when the game stutters with the script on.
---

# Performance

- Per frame: no allocation, no searches over all entities if a set you keep would do, no JSON or string
  building that the tick could do once.
- Loop with an index (`for (let i = 0, end = list.length; i < end; i++)`) over arrays the SDK returns.
- Return early as soon as the script, the feature or the overlay is off.
