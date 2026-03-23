import AppError from "../../../errors/app.error.js";

class EventSpecificationNameInvalidError extends AppError {
    constructor(){
        super('Nome de especificação de evento inválido', 400);
    }
}

class EventSpecificationIdInvalidError extends AppError {
    constructor(){
        super('Id de especificação de evento inválido', 400);
    }
}

class EventSpecificationNotFoundError extends AppError {
    constructor(){
        super('Especificação de evento não encontrado', 400);
    }
}

class EventSpecificationNameAlredyRegisteredError extends AppError {
    constructor(){
        super('Nome de especificação de evento já registrado', 400);
    }
}

class EventSpecificationUpdateInvalidError extends AppError {
  constructor(){
    super('Pelo menos um campo válido deve ser fornecido' ,400);
  }
}

export {
    EventSpecificationNameInvalidError,
    EventSpecificationIdInvalidError,
    EventSpecificationNotFoundError,
    EventSpecificationNameAlredyRegisteredError,
    EventSpecificationUpdateInvalidError
}