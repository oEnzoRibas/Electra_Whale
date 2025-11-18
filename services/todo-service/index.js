// Task Management Microservice for Electra Whale

const express = require('express');
const app = express();
const PORT =  3002;

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', service: 'Task Management Service' });
});

app.get('/', (req, res) => {
  res.send('Task Management Service is running');
});

app.listen(PORT, () => {
    console.log(`Task Management Service is running on http://0.0.0.0:${PORT}`);
})
