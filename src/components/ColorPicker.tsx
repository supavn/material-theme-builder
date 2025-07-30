import React, { useState, useRef, useEffect } from 'react';
import './ColorPicker.css';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
  compact?: boolean;
}

const QUICK_COLORS = [
  '#6750A4', '#625B71', '#7D5260', '#BA1A1A',
  '#1677FF', '#52C41A', '#FAAD14', '#F5222D',
  '#722ED1', '#13C2C2', '#FA8C16', '#EB2F96',
  '#A0D911', '#FA541C', '#2F54EB', '#000000',
  '#FFFFFF', '#F5F5F5', '#E0E0E0', '#CCCCCC'
];

export const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange, label, compact = false }) => {
  const [showColorDialog, setShowColorDialog] = useState(false);
  const [hexInput, setHexInput] = useState(value);
  const [activeMode, setActiveMode] = useState<'quick' | 'hct'>('quick');
  const [dialogPosition, setDialogPosition] = useState({ top: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // Update hex input when value changes
  useEffect(() => {
    setHexInput(value);
  }, [value]);

  const handleColorPreviewClick = () => {
    if (previewRef.current) {
      const rect = previewRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      
      let top: number;
      let left: number;
      
      // Position dialog below the preview if there's enough space, otherwise above
      if (spaceBelow >= 300 || spaceBelow > spaceAbove) {
        top = rect.bottom + 4;
      } else {
        top = rect.top - 300 - 4;
      }
      
      // Center horizontally relative to the preview
      left = rect.left + (rect.width / 2) - 140; // 140 is half of min-width
      
      // Ensure dialog doesn't go off-screen
      if (left < 10) left = 10;
      if (left + 280 > window.innerWidth) left = window.innerWidth - 290;
      
      setDialogPosition({ top, left });
    }
    setShowColorDialog(true);
  };

  const handleQuickColorClick = (color: string) => {
    onChange(color);
    setHexInput(color);
  };

  const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value;
    setHexInput(hex);
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      onChange(hex);
    }
  };

  const handleHexInputBlur = () => {
    if (!/^#[0-9A-Fa-f]{6}$/.test(hexInput)) {
      setHexInput(value); // Reset to original value if invalid
    }
  };

  const handleHexInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (/^#[0-9A-Fa-f]{6}$/.test(hexInput)) {
        onChange(hexInput);
        setShowColorDialog(false);
      }
    } else if (e.key === 'Escape') {
      setHexInput(value);
      setShowColorDialog(false);
    }
  };

  // Close dialog when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowColorDialog(false);
        setHexInput(value);
      }
    };

    if (showColorDialog) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showColorDialog, value]);

  const getCompactClass = () => {
    if (compact) return 'compact';
    return '';
  };

  return (
    <div className={`color-picker ${getCompactClass()}`} ref={containerRef}>
      {label && <label className="color-picker-label">{label}</label>}
      <div className="color-picker-controls">
        <div 
          ref={previewRef}
          className="color-preview"
          style={{ backgroundColor: value }}
          onClick={handleColorPreviewClick}
          title="Click to pick color"
        />
        <input
          type="text"
          value={hexInput}
          onChange={handleHexInputChange}
          onBlur={handleHexInputBlur}
          onKeyDown={handleHexInputKeyDown}
          placeholder="#000000"
          className="hex-input"
        />
      </div>
      
      {showColorDialog && (
        <div 
          className="color-dialog"
          style={{
            top: `${dialogPosition.top}px`,
            left: `${dialogPosition.left}px`
          }}
        >
          <div className="dialog-header">
            <div className="mode-tabs">
              <button
                className={`mode-tab ${activeMode === 'quick' ? 'active' : ''}`}
                onClick={() => setActiveMode('quick')}
              >
                Quick Colors
              </button>
              <button
                className={`mode-tab ${activeMode === 'hct' ? 'active' : ''}`}
                onClick={() => setActiveMode('hct')}
              >
                HCT Picker
              </button>
            </div>
            <button
              className="close-button"
              onClick={() => setShowColorDialog(false)}
              title="Close"
            >
              ✕
            </button>
          </div>
          
          <div className="dialog-content">
            {activeMode === 'quick' && (
              <div className="quick-colors-grid">
                {QUICK_COLORS.map((color) => (
                  <button
                    key={color}
                    className="quick-color"
                    style={{ backgroundColor: color }}
                    onClick={() => handleQuickColorClick(color)}
                    title={color}
                  />
                ))}
              </div>
            )}
            
            {activeMode === 'hct' && (
              <div className="hct-picker-content">
                <p>HCT Picker - Coming Soon</p>
                <p>This will include Hue, Chroma, and Tone sliders</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}; 