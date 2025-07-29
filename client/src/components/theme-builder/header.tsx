import { useTheme } from "./theme-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Palette, Moon, Sun, Download, FileText } from "lucide-react";
import { exportToJSON, exportToDart } from "./export-utils";
import { useToast } from "@/hooks/use-toast";

interface HeaderProps {
  onToggleAppTheme: () => void;
  appDarkMode: boolean;
}

export function Header({ onToggleAppTheme, appDarkMode }: HeaderProps) {
  const { themeName, setThemeName, exportTheme } = useTheme();
  const { toast } = useToast();

  const handleExportJSON = () => {
    try {
      const theme = exportTheme();
      exportToJSON(theme);
      toast({
        title: "Success",
        description: "Theme exported as JSON successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export theme as JSON",
        variant: "destructive",
      });
    }
  };

  const handleExportDart = () => {
    try {
      const theme = exportTheme();
      exportToDart(theme);
      toast({
        title: "Success",
        description: "Theme exported as Dart successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export theme as Dart",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Palette className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">Material Theme Builder</h1>
            <p className="text-sm text-muted-foreground">Flutter Theme Designer</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <Input
          type="text"
          placeholder="Theme Name"
          value={themeName}
          onChange={(e) => setThemeName(e.target.value)}
          className="w-48"
        />
        
        <Button
          variant="outline"
          size="icon"
          onClick={onToggleAppTheme}
        >
          {appDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={handleExportJSON}
            className="text-sm"
          >
            <FileText className="w-4 h-4 mr-2" />
            Export JSON
          </Button>
          <Button
            onClick={handleExportDart}
            className="text-sm"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Dart
          </Button>
        </div>
      </div>
    </header>
  );
}