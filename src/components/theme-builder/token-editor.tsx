import { useTheme } from "./theme-context";
import { ColorPicker } from "./color-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Palette, Sun, Moon, Wand2 } from "lucide-react";
import { ColorScheme } from "@/types/schema";
import React, { useState } from "react";
import {
  hexToHsv,
  hexToHct,
  hsvToHex,
  hctToHex,
  isValidHex,
  normalizeHex,
  HSVColor,
  HCTColor
} from "@/lib/color-utils";

interface ColorInputProps {
  label: string;
  colorKey: keyof ColorScheme;
  value: string;
  onChange: (value: string) => void;
  showContrast?: boolean;
  contrastWith?: string;
}

interface ExtendedColorInputProps {
  label: string;
  tokenName: string;
  value: string | undefined;
  onChange: (value: string) => void;
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

// Enhanced compact color input for extended colors
function ExtendedColorInput({ label, tokenName, value, onChange }: ExtendedColorInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const displayValue = value || "#000000";

  return (
    <div className="space-y-1">
      <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
      <div className="flex items-center space-x-2">
        <ColorPicker
          label=""
          value={displayValue}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

// Enhanced compact color input with multiple color modes
function CompactColorInput({ label, colorKey, value, onChange }: ColorInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("native");
  const [tempHex, setTempHex] = useState(value);
  const [hsv, setHsv] = useState<HSVColor>(() => hexToHsv(value) || { h: 0, s: 0, v: 0 });
  const [hct, setHct] = useState<HCTColor>(() => hexToHct(value) || { h: 0, c: 0, t: 0 });

  // Update internal states when value changes
  React.useEffect(() => {
    if (isValidHex(value)) {
      setTempHex(value);
      const newHsv = hexToHsv(value);
      const newHct = hexToHct(value);
      if (newHsv) setHsv(newHsv);
      if (newHct) setHct(newHct);
    }
  }, [value]);

  const handleHexChange = (hex: string) => {
    setTempHex(hex);
    if (isValidHex(hex)) {
      const normalized = normalizeHex(hex);
      onChange(normalized);
    }
  };

  const handleHsvChange = (component: keyof HSVColor, newValue: number) => {
    const newHsv = { ...hsv, [component]: newValue };
    setHsv(newHsv);
    const hex = hsvToHex(newHsv.h, newHsv.s, newHsv.v);
    onChange(hex);
  };

  const handleHctChange = (component: keyof HCTColor, newValue: number) => {
    const newHct = { ...hct, [component]: newValue };
    setHct(newHct);
    const hex = hctToHex(newHct.h, newHct.c, newHct.t);
    onChange(hex);
  };

  return (
    <div className="space-y-1">
      <Label className="text-xs font-medium text-muted-foreground truncate">{label}</Label>
      <div className="flex items-center space-x-1">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <button
              className="w-6 h-6 rounded border border-border flex-shrink-0 hover:scale-110 transition-transform cursor-pointer"
              style={{ backgroundColor: value }}
              aria-label={`Pick color for ${label}`}
            />
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Palette className="w-4 h-4" />
                <span className="text-sm font-medium text-foreground">{label}</span>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="native" className="text-xs">Native</TabsTrigger>
                  <TabsTrigger value="hex" className="text-xs">Hex</TabsTrigger>
                  <TabsTrigger value="hsv" className="text-xs">HSV</TabsTrigger>
                  <TabsTrigger value="hct" className="text-xs">HCT</TabsTrigger>
                </TabsList>

                <TabsContent value="native" className="space-y-3 mt-3">
                  <input
                    type="color"
                    value={isValidHex(value) ? value : "#000000"}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full h-10 border border-border rounded-md cursor-pointer"
                  />
                </TabsContent>

                <TabsContent value="hex" className="space-y-3 mt-3">
                  <div className="space-y-2">
                    <Label className="text-xs text-foreground">Hex Color</Label>
                    <Input
                      value={tempHex}
                      onChange={(e) => handleHexChange(e.target.value)}
                      placeholder="#000000"
                      className={`font-mono text-sm ${
                        !isValidHex(tempHex) && tempHex !== "" 
                          ? "border-destructive focus:border-destructive" 
                          : ""
                      }`}
                    />
                    {!isValidHex(tempHex) && tempHex !== "" && (
                      <p className="text-xs text-destructive">
                        Please enter a valid hex color (e.g., #FF0000)
                      </p>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="hsv" className="space-y-3 mt-3">
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label className="text-xs text-foreground">Hue</Label>
                        <span className="text-xs text-muted-foreground">{hsv.h}°</span>
                      </div>
                      <Slider
                        value={[hsv.h]}
                        onValueChange={([h]) => handleHsvChange('h', h)}
                        max={360}
                        step={1}
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label className="text-xs text-foreground">Saturation</Label>
                        <span className="text-xs text-muted-foreground">{hsv.s}%</span>
                      </div>
                      <Slider
                        value={[hsv.s]}
                        onValueChange={([s]) => handleHsvChange('s', s)}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label className="text-xs text-foreground">Value</Label>
                        <span className="text-xs text-muted-foreground">{hsv.v}%</span>
                      </div>
                      <Slider
                        value={[hsv.v]}
                        onValueChange={([v]) => handleHsvChange('v', v)}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="hct" className="space-y-3 mt-3">
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label className="text-xs text-foreground">Hue</Label>
                        <span className="text-xs text-muted-foreground">{hct.h}°</span>
                      </div>
                      <Slider
                        value={[hct.h]}
                        onValueChange={([h]) => handleHctChange('h', h)}
                        max={360}
                        step={1}
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label className="text-xs text-foreground">Chroma</Label>
                        <span className="text-xs text-muted-foreground">{hct.c}</span>
                      </div>
                      <Slider
                        value={[hct.c]}
                        onValueChange={([c]) => handleHctChange('c', c)}
                        max={150}
                        step={1}
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label className="text-xs text-foreground">Tone</Label>
                        <span className="text-xs text-muted-foreground">{hct.t}%</span>
                      </div>
                      <Slider
                        value={[hct.t]}
                        onValueChange={([t]) => handleHctChange('t', t)}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Preset colors */}
              <div className="space-y-2">
                <Label className="text-xs text-foreground">Quick Colors</Label>
                <div className="grid grid-cols-10 gap-1">
                  {[
                    // Essential colors
                    "#000000", "#FFFFFF", "#1C1B1F", "#FFFBFE",
                    
                    // Material Design 3 Primary palette (Purple)
                    "#6750A4", "#EADDFF", "#21005D", "#4F378B",
                    
                    // Material Design 3 Secondary palette (Neutral)
                    "#625B71", "#E8DEF8", "#1D192B", "#49454F",
                    
                    // Material Design 3 Tertiary palette (Pink)
                    "#7D5260", "#FFD8E4", "#31111D", "#633B48",
                    
                    // Material Design 3 Error palette
                    "#BA1A1A", "#FFDAD6", "#410E0B", "#93000A",
                    
                    // Material Design 3 Warning palette (Amber/Orange)
                    "#F59E0B", "#FFF2CC", "#3D2E00", "#C77C02",
                    
                    // Material Design 3 Success palette (Green)
                    "#10B981", "#D1F2EB", "#002114", "#0F766E",
                    
                    // Material Design 3 Info palette (Blue)
                    "#2563EB", "#E0F2FE", "#0C4A6E", "#1D4ED8",
                    
                    // Additional Material tones (Neutral variants)
                    "#8F8F8F", "#E6E6E6", "#2D2D2D", "#F5F5F5",
                    
                    // Material Design surface tones
                    "#F7F2FA", "#E7E0EC", "#CAC4D0", "#938F99",
                    
                    // Material Design accent colors
                    "#03DAC6", "#FF6B6B", "#4ECDC4", "#45B7D1",
                    
                    // Flutter default theme colors
                    "#2196F3", "#FF9800", "#4CAF50", "#9C27B0",
                    
                    // Dark theme variants
                    "#121212", "#1E1E1E", "#2C2C2C", "#383838"
                  ].map((color) => (
                    <button
                      key={color}
                      className="w-6 h-6 rounded border border-border hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                      onClick={() => onChange(color)}
                      aria-label={`Select ${color}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
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
    extendedColors,
    previewTheme,
    setPreviewThemeMode,
    updateColor,
    updateExtendedColor,
    getExtendedColorValue,
    seedColor,
    setSeedColor,
    generatePalette,
  } = useTheme();

  const currentTheme = previewTheme === "light" ? lightTheme : darkTheme;

  const handleColorChange = (key: keyof ColorScheme, value: string) => {
    updateColor(key, value);
  };

  const handleExtendedColorChange = (name: string, value: string) => {
    updateExtendedColor(name as any, value);
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
              variant={previewTheme === "light" ? "default" : "ghost"}
              size="sm"
              onClick={() => setPreviewThemeMode("light")}
              className="flex-1"
            >
              <Sun className="w-3 h-3 mr-1" />
              Light
            </Button>
            <Button
              variant={previewTheme === "dark" ? "default" : "ghost"}
              size="sm"
              onClick={() => setPreviewThemeMode("dark")}
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
            <div className="grid grid-cols-3 gap-2">
              <ExtendedColorInput
                label="Text"
                tokenName="errorText"
                value={getExtendedColorValue("errorText")}
                onChange={(value) => handleExtendedColorChange("errorText", value)}
              />
              <ExtendedColorInput
                label="Background"
                tokenName="errorBackground"
                value={getExtendedColorValue("errorBackground")}
                onChange={(value) => handleExtendedColorChange("errorBackground", value)}
              />
              <ExtendedColorInput
                label="Border"
                tokenName="errorBorder"
                value={getExtendedColorValue("errorBorder")}
                onChange={(value) => handleExtendedColorChange("errorBorder", value)}
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
                label="Surface Variant"
                colorKey="surfaceVariant"
                value={currentTheme.surfaceVariant}
                onChange={(value) => handleColorChange("surfaceVariant", value)}
              />
              <CompactColorInput
                label="On Surface Variant"
                colorKey="onSurfaceVariant"
                value={currentTheme.onSurfaceVariant}
                onChange={(value) => handleColorChange("onSurfaceVariant", value)}
              />
              <CompactColorInput
                label="Surface Dim"
                colorKey="surfaceDim"
                value={currentTheme.surfaceDim}
                onChange={(value) => handleColorChange("surfaceDim", value)}
              />
              <CompactColorInput
                label="Surface Bright"
                colorKey="surfaceBright"
                value={currentTheme.surfaceBright}
                onChange={(value) => handleColorChange("surfaceBright", value)}
              />
              <CompactColorInput
                label="Surface Container"
                colorKey="surfaceContainer"
                value={currentTheme.surfaceContainer}
                onChange={(value) => handleColorChange("surfaceContainer", value)}
              />
              <CompactColorInput
                label="Surface Container Low"
                colorKey="surfaceContainerLow"
                value={currentTheme.surfaceContainerLow}
                onChange={(value) => handleColorChange("surfaceContainerLow", value)}
              />
              <CompactColorInput
                label="Surface Container High"
                colorKey="surfaceContainerHigh"
                value={currentTheme.surfaceContainerHigh}
                onChange={(value) => handleColorChange("surfaceContainerHigh", value)}
              />
              <CompactColorInput
                label="Surface Container Highest"
                colorKey="surfaceContainerHighest"
                value={currentTheme.surfaceContainerHighest}
                onChange={(value) => handleColorChange("surfaceContainerHighest", value)}
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
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Warning</h3>
            <div className="grid grid-cols-3 gap-2">
              <ExtendedColorInput
                label="Text"
                tokenName="warningText"
                value={getExtendedColorValue("warningText")}
                onChange={(value) => handleExtendedColorChange("warningText", value)}
              />
              <ExtendedColorInput
                label="Background"
                tokenName="warningBackground"
                value={getExtendedColorValue("warningBackground")}
                onChange={(value) => handleExtendedColorChange("warningBackground", value)}
              />
              <ExtendedColorInput
                label="Border"
                tokenName="warningBorder"
                value={getExtendedColorValue("warningBorder")}
                onChange={(value) => handleExtendedColorChange("warningBorder", value)}
              />
            </div>
          </div>

          <Separator className="my-3" />

          {/* Success Colors */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Success</h3>
            <div className="grid grid-cols-3 gap-2">
              <ExtendedColorInput
                label="Text"
                tokenName="successText"
                value={getExtendedColorValue("successText")}
                onChange={(value) => handleExtendedColorChange("successText", value)}
              />
              <ExtendedColorInput
                label="Background"
                tokenName="successBackground"
                value={getExtendedColorValue("successBackground")}
                onChange={(value) => handleExtendedColorChange("successBackground", value)}
              />
              <ExtendedColorInput
                label="Border"
                tokenName="successBorder"
                value={getExtendedColorValue("successBorder")}
                onChange={(value) => handleExtendedColorChange("successBorder", value)}
              />
            </div>
          </div>

          <Separator className="my-3" />

          {/* Information Colors */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Information</h3>
            <div className="grid grid-cols-3 gap-2">
              <ExtendedColorInput
                label="Text"
                tokenName="informationText"
                value={getExtendedColorValue("informationText")}
                onChange={(value) => handleExtendedColorChange("informationText", value)}
              />
              <ExtendedColorInput
                label="Background"
                tokenName="informationBackground"
                value={getExtendedColorValue("informationBackground")}
                onChange={(value) => handleExtendedColorChange("informationBackground", value)}
              />
              <ExtendedColorInput
                label="Border"
                tokenName="informationBorder"
                value={getExtendedColorValue("informationBorder")}
                onChange={(value) => handleExtendedColorChange("informationBorder", value)}
              />
            </div>
          </div>

          <Separator className="my-3" />

          {/* Default Colors */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Default</h3>
            <div className="grid grid-cols-3 gap-2">
              <ExtendedColorInput
                label="Text"
                tokenName="defaultText"
                value={getExtendedColorValue("defaultText")}
                onChange={(value) => handleExtendedColorChange("defaultText", value)}
              />
              <ExtendedColorInput
                label="Background"
                tokenName="defaultBackground"
                value={getExtendedColorValue("defaultBackground")}
                onChange={(value) => handleExtendedColorChange("defaultBackground", value)}
              />
              <ExtendedColorInput
                label="Border"
                tokenName="defaultBorder"
                value={getExtendedColorValue("defaultBorder")}
                onChange={(value) => handleExtendedColorChange("defaultBorder", value)}
              />
            </div>
          </div>

          <Separator className="my-3" />

          {/* Critical Colors */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Critical</h3>
            <div className="grid grid-cols-3 gap-2">
              <ExtendedColorInput
                label="Text"
                tokenName="criticalText"
                value={getExtendedColorValue("criticalText")}
                onChange={(value) => handleExtendedColorChange("criticalText", value)}
              />
              <ExtendedColorInput
                label="Background"
                tokenName="criticalBackground"
                value={getExtendedColorValue("criticalBackground")}
                onChange={(value) => handleExtendedColorChange("criticalBackground", value)}
              />
              <ExtendedColorInput
                label="Border"
                tokenName="criticalBorder"
                value={getExtendedColorValue("criticalBorder")}
                onChange={(value) => handleExtendedColorChange("criticalBorder", value)}
              />
            </div>
          </div>

          <Separator className="my-3" />

          {/* Tag Colors */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Tag Colors</h3>
            
            {/* Blue Tag */}
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-muted-foreground">Blue</h4>
              <div className="grid grid-cols-3 gap-2">
                <CompactColorInput
                  label="Text"
                  colorKey="blueTagText"
                  value={currentTheme.blueTagText}
                  onChange={(value) => handleColorChange("blueTagText", value)}
                />
                <CompactColorInput
                  label="Background"
                  colorKey="blueTagBackground"
                  value={currentTheme.blueTagBackground}
                  onChange={(value) => handleColorChange("blueTagBackground", value)}
                />
                <CompactColorInput
                  label="Border"
                  colorKey="blueTagBorder"
                  value={currentTheme.blueTagBorder}
                  onChange={(value) => handleColorChange("blueTagBorder", value)}
                />
              </div>
            </div>

            {/* Cyan Tag */}
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-muted-foreground">Cyan</h4>
              <div className="grid grid-cols-3 gap-2">
                <CompactColorInput
                  label="Text"
                  colorKey="cyanTagText"
                  value={currentTheme.cyanTagText}
                  onChange={(value) => handleColorChange("cyanTagText", value)}
                />
                <CompactColorInput
                  label="Background"
                  colorKey="cyanTagBackground"
                  value={currentTheme.cyanTagBackground}
                  onChange={(value) => handleColorChange("cyanTagBackground", value)}
                />
                <CompactColorInput
                  label="Border"
                  colorKey="cyanTagBorder"
                  value={currentTheme.cyanTagBorder}
                  onChange={(value) => handleColorChange("cyanTagBorder", value)}
                />
              </div>
            </div>

            {/* Geekblue Tag */}
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-muted-foreground">Geekblue</h4>
              <div className="grid grid-cols-3 gap-2">
                <CompactColorInput
                  label="Text"
                  colorKey="geekblueTagText"
                  value={currentTheme.geekblueTagText}
                  onChange={(value) => handleColorChange("geekblueTagText", value)}
                />
                <CompactColorInput
                  label="Background"
                  colorKey="geekblueTagBackground"
                  value={currentTheme.geekblueTagBackground}
                  onChange={(value) => handleColorChange("geekblueTagBackground", value)}
                />
                <CompactColorInput
                  label="Border"
                  colorKey="geekblueTagBorder"
                  value={currentTheme.geekblueTagBorder}
                  onChange={(value) => handleColorChange("geekblueTagBorder", value)}
                />
              </div>
            </div>

            {/* Gold Tag */}
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-muted-foreground">Gold</h4>
              <div className="grid grid-cols-3 gap-2">
                <CompactColorInput
                  label="Text"
                  colorKey="goldTagText"
                  value={currentTheme.goldTagText}
                  onChange={(value) => handleColorChange("goldTagText", value)}
                />
                <CompactColorInput
                  label="Background"
                  colorKey="goldTagBackground"
                  value={currentTheme.goldTagBackground}
                  onChange={(value) => handleColorChange("goldTagBackground", value)}
                />
                <CompactColorInput
                  label="Border"
                  colorKey="goldTagBorder"
                  value={currentTheme.goldTagBorder}
                  onChange={(value) => handleColorChange("goldTagBorder", value)}
                />
              </div>
            </div>

            {/* Green Tag */}
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-muted-foreground">Green</h4>
              <div className="grid grid-cols-3 gap-2">
                <CompactColorInput
                  label="Text"
                  colorKey="greenTagText"
                  value={currentTheme.greenTagText}
                  onChange={(value) => handleColorChange("greenTagText", value)}
                />
                <CompactColorInput
                  label="Background"
                  colorKey="greenTagBackground"
                  value={currentTheme.greenTagBackground}
                  onChange={(value) => handleColorChange("greenTagBackground", value)}
                />
                <CompactColorInput
                  label="Border"
                  colorKey="greenTagBorder"
                  value={currentTheme.greenTagBorder}
                  onChange={(value) => handleColorChange("greenTagBorder", value)}
                />
              </div>
            </div>

            {/* Lime Tag */}
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-muted-foreground">Lime</h4>
              <div className="grid grid-cols-3 gap-2">
                <CompactColorInput
                  label="Text"
                  colorKey="limeTagText"
                  value={currentTheme.limeTagText}
                  onChange={(value) => handleColorChange("limeTagText", value)}
                />
                <CompactColorInput
                  label="Background"
                  colorKey="limeTagBackground"
                  value={currentTheme.limeTagBackground}
                  onChange={(value) => handleColorChange("limeTagBackground", value)}
                />
                <CompactColorInput
                  label="Border"
                  colorKey="limeTagBorder"
                  value={currentTheme.limeTagBorder}
                  onChange={(value) => handleColorChange("limeTagBorder", value)}
                />
              </div>
            </div>

            {/* Magenta Tag */}
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-muted-foreground">Magenta</h4>
              <div className="grid grid-cols-3 gap-2">
                <CompactColorInput
                  label="Text"
                  colorKey="magentaTagText"
                  value={currentTheme.magentaTagText}
                  onChange={(value) => handleColorChange("magentaTagText", value)}
                />
                <CompactColorInput
                  label="Background"
                  colorKey="magentaTagBackground"
                  value={currentTheme.magentaTagBackground}
                  onChange={(value) => handleColorChange("magentaTagBackground", value)}
                />
                <CompactColorInput
                  label="Border"
                  colorKey="magentaTagBorder"
                  value={currentTheme.magentaTagBorder}
                  onChange={(value) => handleColorChange("magentaTagBorder", value)}
                />
              </div>
            </div>

            {/* Orange Tag */}
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-muted-foreground">Orange</h4>
              <div className="grid grid-cols-3 gap-2">
                <CompactColorInput
                  label="Text"
                  colorKey="orangeTagText"
                  value={currentTheme.orangeTagText}
                  onChange={(value) => handleColorChange("orangeTagText", value)}
                />
                <CompactColorInput
                  label="Background"
                  colorKey="orangeTagBackground"
                  value={currentTheme.orangeTagBackground}
                  onChange={(value) => handleColorChange("orangeTagBackground", value)}
                />
                <CompactColorInput
                  label="Border"
                  colorKey="orangeTagBorder"
                  value={currentTheme.orangeTagBorder}
                  onChange={(value) => handleColorChange("orangeTagBorder", value)}
                />
              </div>
            </div>

            {/* Purple Tag */}
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-muted-foreground">Purple</h4>
              <div className="grid grid-cols-3 gap-2">
                <CompactColorInput
                  label="Text"
                  colorKey="purpleTagText"
                  value={currentTheme.purpleTagText}
                  onChange={(value) => handleColorChange("purpleTagText", value)}
                />
                <CompactColorInput
                  label="Background"
                  colorKey="purpleTagBackground"
                  value={currentTheme.purpleTagBackground}
                  onChange={(value) => handleColorChange("purpleTagBackground", value)}
                />
                <CompactColorInput
                  label="Border"
                  colorKey="purpleTagBorder"
                  value={currentTheme.purpleTagBorder}
                  onChange={(value) => handleColorChange("purpleTagBorder", value)}
                />
              </div>
            </div>

            {/* Red Tag */}
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-muted-foreground">Red</h4>
              <div className="grid grid-cols-3 gap-2">
                <CompactColorInput
                  label="Text"
                  colorKey="redTagText"
                  value={currentTheme.redTagText}
                  onChange={(value) => handleColorChange("redTagText", value)}
                />
                <CompactColorInput
                  label="Background"
                  colorKey="redTagBackground"
                  value={currentTheme.redTagBackground}
                  onChange={(value) => handleColorChange("redTagBackground", value)}
                />
                <CompactColorInput
                  label="Border"
                  colorKey="redTagBorder"
                  value={currentTheme.redTagBorder}
                  onChange={(value) => handleColorChange("redTagBorder", value)}
                />
              </div>
            </div>

            {/* Volcano Tag */}
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-muted-foreground">Volcano</h4>
              <div className="grid grid-cols-3 gap-2">
                <CompactColorInput
                  label="Text"
                  colorKey="volcanoTagText"
                  value={currentTheme.volcanoTagText}
                  onChange={(value) => handleColorChange("volcanoTagText", value)}
                />
                <CompactColorInput
                  label="Background"
                  colorKey="volcanoTagBackground"
                  value={currentTheme.volcanoTagBackground}
                  onChange={(value) => handleColorChange("volcanoTagBackground", value)}
                />
                <CompactColorInput
                  label="Border"
                  colorKey="volcanoTagBorder"
                  value={currentTheme.volcanoTagBorder}
                  onChange={(value) => handleColorChange("volcanoTagBorder", value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}