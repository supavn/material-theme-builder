import { z } from "zod";

// Material Design Color Scheme
export const materialColorScheme = z.object({
  // Primary colors
  primary: z.string(),
  onPrimary: z.string(),
  primaryContainer: z.string(),
  onPrimaryContainer: z.string(),
  
  // Secondary colors
  secondary: z.string(),
  onSecondary: z.string(),
  secondaryContainer: z.string(),
  onSecondaryContainer: z.string(),
  
  // Tertiary colors
  tertiary: z.string(),
  onTertiary: z.string(),
  tertiaryContainer: z.string(),
  onTertiaryContainer: z.string(),
  
  // Error colors
  error: z.string(),
  onError: z.string(),
  errorContainer: z.string(),
  onErrorContainer: z.string(),
  
  // Surface colors
  surface: z.string(),
  onSurface: z.string(),
  surfaceVariant: z.string(),
  onSurfaceVariant: z.string(),
  surfaceDim: z.string(),
  surfaceBright: z.string(),
  surfaceContainer: z.string(),
  surfaceContainerLow: z.string(),
  surfaceContainerHigh: z.string(),
  surfaceContainerHighest: z.string(),
  
  // Background colors
  background: z.string(),
  onBackground: z.string(),
  
  // Outline colors
  outline: z.string(),
  outlineVariant: z.string(),
});

// Custom Enum Theme for additional tokens
export const customEnumTheme = z.object({
  // Warning colors
  warning: z.string(),
  onWarning: z.string(),
  warningContainer: z.string(),
  onWarningContainer: z.string(),
  
  // Information colors
  information: z.string(),
  onInformation: z.string(),
  informationContainer: z.string(),
  onInformationContainer: z.string(),
  
  // Success colors
  success: z.string(),
  onSuccess: z.string(),
  successContainer: z.string(),
  onSuccessContainer: z.string(),
  
  // Default colors
  defaultColor: z.string(),
  onDefault: z.string(),
  defaultContainer: z.string(),
  onDefaultContainer: z.string(),
  
  // Critical colors
  critical: z.string(),
  onCritical: z.string(),
});

// Complete theme with both light and dark schemes
export const themeSchemes = z.object({
  light: materialColorScheme.merge(customEnumTheme),
  dark: materialColorScheme.merge(customEnumTheme),
});

// Full theme export format
export const themeExport = z.object({
  description: z.string().optional(),
  seed: z.string(),
  schemes: themeSchemes,
  themeName: z.string().optional(),
  timestamp: z.string().optional(),
});

export type MaterialColorScheme = z.infer<typeof materialColorScheme>;
export type CustomEnumTheme = z.infer<typeof customEnumTheme>;
export type ThemeSchemes = z.infer<typeof themeSchemes>;
export type ThemeExport = z.infer<typeof themeExport>;
export type ColorScheme = MaterialColorScheme & CustomEnumTheme;
