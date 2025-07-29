# Material Theme Builder

## Overview

A modern web-based Material Theme Builder designed for Flutter development teams. This tool provides an enhanced alternative to the official Material Theme Builder with improved flexibility and custom features tailored for Flutter applications. The application allows users to create, edit, and export Material Design color schemes with both light and dark theme variants.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a modern full-stack architecture with a clear separation between frontend and backend components:

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **UI Framework**: Radix UI components with shadcn/ui design system for consistent Material Design implementation
- **Styling**: Tailwind CSS with CSS variables for dynamic theming support
- **State Management**: React Context API for theme state management across components
- **Build Tool**: Vite for fast development and optimized production builds
- **Router**: Wouter for lightweight client-side routing

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for consistent type safety across the stack
- **Architecture Pattern**: RESTful API design (routes currently minimal but extensible)
- **Storage**: In-memory storage implementation with interface for future database integration

## Key Components

### Theme Management System
- **Dual Theme Editor**: Separate editors for light and dark themes with synchronized editing capabilities
- **Color Token Categories**: Comprehensive Material Design 3 color system including primary, secondary, tertiary, error, surface, and background colors
- **Custom Token Support**: Extended color palette including warning, information, success, default, and critical color variants

### User Interface Components
- **Token Editor**: Left panel for editing color values with color picker integration
- **Mobile Preview**: Center panel showing real-time preview of theme applied to mobile UI components
- **Code Editor**: Right panel for viewing and exporting generated theme code
- **Header**: Theme naming, export controls, and application theme toggle

### Color Management
- **Color Picker**: Advanced color input with hex, RGB, and HSL support
- **Palette Generation**: Automatic tonal palette generation from seed colors
- **Contrast Validation**: WCAG accessibility compliance checking
- **Theme Defaults**: Pre-configured light and dark theme starting points

## Data Flow

1. **Theme Initialization**: Default themes loaded from localStorage or fallback to preset values
2. **Color Updates**: User color changes propagate through React Context to all consuming components
3. **Real-time Preview**: Theme changes immediately reflected in mobile preview component
4. **State Persistence**: Theme data automatically saved to localStorage for session continuity
5. **Export Generation**: Theme data transformed to JSON or Dart code formats for download

## External Dependencies

### UI and Styling
- **Radix UI**: Headless component primitives for accessibility and consistent behavior
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Type-safe CSS class composition

### Development Tools
- **React Query**: Server state management and caching (configured but not actively used)
- **React Hook Form**: Form handling with validation support
- **Wouter**: Lightweight routing solution
- **Date-fns**: Date manipulation utilities

### Backend Infrastructure
- **Express.js**: Web application framework
- **Drizzle ORM**: Type-safe database ORM with PostgreSQL support
- **Neon Database**: Serverless PostgreSQL database provider
- **Connect-pg-simple**: PostgreSQL session store for Express

## Deployment Strategy

### Development Environment
- **Vite Dev Server**: Hot module replacement and fast refresh for development
- **TypeScript Compilation**: Real-time type checking and error reporting
- **Replit Integration**: Special handling for Replit development environment with runtime error overlay

### Production Build
- **Frontend**: Vite builds optimized React application to static assets
- **Backend**: esbuild bundles server code into single executable
- **Environment Variables**: Database URL and other secrets managed through environment configuration
- **Static Serving**: Express serves built frontend assets in production mode

### Database Integration
- **Schema Definition**: Drizzle schema defined in shared directory for type safety
- **Migration System**: Drizzle Kit handles database schema migrations
- **Connection**: Neon serverless PostgreSQL with connection pooling
- **Development Storage**: In-memory storage implementation for development and testing

The application is structured for easy deployment to platforms like Replit, Vercel, or traditional hosting providers, with environment-based configuration for different deployment targets.