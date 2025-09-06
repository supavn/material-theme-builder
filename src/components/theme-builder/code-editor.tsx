import { useTheme } from "./theme-context";
import { getThemeNameFromExport } from "@/types/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Download, FileText, Code2 } from "lucide-react";
import { useState } from "react";
import { copyToClipboard } from "./export-utils";
import { useToast } from "@/hooks/use-toast";

export function CodeEditor() {
  const { exportTheme, getExtendedHex } = useTheme();
  const [codeFormat, setCodeFormat] = useState<"json" | "dart">("json");
  const { toast } = useToast();

  const theme = exportTheme();
  
  // Helper function to get extended color from ThemeExport
  const getExtendedHexFromExport = (name: string): string => {
    const found = theme.extendedColors.find(ec => ec.name === name);
    return found?.color || '#FFFFFF';
  };

  const generateJSONCode = () => {
    return JSON.stringify(theme, null, 2);
  };

  const generateDartCode = () => {
    return `// Generated Material Theme for Flutter
// Theme: ${getThemeNameFromExport(theme) || 'Custom Theme'}
// Seed: ${theme.seed}

import 'package:flutter/material.dart';

class CustomMaterialTheme {
  static const String seed = '${theme.seed}';
  
  // Light Color Scheme
  static const ColorScheme lightColorScheme = ColorScheme.light(
    primary: Color(0xFF${theme.schemes.light.primary.substring(1)}),
    onPrimary: Color(0xFF${theme.schemes.light.onPrimary.substring(1)}),
    primaryContainer: Color(0xFF${theme.schemes.light.primaryContainer.substring(1)}),
    onPrimaryContainer: Color(0xFF${theme.schemes.light.onPrimaryContainer.substring(1)}),
    secondary: Color(0xFF${theme.schemes.light.secondary.substring(1)}),
    onSecondary: Color(0xFF${theme.schemes.light.onSecondary.substring(1)}),
    secondaryContainer: Color(0xFF${theme.schemes.light.secondaryContainer.substring(1)}),
    onSecondaryContainer: Color(0xFF${theme.schemes.light.onSecondaryContainer.substring(1)}),
    error: Color(0xFF${theme.schemes.light.error.substring(1)}),
    onError: Color(0xFF${theme.schemes.light.onError.substring(1)}),
    errorContainer: Color(0xFF${theme.schemes.light.errorContainer.substring(1)}),
    onErrorContainer: Color(0xFF${theme.schemes.light.onErrorContainer.substring(1)}),
    surface: Color(0xFF${theme.schemes.light.surface.substring(1)}),
    onSurface: Color(0xFF${theme.schemes.light.onSurface.substring(1)}),
    background: Color(0xFF${theme.schemes.light.background.substring(1)}),
    onBackground: Color(0xFF${theme.schemes.light.onBackground.substring(1)}),
  );

  // Dark Color Scheme
  static const ColorScheme darkColorScheme = ColorScheme.dark(
    primary: Color(0xFF${theme.schemes.dark.primary.substring(1)}),
    onPrimary: Color(0xFF${theme.schemes.dark.onPrimary.substring(1)}),
    primaryContainer: Color(0xFF${theme.schemes.dark.primaryContainer.substring(1)}),
    onPrimaryContainer: Color(0xFF${theme.schemes.dark.onPrimaryContainer.substring(1)}),
    secondary: Color(0xFF${theme.schemes.dark.secondary.substring(1)}),
    onSecondary: Color(0xFF${theme.schemes.dark.onSecondary.substring(1)}),
    secondaryContainer: Color(0xFF${theme.schemes.dark.secondaryContainer.substring(1)}),
    onSecondaryContainer: Color(0xFF${theme.schemes.dark.onSecondaryContainer.substring(1)}),
    error: Color(0xFF${theme.schemes.dark.error.substring(1)}),
    onError: Color(0xFF${theme.schemes.dark.onError.substring(1)}),
    errorContainer: Color(0xFF${theme.schemes.dark.errorContainer.substring(1)}),
    onErrorContainer: Color(0xFF${theme.schemes.dark.onErrorContainer.substring(1)}),
    surface: Color(0xFF${theme.schemes.dark.surface.substring(1)}),
    onSurface: Color(0xFF${theme.schemes.dark.onSurface.substring(1)}),
    background: Color(0xFF${theme.schemes.dark.background.substring(1)}),
    onBackground: Color(0xFF${theme.schemes.dark.onBackground.substring(1)}),
  );

  // Custom Colors Extension for Warning, Success, Information
  static const CustomColors lightCustomColors = CustomColors(
    warningText: Color(0xFF${getExtendedHexFromExport("$1")?.substring(1)}),
    warningBackground: Color(0xFF${getExtendedHexFromExport("$1")?.substring(1)}),
    warningBorder: Color(0xFF${getExtendedHexFromExport("$1")?.substring(1)}),
    successText: Color(0xFF${getExtendedHexFromExport("$1")?.substring(1)}),
    successBackground: Color(0xFF${getExtendedHexFromExport("$1")?.substring(1)}),
    successBorder: Color(0xFF${getExtendedHexFromExport("$1")?.substring(1)}),
    informationText: Color(0xFF${getExtendedHexFromExport("$1")?.substring(1)}),
    informationBackground: Color(0xFF${getExtendedHexFromExport("$1")?.substring(1)}),
    informationBorder: Color(0xFF${getExtendedHexFromExport("$1")?.substring(1)}),
  );

  static const CustomColors darkCustomColors = CustomColors(
    warningText: Color(0xFF${getExtendedHexFromExport("$1")?.substring(1)}),
    warningBackground: Color(0xFF${getExtendedHexFromExport("$1")?.substring(1)}),
    warningBorder: Color(0xFF${getExtendedHexFromExport("$1")?.substring(1)}),
    successText: Color(0xFF${getExtendedHexFromExport("$1")?.substring(1)}),
    successBackground: Color(0xFF${getExtendedHexFromExport("$1")?.substring(1)}),
    successBorder: Color(0xFF${getExtendedHexFromExport("$1")?.substring(1)}),
    informationText: Color(0xFF${getExtendedHexFromExport("$1")?.substring(1)}),
    informationBackground: Color(0xFF${getExtendedHexFromExport("$1")?.substring(1)}),
    informationBorder: Color(0xFF${getExtendedHexFromExport("$1")?.substring(1)}),
  );

  static ThemeData get lightTheme => ThemeData(
    useMaterial3: true,
    colorScheme: lightColorScheme,
    extensions: [lightCustomColors],
  );

  static ThemeData get darkTheme => ThemeData(
    useMaterial3: true,
    colorScheme: darkColorScheme,
    extensions: [darkCustomColors],
  );
}

// Custom Colors Theme Extension
class CustomColors extends ThemeExtension<CustomColors> {
  const CustomColors({
    required this.warningText,
    required this.warningBackground,
    required this.warningBorder,
    required this.successText,
    required this.successBackground,
    required this.successBorder,
    required this.informationText,
    required this.informationBackground,
    required this.informationBorder,
  });

  final Color warningText;
  final Color warningBackground;
  final Color warningBorder;
  final Color successText;
  final Color successBackground;
  final Color successBorder;
  final Color informationText;
  final Color informationBackground;
  final Color informationBorder;

  @override
  CustomColors copyWith({
    Color? warningText,
    Color? warningBackground,
    Color? warningBorder,
    Color? successText,
    Color? successBackground,
    Color? successBorder,
    Color? informationText,
    Color? informationBackground,
    Color? informationBorder,
  }) {
    return CustomColors(
      warningText: warningText ?? this.warningText,
      warningBackground: warningBackground ?? this.warningBackground,
      warningBorder: warningBorder ?? this.warningBorder,
      successText: successText ?? this.successText,
      successBackground: successBackground ?? this.successBackground,
      successBorder: successBorder ?? this.successBorder,
      informationText: informationText ?? this.informationText,
      informationBackground: informationBackground ?? this.informationBackground,
      informationBorder: informationBorder ?? this.informationBorder,
    );
  }

  @override
  CustomColors lerp(ThemeExtension<CustomColors>? other, double t) {
    if (other is! CustomColors) return this;
    return CustomColors(
      warningText: Color.lerp(warningText, other.warningText, t)!,
      warningBackground: Color.lerp(warningBackground, other.warningBackground, t)!,
      warningBorder: Color.lerp(warningBorder, other.warningBorder, t)!,
      successText: Color.lerp(successText, other.successText, t)!,
      successBackground: Color.lerp(successBackground, other.successBackground, t)!,
      successBorder: Color.lerp(successBorder, other.successBorder, t)!,
      informationText: Color.lerp(informationText, other.informationText, t)!,
      informationBackground: Color.lerp(informationBackground, other.informationBackground, t)!,
      informationBorder: Color.lerp(informationBorder, other.informationBorder, t)!,
    );
  }
}`;
  };

  const currentCode = codeFormat === "json" ? generateJSONCode() : generateDartCode();

  const handleCopyCode = async () => {
    try {
      await copyToClipboard(currentCode);
      toast({
        title: "Success",
        description: "Code copied to clipboard!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy code to clipboard",
        variant: "destructive",
      });
    }
  };

  const getLanguageForHighlighting = () => {
    return codeFormat === "json" ? "json" : "dart";
  };

  return (
    <div className="w-96 bg-card border-l border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-foreground">Code Export</h3>
          <Badge variant="secondary" className="text-xs">
            Live Preview
          </Badge>
        </div>
        
        {/* Format Toggle */}
        <div className="flex bg-muted rounded-lg p-1">
          <Button
            variant={codeFormat === "json" ? "default" : "ghost"}
            size="sm"
            className="flex-1"
            onClick={() => setCodeFormat("json")}
          >
            <FileText className="w-4 h-4 mr-2" />
            JSON
          </Button>
          <Button
            variant={codeFormat === "dart" ? "default" : "ghost"}
            size="sm"
            className="flex-1"
            onClick={() => setCodeFormat("dart")}
          >
            <Code2 className="w-4 h-4 mr-2" />
            Dart
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 mt-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyCode}
            className="flex-1"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </Button>
          <Button
            size="sm"
            onClick={() => {
              if (codeFormat === "json") {
                const blob = new Blob([currentCode], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `${getThemeNameFromExport(theme) || "theme"}.json`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              } else {
                const blob = new Blob([currentCode], { type: "text/plain" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `${getThemeNameFromExport(theme) || "theme"}.dart`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }
              toast({
                title: "Success",
                description: `${codeFormat.toUpperCase()} file downloaded successfully!`,
              });
            }}
            className="flex-1"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      {/* Code Display */}
      <div className="flex-1 overflow-hidden">
        <pre className="h-full overflow-auto p-4 text-sm bg-muted/30 font-mono leading-relaxed">
          <code className={`language-${getLanguageForHighlighting()}`}>
            {currentCode}
          </code>
        </pre>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="text-xs text-muted-foreground space-y-1">
          <div className="flex justify-between">
            <span>Lines:</span>
            <span>{currentCode.split('\n').length}</span>
          </div>
          <div className="flex justify-between">
            <span>Characters:</span>
            <span>{currentCode.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Size:</span>
            <span>{(new Blob([currentCode]).size / 1024).toFixed(1)}KB</span>
          </div>
        </div>
      </div>
    </div>
  );
}
