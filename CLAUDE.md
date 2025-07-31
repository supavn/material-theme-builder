# Material You Theme Builder for Flutter — Project Plan

## Project Overview
This project is a web-based theme builder for Flutter, focused on Material You (Material 3) design. It allows users to visually create, edit, and preview Material You color schemes, including custom semantic tokens and tag color groups (inspired by Ant Design). The builder will export a JSON file compatible with Flutter's `ColorScheme.fromSeed` and custom tokens.

---

## Core Features

### 1. Token Editor
- **Seed Color Inputs:**
  - Four main seed values: `seed`, `primary`, `secondary`, `tertiary`.
  - Each seed can be set via:
    - Quick color picker (palette)
    - HCT (Hue, Chroma, Tone) picker
    - Hexadecimal color input
- **Token Groups:**
  - **Official Material You tokens** (grouped by seed):
    - **Primary group:**
      - `primary`, `onPrimary`, `primaryContainer`, `onPrimaryContainer`
    - **Secondary group:**
      - `secondary`, `onSecondary`, `secondaryContainer`, `onSecondaryContainer`
    - **Tertiary group:**
      - `tertiary`, `onTertiary`, `tertiaryContainer`, `onTertiaryContainer`
    - **Error group:**
      - `error`, `onError`, `errorContainer`, `onErrorContainer`
    - **Surface group:**
      - `surface`, `onSurface`, `surfaceVariant`, `onSurfaceVariant`, `surfaceDim`, `surfaceBright`, `surfaceContainer`, `surfaceContainerLow`, `surfaceContainerHigh`, `surfaceContainerHighest`
    - **Background group:**
      - `background`, `onBackground`
    - **Outline group:**
      - `outline`, `outlineVariant`
    - **Seed group:**
      - `seed`
  - **Custom Semantic Tokens:**
    - `defaultColor`, `onDefault`, `defaultContainer`, `onDefaultContainer`
    - `success`, `onSuccess`, `successContainer`, `onSuccessContainer`
    - `warning`, `onWarning`, `warningContainer`, `onWarningContainer`
    - `information`, `onInformation`, `informationContainer`, `onInformationContainer`
    - `critical`, `onCritical`, `criticalContainer`, `onCriticalContainer`
  - **Tag Color Tokens:**
    - For each tag group (e.g., blue, cyan, geekblue, gold, green, lime, magenta, orange, purple, red, volcano):
      - `<tag>TagText`, `<tag>TagBackground`, `<tag>TagBorder`
    - Example (for blue):
      - `blueTagText`, `blueTagBackground`, `blueTagBorder`
      - (repeat for all tag colors as in theme.json)
- **Auto Calculate Button:**
  - Button to auto-generate all official Material You color tokens from the seed color, mimicking Flutter's `ColorScheme.fromSeed` logic.
- **Editing:**
  - Each token editable with the same color input methods as seeds.

### 2. JSON Editor
- **Monaco Editor Integration:**
  - JSON syntax highlighting
  - Direct editing of the theme JSON structure
  - Live validation and error highlighting
  - Changes in the JSON editor sync with the visual token editor and vice versa

### 3. Mobile Preview
- **Right Panel Preview:**
  - Mobile phone skin (device frame)
  - Live preview of all major Material components (AppBar, Buttons, Cards, Chips, etc.)
  - Preview updates in real-time as tokens are edited
  - Toggle between light and dark mode previews

---

## List of All Color Tokens

### Official Material You Tokens (per theme.json)
- `seed`
- `primary`, `onPrimary`, `primaryContainer`, `onPrimaryContainer`
- `secondary`, `onSecondary`, `secondaryContainer`, `onSecondaryContainer`
- `tertiary`, `onTertiary`, `tertiaryContainer`, `onTertiaryContainer`
- `error`, `onError`, `errorContainer`, `onErrorContainer`
- `surface`, `onSurface`, `surfaceVariant`, `onSurfaceVariant`, `surfaceDim`, `surfaceBright`, `surfaceContainer`, `surfaceContainerLow`, `surfaceContainerHigh`, `surfaceContainerHighest`
- `background`, `onBackground`
- `outline`, `outlineVariant`

### Custom Semantic Tokens
- `defaultColor`, `onDefault`, `defaultContainer`, `onDefaultContainer`
- `success`, `onSuccess`, `successContainer`, `onSuccessContainer`
- `warning`, `onWarning`, `warningContainer`, `onWarningContainer`
- `information`, `onInformation`, `informationContainer`, `onInformationContainer`
- `critical`, `onCritical`, `criticalContainer`, `onCriticalContainer`

### Tag Color Tokens (each group has 3 tokens)
- `blueTagText`, `blueTagBackground`, `blueTagBorder`
- `cyanTagText`, `cyanTagBackground`, `cyanTagBorder`
- `geekblueTagText`, `geekblueTagBackground`, `geekblueTagBorder`
- `goldTagText`, `goldTagBackground`, `goldTagBorder`
- `greenTagText`, `greenTagBackground`, `greenTagBorder`
- `limeTagText`, `limeTagBackground`, `limeTagBorder`
- `magentaTagText`, `magentaTagBackground`, `magentaTagBorder`
- `orangeTagText`, `orangeTagBackground`, `orangeTagBorder`
- `purpleTagText`, `purpleTagBackground`, `purpleTagBorder`
- `redTagText`, `redTagBackground`, `redTagBorder`
- `volcanoTagText`, `volcanoTagBackground`, `volcanoTagBorder`

---

## User Experience (UX) Flow
1. **Landing:** User sees the token editor with default or loaded theme.
2. **Edit:** User edits tokens via color pickers or JSON editor.
3. **Preview:** User sees changes reflected in the mobile preview.
4. **Auto Calculate:** User can auto-generate tokens from seed colors.
5. **Export:** User can export the theme as a JSON file compatible with Flutter.

---

## Technical Notes
- **Color Calculation:**
  - Use a JS implementation of Material You color utilities (HCT, Tonal Palette, etc.) to match Flutter's `ColorScheme.fromSeed`.
- **Sync:**
  - Ensure two-way sync between visual editor and JSON editor.
- **Accessibility:**
  - Show contrast ratios and warnings for insufficient contrast.
- **Extensibility:**
  - Easy to add new semantic or tag tokens in the future.

---

## File Format
- The exported JSON should match the structure of `theme.json` in this repo, including all official, semantic, and tag tokens, and a timestamp.

---

## Stretch Goals
- **Import:** Allow importing an existing theme JSON for editing.
- **Share:** Generate a shareable link or code for a theme.
- **Component Customization:** Allow previewing custom widgets/components.

---

## References
- [Material 3 Color System](https://m3.material.io/styles/color)
- [Flutter ColorScheme.fromSeed](https://api.flutter.dev/flutter/material/ColorScheme/ColorScheme.fromSeed.html)
- [Ant Design Tag Colors](https://ant.design/docs/spec/colors)
