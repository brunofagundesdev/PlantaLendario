import { AppError } from "./appError.error.js";

class UserAlreadyHasRole extends AppError {
    constructor() {
        super('Usuário já possui o cargo', 400);
    }
}

export {
    UserAlreadyHasRole
}