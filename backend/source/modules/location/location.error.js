import AppError from "../../errors/app.error.js";


class LocationIdInvalidError extends AppError {
    constructor(){
        super('Id de localização inválido', 400);
    }
}
class LocationNameInvalidError extends AppError {
    constructor(){
        super('Nome de localização inválido', 400);
    }
}

class LocationNotFoundError extends AppError {
    constructor(){
        super('Localização não encontrada', 400);
    }
}

class LocationNameNotInformedError extends AppError {
    constructor(){
        super('Nome de localização não informada', 400);
    }
}

class LocationNameAlredyRegisteredError extends AppError {
    constructor(){
        super('Nome de localização já registrado', 400);
    }
}

class LocationUpdateInvalidError extends AppError {
    constructor(){
        super('Pelo menos um campo válido deve ser fornecido', 400);
    }
}

class LocationParentInvalidError extends AppError {
    constructor(){
        super('Id de localização pai inválida', 400);
    }
}

class LocationParentNotFoundError extends AppError {
    constructor(){
        super('Localização pai não encontrada', 400);
    }
}

class LocationTypeInvalidError extends AppError {
    constructor(){
        super('Tipo de localização inválida', 400);
    }
}

export {
    LocationIdInvalidError,
    LocationNameInvalidError,
    LocationNotFoundError,
    LocationNameAlredyRegisteredError,
    LocationUpdateInvalidError,
    LocationNameNotInformedError,
    LocationParentInvalidError,
    LocationParentNotFoundError,
    LocationTypeInvalidError
}