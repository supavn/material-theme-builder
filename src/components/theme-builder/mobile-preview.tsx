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
  Monitor,
  Sun,
  Moon,
  X,
  Filter,
  Calendar,
  Info,
  ShoppingCart,
  Settings,
  Mail,
  Star,
  Clock,
  MapPin,
  Phone,
  ChevronDown
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
  const { lightTheme, darkTheme, previewTheme, appDarkMode } = useTheme();
  const [deviceType, setDeviceType] = useState<"android" | "ios">("android");
  
  const theme = previewTheme === "light" ? lightTheme : darkTheme;
  
  return (
    <div className="h-full bg-muted overflow-y-auto">
      <div className="p-4">
        {/* Preview Controls */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">Mobile Preview</h2>
          
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">Theme:</span>
            <div className="flex items-center space-x-1 px-2 py-1 bg-muted rounded-lg">
              {appDarkMode ? (
                <>
                  <Moon className="w-3 h-3" />
                  <span className="text-xs font-medium">Dark</span>
                </>
              ) : (
                <>
                  <Sun className="w-3 h-3" />
                  <span className="text-xs font-medium">Light</span>
                </>
              )}
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

                  {/* Search Bar */}
                  <div className="p-4 pb-0">
                    <div 
                      className="flex items-center space-x-3 px-4 py-2 rounded-lg border"
                      style={{ 
                        backgroundColor: theme.surfaceContainer,
                        borderColor: theme.outline 
                      }}
                    >
                      <Search 
                        className="w-4 h-4"
                        style={{ color: theme.onSurfaceVariant }}
                      />
                      <input 
                        type="text" 
                        placeholder="Search themes, colors..." 
                        className="flex-1 bg-transparent outline-none text-sm"
                        style={{ color: theme.onSurface }}
                      />
                      <Filter 
                        className="w-4 h-4 cursor-pointer"
                        style={{ color: theme.onSurfaceVariant }}
                      />
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-4 space-y-4 overflow-y-auto h-full">
                    
                    {/* Badges Section */}
                    <div className="space-y-3">
                      <h3 
                        className="text-sm font-semibold"
                        style={{ color: theme.onBackground }}
                      >
                        Status Badges
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge 
                          className="text-xs px-2 py-1"
                          style={{ 
                            backgroundColor: theme.primary,
                            color: theme.onPrimary 
                          }}
                        >
                          Primary
                        </Badge>
                        <Badge 
                          className="text-xs px-2 py-1"
                          style={{ 
                            backgroundColor: theme.success,
                            color: theme.onSuccess 
                          }}
                        >
                          Success
                        </Badge>
                        <Badge 
                          className="text-xs px-2 py-1"
                          style={{ 
                            backgroundColor: theme.error,
                            color: theme.onError 
                          }}
                        >
                          Error
                        </Badge>
                        <Badge 
                          className="text-xs px-2 py-1"
                          style={{ 
                            backgroundColor: theme.warning,
                            color: theme.onWarning 
                          }}
                        >
                          Warning
                        </Badge>
                        <Badge 
                          className="text-xs px-2 py-1"
                          style={{ 
                            backgroundColor: theme.information,
                            color: theme.onInformation 
                          }}
                        >
                          Info
                        </Badge>
                        <Badge 
                          className="text-xs px-2 py-1"
                          style={{ 
                            backgroundColor: theme.defaultColor,
                            color: theme.onDefault 
                          }}
                        >
                          Default
                        </Badge>
                      </div>
                    </div>

                    {/* Tag Colors Section */}
                    <div className="space-y-3">
                      <h3 
                        className="text-sm font-semibold"
                        style={{ color: theme.onBackground }}
                      >
                        Tag Colors
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <div 
                          className="text-xs px-2 py-1 rounded border"
                          style={{ 
                            backgroundColor: theme.blueTagBackground,
                            color: theme.blueTagText,
                            borderColor: theme.blueTagBorder 
                          }}
                        >
                          Blue
                        </div>
                        <div 
                          className="text-xs px-2 py-1 rounded border"
                          style={{ 
                            backgroundColor: theme.cyanTagBackground,
                            color: theme.cyanTagText,
                            borderColor: theme.cyanTagBorder 
                          }}
                        >
                          Cyan
                        </div>
                        <div 
                          className="text-xs px-2 py-1 rounded border"
                          style={{ 
                            backgroundColor: theme.geekblueTagBackground,
                            color: theme.geekblueTagText,
                            borderColor: theme.geekblueTagBorder 
                          }}
                        >
                          Geekblue
                        </div>
                        <div 
                          className="text-xs px-2 py-1 rounded border"
                          style={{ 
                            backgroundColor: theme.goldTagBackground,
                            color: theme.goldTagText,
                            borderColor: theme.goldTagBorder 
                          }}
                        >
                          Gold
                        </div>
                        <div 
                          className="text-xs px-2 py-1 rounded border"
                          style={{ 
                            backgroundColor: theme.greenTagBackground,
                            color: theme.greenTagText,
                            borderColor: theme.greenTagBorder 
                          }}
                        >
                          Green
                        </div>
                        <div 
                          className="text-xs px-2 py-1 rounded border"
                          style={{ 
                            backgroundColor: theme.limeTagBackground,
                            color: theme.limeTagText,
                            borderColor: theme.limeTagBorder 
                          }}
                        >
                          Lime
                        </div>
                        <div 
                          className="text-xs px-2 py-1 rounded border"
                          style={{ 
                            backgroundColor: theme.magentaTagBackground,
                            color: theme.magentaTagText,
                            borderColor: theme.magentaTagBorder 
                          }}
                        >
                          Magenta
                        </div>
                        <div 
                          className="text-xs px-2 py-1 rounded border"
                          style={{ 
                            backgroundColor: theme.orangeTagBackground,
                            color: theme.orangeTagText,
                            borderColor: theme.orangeTagBorder 
                          }}
                        >
                          Orange
                        </div>
                        <div 
                          className="text-xs px-2 py-1 rounded border"
                          style={{ 
                            backgroundColor: theme.purpleTagBackground,
                            color: theme.purpleTagText,
                            borderColor: theme.purpleTagBorder 
                          }}
                        >
                          Purple
                        </div>
                        <div 
                          className="text-xs px-2 py-1 rounded border"
                          style={{ 
                            backgroundColor: theme.redTagBackground,
                            color: theme.redTagText,
                            borderColor: theme.redTagBorder 
                          }}
                        >
                          Red
                        </div>
                        <div 
                          className="text-xs px-2 py-1 rounded border"
                          style={{ 
                            backgroundColor: theme.volcanoTagBackground,
                            color: theme.volcanoTagText,
                            borderColor: theme.volcanoTagBorder 
                          }}
                        >
                          Volcano
                        </div>
                      </div>
                    </div>

                    {/* Chips Section */}
                    <div className="space-y-3">
                      <h3 
                        className="text-sm font-semibold"
                        style={{ color: theme.onBackground }}
                      >
                        Filter Chips
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <div 
                          className="flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium cursor-pointer"
                          style={{ 
                            backgroundColor: theme.primary,
                            color: theme.onPrimary 
                          }}
                        >
                          <span>Popular</span>
                        </div>
                        <div 
                          className="flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium cursor-pointer border"
                          style={{ 
                            backgroundColor: theme.surface,
                            color: theme.onSurface,
                            borderColor: theme.outline 
                          }}
                        >
                          <span>Recent</span>
                        </div>
                        <div 
                          className="flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium cursor-pointer border"
                          style={{ 
                            backgroundColor: theme.surface,
                            color: theme.onSurface,
                            borderColor: theme.outline 
                          }}
                        >
                          <span>Material</span>
                          <X className="w-3 h-3" />
                        </div>
                        <div 
                          className="flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium cursor-pointer border"
                          style={{ 
                            backgroundColor: theme.surface,
                            color: theme.onSurface,
                            borderColor: theme.outline 
                          }}
                        >
                          <span>Dark Mode</span>
                          <X className="w-3 h-3" />
                        </div>
                      </div>
                    </div>

                    {/* Cards Section */}
                    <div className="space-y-3">
                      <h3 
                        className="text-sm font-semibold"
                        style={{ color: theme.onBackground }}
                      >
                        Content Cards
                      </h3>
                      
                      {/* Product Card */}
                      <Card 
                        className="overflow-hidden shadow-sm border"
                        style={{ 
                          backgroundColor: theme.surface,
                          borderColor: theme.outline 
                        }}
                      >
                        <div 
                          className="h-24 flex items-center justify-center"
                          style={{ backgroundColor: theme.primaryContainer }}
                        >
                          <ShoppingCart 
                            className="w-8 h-8"
                            style={{ color: theme.primary }}
                          />
                        </div>
                        <CardContent className="p-3">
                          <h4 
                            className="font-medium mb-1"
                            style={{ color: theme.onSurface }}
                          >
                            Product Title
                          </h4>
                          <p 
                            className="text-xs mb-2"
                            style={{ color: theme.onSurfaceVariant }}
                          >
                            Short description of the product or service offering.
                          </p>
                          <div className="flex items-center justify-between">
                            <span 
                              className="text-sm font-bold"
                              style={{ color: theme.primary }}
                            >
                              $29.99
                            </span>
                            <div className="flex items-center space-x-1">
                              <Star 
                                className="w-3 h-3 fill-current"
                                style={{ color: theme.warning }}
                              />
                              <span 
                                className="text-xs"
                                style={{ color: theme.onSurfaceVariant }}
                              >
                                4.5
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Notification Card */}
                      <Card 
                        className="p-3 shadow-sm border"
                        style={{ 
                          backgroundColor: theme.informationContainer,
                          borderColor: theme.information 
                        }}
                      >
                        <CardContent className="p-0">
                          <div className="flex items-start space-x-3">
                            <Info 
                              className="w-4 h-4 mt-0.5"
                              style={{ color: theme.information }}
                            />
                            <div className="flex-1">
                              <h4 
                                className="text-sm font-medium"
                                style={{ color: theme.onInformationContainer }}
                              >
                                Information Notice
                              </h4>
                              <p 
                                className="text-xs mt-1"
                                style={{ color: theme.onInformationContainer }}
                              >
                                Your theme has been saved and is ready for export.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Form Section */}
                    <div className="space-y-3">
                      <h3 
                        className="text-sm font-semibold"
                        style={{ color: theme.onBackground }}
                      >
                        Form Elements
                      </h3>
                      
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label 
                            className="text-xs font-medium"
                            style={{ color: theme.onSurface }}
                          >
                            Email Address
                          </label>
                          <input 
                            type="email" 
                            placeholder="Enter your email" 
                            className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2"
                            style={{ 
                              borderColor: theme.outline,
                              backgroundColor: theme.surface,
                              color: theme.onSurface 
                            }}
                          />
                        </div>

                        <div className="space-y-1">
                          <label 
                            className="text-xs font-medium"
                            style={{ color: theme.onSurface }}
                          >
                            Date of Birth
                          </label>
                          <div 
                            className="flex items-center space-x-2 px-3 py-2 border rounded-lg cursor-pointer"
                            style={{ 
                              borderColor: theme.outline,
                              backgroundColor: theme.surface 
                            }}
                          >
                            <Calendar 
                              className="w-4 h-4"
                              style={{ color: theme.onSurfaceVariant }}
                            />
                            <span 
                              className="text-sm flex-1"
                              style={{ color: theme.onSurface }}
                            >
                              Select date
                            </span>
                            <ChevronDown 
                              className="w-4 h-4"
                              style={{ color: theme.onSurfaceVariant }}
                            />
                          </div>
                        </div>
                        
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
                            I agree to the terms and conditions
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span 
                            className="text-sm"
                            style={{ color: theme.onSurface }}
                          >
                            Enable push notifications
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

                    {/* List Tiles Section */}
                    <div className="space-y-3">
                      <h3 
                        className="text-sm font-semibold"
                        style={{ color: theme.onBackground }}
                      >
                        List Tiles
                      </h3>
                      
                      <div className="space-y-1">
                        <div 
                          className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors hover:opacity-80"
                          style={{ backgroundColor: theme.surfaceContainer }}
                        >
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: theme.primaryContainer }}
                          >
                            <Users 
                              className="w-5 h-5"
                              style={{ color: theme.primary }}
                            />
                          </div>
                          <div className="flex-1">
                            <div 
                              className="text-sm font-medium"
                              style={{ color: theme.onSurface }}
                            >
                              Account Settings
                            </div>
                            <div 
                              className="text-xs"
                              style={{ color: theme.onSurfaceVariant }}
                            >
                              Manage your profile and preferences
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
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: theme.warningContainer }}
                          >
                            <Bell 
                              className="w-5 h-5"
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
                            className="text-xs px-1.5 py-0.5"
                            style={{ 
                              backgroundColor: theme.error,
                              color: theme.onError 
                            }}
                          >
                            3
                          </Badge>
                        </div>

                        <div 
                          className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors hover:opacity-80"
                          style={{ backgroundColor: theme.surfaceContainer }}
                        >
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: theme.secondaryContainer }}
                          >
                            <Settings 
                              className="w-5 h-5"
                              style={{ color: theme.secondary }}
                            />
                          </div>
                          <div className="flex-1">
                            <div 
                              className="text-sm font-medium"
                              style={{ color: theme.onSurface }}
                            >
                              App Settings
                            </div>
                            <div 
                              className="text-xs"
                              style={{ color: theme.onSurfaceVariant }}
                            >
                              Theme, language, and more
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
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: theme.tertiaryContainer }}
                          >
                            <Mail 
                              className="w-5 h-5"
                              style={{ color: theme.tertiary }}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <div 
                                  className="text-sm font-medium"
                                  style={{ color: theme.onSurface }}
                                >
                                  Messages
                                </div>
                                <div 
                                  className="text-xs"
                                  style={{ color: theme.onSurfaceVariant }}
                                >
                                  Latest: Welcome to the app!
                                </div>
                              </div>
                              <div className="text-right">
                                <div 
                                  className="text-xs"
                                  style={{ color: theme.onSurfaceVariant }}
                                >
                                  2m ago
                                </div>
                                <Clock 
                                  className="w-3 h-3 ml-auto mt-0.5"
                                  style={{ color: theme.onSurfaceVariant }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div 
                          className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors hover:opacity-80"
                          style={{ backgroundColor: theme.surfaceContainer }}
                        >
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: theme.successContainer }}
                          >
                            <MapPin 
                              className="w-5 h-5"
                              style={{ color: theme.success }}
                            />
                          </div>
                          <div className="flex-1">
                            <div 
                              className="text-sm font-medium"
                              style={{ color: theme.onSurface }}
                            >
                              Location Services
                            </div>
                            <div 
                              className="text-xs"
                              style={{ color: theme.onSurfaceVariant }}
                            >
                              San Francisco, CA
                            </div>
                          </div>
                          <div 
                            className="w-12 h-6 rounded-full relative cursor-pointer transition-colors"
                            style={{ backgroundColor: theme.success }}
                          >
                            <div 
                              className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full shadow-sm"
                              style={{ backgroundColor: theme.onSuccess }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pb-24"></div>
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