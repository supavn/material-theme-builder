import type { ExtendedTagName } from './extended-tags.generated';

export interface ExtendedColor {
  name: ExtendedTagName; // e.g., "warningText", "blueTagText"
  color: string; // hex like #RRGGBB
  description: string; // human readable
  fallback: string; // e.g., "warning text color token"
  harmonized: false; // always false per requirements
}

export interface BaseColorScheme {
  // Material 3 core
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;

  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;

  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;

  error: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;

  surface: string;
  onSurface: string;
  surfaceVariant: string;
  onSurfaceVariant: string;
  surfaceDim: string;
  surfaceBright: string;
  surfaceContainer: string;
  surfaceContainerLow: string;
  surfaceContainerHigh: string;
  surfaceContainerHighest: string;

  background: string;
  onBackground: string;

  outline: string;
  outlineVariant: string;


}

export interface ThemeSchemesTarget {
  light: BaseColorScheme;
  dark: BaseColorScheme;
}

export interface ThemeTarget {
  themeName: string;
  seed: string;
  schemes: ThemeSchemesTarget;
  extendedColors: ExtendedColor[];
  timestamp: string;
}

export function getExtended(theme: ThemeTarget, name: ExtendedTagName): ExtendedColor | undefined {
  return theme.extendedColors.find(ec => ec.name === name);
}

export function getExtendedHex(theme: ThemeTarget, name: ExtendedTagName): string | undefined {
  return getExtended(theme, name)?.color;
}

export function getTagHex(theme: ThemeTarget, token: ExtendedTagName): string {
  return getExtendedHex(theme, token) ?? "#FFFFFF";
}
