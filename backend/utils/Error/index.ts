import { ErrorMessages } from "../Enum/httpCodes";


export class AppError extends Error {
    public statusCode: number;

    constructor(statusCode: number, message?: string) {
        super(message || ErrorMessages[statusCode] || 'Error');
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, new.target.prototype); // Prototip zincirini korur
        Error.captureStackTrace(this);
    }
}