/**
 * Local storage utilities for managing saved themes
 */

import { ThemeExport, SavedTheme, getThemeNameFromExport } from "@/types/schema";

const STORAGE_PREFIX = "materialThemeBuilder_";
const SAVED_THEMES_KEY = `${STORAGE_PREFIX}savedThemes`;
const CURRENT_THEME_KEY = `${STORAGE_PREFIX}currentTheme`;
const RECENT_THEMES_KEY = `${STORAGE_PREFIX}recentThemes`;

export interface ThemeStorageManager {
  // Save theme operations
  saveTheme: (theme: ThemeExport, name?: string) => Promise<string>;
  saveThemeAs: (theme: ThemeExport, name: string) => Promise<string>;
  autoSaveTheme: (theme: ThemeExport) => Promise<void>;
  
  // Load theme operations
  loadTheme: (id: string) => Promise<SavedTheme | null>;
  loadThemeByName: (name: string) => Promise<SavedTheme | null>;
  
  // Theme management
  getAllSavedThemes: () => Promise<SavedTheme[]>;
  getRecentThemes: (limit?: number) => Promise<SavedTheme[]>;
  deleteTheme: (id: string) => Promise<boolean>;
  duplicateTheme: (id: string, newName?: string) => Promise<string>;
  renameTheme: (id: string, newName: string) => Promise<boolean>;
  
  // Theme organization
  exportThemeToFile: (id: string) => Promise<void>;
  importThemeFromFile: (file: File) => Promise<SavedTheme>;
  
  // Storage management
  clearAllThemes: () => Promise<void>;
  getStorageInfo: () => Promise<{ count: number; size: number }>;
}

/**
 * Generate a unique ID for a theme
 */
function generateThemeId(): string {
  return `theme_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get all saved themes from localStorage
 */
function getSavedThemes(): SavedTheme[] {
  try {
    const saved = localStorage.getItem(SAVED_THEMES_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Failed to load saved themes:", error);
    return [];
  }
}

/**
 * Save themes array to localStorage
 */
function setSavedThemes(themes: SavedTheme[]): void {
  try {
    localStorage.setItem(SAVED_THEMES_KEY, JSON.stringify(themes));
  } catch (error) {
    console.error("Failed to save themes:", error);
    throw new Error("Failed to save theme. Storage may be full.");
  }
}

/**
 * Update recent themes list
 */
function updateRecentThemes(themeId: string): void {
  try {
    const recent = JSON.parse(localStorage.getItem(RECENT_THEMES_KEY) || "[]");
    const filtered = recent.filter((id: string) => id !== themeId);
    const updated = [themeId, ...filtered].slice(0, 10); // Keep last 10
    localStorage.setItem(RECENT_THEMES_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Failed to update recent themes:", error);
  }
}

/**
 * Create theme storage manager
 */
export function createThemeStorageManager(): ThemeStorageManager {
  return {
    async saveTheme(theme: ThemeExport, name?: string): Promise<string> {
      const themes = getSavedThemes();
      const id = generateThemeId();
      const now = new Date().toISOString();
      
      const savedTheme: SavedTheme = {
        ...theme,
        id,
        themeName: name || getThemeNameFromExport(theme) || "Unnamed Theme",
        createdAt: now,
        updatedAt: now,
        timestamp: now,
      };
      
      themes.push(savedTheme);
      setSavedThemes(themes);
      updateRecentThemes(id);
      
      return id;
    },

    async saveThemeAs(theme: ThemeExport, name: string): Promise<string> {
      return this.saveTheme(theme, name);
    },

    async autoSaveTheme(theme: ThemeExport): Promise<void> {
      const themes = getSavedThemes();
      const autoSaveTheme = themes.find(t => t.isAutoSave);
      const now = new Date().toISOString();
      
      if (autoSaveTheme) {
        // Update existing auto-save
        autoSaveTheme.schemes = theme.schemes;
        autoSaveTheme.seed = theme.seed;
        autoSaveTheme.themeName = getThemeNameFromExport(theme);
        autoSaveTheme.updatedAt = now;
        autoSaveTheme.timestamp = now;
        autoSaveTheme.extendedColors = theme.extendedColors;
      } else {
        // Create new auto-save
        const savedTheme: SavedTheme = {
          ...theme,
          id: "autosave",
          themeName: "Auto-saved Theme",
          createdAt: now,
          updatedAt: now,
          timestamp: now,
          isAutoSave: true,
        };
        themes.unshift(savedTheme); // Add to beginning
      }
      
      setSavedThemes(themes);
    },

    async loadTheme(id: string): Promise<SavedTheme | null> {
      const themes = getSavedThemes();
      const theme = themes.find(t => t.id === id);
      
      if (theme) {
        updateRecentThemes(id);
        return theme;
      }
      
      return null;
    },

    async loadThemeByName(name: string): Promise<SavedTheme | null> {
      const themes = getSavedThemes();
      const theme = themes.find(t => getThemeNameFromExport(t) === name);
      
      if (theme) {
        updateRecentThemes(theme.id);
        return theme;
      }
      
      return null;
    },

    async getAllSavedThemes(): Promise<SavedTheme[]> {
      return getSavedThemes().sort((a, b) => 
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
    },

    async getRecentThemes(limit = 5): Promise<SavedTheme[]> {
      try {
        const recentIds = JSON.parse(localStorage.getItem(RECENT_THEMES_KEY) || "[]");
        const themes = getSavedThemes();
        
        return recentIds
          .slice(0, limit)
          .map((id: string) => themes.find(t => t.id === id))
          .filter(Boolean);
      } catch (error) {
        console.error("Failed to get recent themes:", error);
        return [];
      }
    },

    async deleteTheme(id: string): Promise<boolean> {
      try {
        const themes = getSavedThemes();
        const filteredThemes = themes.filter(t => t.id !== id);
        
        if (filteredThemes.length === themes.length) {
          return false; // Theme not found
        }
        
        setSavedThemes(filteredThemes);
        
        // Remove from recent themes
        const recent = JSON.parse(localStorage.getItem(RECENT_THEMES_KEY) || "[]");
        const filteredRecent = recent.filter((recentId: string) => recentId !== id);
        localStorage.setItem(RECENT_THEMES_KEY, JSON.stringify(filteredRecent));
        
        return true;
      } catch (error) {
        console.error("Failed to delete theme:", error);
        return false;
      }
    },

    async duplicateTheme(id: string, newName?: string): Promise<string> {
      const theme = await this.loadTheme(id);
      if (!theme) {
        throw new Error("Theme not found");
      }
      
      const duplicatedTheme: ThemeExport = {
        description: theme.description,
        seed: theme.seed,
        coreColors: theme.coreColors,
        extendedColors: theme.extendedColors,
        schemes: { ...theme.schemes },
        palettes: theme.palettes,
        timestamp: new Date().toISOString(),
      };
      
      return this.saveTheme(duplicatedTheme);
    },

    async renameTheme(id: string, newName: string): Promise<boolean> {
      try {
        const themes = getSavedThemes();
        const theme = themes.find(t => t.id === id);
        
        if (!theme) {
          return false;
        }
        
        theme.themeName = newName;
        theme.updatedAt = new Date().toISOString();
        
        setSavedThemes(themes);
        return true;
      } catch (error) {
        console.error("Failed to rename theme:", error);
        return false;
      }
    },

    async exportThemeToFile(id: string): Promise<void> {
      const theme = await this.loadTheme(id);
      if (!theme) {
        throw new Error("Theme not found");
      }
      
      const dataStr = JSON.stringify(theme, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      
      const link = document.createElement("a");
      link.href = URL.createObjectURL(dataBlob);
      link.download = `${(getThemeNameFromExport(theme) || "theme").replace(/[^a-z0-9]/gi, "_").toLowerCase()}.json`;
      link.click();
      
      URL.revokeObjectURL(link.href);
    },

    async importThemeFromFile(file: File): Promise<SavedTheme> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = async (e) => {
          try {
            const content = e.target?.result as string;
            const themeData = JSON.parse(content);
            
            // Validate theme structure
            if (!themeData.schemes || !themeData.schemes.light || !themeData.schemes.dark) {
              throw new Error("Invalid theme file format");
            }
            
            const id = await this.saveTheme(themeData);
            const savedTheme = await this.loadTheme(id);
            
            if (savedTheme) {
              resolve(savedTheme);
            } else {
              reject(new Error("Failed to save imported theme"));
            }
          } catch (error) {
            reject(new Error(`Failed to import theme: ${error instanceof Error ? error.message : "Unknown error"}`));
          }
        };
        
        reader.onerror = () => {
          reject(new Error("Failed to read file"));
        };
        
        reader.readAsText(file);
      });
    },

    async clearAllThemes(): Promise<void> {
      try {
        localStorage.removeItem(SAVED_THEMES_KEY);
        localStorage.removeItem(RECENT_THEMES_KEY);
      } catch (error) {
        console.error("Failed to clear themes:", error);
        throw new Error("Failed to clear themes");
      }
    },

    async getStorageInfo(): Promise<{ count: number; size: number }> {
      try {
        const themes = getSavedThemes();
        const dataStr = localStorage.getItem(SAVED_THEMES_KEY) || "[]";
        
        return {
          count: themes.length,
          size: new Blob([dataStr]).size,
        };
      } catch (error) {
        console.error("Failed to get storage info:", error);
        return { count: 0, size: 0 };
      }
    },
  };
}

// Export singleton instance
export const themeStorage = createThemeStorageManager();