import { useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { useTheme } from "./theme-context";

interface MonacoEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
}

export function MonacoEditor({ 
  value, 
  onChange, 
  language = "json"
}: MonacoEditorProps) {
  const { lightTheme, darkTheme, previewTheme, appDarkMode } = useTheme();
  const editorRef = useRef<any>(null);
  
  // Get the current theme colors based on app dark mode (not preview theme)
  const theme = appDarkMode ? darkTheme : lightTheme;
  
  // Use app dark mode for Monaco editor base theme
  const editorDarkMode = appDarkMode;

  // Helper function to create Monaco theme
  const createMonacoTheme = (themeColors: any, darkMode: boolean) => ({
    base: darkMode ? "vs-dark" : "vs",
    inherit: true,
    rules: [
      { token: "comment", foreground: themeColors.onSurfaceVariant },
      { token: "keyword", foreground: themeColors.primary },
      { token: "string", foreground: themeColors.secondary },
      { token: "number", foreground: themeColors.tertiary },
      { token: "delimiter", foreground: themeColors.onSurface },
      { token: "operator", foreground: themeColors.onSurface },
      { token: "type", foreground: themeColors.error },
      { token: "class", foreground: themeColors.warning },
      { token: "function", foreground: themeColors.success },
      { token: "variable", foreground: themeColors.information },
    ],
    colors: {
      "editor.background": themeColors.background,
      "editor.foreground": themeColors.onBackground,
      "editor.lineHighlightBackground": themeColors.surfaceContainer,
      "editor.selectionBackground": themeColors.primaryContainer,
      "editor.inactiveSelectionBackground": themeColors.surfaceContainer,
      "editor.findMatchBackground": themeColors.warningContainer,
      "editor.findMatchHighlightBackground": themeColors.warningContainer,
      "editorCursor.foreground": themeColors.primary,
      "editorWhitespace.foreground": themeColors.outline,
      "editorIndentGuide.background": themeColors.outline,
      "editorIndentGuide.activeBackground": themeColors.primary,
      "editorLineNumber.foreground": themeColors.onSurfaceVariant,
      "editorLineNumber.activeForeground": themeColors.primary,
      "editorRuler.foreground": themeColors.outline,
      "editorCodeLens.foreground": themeColors.onSurfaceVariant,
      "editorBracketMatch.background": themeColors.surfaceContainer,
      "editorBracketMatch.border": themeColors.primary,
      "editorOverviewRuler.border": themeColors.outline,
      "editorOverviewRuler.findMatchForeground": themeColors.warning,
      "editorOverviewRuler.errorForeground": themeColors.error,
      "editorOverviewRuler.warningForeground": themeColors.warning,
      "editorOverviewRuler.infoForeground": themeColors.information,
      "editorError.foreground": themeColors.error,
      "editorWarning.foreground": themeColors.warning,
      "editorInfo.foreground": themeColors.information,
      "editorHint.foreground": themeColors.success,
      "editorGutter.background": themeColors.background,
      "editorGutter.modifiedBackground": themeColors.warning,
      "editorGutter.addedBackground": themeColors.success,
      "editorGutter.deletedBackground": themeColors.error,
      "diffEditor.insertedTextBackground": themeColors.successContainer,
      "diffEditor.removedTextBackground": themeColors.errorContainer,
      "diffEditor.diagonalFill": themeColors.outline,
    },
  });
  
  // Monaco editor options
  const options = {
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    fontSize: 14,
    fontFamily: "Monaco, 'Courier New', monospace",
    lineNumbers: "on" as const,
    roundedSelection: false,
    scrollbar: {
      vertical: "visible" as const,
      horizontal: "visible" as const,
    },
    automaticLayout: true,
    wordWrap: "on" as const,
    folding: true,
    foldingStrategy: "indentation" as const,
    showFoldingControls: "always" as const,
    renderLineHighlight: "all" as const,
    selectOnLineNumbers: true,
    glyphMargin: true,
    useTabStops: false,
    tabSize: 2,
    insertSpaces: true,
    detectIndentation: false,
    trimAutoWhitespace: true,
    largeFileOptimizations: false,
    // JSON specific options
    formatOnPaste: true,
    formatOnType: true,
    autoIndent: "full" as const,
    bracketPairColorization: {
      enabled: true,
    },
    guides: {
      bracketPairs: true,
      indentation: true,
    },
    suggest: {
      showKeywords: true,
      showSnippets: true,
      showClasses: true,
      showFunctions: true,
      showVariables: true,
      showConstants: true,
      showEnums: true,
      showEnumMembers: true,
      showColors: true,
      showFiles: true,
      showReferences: true,
      showFolders: true,
      showTypeParameters: true,
      showWords: true,
      showUsers: true,
      showIssues: true,
    },
  };



  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    
    // Create and set the custom theme
    console.log("Monaco editor mounted, appDarkMode:", appDarkMode, "theme colors:", theme);
    const initialTheme = createMonacoTheme(theme, editorDarkMode);
    monaco.editor.defineTheme("material-theme", initialTheme);
    monaco.editor.setTheme("material-theme");
    
    // Configure JSON language features
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      allowComments: false,
      schemas: [],
    });
    
    // Focus the editor
    editor.focus();
  };

  const handleEditorChange = (value: string | undefined) => {
    onChange(value || "");
  };

  // Update theme when app dark mode changes
  useEffect(() => {
    if (editorRef.current) {
      const monaco = (window as any).monaco;
      if (monaco) {
        console.log("Updating Monaco theme, appDarkMode:", appDarkMode, "theme colors:", theme);
        const updatedTheme = createMonacoTheme(theme, editorDarkMode);
        monaco.editor.defineTheme("material-theme", updatedTheme);
        monaco.editor.setTheme("material-theme");
      }
    }
  }, [theme, appDarkMode, editorDarkMode]);

  return (
    <div className="w-full h-full">
      <Editor
        height="100%"
        defaultLanguage={language}
        value={value}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={options}
        theme="material-theme"
      />
    </div>
  );
} 