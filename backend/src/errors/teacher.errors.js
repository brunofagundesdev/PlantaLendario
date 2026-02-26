import { AppError } from "./appError.error.js";


class TeacherIdInvalidError extends AppError {
    constructor(){
        super('Id de professor inválido', 400);
    }
}
class TeacherNameInvalidError extends AppError {
    constructor(){
        super('Nome de professor inválido', 400);
    }
}
class TeacherEmailInvalidError extends AppError {
    constructor(){
        super('Email de professor inválido', 400);
    }
}
class TeacherTelephoneInvalidError extends AppError {
    constructor(){
        super('Telefone de professor inválido', 400);
    }
}

class TeacherNotFoundError extends AppError {
    constructor(){
        super('Professor não encontrado', 400);
    }
}

class TeacherNameAlredyExistsError extends AppError {
    constructor(){
        super('Nome de professor já registrado', 400);
    }
}

export {
    TeacherIdInvalidError,
    TeacherNameInvalidError,
    TeacherEmailInvalidError,
    TeacherTelephoneInvalidError,
    TeacherNotFoundError,
    TeacherNameAlredyExistsError
}