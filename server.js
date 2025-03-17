const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { spawn } = require('child_process');
const path = require('path');

// Require resolvePythonFile from python-resolver-2.js
const { resolvePythonFile, executePythonFile, resolvePythonFileAndRun, killPythonProcess } = require('./python-resolver-2.cjs');

const app = express();
app.use(express.json());

const server = http.createServer(app);
const io = socketIo(server);
global.io = io;

// Serve static files from the web-interface folder where index.html resides
//app.use(express.static('web-interface'));
//app.use(express.static(path.join(__dirname, 'web-interface'))); 
app.use(express.static(path.join(__dirname, 'web-interface', 'dist')));
app.use(express.static(path.join(__dirname, 'web-interface')));

app.post('/kill-python-process', (req, res) => {
  try {
    killPythonProcess((output) => {
      res.send(output);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error killing Python process");
  }
});

app.post('/resolve-python-file', (req, res) => {
  // Expect a JSON with properties "code" and "filename"
  const { code, filename } = req.body;
  if (!code || !filename) {
    res.status(400).send("Missing code or filename");
    return;
  }
  try {
    // Call the resolve function from your python-resolver-2.js
    resolvePythonFile(code, filename);
    res.send("Python file resolved");
  } catch (error) {
    console.error("Error resolving python file:", error);
    res.status(500).send("Error resolving python file");
  }
});

// In server.js
app.post('/resolve-python-run', (req, res) => {
  const { code, filename } = req.body;
  if (!code || !filename) {
    res.status(400).send("Missing code or filename");
    return;
  }
  try {
    // Call the resolve function and run python, and provide a callback to handle output
    resolvePythonFileAndRun(code, filename, (output) => {
      // Emit the output via Socket.IO to all connected clients or specific ones as needed
      // io.emit('pythonOutput', output);
      // io.emit('robotState', output);
    });
    res.send("Python file resolved and running");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error running Python code");
  }
});


// Existing Socket.IO connection and Python process handling
// io.on('connection', (socket) => {
//   console.log('Client connected');

//   // Spawn your Python process
//   const pythonProcess = spawn('python', ['d:/IRA/publish.py']);

//   pythonProcess.stdout.on('data', (data) => {
//     try {
//       const parsedData = JSON.parse(data.toString());
//       socket.emit('python-output', parsedData);
//       socket.emit('robotState', data.toString());
//     } catch (error) {
//       console.error('Error parsing JSON:', error);
//       socket.emit('python-output', { error: 'JSON parse error', raw: data.toString() });
//     }
//   });

//   pythonProcess.stderr.on('data', (data) => {
//     socket.emit('python-output', `ERROR: ${data.toString()}`);
//   });

//   pythonProcess.on('close', (code) => {
//     console.log(`Python process exited with code ${code}`);
//   });
// });

server.listen(3000, () => {
  console.log('Server running on port 3000');
});