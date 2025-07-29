# Deployment Guide

This guide explains how to deploy the Material Theme Builder to GitHub Pages.

## GitHub Pages Setup

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** > **Pages**
3. Under **Source**, select **GitHub Actions**
4. The workflow will automatically deploy when you push to the `main` branch

### 2. Repository Settings

Make sure your repository has the following settings:

- **Repository name**: `material-theme-builder` (or update the base path in `vite.config.ts`)
- **Visibility**: Public (required for GitHub Pages)
- **Branch**: `main`

### 3. GitHub Actions Workflow

The project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that:

- **Triggers**: On push to `main` branch and pull requests
- **Builds**: The client-side application using Vite
- **Deploys**: To GitHub Pages automatically
- **Features**:
  - Type checking before build
  - Caching for faster builds
  - Concurrent deployment protection
  - Automatic URL generation

### 4. Build Process

The workflow performs the following steps:

1. **Checkout**: Clones the repository
2. **Setup Node.js**: Installs Node.js 18 with npm caching
3. **Install Dependencies**: Runs `npm ci` for clean install
4. **Type Check**: Runs `npm run check` for TypeScript validation
5. **Build**: Runs `npm run build:client` to build the client application
6. **Deploy**: Uploads and deploys to GitHub Pages

### 5. Configuration Files

The following files are configured for GitHub Pages deployment:

- **`vite.config.ts`**: Sets base path for production builds
- **`client/index.html`**: Includes GitHub Pages SPA routing script
- **`client/public/404.html`**: Handles client-side routing
- **`.github/workflows/deploy.yml`**: GitHub Actions workflow

### 6. URL Structure

After deployment, your application will be available at:
```
https://[username].github.io/material-theme-builder/
```

### 7. Troubleshooting

#### Build Failures
- Check the GitHub Actions logs for specific error messages
- Ensure all dependencies are properly installed
- Verify TypeScript compilation passes locally

#### Routing Issues
- The application uses client-side routing with Wouter
- GitHub Pages SPA routing is configured to handle direct URL access
- If you change the repository name, update the base path in `vite.config.ts`

#### Performance
- The build process optimizes assets for production
- Monaco editor is loaded dynamically for better performance
- Static assets are cached for faster loading

### 8. Local Development

For local development:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production (local testing)
npm run build:client

# Type check
npm run check
```

### 9. Custom Domain (Optional)

To use a custom domain:

1. Add your domain to the repository settings
2. Create a `CNAME` file in the `client/public` directory
3. Add your domain name to the file
4. Configure DNS settings with your domain provider

### 10. Environment Variables

The application doesn't require any environment variables for GitHub Pages deployment since it's a client-side application. All configuration is handled through the build process.

## Support

If you encounter any issues with deployment:

1. Check the GitHub Actions logs
2. Verify all configuration files are correct
3. Ensure the repository settings are properly configured
4. Test the build process locally before pushing 