export interface ColorScheme {
  // Official Material You tokens
  seed: string;
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
  criticalContainer: string;
  onCriticalContainer: string;

  // Tag color tokens
  blueTagText: string;
  blueTagBackground: string;
  blueTagBorder: string;
  cyanTagText: string;
  cyanTagBackground: string;
  cyanTagBorder: string;
  geekblueTagText: string;
  geekblueTagBackground: string;
  geekblueTagBorder: string;
  goldTagText: string;
  goldTagBackground: string;
  goldTagBorder: string;
  greenTagText: string;
  greenTagBackground: string;
  greenTagBorder: string;
  limeTagText: string;
  limeTagBackground: string;
  limeTagBorder: string;
  magentaTagText: string;
  magentaTagBackground: string;
  magentaTagBorder: string;
  orangeTagText: string;
  orangeTagBackground: string;
  orangeTagBorder: string;
  purpleTagText: string;
  purpleTagBackground: string;
  purpleTagBorder: string;
  redTagText: string;
  redTagBackground: string;
  redTagBorder: string;
  volcanoTagText: string;
  volcanoTagBackground: string;
  volcanoTagBorder: string;
}

export interface Theme {
  themeName: string;
  seed: string;
  schemes: {
    light: ColorScheme;
    dark: ColorScheme;
  };
  timestamp: string;
}

export type TokenGroup = {
  name: string;
  tokens: Array<{
    key: keyof ColorScheme;
    label: string;
    description?: string;
  }>;
};

export const TOKEN_GROUPS: TokenGroup[] = [
  {
    name: 'Seed',
    tokens: [
      { key: 'seed', label: 'Seed Color', description: 'Base color for Material You generation' }
    ]
  },
  {
    name: 'Primary',
    tokens: [
      { key: 'primary', label: 'Primary' },
      { key: 'onPrimary', label: 'On Primary' },
      { key: 'primaryContainer', label: 'Primary Container' },
      { key: 'onPrimaryContainer', label: 'On Primary Container' }
    ]
  },
  {
    name: 'Secondary',
    tokens: [
      { key: 'secondary', label: 'Secondary' },
      { key: 'onSecondary', label: 'On Secondary' },
      { key: 'secondaryContainer', label: 'Secondary Container' },
      { key: 'onSecondaryContainer', label: 'On Secondary Container' }
    ]
  },
  {
    name: 'Tertiary',
    tokens: [
      { key: 'tertiary', label: 'Tertiary' },
      { key: 'onTertiary', label: 'On Tertiary' },
      { key: 'tertiaryContainer', label: 'Tertiary Container' },
      { key: 'onTertiaryContainer', label: 'On Tertiary Container' }
    ]
  },
  {
    name: 'Error',
    tokens: [
      { key: 'error', label: 'Error' },
      { key: 'onError', label: 'On Error' },
      { key: 'errorContainer', label: 'Error Container' },
      { key: 'onErrorContainer', label: 'On Error Container' }
    ]
  },
  {
    name: 'Surface',
    tokens: [
      { key: 'surface', label: 'Surface' },
      { key: 'onSurface', label: 'On Surface' },
      { key: 'surfaceVariant', label: 'Surface Variant' },
      { key: 'onSurfaceVariant', label: 'On Surface Variant' },
      { key: 'surfaceDim', label: 'Surface Dim' },
      { key: 'surfaceBright', label: 'Surface Bright' },
      { key: 'surfaceContainer', label: 'Surface Container' },
      { key: 'surfaceContainerLow', label: 'Surface Container Low' },
      { key: 'surfaceContainerHigh', label: 'Surface Container High' },
      { key: 'surfaceContainerHighest', label: 'Surface Container Highest' }
    ]
  },
  {
    name: 'Background',
    tokens: [
      { key: 'background', label: 'Background' },
      { key: 'onBackground', label: 'On Background' }
    ]
  },
  {
    name: 'Outline',
    tokens: [
      { key: 'outline', label: 'Outline' },
      { key: 'outlineVariant', label: 'Outline Variant' }
    ]
  },
  {
    name: 'Default',
    tokens: [
      { key: 'defaultColor', label: 'Default' },
      { key: 'onDefault', label: 'On Default' },
      { key: 'defaultContainer', label: 'Default Container' },
      { key: 'onDefaultContainer', label: 'On Default Container' }
    ]
  },
  {
    name: 'Success',
    tokens: [
      { key: 'success', label: 'Success' },
      { key: 'onSuccess', label: 'On Success' },
      { key: 'successContainer', label: 'Success Container' },
      { key: 'onSuccessContainer', label: 'On Success Container' }
    ]
  },
  {
    name: 'Warning',
    tokens: [
      { key: 'warning', label: 'Warning' },
      { key: 'onWarning', label: 'On Warning' },
      { key: 'warningContainer', label: 'Warning Container' },
      { key: 'onWarningContainer', label: 'On Warning Container' }
    ]
  },
  {
    name: 'Information',
    tokens: [
      { key: 'information', label: 'Information' },
      { key: 'onInformation', label: 'On Information' },
      { key: 'informationContainer', label: 'Information Container' },
      { key: 'onInformationContainer', label: 'On Information Container' }
    ]
  },
  {
    name: 'Critical',
    tokens: [
      { key: 'critical', label: 'Critical' },
      { key: 'onCritical', label: 'On Critical' },
      { key: 'criticalContainer', label: 'Critical Container' },
      { key: 'onCriticalContainer', label: 'On Critical Container' }
    ]
  },
  {
    name: 'Blue Tag',
    tokens: [
      { key: 'blueTagText', label: 'Text' },
      { key: 'blueTagBackground', label: 'Background' },
      { key: 'blueTagBorder', label: 'Border' }
    ]
  },
  {
    name: 'Cyan Tag',
    tokens: [
      { key: 'cyanTagText', label: 'Text' },
      { key: 'cyanTagBackground', label: 'Background' },
      { key: 'cyanTagBorder', label: 'Border' }
    ]
  },
  {
    name: 'Geekblue Tag',
    tokens: [
      { key: 'geekblueTagText', label: 'Text' },
      { key: 'geekblueTagBackground', label: 'Background' },
      { key: 'geekblueTagBorder', label: 'Border' }
    ]
  },
  {
    name: 'Gold Tag',
    tokens: [
      { key: 'goldTagText', label: 'Text' },
      { key: 'goldTagBackground', label: 'Background' },
      { key: 'goldTagBorder', label: 'Border' }
    ]
  },
  {
    name: 'Green Tag',
    tokens: [
      { key: 'greenTagText', label: 'Text' },
      { key: 'greenTagBackground', label: 'Background' },
      { key: 'greenTagBorder', label: 'Border' }
    ]
  },
  {
    name: 'Lime Tag',
    tokens: [
      { key: 'limeTagText', label: 'Text' },
      { key: 'limeTagBackground', label: 'Background' },
      { key: 'limeTagBorder', label: 'Border' }
    ]
  },
  {
    name: 'Magenta Tag',
    tokens: [
      { key: 'magentaTagText', label: 'Text' },
      { key: 'magentaTagBackground', label: 'Background' },
      { key: 'magentaTagBorder', label: 'Border' }
    ]
  },
  {
    name: 'Orange Tag',
    tokens: [
      { key: 'orangeTagText', label: 'Text' },
      { key: 'orangeTagBackground', label: 'Background' },
      { key: 'orangeTagBorder', label: 'Border' }
    ]
  },
  {
    name: 'Purple Tag',
    tokens: [
      { key: 'purpleTagText', label: 'Text' },
      { key: 'purpleTagBackground', label: 'Background' },
      { key: 'purpleTagBorder', label: 'Border' }
    ]
  },
  {
    name: 'Red Tag',
    tokens: [
      { key: 'redTagText', label: 'Text' },
      { key: 'redTagBackground', label: 'Background' },
      { key: 'redTagBorder', label: 'Border' }
    ]
  },
  {
    name: 'Volcano Tag',
    tokens: [
      { key: 'volcanoTagText', label: 'Text' },
      { key: 'volcanoTagBackground', label: 'Background' },
      { key: 'volcanoTagBorder', label: 'Border' }
    ]
  }
]; 