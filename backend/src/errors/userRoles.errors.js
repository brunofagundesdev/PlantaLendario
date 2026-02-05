import { AppError } from "./appError.error.js";

class UserAlreadyHasRole extends AppError {
    constructor() {
        super('Usuário já possui o cargo', 400);
    }
}

class UserNotAuthorized extends AppError {
    constructor() {
        super('Você não tem autorização para essa ação', 400);
    }
}



export {
    UserAlreadyHasRole,
    UserNotAuthorized
}