// Google Calendar Integration Microservice for Electra Whale

const express = require('express');
const app = express();
const PORT =  3004;

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', service: 'Google Calendar Integration Service' });
});

app.get('/', (req, res) => {
  res.send('Google Calendar Integration Service is running');
});

app.listen(PORT, () => {
    console.log(`Google Calendar Integration Service is running on http://0.0.0.0:${PORT}`);
})
