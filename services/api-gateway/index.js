// API Gateway Microservice for Electra Whale

const express = require('express');
const app = express();
const PORT =  8080;

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', service: 'API Gateway Service' });
});

app.get('/', (req, res) => {
  res.send('API Gateway Service is running');
});

app.listen(PORT, () => {
    console.log(`API Gateway Service is running on http://0.0.0.0:${PORT}`);
})
