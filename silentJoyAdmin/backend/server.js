const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5050;

app.use(cors());
app.use(bodyParser.json());

let clients = [];

// Endpoint para Server-Sent Events (SSE)
app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  clients.push(res);

  req.on('close', () => {
    clients = clients.filter(client => client !== res);
  });
});

// Endpoint que reciben los clientes del stream
const userSet = new Set();

app.post('/sync', (req, res) => {
  const { id, segment } = req.body;
  const now = Date.now();
  const payload = JSON.stringify({ id, segment, timestamp: now });

  // Emitir el sync normal
  clients.forEach(client => client.write(`data: ${payload}\n\n`));

  // Si es un nuevo usuario, emitir lista
  if (!userSet.has(id)) {
    userSet.add(id);
    const listPayload = JSON.stringify({ type: "userlist", ids: Array.from(userSet) });
    clients.forEach(client => client.write(`data: ${listPayload}\n\n`));
  }

  res.send("OK");
});

app.listen(PORT, () => {
  console.log(`🔊 Sync backend listening on http://localhost:${PORT}`);
});

let syncClients = [];

app.get('/wait-for-sync', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  syncClients.push(res);
  req.on('close', () => {
    syncClients = syncClients.filter(c => c !== res);
  });
});

// Cada 5 segundos, anunciar el próximo momento de reproducción
setInterval(() => {
  const delay = 3000; // damos un poco de margen para preparar
  const startAt = Date.now() + delay;

  const payload = JSON.stringify({
    type: 'startPlay',
    startAt
  });

  syncClients.forEach(client => {
    client.write(`data: ${payload}\n\n`);
  });

  syncClients = []; // vaciamos la lista para que no se repita
}, 5000);


app.get('/servertime', (req, res) => {
  res.json({ serverTime: Date.now() });
});
