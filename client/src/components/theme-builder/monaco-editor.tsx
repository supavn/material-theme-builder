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
  const { lightTheme, darkTheme, previewTheme } = useTheme();
  const editorRef = useRef<any>(null);
  
  // Get the current theme colors
  const theme = previewTheme === "light" ? lightTheme : darkTheme;
  
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

  // Custom theme for Monaco editor
  const monacoTheme = {
    base: previewTheme === "dark" ? "vs-dark" : "vs",
    inherit: true,
    rules: [
      { token: "comment", foreground: theme.onSurfaceVariant },
      { token: "keyword", foreground: theme.primary },
      { token: "string", foreground: theme.secondary },
      { token: "number", foreground: theme.tertiary },
      { token: "delimiter", foreground: theme.onSurface },
      { token: "operator", foreground: theme.onSurface },
      { token: "type", foreground: theme.error },
      { token: "class", foreground: theme.warning },
      { token: "function", foreground: theme.success },
      { token: "variable", foreground: theme.information },
    ],
    colors: {
      "editor.background": theme.background,
      "editor.foreground": theme.onBackground,
      "editor.lineHighlightBackground": theme.surfaceContainer,
      "editor.selectionBackground": theme.primaryContainer,
      "editor.inactiveSelectionBackground": theme.surfaceContainer,
      "editor.findMatchBackground": theme.warningContainer,
      "editor.findMatchHighlightBackground": theme.warningContainer,
      "editorCursor.foreground": theme.primary,
      "editorWhitespace.foreground": theme.outline,
      "editorIndentGuide.background": theme.outline,
      "editorIndentGuide.activeBackground": theme.primary,
      "editorLineNumber.foreground": theme.onSurfaceVariant,
      "editorLineNumber.activeForeground": theme.primary,
      "editorRuler.foreground": theme.outline,
      "editorCodeLens.foreground": theme.onSurfaceVariant,
      "editorBracketMatch.background": theme.surfaceContainer,
      "editorBracketMatch.border": theme.primary,
      "editorOverviewRuler.border": theme.outline,
      "editorOverviewRuler.findMatchForeground": theme.warning,
      "editorOverviewRuler.errorForeground": theme.error,
      "editorOverviewRuler.warningForeground": theme.warning,
      "editorOverviewRuler.infoForeground": theme.information,
      "editorError.foreground": theme.error,
      "editorWarning.foreground": theme.warning,
      "editorInfo.foreground": theme.information,
      "editorHint.foreground": theme.success,
      "editorGutter.background": theme.background,
      "editorGutter.modifiedBackground": theme.warning,
      "editorGutter.addedBackground": theme.success,
      "editorGutter.deletedBackground": theme.error,
      "diffEditor.insertedTextBackground": theme.successContainer,
      "diffEditor.removedTextBackground": theme.errorContainer,
      "diffEditor.diagonalFill": theme.outline,
    },
  };

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    
    // Set the custom theme
    monaco.editor.defineTheme("material-theme", monacoTheme);
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

  // Update theme when preview theme changes
  useEffect(() => {
    if (editorRef.current) {
      const monaco = (window as any).monaco;
      if (monaco) {
        monaco.editor.defineTheme("material-theme", monacoTheme);
        monaco.editor.setTheme("material-theme");
      }
    }
  }, [previewTheme, theme]);

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