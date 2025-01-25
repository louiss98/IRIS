// filepath: /d:/IRA/web-interface/server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { spawn } = require('child_process');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Client connected');

  const pythonProcess = spawn('python', ['d:/IRA/publish.py']);

  pythonProcess.stdout.on('data', (data) => {
    const parsedData = JSON.parse(data.toString());
    socket.emit('python-output', parsedData);
  });

  pythonProcess.stderr.on('data', (data) => {
    socket.emit('python-output', `ERROR: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python process exited with code ${code}`);
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});