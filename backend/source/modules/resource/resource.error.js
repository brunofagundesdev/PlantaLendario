import AppError from "../../errors/app.error.js";

class ResourceIdInvalidError extends AppError {
    constructor() {
        super('Id de recurso inválido', 400);
    }
}

class ResourceTitleInvalidError extends AppError {
    constructor() {
        super('Título de recurso inválido', 400);
    }
}

class ResourceTypeInvalidError extends AppError {
    constructor() {
        super('Tipo de recurso inválido', 400);
    }
}

class ResourceDescriptionInvalidError extends AppError {
    constructor() {
        super('Mensagem de recurso inválido', 400);
    }
}

class ResourceNotFoundError extends AppError {
    constructor() {
        super('Recurso não encontrado', 404);
    }
}

export {
    ResourceIdInvalidError,
    ResourceTitleInvalidError,
    ResourceDescriptionInvalidError,
    ResourceNotFoundError,
    ResourceTypeInvalidError
}