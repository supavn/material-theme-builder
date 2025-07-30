import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import type { Theme } from '../types/theme';

interface JsonEditorProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export const JsonEditor: React.FC<JsonEditorProps> = ({ theme, onThemeChange }) => {
  const [editorTheme, setEditorTheme] = useState<'vs-light' | 'vs-dark'>('vs-light');

  const handleEditorChange = (value: string | undefined) => {
    if (!value) return;
    
    try {
      const parsedTheme = JSON.parse(value);
      onThemeChange(parsedTheme);
    } catch (error) {
      // Invalid JSON - don't update the theme
      console.warn('Invalid JSON:', error);
    }
  };

  const toggleTheme = () => {
    setEditorTheme(editorTheme === 'vs-light' ? 'vs-dark' : 'vs-light');
  };

  return (
    <div className="json-editor-content">
      <div className="json-editor-header">
        <h2>JSON Editor</h2>
        <button 
          className="theme-toggle-button"
          onClick={toggleTheme}
          title={`Switch to ${editorTheme === 'vs-light' ? 'Dark' : 'Light'} theme`}
        >
          {editorTheme === 'vs-light' ? '🌙' : '☀️'}
        </button>
      </div>
      <div className="monaco-container">
        <Editor
          height="100%"
          defaultLanguage="json"
          value={JSON.stringify(theme, null, 2)}
          onChange={handleEditorChange}
          theme={editorTheme}
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            fontFamily: 'Monaco, Menlo, Ubuntu Mono, monospace',
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: false,
            automaticLayout: true,
            wordWrap: 'on',
            tabSize: 2,
            insertSpaces: true,
            detectIndentation: false,
            trimAutoWhitespace: true,
            largeFileOptimizations: false,
            suggest: {
              showKeywords: false,
              showSnippets: false,
              showClasses: false,
              showFunctions: false,
              showVariables: false,
              showConstants: false,
              showEnums: false,
              showEnumMembers: false,
              showColors: false,
              showFiles: false,
              showReferences: false,
              showFolders: false,
              showTypeParameters: false,
              showWords: false,
              showUsers: false,
              showIssues: false,
            },
            quickSuggestions: false,
            parameterHints: {
              enabled: false,
            },
            hover: {
              enabled: false,
            },
            contextmenu: false,
            folding: true,
            foldingStrategy: 'indentation',
            showFoldingControls: 'always',
            unfoldOnClickAfterEndOfLine: false,
            matchBrackets: 'always',
            autoClosingBrackets: 'always',
            autoClosingQuotes: 'always',
            autoClosingOvertype: 'always',
            autoClosingDelete: 'always',
            autoSurround: 'quotes',
            bracketPairColorization: {
              enabled: true,
            },
            guides: {
              bracketPairs: true,
              indentation: true,
            },
            colorDecorators: true,
            codeActionsOnSave: {},
            formatOnPaste: true,
            formatOnType: true,
            formatOnSave: true,
          }}
        />
      </div>
    </div>
  );
}; 