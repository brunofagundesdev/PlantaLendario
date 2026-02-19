import { AppError } from "../appError.error.js";

class EventIdInvalidError extends AppError {
    constructor(){
        super('Id de evento inválido', 400)
    }
}

class EventNotFoundError extends AppError {
    constructor(){
        super('Evento não encontrado', 400)
    }
}

// Propriedades do Evento
class EventTitleInvalidError extends AppError {
    constructor(){
        super('Título de evento inválido', 400)
    }
}
class EventDescriptionInvalidError extends AppError {
    constructor(){
        super('Descrição de evento inválida', 400)
    }
}

export {
    EventIdInvalidError,
    EventNotFoundError,
    EventTitleInvalidError,
    EventDescriptionInvalidError
}