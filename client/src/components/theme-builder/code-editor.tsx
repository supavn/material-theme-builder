import { useTheme } from "./theme-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Download, FileText, Code2 } from "lucide-react";
import { useState } from "react";
import { copyToClipboard } from "./export-utils";
import { useToast } from "@/hooks/use-toast";

export function CodeEditor() {
  const { exportTheme } = useTheme();
  const [codeFormat, setCodeFormat] = useState<"json" | "dart">("json");
  const { toast } = useToast();

  const theme = exportTheme();

  const generateJSONCode = () => {
    return JSON.stringify(theme, null, 2);
  };

  const generateDartCode = () => {
    return `// Generated Material Theme for Flutter
// Theme: ${theme.themeName || 'Custom Theme'}
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

  // Custom Colors Extension for Warning, Success, Information, Critical
  static const CustomColors lightCustomColors = CustomColors(
    warning: Color(0xFF${theme.schemes.light.warning.substring(1)}),
    onWarning: Color(0xFF${theme.schemes.light.onWarning.substring(1)}),
    warningContainer: Color(0xFF${theme.schemes.light.warningContainer.substring(1)}),
    onWarningContainer: Color(0xFF${theme.schemes.light.onWarningContainer.substring(1)}),
    success: Color(0xFF${theme.schemes.light.success.substring(1)}),
    onSuccess: Color(0xFF${theme.schemes.light.onSuccess.substring(1)}),
    successContainer: Color(0xFF${theme.schemes.light.successContainer.substring(1)}),
    onSuccessContainer: Color(0xFF${theme.schemes.light.onSuccessContainer.substring(1)}),
    information: Color(0xFF${theme.schemes.light.information.substring(1)}),
    onInformation: Color(0xFF${theme.schemes.light.onInformation.substring(1)}),
    informationContainer: Color(0xFF${theme.schemes.light.informationContainer.substring(1)}),
    onInformationContainer: Color(0xFF${theme.schemes.light.onInformationContainer.substring(1)}),
    critical: Color(0xFF${theme.schemes.light.critical.substring(1)}),
    onCritical: Color(0xFF${theme.schemes.light.onCritical.substring(1)}),
  );

  static const CustomColors darkCustomColors = CustomColors(
    warning: Color(0xFF${theme.schemes.dark.warning.substring(1)}),
    onWarning: Color(0xFF${theme.schemes.dark.onWarning.substring(1)}),
    warningContainer: Color(0xFF${theme.schemes.dark.warningContainer.substring(1)}),
    onWarningContainer: Color(0xFF${theme.schemes.dark.onWarningContainer.substring(1)}),
    success: Color(0xFF${theme.schemes.dark.success.substring(1)}),
    onSuccess: Color(0xFF${theme.schemes.dark.onSuccess.substring(1)}),
    successContainer: Color(0xFF${theme.schemes.dark.successContainer.substring(1)}),
    onSuccessContainer: Color(0xFF${theme.schemes.dark.onSuccessContainer.substring(1)}),
    information: Color(0xFF${theme.schemes.dark.information.substring(1)}),
    onInformation: Color(0xFF${theme.schemes.dark.onInformation.substring(1)}),
    informationContainer: Color(0xFF${theme.schemes.dark.informationContainer.substring(1)}),
    onInformationContainer: Color(0xFF${theme.schemes.dark.onInformationContainer.substring(1)}),
    critical: Color(0xFF${theme.schemes.dark.critical.substring(1)}),
    onCritical: Color(0xFF${theme.schemes.dark.onCritical.substring(1)}),
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
    required this.warning,
    required this.onWarning,
    required this.warningContainer,
    required this.onWarningContainer,
    required this.success,
    required this.onSuccess,
    required this.successContainer,
    required this.onSuccessContainer,
    required this.information,
    required this.onInformation,
    required this.informationContainer,
    required this.onInformationContainer,
    required this.critical,
    required this.onCritical,
  });

  final Color warning;
  final Color onWarning;
  final Color warningContainer;
  final Color onWarningContainer;
  final Color success;
  final Color onSuccess;
  final Color successContainer;
  final Color onSuccessContainer;
  final Color information;
  final Color onInformation;
  final Color informationContainer;
  final Color onInformationContainer;
  final Color critical;
  final Color onCritical;

  @override
  CustomColors copyWith({
    Color? warning,
    Color? onWarning,
    Color? warningContainer,
    Color? onWarningContainer,
    Color? success,
    Color? onSuccess,
    Color? successContainer,
    Color? onSuccessContainer,
    Color? information,
    Color? onInformation,
    Color? informationContainer,
    Color? onInformationContainer,
    Color? critical,
    Color? onCritical,
  }) {
    return CustomColors(
      warning: warning ?? this.warning,
      onWarning: onWarning ?? this.onWarning,
      warningContainer: warningContainer ?? this.warningContainer,
      onWarningContainer: onWarningContainer ?? this.onWarningContainer,
      success: success ?? this.success,
      onSuccess: onSuccess ?? this.onSuccess,
      successContainer: successContainer ?? this.successContainer,
      onSuccessContainer: onSuccessContainer ?? this.onSuccessContainer,
      information: information ?? this.information,
      onInformation: onInformation ?? this.onInformation,
      informationContainer: informationContainer ?? this.informationContainer,
      onInformationContainer: onInformationContainer ?? this.onInformationContainer,
      critical: critical ?? this.critical,
      onCritical: onCritical ?? this.onCritical,
    );
  }

  @override
  CustomColors lerp(ThemeExtension<CustomColors>? other, double t) {
    if (other is! CustomColors) return this;
    return CustomColors(
      warning: Color.lerp(warning, other.warning, t)!,
      onWarning: Color.lerp(onWarning, other.onWarning, t)!,
      warningContainer: Color.lerp(warningContainer, other.warningContainer, t)!,
      onWarningContainer: Color.lerp(onWarningContainer, other.onWarningContainer, t)!,
      success: Color.lerp(success, other.success, t)!,
      onSuccess: Color.lerp(onSuccess, other.onSuccess, t)!,
      successContainer: Color.lerp(successContainer, other.successContainer, t)!,
      onSuccessContainer: Color.lerp(onSuccessContainer, other.onSuccessContainer, t)!,
      information: Color.lerp(information, other.information, t)!,
      onInformation: Color.lerp(onInformation, other.onInformation, t)!,
      informationContainer: Color.lerp(informationContainer, other.informationContainer, t)!,
      onInformationContainer: Color.lerp(onInformationContainer, other.onInformationContainer, t)!,
      critical: Color.lerp(critical, other.critical, t)!,
      onCritical: Color.lerp(onCritical, other.onCritical, t)!,
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
                a.download = `${theme.themeName || "theme"}.json`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              } else {
                const blob = new Blob([currentCode], { type: "text/plain" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `${theme.themeName || "theme"}.dart`;
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