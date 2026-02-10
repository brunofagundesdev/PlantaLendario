import { AppError } from "../appError.error.js"

class EventSpecificationIdInvalidError extends AppError {
    constructor(){
        super('Id inválido', 400);
    }
}

class EventSpecificationNotFoundError extends AppError {
    constructor(){
        super('Especificação não encontrada', 404);
    }
}

class EventSpecificationNameInvalidError extends AppError {
    constructor(){
        super('Nome de especificação inválido', 404);
    }
}

class EventSpecificationNameAlredyExistsError extends AppError {
    constructor(){
        super('Nome de especificação já registrado', 404);
    }
}

export {
    EventSpecificationIdInvalidError,
    EventSpecificationNotFoundError,
    EventSpecificationNameInvalidError,
    EventSpecificationNameAlredyExistsError
}