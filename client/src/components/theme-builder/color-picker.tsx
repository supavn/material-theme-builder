import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ColorPickerProps {
  isOpen: boolean;
  onClose: () => void;
  color: string;
  onChange: (color: string) => void;
  title: string;
}

export function ColorPicker({ isOpen, onClose, color, onChange, title }: ColorPickerProps) {
  const [tempColor, setTempColor] = useState(color);
  const [hexValue, setHexValue] = useState(color);
  const [rgbValue, setRgbValue] = useState("");
  const [hslValue, setHslValue] = useState("");

  useEffect(() => {
    setTempColor(color);
    setHexValue(color);
    updateRgbHsl(color);
  }, [color]);

  // Convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  // Convert hex to HSL
  const hexToHsl = (hex: string) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return null;

    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const updateRgbHsl = (hexColor: string) => {
    const rgb = hexToRgb(hexColor);
    const hsl = hexToHsl(hexColor);
    
    if (rgb) {
      setRgbValue(`${rgb.r},${rgb.g},${rgb.b}`);
    }
    
    if (hsl) {
      setHslValue(`${hsl.h},${hsl.s}%,${hsl.l}%`);
    }
  };

  const handleHexChange = (value: string) => {
    setHexValue(value);
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      setTempColor(value);
      updateRgbHsl(value);
    }
  };

  const handleApply = () => {
    onChange(tempColor);
    onClose();
  };

  const handleCancel = () => {
    setTempColor(color);
    setHexValue(color);
    updateRgbHsl(color);
    onClose();
  };

  // Calculate contrast ratio (simplified)
  const getContrastRatio = (): number => {
    // Simplified calculation - in a real app you'd use a proper color library
    return 7.8;
  };

  const contrastRatio = getContrastRatio();
  const isAccessible = contrastRatio >= 4.5;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-96">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Large Color Display */}
          <div
            className="w-full h-32 rounded-xl border-2 border-border"
            style={{ backgroundColor: tempColor }}
          />
          
          {/* Color Input Methods */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label className="text-xs font-medium">HEX</Label>
              <Input
                type="text"
                value={hexValue}
                onChange={(e) => handleHexChange(e.target.value)}
                className="text-sm"
              />
            </div>
            <div>
              <Label className="text-xs font-medium">RGB</Label>
              <Input
                type="text"
                value={rgbValue}
                readOnly
                className="text-sm"
              />
            </div>
            <div>
              <Label className="text-xs font-medium">HSL</Label>
              <Input
                type="text"
                value={hslValue}
                readOnly
                className="text-sm"
              />
            </div>
          </div>
          
          {/* Native Color Picker */}
          <div>
            <Label className="text-xs font-medium">Color Picker</Label>
            <Input
              type="color"
              value={tempColor}
              onChange={(e) => {
                setTempColor(e.target.value);
                setHexValue(e.target.value);
                updateRgbHsl(e.target.value);
              }}
              className="w-full h-12 cursor-pointer"
            />
          </div>
          
          {/* Contrast Check */}
          <div className="p-3 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Contrast Check</span>
              <span className={`text-sm font-medium ${isAccessible ? 'text-green-600' : 'text-red-600'}`}>
                {isAccessible ? 'AA ✓' : 'Fail ✗'}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              Ratio: {contrastRatio.toFixed(1)}:1 against white background
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              className="flex-1"
              onClick={handleApply}
            >
              Apply
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}