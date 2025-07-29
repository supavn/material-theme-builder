import { useState, useRef } from "react";
import { useTheme } from "./theme-context";
import { TokenEditor } from "./token-editor";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Download, FileText, Code2, Upload } from "lucide-react";
import { copyToClipboard } from "./export-utils";
import { useToast } from "@/hooks/use-toast";
import { ThemeExport } from "@shared/schema";

export function ThemeEditor() {
  const { exportTheme, importTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<"tokens" | "json">("tokens");
  const [jsonCode, setJsonCode] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Update JSON when switching to JSON tab or when theme changes
  const updateJsonCode = () => {
    const theme = exportTheme();
    setJsonCode(JSON.stringify(theme, null, 2));
  };

  const handleTabChange = (value: string) => {
    const tab = value as "tokens" | "json";
    setActiveTab(tab);
    if (tab === "json") {
      updateJsonCode();
    }
  };

  const handleApplyJsonChanges = () => {
    try {
      const parsedTheme = JSON.parse(jsonCode) as ThemeExport;
      
      // Validate the theme structure
      if (!parsedTheme.schemes?.light || !parsedTheme.schemes?.dark) {
        throw new Error("Invalid theme structure");
      }
      
      importTheme(parsedTheme);
      toast({
        title: "Success",
        description: "JSON changes applied to theme!",
      });
    } catch (error) {
      toast({
        title: "Error", 
        description: "Invalid JSON format. Please check your syntax.",
        variant: "destructive",
      });
    }
  };

  const handleCopyJson = async () => {
    try {
      await copyToClipboard(jsonCode);
      toast({
        title: "Success",
        description: "JSON copied to clipboard!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy JSON to clipboard",
        variant: "destructive",
      });
    }
  };

  const handleDownloadJson = () => {
    const theme = exportTheme();
    const blob = new Blob([JSON.stringify(theme, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${theme.themeName || "theme"}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Success",
      description: "Theme exported as JSON successfully!",
    });
  };

  const handleImportFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/json" && !file.name.endsWith(".json")) {
      toast({
        title: "Error",
        description: "Please select a JSON file",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsedTheme = JSON.parse(content) as ThemeExport;
        
        // Validate the theme structure
        if (!parsedTheme.schemes?.light || !parsedTheme.schemes?.dark) {
          throw new Error("Invalid theme structure");
        }
        
        importTheme(parsedTheme);
        setJsonCode(content);
        
        toast({
          title: "Success",
          description: `Theme "${parsedTheme.themeName || 'Imported Theme'}" loaded successfully!`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Invalid theme file format",
          variant: "destructive",
        });
      }
    };
    
    reader.readAsText(file);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col h-full bg-card">
      {/* Header with Import Button */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Theme Editor</h2>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="text-xs">
              Live Editing
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={handleImportFile}
            >
              <Upload className="w-4 h-4 mr-2" />
              Import Theme
            </Button>
          </div>
        </div>
        
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tokens" className="flex items-center space-x-2">
              <Code2 className="w-4 h-4" />
              <span>Token Editor</span>
            </TabsTrigger>
            <TabsTrigger value="json" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>JSON Editor</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} className="h-full">
          <TabsContent value="tokens" className="h-full m-0">
            <TokenEditor />
          </TabsContent>
          
          <TabsContent value="json" className="h-full m-0">
            <div className="flex flex-col h-full">
              {/* JSON Editor Header */}
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">JSON Configuration</h3>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyJson}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDownloadJson}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleApplyJsonChanges}
                    >
                      Apply Changes
                    </Button>
                  </div>
                </div>
              </div>

              {/* JSON Editor */}
              <div className="flex-1 overflow-hidden">
                <textarea
                  className="w-full h-full p-4 text-sm font-mono bg-muted/30 border-none outline-none resize-none"
                  value={jsonCode}
                  onChange={(e) => setJsonCode(e.target.value)}
                  placeholder="JSON theme configuration will appear here..."
                  spellCheck={false}
                />
              </div>

              {/* JSON Editor Footer */}
              <div className="p-4 border-t border-border bg-muted/30">
                <div className="text-xs text-muted-foreground space-y-1">
                  <div className="flex justify-between">
                    <span>Lines:</span>
                    <span>{jsonCode.split('\n').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Characters:</span>
                    <span>{jsonCode.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Size:</span>
                    <span>{(new Blob([jsonCode]).size / 1024).toFixed(1)}KB</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}