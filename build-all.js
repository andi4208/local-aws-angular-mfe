const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Create dist directory if it doesn't exist
if (!fs.existsSync(path.join(__dirname, 'dist'))) {
  fs.mkdirSync(path.join(__dirname, 'dist'));
}

// Build shell app
console.log('Building shell app...');
execSync('npm run build:prod', { 
  cwd: path.join(__dirname, 'shell-app'),
  stdio: 'inherit'
});

// Build feature1 app
console.log('Building feature1 app...');
execSync('npm run build:prod', { 
  cwd: path.join(__dirname, 'feature1-app'),
  stdio: 'inherit'
});

console.log('Build completed successfully. Output is in the dist directory.');
