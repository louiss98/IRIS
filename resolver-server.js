const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const server = http.createServer((req, res) => {
  // Handle /state-request endpoint first
  if (req.url === '/state-request') {
    exec('python ../python-scripts/your-python-file.py', (error, stdout, stderr) => {
      if (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Server error: ${error.message}`);
        return;
      }
      try {
        const data = JSON.parse(stdout);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data), 'utf-8');
      } catch (parseError) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error parsing JSON from Python output');
      }
    });
    return; // End processing for this request
  }

  // Otherwise, serve static files
  let filePath = path.join(__dirname, 'web-interface', req.url === '/' ? 'index.html' : req.url);
  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml'
  };

  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - File Not Found</h1>', 'utf-8');
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${error.code}`, 'utf-8');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});