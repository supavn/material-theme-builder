import { useState, useRef } from "react";
import { useTheme } from "./theme-context";
import { TokenEditor } from "./token-editor";
import { MonacoEditor } from "./monaco-editor";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Copy, 
  Download, 
  FileText, 
  Code2, 
  Upload, 
  Save, 
  FolderOpen, 
  Trash2, 
  Edit2, 
  Copy as CopyIcon,
  Clock,
  Star
} from "lucide-react";
import { copyToClipboard } from "./export-utils";
import { themeStorage } from "@/lib/theme-storage";
import { useToast } from "@/hooks/use-toast";
import { ThemeExport } from "@/types/schema";

export function ThemeEditor() {
  const { 
    exportTheme, 
    importTheme, 
    themeName,
    setThemeName,
    currentThemeId,
    savedThemes,
    recentThemes,
    saveCurrentTheme,
    saveThemeAs,
    loadSavedTheme,
    deleteSavedTheme,
    duplicateTheme,
    renameTheme,
    exportThemeToFile,
    importThemeFromFile,
    resetToDefaults,
    refreshSavedThemes
  } = useTheme();
  const [activeTab, setActiveTab] = useState<"tokens" | "json" | "saved">("tokens");
  const [jsonCode, setJsonCode] = useState("");
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [saveAsName, setSaveAsName] = useState("");
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [renameThemeId, setRenameThemeId] = useState("");
  const [renameName, setRenameName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Update JSON when switching to JSON tab or when theme changes
  const updateJsonCode = () => {
    const theme = exportTheme();
    setJsonCode(JSON.stringify(theme, null, 2));
  };

  const handleTabChange = (value: string) => {
    const tab = value as "tokens" | "json" | "saved";
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

  const handleFormatJson = () => {
    try {
      const parsed = JSON.parse(jsonCode);
      const formatted = JSON.stringify(parsed, null, 2);
      setJsonCode(formatted);
      toast({
        title: "Success",
        description: "JSON formatted successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid JSON format. Cannot format.",
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

  // Save/Load handlers
  const handleSaveTheme = async () => {
    try {
      const id = await saveCurrentTheme();
      toast({
        title: "Success",
        description: "Theme saved successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save theme",
        variant: "destructive",
      });
    }
  };

  const handleSaveAsTheme = async () => {
    if (!saveAsName.trim()) return;
    
    try {
      const id = await saveThemeAs(saveAsName);
      setSaveDialogOpen(false);
      setSaveAsName("");
      toast({
        title: "Success",
        description: `Theme saved as "${saveAsName}"!`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save theme",
        variant: "destructive",
      });
    }
  };

  const handleLoadTheme = async (id: string) => {
    try {
      const success = await loadSavedTheme(id);
      if (success) {
        toast({
          title: "Success",
          description: "Theme loaded successfully!",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to load theme",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load theme",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTheme = async (id: string) => {
    try {
      const success = await deleteSavedTheme(id);
      if (success) {
        toast({
          title: "Success",
          description: "Theme deleted successfully!",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to delete theme",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete theme",
        variant: "destructive",
      });
    }
  };

  const handleDuplicateTheme = async (id: string) => {
    try {
      const theme = savedThemes.find(t => t.id === id);
      const newId = await duplicateTheme(id, `${theme?.themeName} (Copy)`);
      toast({
        title: "Success",
        description: "Theme duplicated successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to duplicate theme",
        variant: "destructive",
      });
    }
  };

  const handleRenameTheme = async () => {
    if (!renameName.trim() || !renameThemeId) return;
    
    try {
      const success = await renameTheme(renameThemeId, renameName);
      if (success) {
        setRenameDialogOpen(false);
        setRenameThemeId("");
        setRenameName("");
        toast({
          title: "Success",
          description: "Theme renamed successfully!",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to rename theme",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to rename theme",
        variant: "destructive",
      });
    }
  };

  const handleExportThemeFile = async (id?: string) => {
    try {
      await exportThemeToFile(id);
      toast({
        title: "Success",
        description: "Theme exported successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export theme",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAllThemes = async () => {
    const confirmed = window.confirm("Delete all saved themes and reset to defaults? This cannot be undone.");
    if (!confirmed) return;
    try {
      await themeStorage.clearAllThemes();
      // Clear persisted working theme state
      localStorage.removeItem("materialThemeBuilder_lightTheme");
      localStorage.removeItem("materialThemeBuilder_darkTheme");
      localStorage.removeItem("materialThemeBuilder_extendedColors");
      localStorage.removeItem("materialThemeBuilder_themeName");
      localStorage.removeItem("materialThemeBuilder_seedColor");
      resetToDefaults();
      await refreshSavedThemes();
      toast({
        title: "Cleared",
        description: "All themes deleted and theme reset to defaults.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to clear all themes",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col h-full bg-card">
      {/* Header with Import Button */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground">Theme Editor</h2>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="text-xs">
              Live Editing
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSaveTheme}
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            
            <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  Save As
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Save Theme As</DialogTitle>
                  <DialogDescription>
                    Save your current theme with a custom name for future use.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="theme-name">Theme Name</Label>
                    <Input
                      id="theme-name"
                      value={saveAsName}
                      onChange={(e) => setSaveAsName(e.target.value)}
                      placeholder="Enter theme name..."
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveAsTheme}>
                      Save Theme
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              variant="outline"
              size="sm"
              onClick={handleImportFile}
            >
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
          </div>
        </div>
        
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tokens" className="flex items-center space-x-2">
              <Code2 className="w-4 h-4" />
              <span>Token Editor</span>
            </TabsTrigger>
            <TabsTrigger value="json" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>JSON Editor</span>
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center space-x-2">
              <FolderOpen className="w-4 h-4" />
              <span>Saved Themes</span>
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
                  <h3 className="text-sm font-medium text-foreground">JSON Configuration</h3>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleFormatJson}
                    >
                      <Code2 className="w-4 h-4 mr-2" />
                      Format
                    </Button>
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
                <MonacoEditor
                  value={jsonCode}
                  onChange={setJsonCode}
                  language="json"
                />
              </div>

              {/* JSON Editor Footer */}
              <div className="p-4 border-t border-border bg-muted/50">
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

          <TabsContent value="saved" className="h-full m-0">
            <div className="flex flex-col h-full p-4 space-y-4">
              {/* Current Theme Info */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Current Theme</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{themeName}</p>
                      <p className="text-xs text-muted-foreground">
                        {currentThemeId ? "Saved" : "Unsaved changes"}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleExportThemeFile()}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Themes */}
              {recentThemes.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>Recent Themes</span>
                  </h3>
                  <div className="space-y-2">
                    {recentThemes.map((theme) => (
                      <Card key={theme.id} className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{theme.themeName}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(theme.updatedAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleLoadTheme(theme.id)}
                            >
                              <FolderOpen className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* All Saved Themes */}
              <div className="flex-1 space-y-2">
                <h3 className="text-sm font-medium flex items-center justify-between">
                  <span>All Saved Themes ({savedThemes.length})</span>
                  {savedThemes.length > 0 && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleDeleteAllThemes}
                      title="Delete all saved themes and reset"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete All
                    </Button>
                  )}
                </h3>
                
                <div className="space-y-2 overflow-y-auto">
                  {savedThemes.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <FolderOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No saved themes yet</p>
                      <p className="text-xs">Save your current theme to get started</p>
                    </div>
                  ) : (
                    savedThemes.map((theme) => (
                      <Card key={theme.id} className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <p className="font-medium text-sm">{theme.themeName}</p>
                              {theme.isAutoSave && (
                                <Badge variant="secondary" className="text-xs">
                                  Auto-save
                                </Badge>
                              )}
                              {currentThemeId === theme.id && (
                                <Badge variant="default" className="text-xs">
                                  Current
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Updated: {new Date(theme.updatedAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleLoadTheme(theme.id)}
                              title="Load theme"
                            >
                              <FolderOpen className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDuplicateTheme(theme.id)}
                              title="Duplicate theme"
                            >
                              <CopyIcon className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setRenameThemeId(theme.id);
                                setRenameName(theme.themeName || "");
                                setRenameDialogOpen(true);
                              }}
                              title="Rename theme"
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleExportThemeFile(theme.id)}
                              title="Export theme"
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                            {!theme.isAutoSave && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteTheme(theme.id)}
                                title="Delete theme"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Rename Dialog */}
      <Dialog open={renameDialogOpen} onOpenChange={setRenameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Theme</DialogTitle>
            <DialogDescription>
              Enter a new name for this theme.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="rename-theme-name">Theme Name</Label>
              <Input
                id="rename-theme-name"
                value={renameName}
                onChange={(e) => setRenameName(e.target.value)}
                placeholder="Enter new theme name..."
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setRenameDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleRenameTheme}>
                Rename
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
