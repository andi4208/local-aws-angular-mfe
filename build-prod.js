const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Create dist directory if it doesn't exist
if (!fs.existsSync(path.join(__dirname, 'dist'))) {
  fs.mkdirSync(path.join(__dirname, 'dist'));
}

console.log('Building for PRODUCTION environment...');

// Build shell app for production
console.log('Building shell app...');
execSync('npm run build:prod', { 
  cwd: path.join(__dirname, 'shell-app'),
  stdio: 'inherit'
});

// Build feature1 app for production
console.log('Building feature1 app...');
execSync('npm run build:prod', { 
  cwd: path.join(__dirname, 'feature1-app'),
  stdio: 'inherit'
});

// Create a routes.json file for Azure Static Web Apps if needed
const routesJsonPath = path.join(__dirname, 'dist', 'routes.json');
if (!fs.existsSync(routesJsonPath)) {
  console.log('Creating routes.json for Azure Static Web Apps...');
  const routesJson = {
    "routes": [
      {
        "route": "/mfe1/*",
        "serve": "/mfe1/index.html",
        "statusCode": 200
      },
      {
        "route": "/*",
        "serve": "/shell/index.html",
        "statusCode": 200
      }
    ],
    "platformErrorOverrides": [
      {
        "errorType": "NotFound",
        "serve": "/shell/index.html"
      }
    ]
  };
  
  fs.writeFileSync(routesJsonPath, JSON.stringify(routesJson, null, 2));
}

// Copy staticwebapp.config.json if present in either app
const shellStaticWebAppConfig = path.join(__dirname, 'shell-app', 'staticwebapp.config.json');
if (fs.existsSync(shellStaticWebAppConfig)) {
  console.log('Copying staticwebapp.config.json to dist directory...');
  fs.copyFileSync(shellStaticWebAppConfig, path.join(__dirname, 'dist', 'staticwebapp.config.json'));
}

console.log('Production build completed successfully!');
console.log('Output is in the dist directory.');
