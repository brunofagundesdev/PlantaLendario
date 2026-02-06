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


export {
    EventSpecificationIdInvalidError,
    EventSpecificationNotFoundError
}