import React, { useState } from 'react';
import { ColorPicker } from './ColorPicker';
import { TOKEN_GROUPS } from '../types/theme';
import type { ColorScheme, Theme } from '../types/theme';
import './TokenEditor.css';

interface TokenEditorProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

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

export const TokenEditor: React.FC<TokenEditorProps> = ({ theme, onThemeChange }) => {
  const [activeScheme, setActiveScheme] = useState<'light' | 'dark'>('light');

  const handleTokenChange = (tokenKey: keyof ColorScheme, value: string) => {
    const updatedTheme = {
      ...theme,
      schemes: {
        ...theme.schemes,
        [activeScheme]: {
          ...theme.schemes[activeScheme],
          [tokenKey]: value,
        },
      },
    };
    onThemeChange(updatedTheme);
  };

  const handleAutoCalculate = () => {
    // TODO: Implement Material You color calculation logic
    console.log('Auto calculate from seed color:', theme.schemes[activeScheme].seed);
  };

  const currentScheme = theme.schemes[activeScheme];

  return (
    <div className="token-editor">
      <div className="token-editor-header">
        <h2>Token Editor</h2>
        <div className="scheme-toggle">
          <button
            className={`scheme-button ${activeScheme === 'light' ? 'active' : ''}`}
            onClick={() => setActiveScheme('light')}
          >
            Light
          </button>
          <button
            className={`scheme-button ${activeScheme === 'dark' ? 'active' : ''}`}
            onClick={() => setActiveScheme('dark')}
          >
            Dark
          </button>
        </div>
      </div>

      <div className="auto-calculate-section">
        <button className="auto-calculate-button" onClick={handleAutoCalculate}>
          🔄 Auto Calculate from Seed
        </button>
      </div>

      <div className="token-groups">
        {TOKEN_GROUPS.map((group) => (
          <div key={group.name} className="token-group">
            <h3 className="group-title">{group.name}</h3>
            <div className="group-tokens">
              {group.tokens.map((token) => (
                <ColorPicker
                  key={token.key}
                  value={currentScheme[token.key]}
                  onChange={(value) => handleTokenChange(token.key, value)}
                  label={token.label}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 