import AppError from "../../../errors/app.error.js";

class LocationTypeNameInvalidError extends AppError {
    constructor(){
        super('Nome de tipo de evento inválido', 400);
    }
}

class LocationTypeIdInvalidError extends AppError {
    constructor(){
        super('Id de tipo de evento inválido', 400);
    }
}

class LocationTypeNotFoundError extends AppError {
    constructor(){
        super('Tipo de evento não encontrado', 400);
    }
}

class LocationTypeNameAlredyRegisteredError extends AppError {
    constructor(){
        super('Nome de tipo de evento já registrado', 400);
    }
}

class LocationTypeUpdateInvalidError extends AppError {
  constructor(){
    super('Pelo menos um campo válido deve ser fornecido' ,400);
  }
}

export {
    LocationTypeNameInvalidError,
    LocationTypeIdInvalidError,
    LocationTypeNotFoundError,
    LocationTypeNameAlredyRegisteredError,
    LocationTypeUpdateInvalidError
}