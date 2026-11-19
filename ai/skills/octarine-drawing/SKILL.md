---
name: octarine-drawing
description: Use when drawing anything: panels and text on the screen, shapes, markers above units, projecting world positions.
---

# Drawing

- Draw only in the `Draw` event and only while `GameState.CanDrawOverlays`. Compute what to show on the
  tick and keep it in variables the draw reads.
- `MenuSDK.Canvas` draws shapes and text; give each surface a stable name (`"<package>:panel"`). A
  canvas on `MenuSDK.EPanelLayer.Screen` is a 2D overlay; the world variants anchor shapes to positions.
- Scale sizes with the SDK's scale helpers (`ScaleWidth`, `ScaleHeight`) so they follow the resolution.
- Reuse `Vector2`/`Vector3` objects with `SetVector`; do not allocate per frame.
- Colors: `MenuSDK.HudColors` for the menu's palette, `new Color(r, g, b, a)` otherwise.
