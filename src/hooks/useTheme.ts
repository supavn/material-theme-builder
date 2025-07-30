import { useState, useCallback } from 'react';
import type { Theme, ColorScheme } from '../types/theme';

const DEFAULT_LIGHT_SCHEME: ColorScheme = {
  // Official Material You tokens
  seed: '#6750A4',
  primary: '#6750A4',
  onPrimary: '#FFFFFF',
  primaryContainer: '#EADDFF',
  onPrimaryContainer: '#21005D',
  secondary: '#625B71',
  onSecondary: '#FFFFFF',
  secondaryContainer: '#E8DEF8',
  onSecondaryContainer: '#1D192B',
  tertiary: '#7D5260',
  onTertiary: '#FFFFFF',
  tertiaryContainer: '#FFD8E4',
  onTertiaryContainer: '#31111D',
  error: '#BA1A1A',
  onError: '#FFFFFF',
  errorContainer: '#FFDAD6',
  onErrorContainer: '#410002',
  surface: '#FEF7FF',
  onSurface: '#1C1B1F',
  surfaceVariant: '#E7E0EC',
  onSurfaceVariant: '#49454F',
  surfaceDim: '#DED8E1',
  surfaceBright: '#FEF7FF',
  surfaceContainer: '#F3EDF7',
  surfaceContainerLow: '#F7F2FA',
  surfaceContainerHigh: '#ECE6F0',
  surfaceContainerHighest: '#E6E0E9',
  background: '#FEF7FF',
  onBackground: '#1C1B1F',
  outline: '#79747E',
  outlineVariant: '#CAC4D0',

  // Custom semantic tokens
  defaultColor: '#6750A4',
  onDefault: '#FFFFFF',
  defaultContainer: '#EADDFF',
  onDefaultContainer: '#21005D',
  success: '#52C41A',
  onSuccess: '#FFFFFF',
  successContainer: '#F6FFED',
  onSuccessContainer: '#52C41A',
  warning: '#FAAD14',
  onWarning: '#FFFFFF',
  warningContainer: '#FFFBE6',
  onWarningContainer: '#FAAD14',
  information: '#1677FF',
  onInformation: '#FFFFFF',
  informationContainer: '#E6F4FF',
  onInformationContainer: '#1677FF',
  critical: '#EF4444',
  onCritical: '#FFFFFF',
  criticalContainer: '#FEF2F2',
  onCriticalContainer: '#EF4444',

  // Tag color tokens
  blueTagText: '#1677FF',
  blueTagBackground: '#E6F4FF',
  blueTagBorder: '#91CAFF',
  cyanTagText: '#13C2C2',
  cyanTagBackground: '#E6FFFB',
  cyanTagBorder: '#87E8DE',
  geekblueTagText: '#2F54EB',
  geekblueTagBackground: '#F0F5FF',
  geekblueTagBorder: '#ADC6FF',
  goldTagText: '#FAAD14',
  goldTagBackground: '#FFFBE6',
  goldTagBorder: '#FFE58F',
  greenTagText: '#52C41A',
  greenTagBackground: '#F6FFED',
  greenTagBorder: '#B7EB8F',
  limeTagText: '#A0D911',
  limeTagBackground: '#FCFFE6',
  limeTagBorder: '#EAFF8F',
  magentaTagText: '#EB2F96',
  magentaTagBackground: '#FFF0F6',
  magentaTagBorder: '#FFADD2',
  orangeTagText: '#FA8C16',
  orangeTagBackground: '#FFF7E6',
  orangeTagBorder: '#FFD591',
  purpleTagText: '#722ED1',
  purpleTagBackground: '#F9F0FF',
  purpleTagBorder: '#D3ADF7',
  redTagText: '#F5222D',
  redTagBackground: '#FFF1F0',
  redTagBorder: '#FFA39E',
  volcanoTagText: '#FA541C',
  volcanoTagBackground: '#FFF2E8',
  volcanoTagBorder: '#FFBB96',
};

const DEFAULT_DARK_SCHEME: ColorScheme = {
  // Official Material You tokens
  seed: '#D0BCFF',
  primary: '#D0BCFF',
  onPrimary: '#381E72',
  primaryContainer: '#4F378B',
  onPrimaryContainer: '#EADDFF',
  secondary: '#CCC2DC',
  onSecondary: '#332D41',
  secondaryContainer: '#4A4458',
  onSecondaryContainer: '#E8DEF8',
  tertiary: '#EFB8C8',
  onTertiary: '#492532',
  tertiaryContainer: '#633B48',
  onTertiaryContainer: '#FFD8E4',
  error: '#FFB4AB',
  onError: '#690005',
  errorContainer: '#93000A',
  onErrorContainer: '#FFDAD6',
  surface: '#1C1B1F',
  onSurface: '#E6E1E5',
  surfaceVariant: '#49454F',
  onSurfaceVariant: '#CAC4D0',
  surfaceDim: '#141218',
  surfaceBright: '#3B383E',
  surfaceContainer: '#211F26',
  surfaceContainerLow: '#1C1B1F',
  surfaceContainerHigh: '#2B2930',
  surfaceContainerHighest: '#36343B',
  background: '#1C1B1F',
  onBackground: '#E6E1E5',
  outline: '#938F99',
  outlineVariant: '#49454F',

  // Custom semantic tokens
  defaultColor: '#D0BCFF',
  onDefault: '#381E72',
  defaultContainer: '#4F378B',
  onDefaultContainer: '#EADDFF',
  success: '#49AA19',
  onSuccess: '#065F46',
  successContainer: '#162312',
  onSuccessContainer: '#49AA19',
  warning: '#D89614',
  onWarning: '#78350F',
  warningContainer: '#2B2111',
  onWarningContainer: '#D89614',
  information: '#9DAADC',
  onInformation: '#1E3A8A',
  informationContainer: '#21232C',
  onInformationContainer: '#9DAADC',
  critical: '#F87171',
  onCritical: '#7F1D1D',
  criticalContainer: '#2A1215',
  onCriticalContainer: '#F87171',

  // Tag color tokens
  blueTagText: '#1668DC',
  blueTagBackground: '#111A2C',
  blueTagBorder: '#15325B',
  cyanTagText: '#13A8A8',
  cyanTagBackground: '#112123',
  cyanTagBorder: '#144848',
  geekblueTagText: '#2B4ACB',
  geekblueTagBackground: '#131629',
  geekblueTagBorder: '#1C2755',
  goldTagText: '#D89614',
  goldTagBackground: '#2B2111',
  goldTagBorder: '#594214',
  greenTagText: '#49AA19',
  greenTagBackground: '#162312',
  greenTagBorder: '#274916',
  limeTagText: '#8BBB11',
  limeTagBackground: '#1F2611',
  limeTagBorder: '#3E4F13',
  magentaTagText: '#CB2B83',
  magentaTagBackground: '#291321',
  magentaTagBorder: '#551C3B',
  orangeTagText: '#D87A16',
  orangeTagBackground: '#2B1D11',
  orangeTagBorder: '#593815',
  purpleTagText: '#593815',
  purpleTagBackground: '#1A1325',
  purpleTagBorder: '#301C4D',
  redTagText: '#D32029',
  redTagBackground: '#2A1215',
  redTagBorder: '#58181C',
  volcanoTagText: '#D84A1B',
  volcanoTagBackground: '#2B1611',
  volcanoTagBorder: '#592716',
};

const DEFAULT_THEME: Theme = {
  themeName: 'Custom Theme',
  seed: '#6750A4',
  schemes: {
    light: DEFAULT_LIGHT_SCHEME,
    dark: DEFAULT_DARK_SCHEME,
  },
  timestamp: new Date().toISOString(),
};

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);

  const updateToken = useCallback((scheme: 'light' | 'dark', tokenKey: keyof ColorScheme, value: string) => {
    setTheme(prev => ({
      ...prev,
      schemes: {
        ...prev.schemes,
        [scheme]: {
          ...prev.schemes[scheme],
          [tokenKey]: value,
        },
      },
      timestamp: new Date().toISOString(),
    }));
  }, []);

  const updateTheme = useCallback((newTheme: Theme) => {
    setTheme({
      ...newTheme,
      timestamp: new Date().toISOString(),
    });
  }, []);

  const exportTheme = useCallback(() => {
    const dataStr = JSON.stringify(theme, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'theme.json';
    link.click();
    URL.revokeObjectURL(url);
  }, [theme]);

  const importTheme = useCallback((file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedTheme = JSON.parse(e.target?.result as string);
          setTheme({
            ...importedTheme,
            timestamp: new Date().toISOString(),
          });
          resolve();
        } catch (error) {
          reject(new Error('Invalid theme file'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  }, []);

  const resetTheme = useCallback(() => {
    setTheme(DEFAULT_THEME);
  }, []);

  return {
    theme,
    updateToken,
    updateTheme,
    exportTheme,
    importTheme,
    resetTheme,
  };
}; 