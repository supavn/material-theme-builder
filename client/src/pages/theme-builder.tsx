import { ThemeProvider } from "@/components/theme-builder/theme-context";
import { Header } from "@/components/theme-builder/header";
import { TokenEditor } from "@/components/theme-builder/token-editor";
import { MobilePreview } from "@/components/theme-builder/mobile-preview";
import { CodeEditor } from "@/components/theme-builder/code-editor";
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
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Header onToggleAppTheme={toggleAppTheme} appDarkMode={appDarkMode} />
        
        <div className="flex h-[calc(100vh-73px)] overflow-hidden">
          <TokenEditor />
          <MobilePreview />
          <CodeEditor />
        </div>
      </div>
    </ThemeProvider>
  );
}
