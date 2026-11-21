---
name: octarine-drawing
description: Use when drawing anything (panels and text on the screen, shapes, markers above units) or projecting world positions to the screen.
---

# Drawing

- Draw only while `GameState.CanDrawOverlays`, in the pass that fits: `Draw` every frame; `WorldDraw` for
  `WorldDraw.Line`, `Polyline`, `Ring`, `Polygon` (world units; they work only from a `WorldDraw` listener);
  in Dota 2 also `Draw2D`, about 30 times a second, where a canvas stays on screen until the next pass:
  the place for a screen panel that changes only with the game state (a pass that draws nothing takes it
  down). In Deadlock and Counter-Strike 2 a canvas drawn in `Draw2D` does not stay: draw it in `Draw`.
  Compute what to show on the tick and keep it in variables the draw reads.
- `new MenuSDK.Canvas("<package>:<what>", MenuSDK.EPanelLayer.Screen)` is a 2D overlay. Without a layer the
  canvas is on the world layer: anchor it with `canvas.AnchorWorld(x, y, z)` or
  `canvas.PinEntity(entity.Handle, x, y, z)` (it follows the entity), and `canvas.Anchor()` resets it.
  `MenuSDK.WorldCanvas` draws shapes at world positions (`Project`, `Circle`, `Ring`, `Polyline`). Give every
  surface a stable name of its own.
- A world position on the screen: `Source2SDK.Projection.WorldToScreenXYZ(x, y, z, out)` (false when it is
  off screen).
- Scale screen sizes with `Source2SDK.Renderer.ScaleWidth(w)` / `ScaleHeight(h)` so they follow the
  resolution.
- Reuse `Vector2` / `Vector3` objects with `SetVector`; do not allocate per frame.
- Colors: `MenuSDK.HudColors` for the menu's palette, `new Color(r, g, b, a)` otherwise.
