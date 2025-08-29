import { ThemeProvider } from "@/components/theme-builder/theme-context";
import { Header } from "@/components/theme-builder/header";
import { ThemeEditor } from "@/components/theme-builder/theme-editor";
import { MobilePreview } from "@/components/theme-builder/mobile-preview";
import { useEffect, useState } from "react";

export default function ThemeBuilder() {
  const [appDarkMode, setAppDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem("app-theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = savedTheme === "dark" || (!savedTheme && systemDark);
    
    setAppDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleAppTheme = () => {
    const newTheme = !appDarkMode;
    setAppDarkMode(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("app-theme", newTheme ? "dark" : "light");
  };

  return (
    <ThemeProvider appDarkMode={appDarkMode} onThemeModeChange={(mode) => { const isDark = mode === 'dark'; setAppDarkMode(isDark); document.documentElement.classList.toggle('dark', isDark); localStorage.setItem('app-theme', isDark ? 'dark' : 'light'); }}>
      <div className="min-h-screen bg-background text-foreground">
        <Header onToggleAppTheme={toggleAppTheme} appDarkMode={appDarkMode} />
        
        <div className="flex h-[calc(100vh-73px)] overflow-hidden">
          {/* Theme Editor - 2/3 width */}
          <div className="w-2/3 border-r border-border">
            <ThemeEditor />
          </div>
          
          {/* Mobile Preview - 1/3 width */}
          <div className="w-1/3">
            <MobilePreview />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
