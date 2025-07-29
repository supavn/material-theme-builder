import { useTheme } from "./theme-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { 
  Home, 
  Search, 
  Heart, 
  User, 
  Menu, 
  MoreVertical, 
  ChevronRight,
  Users,
  Bell,
  CheckCircle2,
  AlertTriangle,
  Smartphone,
  Monitor
} from "lucide-react";

interface PreviewButtonProps {
  children: React.ReactNode;
  variant?: "filled" | "outlined" | "text";
  color?: "primary" | "secondary" | "warning" | "success" | "error";
  style?: React.CSSProperties;
}

function PreviewButton({ children, variant = "filled", color = "primary", style }: PreviewButtonProps) {
  const { lightTheme, darkTheme, previewTheme } = useTheme();
  const theme = previewTheme === "light" ? lightTheme : darkTheme;
  
  let buttonStyle: React.CSSProperties = { ...style };
  
  if (variant === "filled") {
    buttonStyle = {
      ...buttonStyle,
      backgroundColor: theme[color],
      color: theme[`on${color.charAt(0).toUpperCase() + color.slice(1)}` as keyof typeof theme] || theme.onPrimary,
    };
  } else if (variant === "outlined") {
    buttonStyle = {
      ...buttonStyle,
      backgroundColor: "transparent",
      color: theme[color],
      border: `1px solid ${theme[color]}`,
    };
  }
  
  return (
    <button 
      className="px-3 py-1 text-xs font-medium rounded-lg transition-colors"
      style={buttonStyle}
    >
      {children}
    </button>
  );
}

export function MobilePreview() {
  const { lightTheme, darkTheme, previewTheme, switchPreviewTheme } = useTheme();
  const [deviceType, setDeviceType] = useState<"android" | "ios">("android");
  
  const theme = previewTheme === "light" ? lightTheme : darkTheme;
  
  return (
    <div className="flex-1 bg-muted overflow-y-auto">
      <div className="p-6">
        {/* Preview Controls */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex space-x-2">
            <Button
              variant={deviceType === "android" ? "default" : "outline"}
              size="sm"
              onClick={() => setDeviceType("android")}
            >
              <Smartphone className="w-4 h-4 mr-2" />
              Android
            </Button>
            <Button
              variant={deviceType === "ios" ? "default" : "outline"}
              size="sm"
              onClick={() => setDeviceType("ios")}
            >
              <Monitor className="w-4 h-4 mr-2" />
              iOS
            </Button>
          </div>
          
          <div className="flex items-center space-x-3">
            <span className="text-sm text-muted-foreground">Preview Theme:</span>
            <div className="flex bg-muted rounded-lg p-1">
              <Button
                variant={previewTheme === "light" ? "default" : "ghost"}
                size="sm"
                onClick={() => switchPreviewTheme("light")}
              >
                Light
              </Button>
              <Button
                variant={previewTheme === "dark" ? "default" : "ghost"}
                size="sm"
                onClick={() => switchPreviewTheme("dark")}
              >
                Dark
              </Button>
            </div>
          </div>
        </div>

        {/* Device Frame */}
        <div className="flex justify-center">
          <div className="relative">
            {/* Android Device Frame */}
            <div className="w-80 h-[640px] bg-gray-900 rounded-[2rem] p-4 shadow-2xl">
              <div 
                className="w-full h-full rounded-[1.5rem] overflow-hidden relative"
                style={{ backgroundColor: theme.background }}
              >
                
                {/* Status Bar */}
                <div 
                  className="h-6 flex items-center justify-between px-6 text-xs font-medium"
                  style={{ 
                    backgroundColor: theme.surface,
                    color: theme.onSurface 
                  }}
                >
                  <span>9:41</span>
                  <div className="flex items-center space-x-1">
                    <span>📶</span>
                    <span>📶</span>
                    <span>🔋</span>
                  </div>
                </div>

                {/* App Content */}
                <div 
                  className="h-full"
                  style={{ backgroundColor: theme.background }}
                >
                  
                  {/* AppBar */}
                  <div 
                    className="h-14 flex items-center justify-between px-4 shadow-sm"
                    style={{ 
                      backgroundColor: theme.primary,
                      color: theme.onPrimary 
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <Menu className="w-5 h-5" />
                      <span className="font-medium">Theme Preview</span>
                    </div>
                    <div className="flex space-x-2">
                      <Search className="w-5 h-5" />
                      <MoreVertical className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-4 space-y-4 overflow-y-auto h-full pb-20">
                    
                    {/* Cards Section */}
                    <div className="space-y-3">
                      <h3 
                        className="text-sm font-semibold"
                        style={{ color: theme.onBackground }}
                      >
                        Cards & Elevation
                      </h3>
                      
                      {/* Primary Container Card */}
                      <Card 
                        className="p-4 shadow-sm border"
                        style={{ 
                          backgroundColor: theme.primaryContainer,
                          borderColor: theme.outline 
                        }}
                      >
                        <CardContent className="p-0">
                          <h4 
                            className="font-medium mb-2"
                            style={{ color: theme.onPrimaryContainer }}
                          >
                            Primary Container Card
                          </h4>
                          <p 
                            className="text-sm mb-3"
                            style={{ color: theme.onPrimaryContainer }}
                          >
                            This card uses primary container color from your theme.
                          </p>
                          <div className="flex space-x-2">
                            <PreviewButton variant="filled" color="primary">
                              Action
                            </PreviewButton>
                            <PreviewButton variant="outlined" color="primary">
                              Secondary
                            </PreviewButton>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Warning Card */}
                      <Card 
                        className="p-4 shadow-sm border"
                        style={{ 
                          backgroundColor: theme.warningContainer,
                          borderColor: theme.warning 
                        }}
                      >
                        <CardContent className="p-0">
                          <div className="flex items-start space-x-3">
                            <AlertTriangle 
                              className="w-5 h-5 mt-0.5"
                              style={{ color: theme.warning }}
                            />
                            <div className="flex-1">
                              <h4 
                                className="font-medium"
                                style={{ color: theme.onWarningContainer }}
                              >
                                Warning Alert
                              </h4>
                              <p 
                                className="text-sm mt-1"
                                style={{ color: theme.onWarningContainer }}
                              >
                                This uses custom warning token from your theme.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Success Card */}
                      <Card 
                        className="p-4 shadow-sm border"
                        style={{ 
                          backgroundColor: theme.successContainer,
                          borderColor: theme.success 
                        }}
                      >
                        <CardContent className="p-0">
                          <div className="flex items-start space-x-3">
                            <CheckCircle2 
                              className="w-5 h-5 mt-0.5"
                              style={{ color: theme.success }}
                            />
                            <div className="flex-1">
                              <h4 
                                className="font-medium"
                                style={{ color: theme.onSuccessContainer }}
                              >
                                Success Message
                              </h4>
                              <p 
                                className="text-sm mt-1"
                                style={{ color: theme.onSuccessContainer }}
                              >
                                Theme exported successfully!
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Form Elements */}
                    <div className="space-y-3">
                      <h3 
                        className="text-sm font-semibold"
                        style={{ color: theme.onBackground }}
                      >
                        Form Components
                      </h3>
                      
                      <div className="space-y-3">
                        <input 
                          type="text" 
                          placeholder="Text input field" 
                          className="w-full px-3 py-2 border rounded-lg outline-none"
                          style={{ 
                            borderColor: theme.outline,
                            backgroundColor: theme.surface,
                            color: theme.onSurface 
                          }}
                        />
                        
                        <div className="flex items-center space-x-3">
                          <input 
                            type="checkbox" 
                            className="w-4 h-4 rounded border-2"
                            style={{ 
                              accentColor: theme.primary,
                              borderColor: theme.outline 
                            }}
                          />
                          <label 
                            className="text-sm"
                            style={{ color: theme.onSurface }}
                          >
                            Checkbox option
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span 
                            className="text-sm"
                            style={{ color: theme.onSurface }}
                          >
                            Enable notifications
                          </span>
                          <div 
                            className="w-12 h-6 rounded-full relative cursor-pointer transition-colors"
                            style={{ backgroundColor: theme.primary }}
                          >
                            <div 
                              className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full shadow-sm"
                              style={{ backgroundColor: theme.onPrimary }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* List Items */}
                    <div className="space-y-3">
                      <h3 
                        className="text-sm font-semibold"
                        style={{ color: theme.onBackground }}
                      >
                        List Components
                      </h3>
                      
                      <div className="space-y-1">
                        <div 
                          className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors hover:opacity-80"
                          style={{ backgroundColor: theme.surfaceContainer }}
                        >
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: theme.primaryContainer }}
                          >
                            <Users 
                              className="w-4 h-4"
                              style={{ color: theme.primary }}
                            />
                          </div>
                          <div className="flex-1">
                            <div 
                              className="text-sm font-medium"
                              style={{ color: theme.onSurface }}
                            >
                              Profile Settings
                            </div>
                            <div 
                              className="text-xs"
                              style={{ color: theme.onSurfaceVariant }}
                            >
                              Manage your account
                            </div>
                          </div>
                          <ChevronRight 
                            className="w-4 h-4"
                            style={{ color: theme.onSurfaceVariant }}
                          />
                        </div>

                        <div 
                          className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors hover:opacity-80"
                          style={{ backgroundColor: theme.surfaceContainer }}
                        >
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: theme.warningContainer }}
                          >
                            <Bell 
                              className="w-4 h-4"
                              style={{ color: theme.warning }}
                            />
                          </div>
                          <div className="flex-1">
                            <div 
                              className="text-sm font-medium"
                              style={{ color: theme.onSurface }}
                            >
                              Notifications
                            </div>
                            <div 
                              className="text-xs"
                              style={{ color: theme.onSurfaceVariant }}
                            >
                              3 unread messages
                            </div>
                          </div>
                          <Badge 
                            className="text-xs"
                            style={{ 
                              backgroundColor: theme.error,
                              color: theme.onError 
                            }}
                          >
                            3
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Navigation */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-16 flex items-center justify-around border-t"
                    style={{ 
                      backgroundColor: theme.surface,
                      borderTopColor: theme.outline 
                    }}
                  >
                    <div className="flex flex-col items-center space-y-1">
                      <Home 
                        className="w-5 h-5"
                        style={{ color: theme.primary }}
                      />
                      <span 
                        className="text-xs font-medium"
                        style={{ color: theme.primary }}
                      >
                        Home
                      </span>
                    </div>
                    
                    <div className="flex flex-col items-center space-y-1">
                      <Search 
                        className="w-5 h-5"
                        style={{ color: theme.onSurfaceVariant }}
                      />
                      <span 
                        className="text-xs"
                        style={{ color: theme.onSurfaceVariant }}
                      >
                        Search
                      </span>
                    </div>
                    
                    <div className="flex flex-col items-center space-y-1">
                      <Heart 
                        className="w-5 h-5"
                        style={{ color: theme.onSurfaceVariant }}
                      />
                      <span 
                        className="text-xs"
                        style={{ color: theme.onSurfaceVariant }}
                      >
                        Favorites
                      </span>
                    </div>
                    
                    <div className="flex flex-col items-center space-y-1">
                      <User 
                        className="w-5 h-5"
                        style={{ color: theme.onSurfaceVariant }}
                      />
                      <span 
                        className="text-xs"
                        style={{ color: theme.onSurfaceVariant }}
                      >
                        Profile
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}