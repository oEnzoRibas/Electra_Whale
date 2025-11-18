// Notification Microservice for Electra Whale

const express = require('express');
const app = express();
const PORT =  3003;

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', service: 'Notification Service' });
});

app.get('/', (req, res) => {
  res.send('Notification Service is running');
});

app.listen(PORT, () => {
    console.log(`Notification Service is running on http://0.0.0.0:${PORT}`);
})
