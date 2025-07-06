
# 🚀 Log Ingestion and Querying System — Full-Stack Assessment

This project implements a real-world log monitoring tool using Node.js (Express) for the backend and React for the frontend. It allows ingestion, storage, and querying of log data with live updates via WebSockets — all persisted in a local JSON file (no DB) as per the assessment constraints.

---

## 📁 Folder Structure

```
evallo-log-system/
├── backend/
│   ├── server.js            # Express + WebSocket backend
│   ├── logs.json            # JSON file for log persistence
├── frontend/
│   └── src/
│       ├── App.jsx          # Main UI logic
│       ├── api.js           # API helper
│       └── components/
│           └── FilterBar.jsx
├── README.md
```

---

## 🛠 Tech Stack

- **Backend**: Node.js, Express, Socket.io
- **Frontend**: React (Vite), socket.io-client
- **Storage**: Local file system (`logs.json`)
- **HTTP Client**: Axios

---

## 🧪 Functional Features

### ✅ Backend (Node.js + Express + Socket.io)

- `POST /logs`: Ingest a new log entry (must match schema)
- `GET /logs`: Retrieve logs filtered by:
  - `level` (e.g. error, info, warn)
  - `message` (case-insensitive substring search)
  - `resourceId`
  - `timestamp_start` and `timestamp_end`
- Logs returned in **reverse-chronological order**
- Logs saved to `logs.json`
- **WebSocket push**: New logs sent to connected clients in real time

### ✅ Frontend (React)

- **Dynamic filter bar** with:
  - Full-text message search
  - Level dropdown
  - ResourceId text input
  - Start/End datetime pickers
- Logs list updates as filters change (no reload)
- **Auto-refresh** UI via WebSocket (`socket.io-client`)
- Visually distinct log levels (color-coded)

---

## 📥 Getting Started

### 🔧 1. Clone the Repository

```bash
git clone https://github.com/yourusername/evallo-log-system.git
cd evallo-log-system
```

---

### 🖥️ 2. Run Backend

```bash
cd backend
npm install
node server.js
```

Runs on: `http://localhost:5000`

---

### 🌐 3. Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Open in browser: `http://localhost:5173`

---

## 📂 Sample Log Data

Sample entries used in `logs.json`:

```json
[
  {
    "level": "error",
    "message": "Failed to connect to database.",
    "resourceId": "server-1234",
    "timestamp": "2025-07-06T08:22:00Z",
    "traceId": "abc-xyz-123",
    "spanId": "span-456",
    "commit": "5e5342f",
    "metadata": { "parentResourceId": "server-5678" }
  },
]
```


✅ This version supports real-time log ingestion via WebSockets.
