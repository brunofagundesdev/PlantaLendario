import AppError from "../../errors/app.error.js";

class RoleIdInvalidError extends AppError {
    constructor() {
        super("Id de cargo inválido", 400);
    }
}

class RoleNotFoundError extends AppError {
    constructor() {
        super("Cargo não encontrado", 404);
    }
}

class RoleNameInvalidError extends AppError {
    constructor() {
        super("Nome de cargo inválido", 400);
    }
}

class RoleColorInvalidError extends AppError {
    constructor() {
        super("Cor de cargo inválido", 400);
    }
}

class RoleUpdateInvalidError extends AppError {
    constructor() {
        super("No mínimo um campo deve ser preenchido", 400);
    }
}

class RoleNameAlredyRegisteredError extends AppError {
    constructor() {
        super("Nome de cargo já registrado", 409);
    }
}

class RoleColorAlredyUsedError extends AppError {
    constructor() {
        super("Cor de cargo já utilizada", 409);
    }
}


export {
    RoleIdInvalidError,
    RoleNotFoundError,
    RoleNameInvalidError,
    RoleColorInvalidError,
    RoleUpdateInvalidError,
    RoleNameAlredyRegisteredError,
    RoleColorAlredyUsedError
}
