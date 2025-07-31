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
  const [activeTab, setActiveTab] = useState<"home" | "tasks" | "profile">("home");
  const [tasks, setTasks] = useState([
    { id: 1, title: "Design new dashboard", completed: false, priority: "high", category: "design", dueDate: "Today" },
    { id: 2, title: "Review pull requests", completed: true, priority: "medium", category: "development", dueDate: "Yesterday" },
    { id: 3, title: "Update documentation", completed: false, priority: "low", category: "documentation", dueDate: "Tomorrow" },
    { id: 4, title: "Team meeting preparation", completed: false, priority: "high", category: "meeting", dueDate: "Today" },
    { id: 5, title: "Code refactoring", completed: true, priority: "medium", category: "development", dueDate: "2 days ago" },
    { id: 6, title: "User testing session", completed: false, priority: "high", category: "testing", dueDate: "Next week" },
    { id: 7, title: "Sprint planning", completed: false, priority: "medium", category: "planning", dueDate: "Monday" },
    { id: 8, title: "Code review process", completed: true, priority: "low", category: "review", dueDate: "Last week" },
    { id: 9, title: "Server maintenance", completed: false, priority: "high", category: "maintenance", dueDate: "Tonight" },
    { id: 10, title: "Production deployment", completed: false, priority: "critical", category: "deployment", dueDate: "Friday" },
    { id: 11, title: "Research user needs", completed: true, priority: "medium", category: "research", dueDate: "Last month" },
    { id: 12, title: "Client work tasks", completed: false, priority: "low", category: "work", dueDate: "Next month" },
  ]);
  
  const theme = previewTheme === "light" ? lightTheme : darkTheme;
  
  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return { bg: theme.error, text: theme.onError, border: theme.error };
      case 'high': return { bg: theme.errorContainer, text: theme.error, border: theme.error };
      case 'medium': return { bg: theme.warningContainer, text: theme.warning, border: theme.warning };
      case 'low': return { bg: theme.successContainer, text: theme.success, border: theme.success };
      case 'info': return { bg: theme.informationContainer, text: theme.information, border: theme.information };
      default: return { bg: theme.surfaceContainer, text: theme.onSurface, border: theme.outline };
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      work: { bg: theme.blueTagBackground, text: theme.blueTagText, border: theme.blueTagBorder },
      development: { bg: theme.greenTagBackground, text: theme.greenTagText, border: theme.greenTagBorder },
      documentation: { bg: theme.purpleTagBackground, text: theme.purpleTagText, border: theme.purpleTagBorder },
      meeting: { bg: theme.orangeTagBackground, text: theme.orangeTagText, border: theme.orangeTagBorder },
      research: { bg: theme.cyanTagBackground, text: theme.cyanTagText, border: theme.cyanTagBorder },
      design: { bg: theme.magentaTagBackground, text: theme.magentaTagText, border: theme.magentaTagBorder },
      testing: { bg: theme.redTagBackground, text: theme.redTagText, border: theme.redTagBorder },
      planning: { bg: theme.goldTagBackground, text: theme.goldTagText, border: theme.goldTagBorder },
      review: { bg: theme.geekblueTagBackground, text: theme.geekblueTagText, border: theme.geekblueTagBorder },
      maintenance: { bg: theme.limeTagBackground, text: theme.limeTagText, border: theme.limeTagBorder },
      deployment: { bg: theme.volcanoTagBackground, text: theme.volcanoTagText, border: theme.volcanoTagBorder },
    };
    return colors[category as keyof typeof colors] || { bg: theme.surfaceContainer, text: theme.onSurface, border: theme.outline };
  };

  const renderHomeScreen = () => (
    <div className="h-full overflow-y-auto">
      {/* Header with Search */}
      <div className="p-4 pb-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Menu className="w-5 h-5" style={{ color: theme.onBackground }} />
            <h1 className="text-lg font-bold" style={{ color: theme.onBackground }}>
              My Tasks
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5" style={{ color: theme.onBackground }} />
            <div className="w-8 h-8 rounded-full" style={{ backgroundColor: theme.primary }} />
          </div>
        </div>
        
        {/* Search Bar */}
        <div 
          className="flex items-center space-x-3 px-4 py-2 rounded-lg border mb-4"
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
            placeholder="Search tasks..." 
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: theme.onSurface }}
          />
          <Filter 
            className="w-4 h-4 cursor-pointer"
            style={{ color: theme.onSurfaceVariant }}
          />
        </div>
      </div>

      <div className="px-4 space-y-4">
        {/* Status Overview */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold" style={{ color: theme.onBackground }}>
            Status Badges Overview
          </h3>
          <div className="flex flex-wrap gap-2">
            <Badge 
              className="text-xs px-2 py-1"
              style={{ backgroundColor: theme.primary, color: theme.onPrimary }}
            >
              Primary
            </Badge>
            <Badge 
              className="text-xs px-2 py-1"
              style={{ backgroundColor: theme.secondary, color: theme.onSecondary }}
            >
              Secondary
            </Badge>
            <Badge 
              className="text-xs px-2 py-1"
              style={{ backgroundColor: theme.tertiary, color: theme.onTertiary }}
            >
              Tertiary
            </Badge>
            <Badge 
              className="text-xs px-2 py-1"
              style={{ backgroundColor: theme.success, color: theme.onSuccess }}
            >
              Success
            </Badge>
            <Badge 
              className="text-xs px-2 py-1"
              style={{ backgroundColor: theme.warning, color: theme.onWarning }}
            >
              Warning
            </Badge>
            <Badge 
              className="text-xs px-2 py-1"
              style={{ backgroundColor: theme.error, color: theme.onError }}
            >
              Error
            </Badge>
            <Badge 
              className="text-xs px-2 py-1"
              style={{ backgroundColor: theme.information, color: theme.onInformation }}
            >
              Info
            </Badge>
          </div>
        </div>

        {/* Tag Colors Showcase */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold" style={{ color: theme.onBackground }}>
            Tag Colors
          </h3>
          <div className="flex flex-wrap gap-2">
            <span 
              className="text-xs px-2 py-1 rounded border"
              style={{ 
                backgroundColor: theme.blueTagBackground,
                color: theme.blueTagText,
                borderColor: theme.blueTagBorder 
              }}
            >
              Blue
            </span>
            <span 
              className="text-xs px-2 py-1 rounded border"
              style={{ 
                backgroundColor: theme.cyanTagBackground,
                color: theme.cyanTagText,
                borderColor: theme.cyanTagBorder 
              }}
            >
              Cyan
            </span>
            <span 
              className="text-xs px-2 py-1 rounded border"
              style={{ 
                backgroundColor: theme.greenTagBackground,
                color: theme.greenTagText,
                borderColor: theme.greenTagBorder 
              }}
            >
              Green
            </span>
            <span 
              className="text-xs px-2 py-1 rounded border"
              style={{ 
                backgroundColor: theme.goldTagBackground,
                color: theme.goldTagText,
                borderColor: theme.goldTagBorder 
              }}
            >
              Gold
            </span>
            <span 
              className="text-xs px-2 py-1 rounded border"
              style={{ 
                backgroundColor: theme.orangeTagBackground,
                color: theme.orangeTagText,
                borderColor: theme.orangeTagBorder 
              }}
            >
              Orange
            </span>
            <span 
              className="text-xs px-2 py-1 rounded border"
              style={{ 
                backgroundColor: theme.redTagBackground,
                color: theme.redTagText,
                borderColor: theme.redTagBorder 
              }}
            >
              Red
            </span>
            <span 
              className="text-xs px-2 py-1 rounded border"
              style={{ 
                backgroundColor: theme.purpleTagBackground,
                color: theme.purpleTagText,
                borderColor: theme.purpleTagBorder 
              }}
            >
              Purple
            </span>
            <span 
              className="text-xs px-2 py-1 rounded border"
              style={{ 
                backgroundColor: theme.magentaTagBackground,
                color: theme.magentaTagText,
                borderColor: theme.magentaTagBorder 
              }}
            >
              Magenta
            </span>
            <span 
              className="text-xs px-2 py-1 rounded border"
              style={{ 
                backgroundColor: theme.limeTagBackground,
                color: theme.limeTagText,
                borderColor: theme.limeTagBorder 
              }}
            >
              Lime
            </span>
            <span 
              className="text-xs px-2 py-1 rounded border"
              style={{ 
                backgroundColor: theme.geekblueTagBackground,
                color: theme.geekblueTagText,
                borderColor: theme.geekblueTagBorder 
              }}
            >
              Geekblue
            </span>
            <span 
              className="text-xs px-2 py-1 rounded border"
              style={{ 
                backgroundColor: theme.volcanoTagBackground,
                color: theme.volcanoTagText,
                borderColor: theme.volcanoTagBorder 
              }}
            >
              Volcano
            </span>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-2 gap-3">
          <Card 
            className="p-3 border"
            style={{ backgroundColor: theme.surface, borderColor: theme.outline }}
          >
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5" style={{ color: theme.success }} />
              <div>
                <div className="text-lg font-bold" style={{ color: theme.onSurface }}>2</div>
                <div className="text-xs" style={{ color: theme.onSurfaceVariant }}>Completed</div>
              </div>
            </div>
          </Card>
          
          <Card 
            className="p-3 border"
            style={{ backgroundColor: theme.surface, borderColor: theme.outline }}
          >
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" style={{ color: theme.warning }} />
              <div>
                <div className="text-lg font-bold" style={{ color: theme.onSurface }}>3</div>
                <div className="text-xs" style={{ color: theme.onSurfaceVariant }}>Due Today</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Tasks */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold" style={{ color: theme.onBackground }}>
              Recent Tasks
            </h3>
            <span className="text-xs cursor-pointer" style={{ color: theme.primary }}>
              View All
            </span>
          </div>
          
          <div className="space-y-2">
            {tasks.slice(0, 4).map((task) => {
              const priorityColor = getPriorityColor(task.priority);
              const categoryColor = getCategoryColor(task.category);
              
              return (
                <div 
                  key={task.id}
                  className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer"
                  style={{ backgroundColor: theme.surfaceContainer }}
                  onClick={() => toggleTask(task.id)}
                >
                  <div 
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center ${task.completed ? 'bg-current' : ''}`}
                    style={{ 
                      borderColor: theme.primary,
                      backgroundColor: task.completed ? theme.primary : 'transparent'
                    }}
                  >
                    {task.completed && (
                      <CheckCircle2 className="w-3 h-3" style={{ color: theme.onPrimary }} />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div 
                      className={`text-sm font-medium ${task.completed ? 'line-through opacity-60' : ''}`}
                      style={{ color: theme.onSurface }}
                    >
                      {task.title}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span 
                        className="text-xs px-2 py-0.5 rounded border"
                        style={{ 
                          backgroundColor: categoryColor.bg,
                          color: categoryColor.text,
                          borderColor: categoryColor.border 
                        }}
                      >
                        {task.category}
                      </span>
                      <span 
                        className="text-xs px-2 py-0.5 rounded"
                        style={{ 
                          backgroundColor: priorityColor.bg,
                          color: priorityColor.text 
                        }}
                      >
                        {task.priority}
                      </span>
                    </div>
                  </div>
                  
                  <span className="text-xs" style={{ color: theme.onSurfaceVariant }}>
                    {task.dueDate}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="pb-20"></div>
    </div>
  );

  const renderTasksScreen = () => (
    <div className="h-full overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-bold" style={{ color: theme.onBackground }}>
            All Tasks
          </h1>
          <Button 
            className="text-xs px-3 py-1"
            style={{ backgroundColor: theme.primary, color: theme.onPrimary }}
          >
            + Add Task
          </Button>
        </div>

        {/* Filter Chips */}
        <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
          <div 
            className="flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium cursor-pointer whitespace-nowrap"
            style={{ backgroundColor: theme.primary, color: theme.onPrimary }}
          >
            <span>All ({tasks.length})</span>
          </div>
          <div 
            className="flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium cursor-pointer border whitespace-nowrap"
            style={{ 
              backgroundColor: theme.surface,
              color: theme.onSurface,
              borderColor: theme.outline 
            }}
          >
            <span>Pending ({tasks.filter(t => !t.completed).length})</span>
          </div>
          <div 
            className="flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium cursor-pointer border whitespace-nowrap"
            style={{ 
              backgroundColor: theme.successContainer,
              color: theme.success,
              borderColor: theme.success 
            }}
          >
            <span>Done ({tasks.filter(t => t.completed).length})</span>
          </div>
          <div 
            className="flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium cursor-pointer border whitespace-nowrap"
            style={{ 
              backgroundColor: theme.errorContainer,
              color: theme.error,
              borderColor: theme.error 
            }}
          >
            <span>Critical ({tasks.filter(t => t.priority === 'critical').length})</span>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-3">
          {tasks.map((task) => {
            const priorityColor = getPriorityColor(task.priority);
            const categoryColor = getCategoryColor(task.category);
            
            return (
              <Card 
                key={task.id}
                className="p-4 border"
                style={{ backgroundColor: theme.surface, borderColor: theme.outline }}
              >
                <div className="flex items-start space-x-3">
                  <div 
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 cursor-pointer ${task.completed ? 'bg-current' : ''}`}
                    style={{ 
                      borderColor: theme.primary,
                      backgroundColor: task.completed ? theme.primary : 'transparent'
                    }}
                    onClick={() => toggleTask(task.id)}
                  >
                    {task.completed && (
                      <CheckCircle2 className="w-3 h-3" style={{ color: theme.onPrimary }} />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div 
                      className={`text-sm font-medium mb-2 ${task.completed ? 'line-through opacity-60' : ''}`}
                      style={{ color: theme.onSurface }}
                    >
                      {task.title}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span 
                          className="text-xs px-2 py-1 rounded border"
                          style={{ 
                            backgroundColor: categoryColor.bg,
                            color: categoryColor.text,
                            borderColor: categoryColor.border 
                          }}
                        >
                          {task.category}
                        </span>
                        <span 
                          className="text-xs px-2 py-1 rounded"
                          style={{ 
                            backgroundColor: priorityColor.bg,
                            color: priorityColor.text 
                          }}
                        >
                          {task.priority} priority
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Clock className="w-3 h-3" style={{ color: theme.onSurfaceVariant }} />
                        <span className="text-xs" style={{ color: theme.onSurfaceVariant }}>
                          {task.dueDate}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
      <div className="pb-20"></div>
    </div>
  );

  const renderProfileScreen = () => (
    <div className="h-full overflow-y-auto">
      <div className="p-4">
        {/* Profile Header */}
        <div className="text-center mb-6">
          <div 
            className="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center"
            style={{ backgroundColor: theme.primaryContainer }}
          >
            <User className="w-10 h-10" style={{ color: theme.primary }} />
          </div>
          <h1 className="text-lg font-bold" style={{ color: theme.onBackground }}>
            John Doe
          </h1>
          <p className="text-sm" style={{ color: theme.onSurfaceVariant }}>
            Product Designer
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card 
            className="p-3 text-center border"
            style={{ backgroundColor: theme.surface, borderColor: theme.outline }}
          >
            <div className="text-lg font-bold" style={{ color: theme.primary }}>
              {tasks.filter(t => t.completed).length}
            </div>
            <div className="text-xs" style={{ color: theme.onSurfaceVariant }}>
              Completed
            </div>
          </Card>
          
          <Card 
            className="p-3 text-center border"
            style={{ backgroundColor: theme.surface, borderColor: theme.outline }}
          >
            <div className="text-lg font-bold" style={{ color: theme.warning }}>
              {tasks.filter(t => !t.completed).length}
            </div>
            <div className="text-xs" style={{ color: theme.onSurfaceVariant }}>
              Pending
            </div>
          </Card>
          
          <Card 
            className="p-3 text-center border"
            style={{ backgroundColor: theme.surface, borderColor: theme.outline }}
          >
            <div className="text-lg font-bold" style={{ color: theme.success }}>
              87%
            </div>
            <div className="text-xs" style={{ color: theme.onSurfaceVariant }}>
              Efficiency
            </div>
          </Card>
        </div>

        {/* Menu Items */}
        <div className="space-y-2">
          <div 
            className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer"
            style={{ backgroundColor: theme.surfaceContainer }}
          >
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: theme.primaryContainer }}
            >
              <Settings className="w-5 h-5" style={{ color: theme.primary }} />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium" style={{ color: theme.onSurface }}>
                Account Settings
              </div>
              <div className="text-xs" style={{ color: theme.onSurfaceVariant }}>
                Manage your profile and preferences
              </div>
            </div>
            <ChevronRight className="w-4 h-4" style={{ color: theme.onSurfaceVariant }} />
          </div>

          <div 
            className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer"
            style={{ backgroundColor: theme.surfaceContainer }}
          >
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: theme.warningContainer }}
            >
              <Bell className="w-5 h-5" style={{ color: theme.warning }} />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium" style={{ color: theme.onSurface }}>
                Notifications
              </div>
              <div className="text-xs" style={{ color: theme.onSurfaceVariant }}>
                Push notifications and alerts
              </div>
            </div>
            <div 
              className="w-12 h-6 rounded-full relative cursor-pointer"
              style={{ backgroundColor: theme.primary }}
            >
              <div 
                className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full shadow-sm"
                style={{ backgroundColor: theme.onPrimary }}
              />
            </div>
          </div>

          <div 
            className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer"
            style={{ backgroundColor: theme.surfaceContainer }}
          >
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: theme.secondaryContainer }}
            >
              <Star className="w-5 h-5" style={{ color: theme.secondary }} />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium" style={{ color: theme.onSurface }}>
                Achievements
              </div>
              <div className="text-xs" style={{ color: theme.onSurfaceVariant }}>
                View your progress and rewards
              </div>
            </div>
            <Badge 
              className="text-xs px-2 py-1"
              style={{ backgroundColor: theme.success, color: theme.onSuccess }}
            >
              5 New
            </Badge>
          </div>

          <div 
            className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer"
            style={{ backgroundColor: theme.surfaceContainer }}
          >
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: theme.tertiaryContainer }}
            >
              <Info className="w-5 h-5" style={{ color: theme.tertiary }} />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium" style={{ color: theme.onSurface }}>
                Help & Support
              </div>
              <div className="text-xs" style={{ color: theme.onSurfaceVariant }}>
                Get help and contact support
              </div>
            </div>
            <ChevronRight className="w-4 h-4" style={{ color: theme.onSurfaceVariant }} />
          </div>
        </div>
      </div>
      <div className="pb-20"></div>
    </div>
  );

  return (
    <div className="h-full bg-muted overflow-y-auto">
      <div className="p-4">
        {/* Preview Controls */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">Mobile Preview - TODO App</h2>
          
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

        {/* Device Frame - 25% larger */}
        <div className="flex justify-center">
          <div className="relative">
            {/* Android Device Frame - increased from w-80 h-[640px] to w-100 h-[800px] (25% larger) */}
            <div className="w-100 h-[800px] bg-gray-900 rounded-[2rem] p-5 shadow-2xl">
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
                  className="flex flex-col h-full"
                  style={{ backgroundColor: theme.background }}
                >
                  
                  {/* AppBar */}
                  <div 
                    className="h-14 flex items-center justify-center shadow-sm"
                    style={{ 
                      backgroundColor: theme.primary,
                      color: theme.onPrimary 
                    }}
                  >
                    <span className="font-medium">TaskFlow</span>
                  </div>

                  {/* Content Area */}
                  <div className="flex-1 overflow-hidden">
                    {activeTab === 'home' && renderHomeScreen()}
                    {activeTab === 'tasks' && renderTasksScreen()}
                    {activeTab === 'profile' && renderProfileScreen()}
                  </div>

                  {/* Bottom Navigation */}
                  <div 
                    className="h-16 flex items-center justify-around border-t"
                    style={{ 
                      backgroundColor: theme.surface,
                      borderTopColor: theme.outline 
                    }}
                  >
                    <div 
                      className="flex flex-col items-center space-y-1 cursor-pointer"
                      onClick={() => setActiveTab('home')}
                    >
                      <Home 
                        className="w-5 h-5"
                        style={{ color: activeTab === 'home' ? theme.primary : theme.onSurfaceVariant }}
                      />
                      <span 
                        className="text-xs font-medium"
                        style={{ color: activeTab === 'home' ? theme.primary : theme.onSurfaceVariant }}
                      >
                        Home
                      </span>
                    </div>
                    
                    <div 
                      className="flex flex-col items-center space-y-1 cursor-pointer"
                      onClick={() => setActiveTab('tasks')}
                    >
                      <CheckCircle2 
                        className="w-5 h-5"
                        style={{ color: activeTab === 'tasks' ? theme.primary : theme.onSurfaceVariant }}
                      />
                      <span 
                        className="text-xs"
                        style={{ color: activeTab === 'tasks' ? theme.primary : theme.onSurfaceVariant }}
                      >
                        Tasks
                      </span>
                    </div>
                    
                    <div 
                      className="flex flex-col items-center space-y-1 cursor-pointer"
                      onClick={() => setActiveTab('profile')}
                    >
                      <User 
                        className="w-5 h-5"
                        style={{ color: activeTab === 'profile' ? theme.primary : theme.onSurfaceVariant }}
                      />
                      <span 
                        className="text-xs"
                        style={{ color: activeTab === 'profile' ? theme.primary : theme.onSurfaceVariant }}
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