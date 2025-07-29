import { useTheme } from "./theme-context";
import { ColorPicker } from "./color-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Palette, Sun, Moon, Wand2 } from "lucide-react";
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
  return (
    <div className="space-y-1">
      <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
      <div className="flex items-center space-x-2">
        <ColorPicker
          label=""
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

// Simplified compact version for the grid layout
function CompactColorInput({ label, colorKey, value, onChange }: ColorInputProps) {
  return (
    <div className="space-y-1">
      <Label className="text-xs font-medium text-muted-foreground truncate">{label}</Label>
      <div className="flex items-center space-x-1">
        <button
          className="w-6 h-6 rounded border border-border flex-shrink-0"
          style={{ backgroundColor: value }}
          onClick={() => {}}
        />
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 text-xs h-6 px-1"
          placeholder="#000000"
        />
      </div>
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
    <div className="h-full bg-card overflow-y-auto">
      <div className="p-4">
        {/* Header with Theme Toggle and Auto Generate */}
        <div className="mb-4 space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-foreground">Editing Mode</Label>
            <Button
              onClick={generatePalette}
              size="sm"
              variant="outline"
            >
              <Wand2 className="w-4 h-4 mr-1" />
              Auto Generate
            </Button>
          </div>
          
          <div className="flex bg-muted rounded-lg p-1">
            <Button
              variant={currentEditingTheme === "light" ? "default" : "ghost"}
              size="sm"
              onClick={() => switchEditingTheme("light")}
              className="flex-1"
            >
              <Sun className="w-3 h-3 mr-1" />
              Light
            </Button>
            <Button
              variant={currentEditingTheme === "dark" ? "default" : "ghost"}
              size="sm"
              onClick={() => switchEditingTheme("dark")}
              className="flex-1"
            >
              <Moon className="w-3 h-3 mr-1" />
              Dark
            </Button>
          </div>
        </div>

        {/* Seed Color - Compact */}
        <div className="mb-4">
          <CompactColorInput
            label="Seed Color"
            colorKey="primary"
            value={seedColor}
            onChange={setSeedColor}
          />
        </div>

        {/* Color Categories - Compact Grid */}
        <div className="space-y-4">
          {/* Primary Colors */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Primary</h3>
            <div className="grid grid-cols-2 gap-2">
              <CompactColorInput
                label="Primary"
                colorKey="primary"
                value={currentTheme.primary}
                onChange={(value) => handleColorChange("primary", value)}
              />
              <CompactColorInput
                label="On Primary"
                colorKey="onPrimary"
                value={currentTheme.onPrimary}
                onChange={(value) => handleColorChange("onPrimary", value)}
              />
              <CompactColorInput
                label="Container"
                colorKey="primaryContainer"
                value={currentTheme.primaryContainer}
                onChange={(value) => handleColorChange("primaryContainer", value)}
              />
              <CompactColorInput
                label="On Container"
                colorKey="onPrimaryContainer"
                value={currentTheme.onPrimaryContainer}
                onChange={(value) => handleColorChange("onPrimaryContainer", value)}
              />
            </div>
          </div>

          <Separator className="my-3" />

          {/* Secondary Colors */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Secondary</h3>
            <div className="grid grid-cols-2 gap-2">
              <CompactColorInput
                label="Secondary"
                colorKey="secondary"
                value={currentTheme.secondary}
                onChange={(value) => handleColorChange("secondary", value)}
              />
              <CompactColorInput
                label="On Secondary"
                colorKey="onSecondary"
                value={currentTheme.onSecondary}
                onChange={(value) => handleColorChange("onSecondary", value)}
              />
              <CompactColorInput
                label="Container"
                colorKey="secondaryContainer"
                value={currentTheme.secondaryContainer}
                onChange={(value) => handleColorChange("secondaryContainer", value)}
              />
              <CompactColorInput
                label="On Container"
                colorKey="onSecondaryContainer"
                value={currentTheme.onSecondaryContainer}
                onChange={(value) => handleColorChange("onSecondaryContainer", value)}
              />
            </div>
          </div>

          <Separator className="my-3" />

          {/* Tertiary Colors */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Tertiary</h3>
            <div className="grid grid-cols-2 gap-2">
              <CompactColorInput
                label="Tertiary"
                colorKey="tertiary"
                value={currentTheme.tertiary}
                onChange={(value) => handleColorChange("tertiary", value)}
              />
              <CompactColorInput
                label="On Tertiary"
                colorKey="onTertiary"
                value={currentTheme.onTertiary}
                onChange={(value) => handleColorChange("onTertiary", value)}
              />
              <CompactColorInput
                label="Container"
                colorKey="tertiaryContainer"
                value={currentTheme.tertiaryContainer}
                onChange={(value) => handleColorChange("tertiaryContainer", value)}
              />
              <CompactColorInput
                label="On Container"
                colorKey="onTertiaryContainer"
                value={currentTheme.onTertiaryContainer}
                onChange={(value) => handleColorChange("onTertiaryContainer", value)}
              />
            </div>
          </div>

          <Separator className="my-3" />

          {/* Error Colors */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Error</h3>
            <div className="grid grid-cols-2 gap-2">
              <CompactColorInput
                label="Error"
                colorKey="error"
                value={currentTheme.error}
                onChange={(value) => handleColorChange("error", value)}
              />
              <CompactColorInput
                label="On Error"
                colorKey="onError"
                value={currentTheme.onError}
                onChange={(value) => handleColorChange("onError", value)}
              />
              <CompactColorInput
                label="Container"
                colorKey="errorContainer"
                value={currentTheme.errorContainer}
                onChange={(value) => handleColorChange("errorContainer", value)}
              />
              <CompactColorInput
                label="On Container"
                colorKey="onErrorContainer"
                value={currentTheme.onErrorContainer}
                onChange={(value) => handleColorChange("onErrorContainer", value)}
              />
            </div>
          </div>

          <Separator className="my-3" />

          {/* Surface Colors */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Surface & Background</h3>
            <div className="grid grid-cols-2 gap-2">
              <CompactColorInput
                label="Surface"
                colorKey="surface"
                value={currentTheme.surface}
                onChange={(value) => handleColorChange("surface", value)}
              />
              <CompactColorInput
                label="On Surface"
                colorKey="onSurface"
                value={currentTheme.onSurface}
                onChange={(value) => handleColorChange("onSurface", value)}
              />
              <CompactColorInput
                label="Background"
                colorKey="background"
                value={currentTheme.background}
                onChange={(value) => handleColorChange("background", value)}
              />
              <CompactColorInput
                label="On Background"
                colorKey="onBackground"
                value={currentTheme.onBackground}
                onChange={(value) => handleColorChange("onBackground", value)}
              />
              <CompactColorInput
                label="Outline"
                colorKey="outline"
                value={currentTheme.outline}
                onChange={(value) => handleColorChange("outline", value)}
              />
              <CompactColorInput
                label="Outline Variant"
                colorKey="outlineVariant"
                value={currentTheme.outlineVariant}
                onChange={(value) => handleColorChange("outlineVariant", value)}
              />
            </div>
          </div>

          <Separator className="my-3" />

          {/* Custom Tokens */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Custom Tokens</h3>
            <div className="grid grid-cols-2 gap-2">
              <CompactColorInput
                label="Warning"
                colorKey="warning"
                value={currentTheme.warning}
                onChange={(value) => handleColorChange("warning", value)}
              />
              <CompactColorInput
                label="On Warning"
                colorKey="onWarning"
                value={currentTheme.onWarning}
                onChange={(value) => handleColorChange("onWarning", value)}
              />
              <CompactColorInput
                label="Success"
                colorKey="success"
                value={currentTheme.success}
                onChange={(value) => handleColorChange("success", value)}
              />
              <CompactColorInput
                label="On Success"
                colorKey="onSuccess"
                value={currentTheme.onSuccess}
                onChange={(value) => handleColorChange("onSuccess", value)}
              />
              <CompactColorInput
                label="Information"
                colorKey="information"
                value={currentTheme.information}
                onChange={(value) => handleColorChange("information", value)}
              />
              <CompactColorInput
                label="On Information"
                colorKey="onInformation"
                value={currentTheme.onInformation}
                onChange={(value) => handleColorChange("onInformation", value)}
              />
              <CompactColorInput
                label="Critical"
                colorKey="critical"
                value={currentTheme.critical}
                onChange={(value) => handleColorChange("critical", value)}
              />
              <CompactColorInput
                label="On Critical"
                colorKey="onCritical"
                value={currentTheme.onCritical}
                onChange={(value) => handleColorChange("onCritical", value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}