// User Microservice for Electra Whale

const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', service: 'User Service' });
});

app.get('/', (req, res) => {
  res.send(`Hello! This is User Service running on port ${PORT}.`);
});

app.listen(PORT, () => {
  console.log(`[USER SERVICE] running on http://0.0.0.0:${PORT}`);
});