import React, { useEffect, useState } from 'react';
import { fetchLogs } from './api';
import FilterBar from './components/FilterBar';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Connect to socket server

function App() {
  const [logs, setLogs] = useState([]);
  const [filters, setFilters] = useState({});

  const loadLogs = async () => {
    const data = await fetchLogs(filters);
    setLogs(data);
  };

  useEffect(() => {
    loadLogs();
  }, [filters]);

  useEffect(() => {
    socket.on('new-log', () => {
      loadLogs(); // Refresh on new log
    });

    return () => socket.off('new-log');
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h1>Log Viewer (Live)</h1>
      <FilterBar onChange={handleFilterChange} />
      <div>
        {logs.map((log, i) => (
          <div key={i} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <strong>{log.level.toUpperCase()}</strong> - {log.message}
            <br />
            <small>{log.timestamp}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
