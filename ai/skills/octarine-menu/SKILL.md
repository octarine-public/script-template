---
name: octarine-menu
description: Use when adding or changing the script's menu (pages, toggles, sliders, key binds, color pickers, dropdowns, translations).
---

# The menu

- The script's page is `Page` from `src/menu.ts`; its master switch is `State`. Add rows to `Page`
  in the feature that uses them (`Page.AddToggle`, `Page.AddSlider`, `Page.AddKeybind`,
  `Page.AddColorPicker`, `Page.AddDropdown`); the exact signatures are in the SDK's menu declarations.
- A row's value: `row.value` (a toggle, a slider), `dropdown.SelectedID` (a dropdown), `key.isPressed`
  (a key bind), `picker.SelectedColor` (a color).
- React to a change with `row.OnValue(…)`: it also runs once at once with the current value, unless the
  row is added with that turned off. A key bind has `OnPressed(…)` and `OnRelease(…)` besides.
- Every name and tooltip is English in code and translated in `scripts_files/translations/ru.json` and
  `cn.json`, keyed by the exact English text. Translations are shared by every script: a key another
  script already has takes the last string given, so translate only texts of your own and leave common
  words such as `"State"` untranslated.
