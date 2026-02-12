import { AppError } from "../appError.error.js"

class EventOptionIdInvalidError extends AppError {
    constructor() {
        super('Id de opção inválido', 400);
    }
}

class EventOptionNotFoundError extends AppError {
    constructor() {
        super('Opção não encontrada', 404);
    }
}

class EventOptionNameInvalidError extends AppError {
    constructor() {
        super('Nome de opção inválido', 404);
    }
}

class EventOptionNameAlredyExistsError extends AppError {
    constructor() {
        super('Nome de opção já registrado', 404);
    }
}

export {
    EventOptionIdInvalidError,
    EventOptionNotFoundError,
    EventOptionNameInvalidError,
    EventOptionNameAlredyExistsError
}