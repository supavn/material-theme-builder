export interface ExtendedColor {
  name: string; // e.g., "warningTagText"
  color: string; // hex like #RRGGBB
  description: string; // human readable
  fallback: string; // e.g., "warning tag text color token"
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

  // Custom semantic tokens
  defaultColor: string;
  onDefault: string;
  defaultContainer: string;
  onDefaultContainer: string;

  success: string;
  onSuccess: string;
  successContainer: string;
  onSuccessContainer: string;

  warning: string;
  onWarning: string;
  warningContainer: string;
  onWarningContainer: string;

  information: string;
  onInformation: string;
  informationContainer: string;
  onInformationContainer: string;

  critical: string;
  onCritical: string;
  criticalContainer?: string;
  onCriticalContainer?: string;
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

export function getExtended(theme: ThemeTarget, name: string): ExtendedColor | undefined {
  return theme.extendedColors.find(ec => ec.name === name);
}

export function getExtendedHex(theme: ThemeTarget, name: string): string | undefined {
  return getExtended(theme, name)?.color;
}

export function getTagHex(theme: ThemeTarget, token: string) {
  return getExtendedHex(theme, token) ?? "#000000";
}
