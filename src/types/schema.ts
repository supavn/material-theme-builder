// Schema types for theme builder

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
  
  // Tag color tokens (optional since they might not all be present)
  blueTagText?: string;
  blueTagBackground?: string;
  blueTagBorder?: string;
  cyanTagText?: string;
  cyanTagBackground?: string;
  cyanTagBorder?: string;
  geekblueTagText?: string;
  geekblueTagBackground?: string;
  geekblueTagBorder?: string;
  goldTagText?: string;
  goldTagBackground?: string;
  goldTagBorder?: string;
  greenTagText?: string;
  greenTagBackground?: string;
  greenTagBorder?: string;
  limeTagText?: string;
  limeTagBackground?: string;
  limeTagBorder?: string;
  magentaTagText?: string;
  magentaTagBackground?: string;
  magentaTagBorder?: string;
  orangeTagText?: string;
  orangeTagBackground?: string;
  orangeTagBorder?: string;
  purpleTagText?: string;
  purpleTagBackground?: string;
  purpleTagBorder?: string;
  redTagText?: string;
  redTagBackground?: string;
  redTagBorder?: string;
  volcanoTagText?: string;
  volcanoTagBackground?: string;
  volcanoTagBorder?: string;
}

export interface ThemeSchemes {
  light: ColorScheme;
  dark: ColorScheme;
}

export interface ThemeExport {
  themeName: string;
  seed: string;
  schemes: ThemeSchemes;
  timestamp: string;
}

export interface SavedTheme extends ThemeExport {
  id: string;
  createdAt: string;
  updatedAt: string;
  isAutoSave?: boolean;
}