---
name: octarine-menu
description: Use when adding or changing the script's menu: pages, toggles, sliders, key binds, color pickers, dropdowns, translations.
---

# The menu

- The script's page is `Page` from `src/menu.ts`; its master switch is `State`. Add rows to `Page`
  in the feature that uses them (`Page.AddToggle`, `Page.AddSlider`, `Page.AddKeybind`,
  `Page.AddColorPicker`, `Page.AddDropdown`); the exact signatures are in the SDK's menu declarations.
- A row's value is `row.value` (a toggle, a slider), `key.isPressed` (a key bind),
  `picker.SelectedColor` (a color). React to a change with `row.OnValue(…)` when one is declared.
- Every name and tooltip is English in code and translated in `scripts_files/translations/ru.json` and
  `cn.json`, keyed by the exact English text. Leave `"State"` untranslated: translations are shared by
  every script and a translation of it would change it for all of them.
