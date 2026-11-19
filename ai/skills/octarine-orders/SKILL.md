---
name: octarine-orders
description: Use when making the hero act: casting an ability or using an item, sending a command.
---

# Acting in the game

- Check before acting: the unit is alive, the ability or item `CanBeCasted()`, and the game is not paused.
- Do not repeat an order while the previous one is still underway: keep the order you sent and check its
  stage (Dota 2) or act from the movement command (`CreateMove`) once per command (Source 2 games).
- Anything that acts by itself is off by default and has its own switch in the menu.
