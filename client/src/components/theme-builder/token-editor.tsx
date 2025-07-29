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
import { ColorScheme } from "@shared/schema";
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