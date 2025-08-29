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
  const createMonacoTheme = (themeColors: any, darkMode: boolean) => {
    const asHex = (c: unknown, fb: string) =>
      typeof c === "string" && /^#([A-Fa-f0-9]{6})$/.test(c) ? c : fb;

    const bg = asHex(themeColors?.background, darkMode ? "#1E1E1E" : "#FFFFFF");
    const onBg = asHex(themeColors?.onBackground, darkMode ? "#EEEEEE" : "#1C1C1C");
    const surfaceCont = asHex(themeColors?.surfaceContainer, darkMode ? "#252525" : "#F3F3F3");
    const primary = asHex(themeColors?.primary, "#6750A4");
    const primaryCont = asHex(themeColors?.primaryContainer, darkMode ? "#3F2E63" : "#EADDFF");
    const onSurface = asHex(themeColors?.onSurface, onBg);
    const onSurfaceVar = asHex(themeColors?.onSurfaceVariant, darkMode ? "#A1A1A1" : "#49454F");
    const outline = asHex(themeColors?.outline, darkMode ? "#5A5A5A" : "#79747E");
    const warning = asHex(themeColors?.warning, "#F59E0B");
    const warningCont = asHex(themeColors?.warningContainer, darkMode ? "#92400E" : "#FEF3C7");
    const error = asHex(themeColors?.error, "#BA1A1A");
    const errorCont = asHex(themeColors?.errorContainer, darkMode ? "#93000A" : "#FFDAD6");
    const information = asHex(themeColors?.information, "#2196F3");
    const success = asHex(themeColors?.success, "#10B981");
    const secondary = asHex(themeColors?.secondary, "#625B71");
    const tertiary = asHex(themeColors?.tertiary, "#7D5260");

    return ({
      base: darkMode ? "vs-dark" : "vs",
      inherit: true,
      rules: [
        { token: "comment", foreground: onSurfaceVar },
        { token: "keyword", foreground: primary },
        { token: "string", foreground: secondary },
        { token: "number", foreground: tertiary },
        { token: "delimiter", foreground: onSurface },
        { token: "operator", foreground: onSurface },
        { token: "type", foreground: error },
        { token: "class", foreground: warning },
        { token: "function", foreground: success },
        { token: "variable", foreground: information },
      ],
      colors: {
        "editor.background": bg,
        "editor.foreground": onBg,
        "editor.lineHighlightBackground": surfaceCont,
        "editor.selectionBackground": primaryCont,
        "editor.inactiveSelectionBackground": surfaceCont,
        "editor.findMatchBackground": warningCont,
        "editor.findMatchHighlightBackground": warningCont,
        "editorCursor.foreground": primary,
        "editorWhitespace.foreground": outline,
        "editorIndentGuide.background": outline,
        "editorIndentGuide.activeBackground": primary,
        "editorLineNumber.foreground": onSurfaceVar,
        "editorLineNumber.activeForeground": primary,
        "editorRuler.foreground": outline,
        "editorCodeLens.foreground": onSurfaceVar,
        "editorBracketMatch.background": surfaceCont,
        "editorBracketMatch.border": primary,
        "editorOverviewRuler.border": outline,
        "editorOverviewRuler.findMatchForeground": warning,
        "editorOverviewRuler.errorForeground": error,
        "editorOverviewRuler.warningForeground": warning,
        "editorOverviewRuler.infoForeground": information,
        "editorError.foreground": error,
        "editorWarning.foreground": warning,
        "editorInfo.foreground": information,
        "editorHint.foreground": success,
        "editorGutter.background": bg,
        "editorGutter.modifiedBackground": warning,
        "editorGutter.addedBackground": success,
        "editorGutter.deletedBackground": error,
        "diffEditor.insertedTextBackground": success,
        "diffEditor.removedTextBackground": errorCont,
        "diffEditor.diagonalFill": outline,
      },
    });
  };
  
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