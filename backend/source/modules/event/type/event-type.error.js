import AppError from "../../../errors/app.error.js";

class EventTypeNameInvalidError extends AppError {
    constructor(){
        super('Nome de tipo de evento inválido', 400);
    }
}

class EventTypeIdInvalidError extends AppError {
    constructor(){
        super('Id de tipo de evento inválido', 400);
    }
}

class EventTypeNotFoundError extends AppError {
    constructor(){
        super('Tipo de evento não encontrado', 400);
    }
}

class EventTypeNameAlredyRegisteredError extends AppError {
    constructor(){
        super('Nome de tipo de evento já registrado', 400);
    }
}

class EventTypeUpdateInvalidError extends AppError {
  constructor(){
    super('Pelo menos um campo válido deve ser fornecido' ,400);
  }
}

export {
    EventTypeNameInvalidError,
    EventTypeIdInvalidError,
    EventTypeNotFoundError,
    EventTypeNameAlredyRegisteredError,
    EventTypeUpdateInvalidError
}