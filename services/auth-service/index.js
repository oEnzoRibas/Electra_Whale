// Auth Microservice for Electra Whale

const express = require('express');
const app = express();
const PORT =  3000;

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', service: 'Auth Service' });
});

app.get('/', (req, res) => {
  res.send('Auth Service is running');
});

app.listen(PORT, () => {
    console.log(`Auth Service is running on http://0.0.0.0:${PORT}`);
})
