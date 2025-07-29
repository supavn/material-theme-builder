# Material Theme Builder

A powerful web-based tool for creating and customizing Material Design themes for Flutter applications. Built with React, TypeScript, and Tailwind CSS, this tool provides an intuitive interface for designing both light and dark themes with real-time preview capabilities.

## 🎨 Features

### Core Functionality
- **Dual Theme Editing**: Create and edit both light and dark themes simultaneously
- **Real-time Preview**: See your theme changes instantly in a mobile device preview
- **Token-based Editing**: Use prebuilt color tokens for consistent theming
- **JSON Editor**: Direct JSON editing with syntax validation
- **Import/Export**: Import existing themes and export in multiple formats

### Theme Components
- **Material Design Tokens**: Complete Material 3 color scheme support
- **Custom Enum Tokens**: Additional semantic tokens (warning, success, information, etc.)
- **Surface Variants**: Full surface container hierarchy support
- **Accessibility**: Automatic contrast ratio calculations

### Export Options
- **JSON Format**: Standard theme configuration files
- **Dart Code**: Ready-to-use Flutter theme classes
- **Clipboard Copy**: Quick sharing of theme configurations
- **File Download**: Direct download of theme files

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd material-theme-builder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
# Build client for static hosting (GitHub Pages)
npm run build:client

# Build full application with server
npm run build
npm start
```

### 🚀 Deployment

The project includes GitHub Actions workflow for automatic deployment to GitHub Pages. See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

**Quick Setup:**
1. Push your code to GitHub
2. Enable GitHub Pages in repository settings
3. Select "GitHub Actions" as the source
4. The workflow will automatically deploy on every push to `main`

**Live Demo:** [https://[username].github.io/material-theme-builder/](https://[username].github.io/material-theme-builder/)

## 🎯 Usage

### Creating a New Theme

1. **Start with Defaults**: The app loads with Material Design default colors
2. **Choose Your Seed Color**: Use the color picker to set your primary brand color
3. **Customize Tokens**: Use the token editor to adjust individual color values
4. **Preview Changes**: See your theme applied to various UI components in real-time
5. **Export Your Theme**: Download as JSON or Dart code

### Importing Existing Themes

1. Click the **"Import Theme"** button in the theme editor
2. Select a JSON theme file
3. The theme will be loaded and displayed immediately in the preview
4. Make adjustments as needed

### Theme Editor Modes

#### Token Editor
- Visual color picker interface
- Organized by token categories (Primary, Secondary, Surface, etc.)
- Real-time updates as you adjust colors

#### JSON Editor
- Direct JSON editing with syntax highlighting
- Validation and error checking
- Apply changes button to update the theme

### Mobile Preview

The preview panel shows your theme applied to:
- **App Bar**: Primary color usage
- **Cards**: Surface and container colors
- **Form Elements**: Input fields, checkboxes, switches
- **Navigation**: Bottom navigation with active states
- **Status Indicators**: Warning, success, and information alerts

## 🏗️ Architecture

### Project Structure
```
material-theme-builder/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── theme-builder/  # Theme editing components
│   │   │   └── ui/            # Reusable UI components
│   │   ├── pages/             # Application pages
│   │   └── hooks/             # Custom React hooks
├── server/                  # Express backend
├── shared/                  # Shared TypeScript schemas
└── package.json
```

### Key Components

#### Theme Context (`theme-context.tsx`)
- Manages theme state and updates
- Handles light/dark theme switching
- Provides theme data to all components

#### Theme Editor (`theme-editor.tsx`)
- Main editing interface with tabs
- Token editor and JSON editor modes
- Import/export functionality

#### Mobile Preview (`mobile-preview.tsx`)
- Real-time theme preview
- Mobile device frame simulation
- Interactive UI component showcase

#### Token Editor (`token-editor.tsx`)
- Visual color picker interface
- Organized token categories
- Real-time color updates

### Data Flow

1. **Theme State**: Managed by React Context
2. **Color Updates**: Flow from editor to context
3. **Preview Updates**: Automatic re-rendering of preview components
4. **Export**: Theme data converted to various formats

## 🎨 Theme Schema

### Material Design Tokens
```typescript
interface MaterialColorScheme {
  // Primary colors
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  
  // Secondary colors
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  
  // Surface colors
  surface: string;
  onSurface: string;
  surfaceVariant: string;
  onSurfaceVariant: string;
  
  // ... additional Material 3 tokens
}
```

### Custom Enum Tokens
```typescript
interface CustomEnumTheme {
  // Semantic colors
  warning: string;
  onWarning: string;
  warningContainer: string;
  onWarningContainer: string;
  
  success: string;
  onSuccess: string;
  successContainer: string;
  onSuccessContainer: string;
  
  information: string;
  onInformation: string;
  informationContainer: string;
  onInformationContainer: string;
  
  // ... additional custom tokens
}
```

## 🔧 Development

### Tech Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Express.js, Node.js
- **UI Components**: Radix UI primitives
- **State Management**: React Context + Hooks
- **Build Tool**: Vite
- **Package Manager**: npm

### Key Dependencies
- `@radix-ui/react-*`: UI component primitives
- `lucide-react`: Icon library
- `tailwindcss`: Utility-first CSS framework
- `zod`: Schema validation
- `framer-motion`: Animation library

### Development Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run check        # TypeScript type checking
```

## 🎯 Design Principles

### User Experience
- **Intuitive Interface**: Clean, professional design for developers
- **Real-time Feedback**: Instant preview updates
- **Flexible Editing**: Multiple ways to customize themes
- **Accessibility**: WCAG compliant color contrast ratios

### Performance
- **Efficient Updates**: Optimized re-rendering
- **Fast Preview**: Smooth theme switching
- **Lightweight**: Minimal bundle size

### Extensibility
- **Modular Architecture**: Easy to add new token types
- **Plugin System**: Support for custom export formats
- **API Ready**: Backend prepared for future integrations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use conventional commit messages
- Ensure all tests pass
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Material Design**: Google's design system that inspired this tool
- **Flutter Team**: For the excellent theming system
- **Radix UI**: For the accessible component primitives
- **Tailwind CSS**: For the utility-first styling approach

## 📞 Support

For questions, issues, or feature requests:
- Open an issue on GitHub
- Check the documentation
- Review existing discussions

---

**Built with ❤️ for the Flutter community** 