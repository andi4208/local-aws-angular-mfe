const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Set up the port
const PORT = process.env.PORT || 4200;

// Serve shell app from root as well for proper asset loading
app.use(express.static(path.join(__dirname, 'dist/shell')));

// Serve static files from the dist directory for specific paths
app.use('/shell', express.static(path.join(__dirname, 'dist/shell')));
app.use('/mfe1', express.static(path.join(__dirname, 'dist/mfe1')));

// Redirect root to shell
app.get('/', (req, res) => {
  // Read the index.html file
  const indexPath = path.join(__dirname, 'dist/shell/index.html');
  let indexHtml = fs.readFileSync(indexPath, 'utf8');
  
  // Send the HTML with appropriate headers
  res.setHeader('Content-Type', 'text/html');
  res.send(indexHtml);
});

// Set up fallback routes for client-side routing
app.get('/shell/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/shell/index.html'));
});

app.get('/mfe1/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/mfe1/index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Shell app available at http://localhost:${PORT}/shell`);
  console.log(`MFE1 app available at http://localhost:${PORT}/mfe1`);
});
