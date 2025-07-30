import React, { useState } from 'react';
import { ColorPicker } from './ColorPicker';
import { TOKEN_GROUPS } from '../types/theme';
import type { ColorScheme, Theme } from '../types/theme';
import './TokenEditor.css';

interface TokenEditorProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

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

  const getGroupSizeClass = (tokenCount: number) => {
    if (tokenCount <= 2) return 'very-compact';
    if (tokenCount <= 4) return 'compact';
    return '';
  };

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
        {TOKEN_GROUPS.map((group) => {
          const sizeClass = getGroupSizeClass(group.tokens.length);
          return (
            <div key={group.name} className="token-group">
              <h3 className="group-title">{group.name}</h3>
              <div className={`group-tokens ${sizeClass}`}>
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
          );
        })}
      </div>
    </div>
  );
}; 