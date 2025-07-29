import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ColorScheme, ThemeExport } from "@shared/schema";

interface ThemeContextType {
  lightTheme: ColorScheme;
  darkTheme: ColorScheme;
  currentEditingTheme: "light" | "dark";
  previewTheme: "light" | "dark";
  themeName: string;
  seedColor: string;
  switchEditingTheme: (theme: "light" | "dark") => void;
  switchPreviewTheme: (theme: "light" | "dark") => void;
  updateColor: (key: keyof ColorScheme, value: string) => void;
  setThemeName: (name: string) => void;
  setSeedColor: (color: string) => void;
  generatePalette: () => void;
  exportTheme: () => ThemeExport;
  resetToDefaults: () => void;
}

// Default Material Design 3 color schemes
const defaultLightTheme: ColorScheme = {
  primary: "#6750A4",
  onPrimary: "#FFFFFF",
  primaryContainer: "#EADDFF",
  onPrimaryContainer: "#21005D",
  secondary: "#625B71",
  onSecondary: "#FFFFFF",
  secondaryContainer: "#E8DEF8",
  onSecondaryContainer: "#1D192B",
  tertiary: "#7D5260",
  onTertiary: "#FFFFFF",
  tertiaryContainer: "#FFD8E4",
  onTertiaryContainer: "#31111D",
  error: "#BA1A1A",
  onError: "#FFFFFF",
  errorContainer: "#FFDAD6",
  onErrorContainer: "#410002",
  surface: "#FEF7FF",
  onSurface: "#1C1B1F",
  background: "#FEF7FF",
  onBackground: "#1C1B1F",
  outline: "#79747E",
  outlineVariant: "#CAC4D0",
  // Custom enum tokens
  warning: "#F59E0B",
  onWarning: "#FFFFFF",
  warningContainer: "#FEF3C7",
  onWarningContainer: "#451A03",
  success: "#10B981",
  onSuccess: "#FFFFFF",
  successContainer: "#D1FAE5",
  onSuccessContainer: "#064E3B",
  information: "#3B82F6",
  onInformation: "#FFFFFF",
  informationContainer: "#DBEAFE",
  onInformationContainer: "#1E3A8A",
  critical: "#EF4444",
  onCritical: "#FFFFFF",
  // Additional surface variants
  surfaceContainer: "#F3EDF7",
  onSurfaceVariant: "#49454F",
  inverseSurface: "#313033",
  inverseOnSurface: "#F4EFF4",
  inversePrimary: "#D0BCFF",
  scrim: "#000000",
  shadow: "#000000",
};

const defaultDarkTheme: ColorScheme = {
  primary: "#D0BCFF",
  onPrimary: "#381E72",
  primaryContainer: "#4F378B",
  onPrimaryContainer: "#EADDFF",
  secondary: "#CCC2DC",
  onSecondary: "#332D41",
  secondaryContainer: "#4A4458",
  onSecondaryContainer: "#E8DEF8",
  tertiary: "#EFB8C8",
  onTertiary: "#492532",
  tertiaryContainer: "#633B48",
  onTertiaryContainer: "#FFD8E4",
  error: "#FFB4AB",
  onError: "#690005",
  errorContainer: "#93000A",
  onErrorContainer: "#FFDAD6",
  surface: "#1C1B1F",
  onSurface: "#E6E1E5",
  background: "#1C1B1F",
  onBackground: "#E6E1E5",
  outline: "#938F99",
  outlineVariant: "#49454F",
  // Custom enum tokens
  warning: "#FBBF24",
  onWarning: "#78350F",
  warningContainer: "#92400E",
  onWarningContainer: "#FEF3C7",
  success: "#34D399",
  onSuccess: "#065F46",
  successContainer: "#047857",
  onSuccessContainer: "#D1FAE5",
  information: "#60A5FA",
  onInformation: "#1E3A8A",
  informationContainer: "#1E40AF",
  onInformationContainer: "#DBEAFE",
  critical: "#F87171",
  onCritical: "#7F1D1D",
  // Additional surface variants
  surfaceContainer: "#211F26",
  onSurfaceVariant: "#CAC4D0",
  inverseSurface: "#E6E1E5",
  inverseOnSurface: "#313033",
  inversePrimary: "#6750A4",
  scrim: "#000000",
  shadow: "#000000",
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [lightTheme, setLightTheme] = useState<ColorScheme>(defaultLightTheme);
  const [darkTheme, setDarkTheme] = useState<ColorScheme>(defaultDarkTheme);
  const [currentEditingTheme, setCurrentEditingTheme] = useState<"light" | "dark">("light");
  const [previewTheme, setPreviewTheme] = useState<"light" | "dark">("light");
  const [themeName, setThemeName] = useState<string>("Custom Theme");
  const [seedColor, setSeedColor] = useState<string>("#6750A4");

  // Load from localStorage on mount
  useEffect(() => {
    const savedLightTheme = localStorage.getItem("materialThemeBuilder_lightTheme");
    const savedDarkTheme = localStorage.getItem("materialThemeBuilder_darkTheme");
    const savedThemeName = localStorage.getItem("materialThemeBuilder_themeName");
    const savedSeedColor = localStorage.getItem("materialThemeBuilder_seedColor");

    if (savedLightTheme) {
      try {
        setLightTheme(JSON.parse(savedLightTheme));
      } catch (e) {
        console.warn("Failed to parse saved light theme");
      }
    }

    if (savedDarkTheme) {
      try {
        setDarkTheme(JSON.parse(savedDarkTheme));
      } catch (e) {
        console.warn("Failed to parse saved dark theme");
      }
    }

    if (savedThemeName) {
      setThemeName(savedThemeName);
    }

    if (savedSeedColor) {
      setSeedColor(savedSeedColor);
    }
  }, []);

  // Save to localStorage when values change
  useEffect(() => {
    localStorage.setItem("materialThemeBuilder_lightTheme", JSON.stringify(lightTheme));
  }, [lightTheme]);

  useEffect(() => {
    localStorage.setItem("materialThemeBuilder_darkTheme", JSON.stringify(darkTheme));
  }, [darkTheme]);

  useEffect(() => {
    localStorage.setItem("materialThemeBuilder_themeName", themeName);
  }, [themeName]);

  useEffect(() => {
    localStorage.setItem("materialThemeBuilder_seedColor", seedColor);
  }, [seedColor]);

  const switchEditingTheme = (theme: "light" | "dark") => {
    setCurrentEditingTheme(theme);
  };

  const switchPreviewTheme = (theme: "light" | "dark") => {
    setPreviewTheme(theme);
  };

  const updateColor = (key: keyof ColorScheme, value: string) => {
    if (currentEditingTheme === "light") {
      setLightTheme(prev => ({ ...prev, [key]: value }));
    } else {
      setDarkTheme(prev => ({ ...prev, [key]: value }));
    }
  };

  // Simple color derivation based on seed color
  const generatePalette = () => {
    const seed = seedColor;
    
    // Parse hex color to RGB
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 103, g: 80, b: 164 }; // Fallback to default primary
    };

    // Convert RGB to hex
    const rgbToHex = (r: number, g: number, b: number) => {
      return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    };

    // Simple color variations
    const lighten = (color: string, amount: number) => {
      const rgb = hexToRgb(color);
      return rgbToHex(
        Math.min(255, Math.round(rgb.r + (255 - rgb.r) * amount)),
        Math.min(255, Math.round(rgb.g + (255 - rgb.g) * amount)),
        Math.min(255, Math.round(rgb.b + (255 - rgb.b) * amount))
      );
    };

    const darken = (color: string, amount: number) => {
      const rgb = hexToRgb(color);
      return rgbToHex(
        Math.max(0, Math.round(rgb.r * (1 - amount))),
        Math.max(0, Math.round(rgb.g * (1 - amount))),
        Math.max(0, Math.round(rgb.b * (1 - amount)))
      );
    };

    // Generate new light theme
    const newLightTheme: ColorScheme = {
      ...defaultLightTheme,
      primary: seed,
      primaryContainer: lighten(seed, 0.8),
      onPrimaryContainer: darken(seed, 0.8),
      secondary: darken(seed, 0.3),
      secondaryContainer: lighten(seed, 0.9),
      onSecondaryContainer: darken(seed, 0.7),
    };

    // Generate new dark theme
    const newDarkTheme: ColorScheme = {
      ...defaultDarkTheme,
      primary: lighten(seed, 0.3),
      onPrimary: darken(seed, 0.6),
      primaryContainer: darken(seed, 0.2),
      onPrimaryContainer: lighten(seed, 0.8),
      secondary: lighten(seed, 0.1),
      onSecondary: darken(seed, 0.5),
      secondaryContainer: darken(seed, 0.4),
      onSecondaryContainer: lighten(seed, 0.9),
    };

    setLightTheme(newLightTheme);
    setDarkTheme(newDarkTheme);
  };

  const exportTheme = (): ThemeExport => {
    return {
      themeName,
      seed: seedColor,
      schemes: {
        light: lightTheme,
        dark: darkTheme,
      },
      timestamp: new Date().toISOString(),
    };
  };

  const resetToDefaults = () => {
    setLightTheme(defaultLightTheme);
    setDarkTheme(defaultDarkTheme);
    setThemeName("Custom Theme");
    setSeedColor("#6750A4");
  };

  const value: ThemeContextType = {
    lightTheme,
    darkTheme,
    currentEditingTheme,
    previewTheme,
    themeName,
    seedColor,
    switchEditingTheme,
    switchPreviewTheme,
    updateColor,
    setThemeName,
    setSeedColor,
    generatePalette,
    exportTheme,
    resetToDefaults,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}