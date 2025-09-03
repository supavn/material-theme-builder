// Schema types for theme builder
import type { ExtendedTagName } from '../theme/extended-tags.generated';

export interface ExtendedColor {
  name: ExtendedTagName;
  color: string;
  description: string;
  fallback: string;
  harmonized: false;
}

export interface ColorScheme {
  // Primary colors
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  
  // Secondary colors
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  
  // Tertiary colors
  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;
  
  // Error colors
  error: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;
  
  // Surface colors
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
  
  // Background colors
  background: string;
  onBackground: string;
  
  // Outline colors
  outline: string;
  outlineVariant: string;
  

}

export interface ThemeSchemes {
  light: ColorScheme;
  dark: ColorScheme;
}

export interface ThemeExport {
  themeName: string;
  seed: string;
  schemes: ThemeSchemes;
  extendedColors: ExtendedColor[];
  timestamp: string;
}

export interface SavedTheme extends ThemeExport {
  id: string;
  createdAt: string;
  updatedAt: string;
  isAutoSave?: boolean;
}