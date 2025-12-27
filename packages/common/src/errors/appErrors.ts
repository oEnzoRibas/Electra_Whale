export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;
    public readonly code: string;

    constructor(
        message: string,
        statusCode = 400,
        code = 'APP_ERROR',
        isOperational = true
    ) {
        super(message);
        this.code = code;
        this.statusCode = statusCode;
        this.isOperational = isOperational;

        Error.captureStackTrace(this, this.constructor);
    }
}