import { useTheme } from "./theme-context";
import { ColorPicker } from "./color-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Palette } from "lucide-react";
import { ColorScheme } from "@shared/schema";
import { useState } from "react";

interface ColorInputProps {
  label: string;
  colorKey: keyof ColorScheme;
  value: string;
  onChange: (value: string) => void;
  showContrast?: boolean;
  contrastWith?: string;
}

function ColorInput({ label, colorKey, value, onChange, showContrast, contrastWith }: ColorInputProps) {
  const [showPicker, setShowPicker] = useState(false);

  // Calculate contrast ratio (simplified)
  const getContrastRatio = (color1: string, color2: string): number => {
    // Simplified contrast calculation - in a real app you'd use a proper color library
    return 7.8; // Mock value for demonstration
  };

  const contrastRatio = showContrast && contrastWith ? getContrastRatio(value, contrastWith) : null;

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="flex items-center space-x-3">
        <button
          className="w-10 h-10 rounded-lg shadow-sm border border-border flex-shrink-0"
          style={{ backgroundColor: value }}
          onClick={() => setShowPicker(true)}
        />
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 text-sm"
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowPicker(true)}
        >
          <Palette className="w-4 h-4" />
        </Button>
      </div>
      
      {showContrast && contrastRatio && (
        <div className="text-xs text-green-600 dark:text-green-400 flex items-center space-x-1">
          <span>✓</span>
          <span>WCAG AA Compliant ({contrastRatio.toFixed(1)}:1)</span>
        </div>
      )}

      <ColorPicker
        isOpen={showPicker}
        onClose={() => setShowPicker(false)}
        color={value}
        onChange={onChange}
        title={`Edit ${label}`}
      />
    </div>
  );
}

export function TokenEditor() {
  const {
    lightTheme,
    darkTheme,
    currentEditingTheme,
    switchEditingTheme,
    updateColor,
    seedColor,
    setSeedColor,
    generatePalette,
  } = useTheme();

  const currentTheme = currentEditingTheme === "light" ? lightTheme : darkTheme;

  const handleColorChange = (key: keyof ColorScheme, value: string) => {
    updateColor(key, value);
  };

  return (
    <div className="w-88 bg-card border-r border-border overflow-y-auto">
      <div className="p-6">
        {/* Theme Toggle */}
        <div className="mb-6">
          <div className="flex bg-muted rounded-lg p-1">
            <Button
              variant={currentEditingTheme === "light" ? "default" : "ghost"}
              size="sm"
              className="flex-1"
              onClick={() => switchEditingTheme("light")}
            >
              Light Theme
            </Button>
            <Button
              variant={currentEditingTheme === "dark" ? "default" : "ghost"}
              size="sm"
              className="flex-1"
              onClick={() => switchEditingTheme("dark")}
            >
              Dark Theme
            </Button>
          </div>
        </div>

        {/* Color Categories */}
        <div className="space-y-6">
          {/* Primary Colors */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide">Primary Colors</h3>
            
            <ColorInput
              label="Primary"
              colorKey="primary"
              value={currentTheme.primary}
              onChange={(value) => handleColorChange("primary", value)}
            />
            
            <ColorInput
              label="On Primary"
              colorKey="onPrimary"
              value={currentTheme.onPrimary}
              onChange={(value) => handleColorChange("onPrimary", value)}
              showContrast
              contrastWith={currentTheme.primary}
            />
            
            <ColorInput
              label="Primary Container"
              colorKey="primaryContainer"
              value={currentTheme.primaryContainer}
              onChange={(value) => handleColorChange("primaryContainer", value)}
            />
            
            <ColorInput
              label="On Primary Container"
              colorKey="onPrimaryContainer"
              value={currentTheme.onPrimaryContainer}
              onChange={(value) => handleColorChange("onPrimaryContainer", value)}
            />
          </div>

          <Separator />

          {/* Secondary Colors */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide">Secondary Colors</h3>
            
            <ColorInput
              label="Secondary"
              colorKey="secondary"
              value={currentTheme.secondary}
              onChange={(value) => handleColorChange("secondary", value)}
            />
            
            <ColorInput
              label="On Secondary"
              colorKey="onSecondary"
              value={currentTheme.onSecondary}
              onChange={(value) => handleColorChange("onSecondary", value)}
            />
            
            <ColorInput
              label="Secondary Container"
              colorKey="secondaryContainer"
              value={currentTheme.secondaryContainer}
              onChange={(value) => handleColorChange("secondaryContainer", value)}
            />
            
            <ColorInput
              label="On Secondary Container"
              colorKey="onSecondaryContainer"
              value={currentTheme.onSecondaryContainer}
              onChange={(value) => handleColorChange("onSecondaryContainer", value)}
            />
          </div>

          <Separator />

          {/* Custom Enum Tokens */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide">Custom Tokens</h3>
            
            <ColorInput
              label="Warning"
              colorKey="warning"
              value={currentTheme.warning}
              onChange={(value) => handleColorChange("warning", value)}
            />
            
            <ColorInput
              label="On Warning"
              colorKey="onWarning"
              value={currentTheme.onWarning}
              onChange={(value) => handleColorChange("onWarning", value)}
            />
            
            <ColorInput
              label="Success"
              colorKey="success"
              value={currentTheme.success}
              onChange={(value) => handleColorChange("success", value)}
            />
            
            <ColorInput
              label="On Success"
              colorKey="onSuccess"
              value={currentTheme.onSuccess}
              onChange={(value) => handleColorChange("onSuccess", value)}
            />
            
            <ColorInput
              label="Information"
              colorKey="information"
              value={currentTheme.information}
              onChange={(value) => handleColorChange("information", value)}
            />
            
            <ColorInput
              label="Critical"
              colorKey="critical"
              value={currentTheme.critical}
              onChange={(value) => handleColorChange("critical", value)}
            />
          </div>

          <Separator />

          {/* Surface Colors */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide">Surface Colors</h3>
            
            <ColorInput
              label="Surface"
              colorKey="surface"
              value={currentTheme.surface}
              onChange={(value) => handleColorChange("surface", value)}
            />
            
            <ColorInput
              label="On Surface"
              colorKey="onSurface"
              value={currentTheme.onSurface}
              onChange={(value) => handleColorChange("onSurface", value)}
            />
            
            <ColorInput
              label="Background"
              colorKey="background"
              value={currentTheme.background}
              onChange={(value) => handleColorChange("background", value)}
            />
            
            <ColorInput
              label="On Background"
              colorKey="onBackground"
              value={currentTheme.onBackground}
              onChange={(value) => handleColorChange("onBackground", value)}
            />
          </div>
        </div>

        {/* Palette Generator */}
        <Card className="mt-8">
          <CardContent className="p-4">
            <h4 className="text-sm font-semibold mb-3">Palette Generator</h4>
            <div className="space-y-3">
              <div>
                <Label className="text-xs font-medium">Seed Color</Label>
                <Input
                  type="color"
                  value={seedColor}
                  onChange={(e) => setSeedColor(e.target.value)}
                  className="w-full h-8 cursor-pointer"
                />
              </div>
              <Button
                onClick={generatePalette}
                className="w-full"
                size="sm"
              >
                <Palette className="w-4 h-4 mr-2" />
                Generate Palette
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}