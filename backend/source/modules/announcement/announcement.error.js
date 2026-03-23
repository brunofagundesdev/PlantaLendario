import AppError from "../../errors/app.error.js";

class AnnouncementIdInvalidError extends AppError {
    constructor(){
        super('Id de aviso inválido', 400);
    }
}

class AnnouncementTitleInvalidError extends AppError {
    constructor(){
        super('Título de aviso inválido', 400);
    }
}

class AnnouncementMessageInvalidError extends AppError {
    constructor(){
        super('Mensagem de aviso inválido', 400);
    }
}

class AnnouncementNotFoundError extends AppError {
    constructor(){
        super('Aviso não encontrado', 404);
    }
}


export {
    AnnouncementIdInvalidError,
    AnnouncementTitleInvalidError,
    AnnouncementMessageInvalidError,
    AnnouncementNotFoundError
}