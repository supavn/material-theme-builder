import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ColorScheme, ThemeExport, SavedTheme } from "@/types/schema";
import targetTheme from "../../../target.generated.json";
import { getTagHex } from "@/theme";
import { themeStorage } from "@/lib/theme-storage";
import { getDefaultTheme } from "./theme-defaults";

interface ThemeContextType {
  lightTheme: ColorScheme;
  darkTheme: ColorScheme;
  currentEditingTheme: "light" | "dark";
  previewTheme: "light" | "dark";
  appDarkMode: boolean;
  themeName: string;
  seedColor: string;
  currentThemeId: string | null;
  savedThemes: SavedTheme[];
  recentThemes: SavedTheme[];
  switchEditingTheme: (theme: "light" | "dark") => void;
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
const defaultLightTheme: ColorScheme = getDefaultTheme("light");
const defaultDarkTheme: ColorScheme = getDefaultTheme("dark");

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  appDarkMode: boolean;
}

export function ThemeProvider({ children, appDarkMode }: ThemeProviderProps) {
  const [lightTheme, setLightTheme] = useState<ColorScheme>(defaultLightTheme);
  const [darkTheme, setDarkTheme] = useState<ColorScheme>(defaultDarkTheme);
  const [currentEditingTheme, setCurrentEditingTheme] = useState<"light" | "dark">("light");
  const [previewTheme, setPreviewTheme] = useState<"light" | "dark">("light");

  // Sync previewTheme with appDarkMode
  useEffect(() => {
    setPreviewTheme(appDarkMode ? "dark" : "light");
  }, [appDarkMode]);
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

    // If no saved theme, hydrate from target.generated.json
    if (!savedLightTheme || !savedDarkTheme) {
      try {
        const t: any = targetTheme;
        const nextLight: Record<string, string> = { ...(t?.schemes?.light || {}) };
        const nextDark: Record<string, string> = { ...(t?.schemes?.dark || {}) };
        if (Array.isArray(t?.extendedColors)) {
          for (const ec of t.extendedColors) {
            if (ec?.name && ec?.color) {
              nextLight[ec.name] = ec.color;
              nextDark[ec.name] = ec.color;
            }
          }
        }
        if (t?.schemes?.light) setLightTheme(prev => ({ ...prev, ...nextLight }));
        if (t?.schemes?.dark) setDarkTheme(prev => ({ ...prev, ...nextDark }));
        if (t?.themeName) setThemeName(t.themeName);
        if (t?.seed) setSeedColor(t.seed);
      } catch (err) {
        console.warn("Failed to hydrate from target.generated.json", err);
      }
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
      
      // Tag color tokens
      blueTagText: defaultLightTheme.blueTagText,
      blueTagBackground: defaultLightTheme.blueTagBackground,
      blueTagBorder: defaultLightTheme.blueTagBorder,
      cyanTagText: defaultLightTheme.cyanTagText,
      cyanTagBackground: defaultLightTheme.cyanTagBackground,
      cyanTagBorder: defaultLightTheme.cyanTagBorder,
      geekblueTagText: defaultLightTheme.geekblueTagText,
      geekblueTagBackground: defaultLightTheme.geekblueTagBackground,
      geekblueTagBorder: defaultLightTheme.geekblueTagBorder,
      goldTagText: defaultLightTheme.goldTagText,
      goldTagBackground: defaultLightTheme.goldTagBackground,
      goldTagBorder: defaultLightTheme.goldTagBorder,
      greenTagText: defaultLightTheme.greenTagText,
      greenTagBackground: defaultLightTheme.greenTagBackground,
      greenTagBorder: defaultLightTheme.greenTagBorder,
      limeTagText: defaultLightTheme.limeTagText,
      limeTagBackground: defaultLightTheme.limeTagBackground,
      limeTagBorder: defaultLightTheme.limeTagBorder,
      magentaTagText: defaultLightTheme.magentaTagText,
      magentaTagBackground: defaultLightTheme.magentaTagBackground,
      magentaTagBorder: defaultLightTheme.magentaTagBorder,
      orangeTagText: defaultLightTheme.orangeTagText,
      orangeTagBackground: defaultLightTheme.orangeTagBackground,
      orangeTagBorder: defaultLightTheme.orangeTagBorder,
      purpleTagText: defaultLightTheme.purpleTagText,
      purpleTagBackground: defaultLightTheme.purpleTagBackground,
      purpleTagBorder: defaultLightTheme.purpleTagBorder,
      redTagText: defaultLightTheme.redTagText,
      redTagBackground: defaultLightTheme.redTagBackground,
      redTagBorder: defaultLightTheme.redTagBorder,
      volcanoTagText: defaultLightTheme.volcanoTagText,
      volcanoTagBackground: defaultLightTheme.volcanoTagBackground,
      volcanoTagBorder: defaultLightTheme.volcanoTagBorder,
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
      
      // Tag color tokens
      blueTagText: defaultDarkTheme.blueTagText,
      blueTagBackground: defaultDarkTheme.blueTagBackground,
      blueTagBorder: defaultDarkTheme.blueTagBorder,
      cyanTagText: defaultDarkTheme.cyanTagText,
      cyanTagBackground: defaultDarkTheme.cyanTagBackground,
      cyanTagBorder: defaultDarkTheme.cyanTagBorder,
      geekblueTagText: defaultDarkTheme.geekblueTagText,
      geekblueTagBackground: defaultDarkTheme.geekblueTagBackground,
      geekblueTagBorder: defaultDarkTheme.geekblueTagBorder,
      goldTagText: defaultDarkTheme.goldTagText,
      goldTagBackground: defaultDarkTheme.goldTagBackground,
      goldTagBorder: defaultDarkTheme.goldTagBorder,
      greenTagText: defaultDarkTheme.greenTagText,
      greenTagBackground: defaultDarkTheme.greenTagBackground,
      greenTagBorder: defaultDarkTheme.greenTagBorder,
      limeTagText: defaultDarkTheme.limeTagText,
      limeTagBackground: defaultDarkTheme.limeTagBackground,
      limeTagBorder: defaultDarkTheme.limeTagBorder,
      magentaTagText: defaultDarkTheme.magentaTagText,
      magentaTagBackground: defaultDarkTheme.magentaTagBackground,
      magentaTagBorder: defaultDarkTheme.magentaTagBorder,
      orangeTagText: defaultDarkTheme.orangeTagText,
      orangeTagBackground: defaultDarkTheme.orangeTagBackground,
      orangeTagBorder: defaultDarkTheme.orangeTagBorder,
      purpleTagText: defaultDarkTheme.purpleTagText,
      purpleTagBackground: defaultDarkTheme.purpleTagBackground,
      purpleTagBorder: defaultDarkTheme.purpleTagBorder,
      redTagText: defaultDarkTheme.redTagText,
      redTagBackground: defaultDarkTheme.redTagBackground,
      redTagBorder: defaultDarkTheme.redTagBorder,
      volcanoTagText: defaultDarkTheme.volcanoTagText,
      volcanoTagBackground: defaultDarkTheme.volcanoTagBackground,
      volcanoTagBorder: defaultDarkTheme.volcanoTagBorder,
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

  const importTheme = (theme: any) => {
    // Base schemes
    const nextLight = { ...theme.schemes?.light } as Record<string, string>;
    const nextDark = { ...theme.schemes?.dark } as Record<string, string>;

    // Compatibility: map extendedColors back into scheme fields if present
    const extended: Array<{ name: string; color: string }> = Array.isArray(theme.extendedColors) ? theme.extendedColors : [];
    if (extended.length > 0) {
      for (const ec of extended) {
        if (ec && typeof ec.name === "string" && typeof ec.color === "string") {
          nextLight[ec.name] = ec.color;
          nextDark[ec.name] = ec.color;
        }
      }
    }

    setLightTheme((prev) => ({ ...prev, ...nextLight } as any));
    setDarkTheme((prev) => ({ ...prev, ...nextDark } as any));
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
    appDarkMode,
    themeName,
    seedColor,
    currentThemeId,
    savedThemes,
    recentThemes,
    switchEditingTheme,
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
