const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app); // <-- Use HTTP server
const io = new Server(server, {
  cors: { origin: '*' }
});

const PORT = 5000;
const LOG_FILE = path.join(__dirname, 'logs.json');

app.use(cors());
app.use(express.json());

const readLogs = () => {
  if (!fs.existsSync(LOG_FILE)) fs.writeFileSync(LOG_FILE, '[]');
  return JSON.parse(fs.readFileSync(LOG_FILE));
};

const writeLogs = (logs) => {
  fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2));
};

app.post('/logs', (req, res) => {
  const log = req.body;
  const requiredFields = ['level', 'message', 'resourceId', 'timestamp', 'traceId', 'spanId', 'commit', 'metadata'];
  const valid = requiredFields.every(f => f in log);
  if (!valid) return res.status(400).json({ error: 'Invalid log format' });

  const logs = readLogs();
  logs.push(log);
  writeLogs(logs);

  io.emit('new-log', log); // <-- Emit new log to clients
  res.status(201).json(log);
});

app.get('/logs', (req, res) => {
  let logs = readLogs();
  const { level, message, resourceId, timestamp_start, timestamp_end } = req.query;
  if (level) logs = logs.filter(log => log.level === level);
  if (message) logs = logs.filter(log => log.message.toLowerCase().includes(message.toLowerCase()));
  if (resourceId) logs = logs.filter(log => log.resourceId === resourceId);
  if (timestamp_start) logs = logs.filter(log => new Date(log.timestamp) >= new Date(timestamp_start));
  if (timestamp_end) logs = logs.filter(log => new Date(log.timestamp) <= new Date(timestamp_end));
  logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  res.json(logs);
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
