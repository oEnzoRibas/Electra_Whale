import { createApp } from "./app.js";

const PORT = process.env.API_GATEWAY_PORT || 8080;

const app = createApp();

const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`API Gateway Service is running on PORT ${PORT}`);
});

process.on('SIGTERM', () => {
    server.close(() => {
        console.log('API Gateway Service is shutting down gracefully');
        process.exit(0);
    });
});

