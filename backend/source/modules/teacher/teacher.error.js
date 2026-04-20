import AppError from "../../errors/app.error.js";


class TeacherIdInvalidError extends AppError {
    constructor() {
        super('Id de professor inválido', 400);
    }
}
class TeacherNameInvalidError extends AppError {
    constructor() {
        super('Nome de professor inválido', 400);
    }
}
class TeacherEmailInvalidError extends AppError {
    constructor() {
        super('Email de professor inválido', 400);
    }
}
class TeacherTelephoneInvalidError extends AppError {
    constructor() {
        super('Telefone de professor inválido', 400);
    }
}

class TeacherNotFoundError extends AppError {
    constructor() {
        super('Professor não encontrado', 400);
    }
}

class TeacherNameNotInformedError extends AppError {
    constructor() {
        super('Nome de professor não informado', 400);
    }
}

class TeacherNameAlredyRegisteredError extends AppError {
    constructor() {
        super('Nome de professor já registrado', 400);
    }
}

class TeacherEmailAlredyRegisteredError extends AppError {
    constructor() {
        super('Email de professor já registrado', 400);
    }
}

class TeacherTelephoneAlredyRegisteredError extends AppError {
    constructor() {
        super('Telefone de professor já registrado', 400);
    }
}

class TeacherUpdateInvalidError extends AppError {
    constructor() {
        super('Pelo menos um campo válido deve ser fornecido', 400);
    }
}

export {
    TeacherIdInvalidError,
    TeacherNameInvalidError,
    TeacherEmailInvalidError,
    TeacherTelephoneInvalidError,
    TeacherNotFoundError,
    TeacherNameAlredyRegisteredError,
    TeacherUpdateInvalidError,
    TeacherEmailAlredyRegisteredError,
    TeacherTelephoneAlredyRegisteredError,
    TeacherNameNotInformedError
}