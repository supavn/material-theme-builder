import React, { useState } from 'react';
import './ColorPicker.css';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
}

const QUICK_COLORS = [
  '#6750A4', '#625B71', '#7D5260', '#BA1A1A',
  '#1677FF', '#52C41A', '#FAAD14', '#F5222D',
  '#722ED1', '#13C2C2', '#FA8C16', '#EB2F96',
  '#A0D911', '#FA541C', '#2F54EB', '#000000',
  '#FFFFFF', '#F5F5F5', '#E0E0E0', '#CCCCCC'
];

export const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange, label }) => {
  const [showPalette, setShowPalette] = useState(false);
  const [showHCT, setShowHCT] = useState(false);

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value;
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      onChange(hex);
    }
  };

  const handleQuickColorClick = (color: string) => {
    onChange(color);
    setShowPalette(false);
  };

  return (
    <div className="color-picker">
      {label && <label className="color-picker-label">{label}</label>}
      <div className="color-picker-controls">
        <div className="color-preview" style={{ backgroundColor: value }} />
        <input
          type="text"
          value={value}
          onChange={handleHexChange}
          placeholder="#000000"
          className="hex-input"
        />
        <button
          type="button"
          onClick={() => setShowPalette(!showPalette)}
          className="picker-button"
          title="Color Palette"
        >
          🎨
        </button>
        <button
          type="button"
          onClick={() => setShowHCT(!showHCT)}
          className="picker-button"
          title="HCT Picker"
        >
          🎯
        </button>
      </div>
      
      {showPalette && (
        <div className="color-palette">
          {QUICK_COLORS.map((color) => (
            <button
              key={color}
              className="palette-color"
              style={{ backgroundColor: color }}
              onClick={() => handleQuickColorClick(color)}
              title={color}
            />
          ))}
        </div>
      )}
      
      {showHCT && (
        <div className="hct-picker">
          <p>HCT Picker - Coming Soon</p>
          <p>This will include Hue, Chroma, and Tone sliders</p>
        </div>
      )}
    </div>
  );
}; 