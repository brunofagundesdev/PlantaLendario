import AppError from "../errors/app.error.js";

class AuthMissingTokenError extends AppError {
    constructor() {
        super('Token não informado', 401);
    }
}

class AuthUnauthorizedError extends AppError {
    constructor() {
        super('Acesso negado', 401);
    }
}

class AuthInvalidCredentialsError extends AppError {
    constructor() {
        super('Credenciais inválidas', 401);
    }
}

export {
    AuthMissingTokenError,
    AuthUnauthorizedError,
    AuthInvalidCredentialsError
}