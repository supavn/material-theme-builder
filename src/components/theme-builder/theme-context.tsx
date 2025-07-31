import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ColorScheme, ThemeExport, SavedTheme } from "@/types/schema";
import { themeStorage } from "@/lib/theme-storage";

interface ThemeContextType {
  lightTheme: ColorScheme;
  darkTheme: ColorScheme;
  currentEditingTheme: "light" | "dark";
  previewTheme: "light" | "dark";
  themeName: string;
  seedColor: string;
  currentThemeId: string | null;
  savedThemes: SavedTheme[];
  recentThemes: SavedTheme[];
  switchEditingTheme: (theme: "light" | "dark") => void;
  switchPreviewTheme: (theme: "light" | "dark") => void;
  updateColor: (key: keyof ColorScheme, value: string) => void;
  setThemeName: (name: string) => void;
  setSeedColor: (color: string) => void;
  generatePalette: () => void;
  exportTheme: () => ThemeExport;
  importTheme: (theme: ThemeExport) => void;
  resetToDefaults: () => void;
  // Enhanced save/load functionality
  saveCurrentTheme: (name?: string) => Promise<string>;
  saveThemeAs: (name: string) => Promise<string>;
  loadSavedTheme: (id: string) => Promise<boolean>;
  deleteSavedTheme: (id: string) => Promise<boolean>;
  duplicateTheme: (id: string, newName?: string) => Promise<string>;
  renameTheme: (id: string, newName: string) => Promise<boolean>;
  refreshSavedThemes: () => Promise<void>;
  exportThemeToFile: (id?: string) => Promise<void>;
  importThemeFromFile: (file: File) => Promise<boolean>;
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
  surfaceVariant: "#E7E0EC",
  onSurfaceVariant: "#49454F",
  surfaceDim: "#DED8E1",
  surfaceBright: "#FEF7FF",
  surfaceContainer: "#F3EDF7",
  surfaceContainerLow: "#F7F2FA",
  surfaceContainerHigh: "#ECE6F0",
  surfaceContainerHighest: "#E6E0E9",
  background: "#FEF7FF",
  onBackground: "#1C1B1F",
  outline: "#79747E",
  outlineVariant: "#CAC4D0",
  // Custom enum tokens
  warning: "#F59E0B",
  onWarning: "#FFFFFF",
  warningContainer: "#FEF3C7",
  onWarningContainer: "#451A03",
  information: "#3B82F6",
  onInformation: "#FFFFFF",
  informationContainer: "#DBEAFE",
  onInformationContainer: "#1E3A8A",
  success: "#10B981",
  onSuccess: "#FFFFFF",
  successContainer: "#D1FAE5",
  onSuccessContainer: "#064E3B",
  defaultColor: "#6750A4",
  onDefault: "#FFFFFF",
  defaultContainer: "#EADDFF",
  onDefaultContainer: "#21005D",
  critical: "#EF4444",
  onCritical: "#FFFFFF",
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
  surfaceVariant: "#49454F",
  onSurfaceVariant: "#CAC4D0",
  surfaceDim: "#141218",
  surfaceBright: "#3B383E",
  surfaceContainer: "#211F26",
  surfaceContainerLow: "#1C1B1F",
  surfaceContainerHigh: "#2B2930",
  surfaceContainerHighest: "#36343B",
  background: "#1C1B1F",
  onBackground: "#E6E1E5",
  outline: "#938F99",
  outlineVariant: "#49454F",
  // Custom enum tokens
  warning: "#FBBF24",
  onWarning: "#78350F",
  warningContainer: "#92400E",
  onWarningContainer: "#FEF3C7",
  information: "#60A5FA",
  onInformation: "#1E3A8A",
  informationContainer: "#1E40AF",
  onInformationContainer: "#DBEAFE",
  success: "#34D399",
  onSuccess: "#065F46",
  successContainer: "#047857",
  onSuccessContainer: "#D1FAE5",
  defaultColor: "#D0BCFF",
  onDefault: "#381E72",
  defaultContainer: "#4F378B",
  onDefaultContainer: "#EADDFF",
  critical: "#F87171",
  onCritical: "#7F1D1D",
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
  const [currentThemeId, setCurrentThemeId] = useState<string | null>(null);
  const [savedThemes, setSavedThemes] = useState<SavedTheme[]>([]);
  const [recentThemes, setRecentThemes] = useState<SavedTheme[]>([]);

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

    // Advanced Material Design 3 color generation using HSL
    const hexToHsl = (hex: string): [number, number, number] => {
      const rgb = hexToRgb(hex);
      const r = rgb.r / 255;
      const g = rgb.g / 255;
      const b = rgb.b / 255;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0, s = 0, l = (max + min) / 2;

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

      return [h * 360, s * 100, l * 100];
    };

    const hslToHex = (h: number, s: number, l: number): string => {
      h = h / 360;
      s = s / 100;
      l = l / 100;

      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };

      let r, g, b;
      if (s === 0) {
        r = g = b = l;
      } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
      }

      return rgbToHex(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
    };

    // Material Design color generation with proper tonal relationships
    const [seedH, seedS, seedL] = hexToHsl(seed);
    
    const generateVariant = (hueShift: number, satAdjust: number, lightAdjust: number) => {
      const newH = (seedH + hueShift) % 360;
      const newS = Math.max(0, Math.min(100, seedS + satAdjust));
      const newL = Math.max(0, Math.min(100, seedL + lightAdjust));
      return hslToHex(newH, newS, newL);
    };

    // Generate new light theme with Material Design 3 principles
    const newLightTheme: ColorScheme = {
      // Primary colors
      primary: seed,
      onPrimary: seedL > 50 ? "#000000" : "#FFFFFF",
      primaryContainer: generateVariant(0, -20, 35),
      onPrimaryContainer: generateVariant(0, 0, -40),
      
      // Secondary colors (30° hue shift for harmony)
      secondary: generateVariant(30, -15, -10),
      onSecondary: "#FFFFFF",
      secondaryContainer: generateVariant(30, -20, 40),
      onSecondaryContainer: generateVariant(30, 0, -35),
      
      // Tertiary colors (60° hue shift for vibrancy)
      tertiary: generateVariant(60, -10, -5),
      onTertiary: "#FFFFFF",
      tertiaryContainer: generateVariant(60, -20, 45),
      onTertiaryContainer: generateVariant(60, 0, -30),
      
      // Error colors (Material Design standard)
      error: "#BA1A1A",
      onError: "#FFFFFF",
      errorContainer: "#FFDAD6",
      onErrorContainer: "#410002",
      
      // Surface colors
      surface: "#FEF7FF",
      onSurface: "#1C1B1F",
      surfaceVariant: generateVariant(0, -30, 85),
      onSurfaceVariant: generateVariant(0, -10, 30),
      surfaceDim: generateVariant(0, -40, 75),
      surfaceBright: "#FEF7FF",
      surfaceContainer: generateVariant(0, -35, 90),
      surfaceContainerLow: generateVariant(0, -40, 95),
      surfaceContainerHigh: generateVariant(0, -30, 88),
      surfaceContainerHighest: generateVariant(0, -25, 85),
      
      // Background
      background: "#FEF7FF",
      onBackground: "#1C1B1F",
      
      // Outline
      outline: generateVariant(0, -20, 50),
      outlineVariant: generateVariant(0, -30, 75),
      
      // Custom tokens
      warning: "#F59E0B",
      onWarning: "#FFFFFF",
      warningContainer: "#FEF3C7",
      onWarningContainer: "#451A03",
      information: generateVariant(180, 0, -20),
      onInformation: "#FFFFFF",
      informationContainer: generateVariant(180, -20, 85),
      onInformationContainer: generateVariant(180, 0, -35),
      success: "#10B981",
      onSuccess: "#FFFFFF",
      successContainer: "#D1FAE5",
      onSuccessContainer: "#064E3B",
      defaultColor: seed,
      onDefault: seedL > 50 ? "#000000" : "#FFFFFF",
      defaultContainer: generateVariant(0, -20, 35),
      onDefaultContainer: generateVariant(0, 0, -40),
      critical: "#EF4444",
      onCritical: "#FFFFFF",
    };

    // Generate new dark theme with appropriate contrast adjustments
    const newDarkTheme: ColorScheme = {
      // Primary colors for dark theme
      primary: generateVariant(0, 0, 30),
      onPrimary: generateVariant(0, 0, -40),
      primaryContainer: generateVariant(0, -10, -25),
      onPrimaryContainer: generateVariant(0, -10, 40),
      
      // Secondary colors
      secondary: generateVariant(30, -15, 20),
      onSecondary: generateVariant(30, 0, -35),
      secondaryContainer: generateVariant(30, -10, -20),
      onSecondaryContainer: generateVariant(30, -10, 45),
      
      // Tertiary colors
      tertiary: generateVariant(60, -10, 25),
      onTertiary: generateVariant(60, 0, -30),
      tertiaryContainer: generateVariant(60, -10, -15),
      onTertiaryContainer: generateVariant(60, -10, 50),
      
      // Error colors for dark theme
      error: "#FFB4AB",
      onError: "#690005",
      errorContainer: "#93000A",
      onErrorContainer: "#FFDAD6",
      
      // Surface colors for dark theme
      surface: "#1C1B1F",
      onSurface: "#E6E1E5",
      surfaceVariant: generateVariant(0, -20, 15),
      onSurfaceVariant: generateVariant(0, -10, 70),
      surfaceDim: generateVariant(0, -30, 8),
      surfaceBright: generateVariant(0, -20, 25),
      surfaceContainer: generateVariant(0, -25, 18),
      surfaceContainerLow: generateVariant(0, -30, 12),
      surfaceContainerHigh: generateVariant(0, -20, 22),
      surfaceContainerHighest: generateVariant(0, -15, 28),
      
      // Background
      background: "#1C1B1F",
      onBackground: "#E6E1E5",
      
      // Outline
      outline: generateVariant(0, -20, 45),
      outlineVariant: generateVariant(0, -30, 25),
      
      // Custom tokens for dark theme
      warning: "#FBBF24",
      onWarning: "#78350F",
      warningContainer: "#92400E",
      onWarningContainer: "#FEF3C7",
      information: generateVariant(180, 0, 40),
      onInformation: generateVariant(180, 0, -30),
      informationContainer: generateVariant(180, -10, -20),
      onInformationContainer: generateVariant(180, -10, 85),
      success: "#34D399",
      onSuccess: "#065F46",
      successContainer: "#047857",
      onSuccessContainer: "#D1FAE5",
      defaultColor: generateVariant(0, 0, 30),
      onDefault: generateVariant(0, 0, -40),
      defaultContainer: generateVariant(0, -10, -25),
      onDefaultContainer: generateVariant(0, -10, 40),
      critical: "#F87171",
      onCritical: "#7F1D1D",
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

  const importTheme = (theme: ThemeExport) => {
    setLightTheme(theme.schemes.light);
    setDarkTheme(theme.schemes.dark);
    setThemeName(theme.themeName || "Imported Theme");
    setSeedColor(theme.seed || "#6750A4");
  };

  const resetToDefaults = () => {
    setLightTheme(defaultLightTheme);
    setDarkTheme(defaultDarkTheme);
    setThemeName("Custom Theme");
    setSeedColor("#6750A4");
    setCurrentThemeId(null);
  };

  // Enhanced save/load functionality
  const refreshSavedThemes = async () => {
    try {
      const themes = await themeStorage.getAllSavedThemes();
      const recent = await themeStorage.getRecentThemes();
      setSavedThemes(themes);
      setRecentThemes(recent);
    } catch (error) {
      console.error("Failed to refresh saved themes:", error);
    }
  };

  // Load saved themes on mount
  useEffect(() => {
    refreshSavedThemes();
  }, []);

  // Auto-save current theme periodically
  useEffect(() => {
    const autoSaveTimer = setInterval(async () => {
      try {
        const currentTheme = exportTheme();
        await themeStorage.autoSaveTheme(currentTheme);
      } catch (error) {
        console.error("Auto-save failed:", error);
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(autoSaveTimer);
  }, [lightTheme, darkTheme, themeName, seedColor]);

  const saveCurrentTheme = async (name?: string): Promise<string> => {
    try {
      const theme = exportTheme();
      const id = await themeStorage.saveTheme(theme, name);
      setCurrentThemeId(id);
      await refreshSavedThemes();
      return id;
    } catch (error) {
      console.error("Failed to save theme:", error);
      throw error;
    }
  };

  const saveThemeAs = async (name: string): Promise<string> => {
    try {
      const theme = exportTheme();
      const id = await themeStorage.saveThemeAs(theme, name);
      setCurrentThemeId(id);
      setThemeName(name);
      await refreshSavedThemes();
      return id;
    } catch (error) {
      console.error("Failed to save theme as:", error);
      throw error;
    }
  };

  const loadSavedTheme = async (id: string): Promise<boolean> => {
    try {
      const theme = await themeStorage.loadTheme(id);
      if (theme) {
        importTheme(theme);
        setCurrentThemeId(id);
        await refreshSavedThemes();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to load theme:", error);
      return false;
    }
  };

  const deleteSavedTheme = async (id: string): Promise<boolean> => {
    try {
      const success = await themeStorage.deleteTheme(id);
      if (success) {
        if (currentThemeId === id) {
          setCurrentThemeId(null);
        }
        await refreshSavedThemes();
      }
      return success;
    } catch (error) {
      console.error("Failed to delete theme:", error);
      return false;
    }
  };

  const duplicateTheme = async (id: string, newName?: string): Promise<string> => {
    try {
      const newId = await themeStorage.duplicateTheme(id, newName);
      await refreshSavedThemes();
      return newId;
    } catch (error) {
      console.error("Failed to duplicate theme:", error);
      throw error;
    }
  };

  const renameTheme = async (id: string, newName: string): Promise<boolean> => {
    try {
      const success = await themeStorage.renameTheme(id, newName);
      if (success) {
        if (currentThemeId === id) {
          setThemeName(newName);
        }
        await refreshSavedThemes();
      }
      return success;
    } catch (error) {
      console.error("Failed to rename theme:", error);
      return false;
    }
  };

  const exportThemeToFile = async (id?: string): Promise<void> => {
    try {
      if (id) {
        await themeStorage.exportThemeToFile(id);
      } else {
        // Export current theme
        const tempId = await saveCurrentTheme();
        await themeStorage.exportThemeToFile(tempId);
      }
    } catch (error) {
      console.error("Failed to export theme to file:", error);
      throw error;
    }
  };

  const importThemeFromFile = async (file: File): Promise<boolean> => {
    try {
      const savedTheme = await themeStorage.importThemeFromFile(file);
      importTheme(savedTheme);
      setCurrentThemeId(savedTheme.id);
      await refreshSavedThemes();
      return true;
    } catch (error) {
      console.error("Failed to import theme from file:", error);
      return false;
    }
  };

  const value: ThemeContextType = {
    lightTheme,
    darkTheme,
    currentEditingTheme,
    previewTheme,
    themeName,
    seedColor,
    currentThemeId,
    savedThemes,
    recentThemes,
    switchEditingTheme,
    switchPreviewTheme,
    updateColor,
    setThemeName,
    setSeedColor,
    generatePalette,
    exportTheme,
    importTheme,
    resetToDefaults,
    // Enhanced save/load functionality
    saveCurrentTheme,
    saveThemeAs,
    loadSavedTheme,
    deleteSavedTheme,
    duplicateTheme,
    renameTheme,
    refreshSavedThemes,
    exportThemeToFile,
    importThemeFromFile,
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