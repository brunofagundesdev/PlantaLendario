import { AppError } from "./appError.error.js";

class MissingTokenError extends AppError {
    constructor() {
        super('Token não informado', 401);
    }
}

class UnauthorizedError extends AppError {
    constructor() {
        super('Acesso negado', 401);
    }
}

export {
    MissingTokenError,
    UnauthorizedError
}