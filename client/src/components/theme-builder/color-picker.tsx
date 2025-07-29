import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Palette } from "lucide-react";

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  description?: string;
}

export function ColorPicker({ label, value, onChange, description }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  // Validate hex color
  const isValidHex = (color: string) => {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
  };

  const handleInputChange = (inputValue: string) => {
    setTempValue(inputValue);
    if (isValidHex(inputValue)) {
      onChange(inputValue);
    }
  };

  const handleInputBlur = () => {
    if (!isValidHex(tempValue)) {
      setTempValue(value); // Reset to last valid value
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setTempValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      
      <div className="flex space-x-2">
        {/* Color preview and picker */}
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-12 h-10 p-0 border-2"
              style={{ backgroundColor: isValidHex(value) ? value : "#000000" }}
              aria-label={`Pick color for ${label}`}
            >
              <span className="sr-only">Pick color</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Palette className="w-4 h-4" />
                <span className="text-sm font-medium">Color Picker</span>
              </div>
              
              {/* Native color input */}
              <div className="space-y-2">
                <Label className="text-xs">Select Color</Label>
                <input
                  type="color"
                  value={isValidHex(value) ? value : "#000000"}
                  onChange={handleColorChange}
                  className="w-full h-10 border border-border rounded-md cursor-pointer"
                />
              </div>

              {/* Preset colors */}
              <div className="space-y-2">
                <Label className="text-xs">Quick Colors</Label>
                <div className="grid grid-cols-6 gap-1">
                  {[
                    "#6750A4", "#625B71", "#7D5260", "#BA1A1A",
                    "#F59E0B", "#10B981", "#3B82F6", "#EF4444",
                    "#8B5CF6", "#EC4899", "#14B8A6", "#F97316"
                  ].map((color) => (
                    <button
                      key={color}
                      className="w-8 h-8 rounded border border-border hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                      onClick={() => {
                        setTempValue(color);
                        onChange(color);
                      }}
                      aria-label={`Select ${color}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Hex input */}
        <Input
          value={tempValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onBlur={handleInputBlur}
          placeholder="#000000"
          className={`flex-1 font-mono text-sm ${
            !isValidHex(tempValue) && tempValue !== "" 
              ? "border-destructive focus:border-destructive" 
              : ""
          }`}
        />
      </div>

      {/* Validation error */}
      {!isValidHex(tempValue) && tempValue !== "" && (
        <p className="text-xs text-destructive">
          Please enter a valid hex color (e.g., #FF0000)
        </p>
      )}
    </div>
  );
}