import pino from "pino";
import fs from "fs"
import path from "path"

const logDir = path.join(process.cwd(), "logs")
const logPath = path.join(logDir, "app.log")

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true })
}

const stream = fs.createWriteStream(logPath, { flags: "a" })

const logger = pino(
    {
    level: process.env.LOG_LEVEL || 'info',
    redact: {
        paths: ['req.headers.authorization',
                'req.headers.cookie',
                'req.headers["x-api-key"]',
                'res.headers["set-cookie"]',
                'req.body.token'
            ],
            remove: true
    },
    
    timestamp: pino.stdTimeFunctions.isoTime,
        
    
}, stream
)

export { logger };