import AppError from "../../../errors/app.error.js";

class EventOptionNameInvalidError extends AppError {
    constructor(){
        super('Nome de opção de evento inválido', 400);
    }
}

class EventOptionIdInvalidError extends AppError {
    constructor(){
        super('Id de opção de evento inválido', 400);
    }
}

class EventOptionNotFoundError extends AppError {
    constructor(){
        super('Opção de evento não encontrado', 400);
    }
}

class EventOptionNameAlredyRegisteredError extends AppError {
    constructor(){
        super('Nome de opção de evento já registrado', 400);
    }
}

class EventOptionUpdateInvalidError extends AppError {
  constructor(){
    super('Pelo menos um campo válido deve ser fornecido' ,400);
  }
}

export {
    EventOptionNameInvalidError,
    EventOptionIdInvalidError,
    EventOptionNotFoundError,
    EventOptionNameAlredyRegisteredError,
    EventOptionUpdateInvalidError
}