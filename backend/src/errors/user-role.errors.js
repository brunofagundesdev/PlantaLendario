import { AppError } from "./appError.error.js";

class UserAlreadyHasRoleError extends AppError {
    constructor() {
        super('Usuário já possui o cargo', 400);
    }
}

class UserUnauthorizedError extends AppError {
    constructor() {
        super('Você não tem autorização para essa ação', 400);
    }
}

class UserMissingRoleError extends AppError {
    constructor() {
        super('O usuário não possui o cargo', 400);
    }
}



export {
    UserAlreadyHasRoleError,
    UserUnauthorizedError,
    UserMissingRoleError
}