import AppError from "../../errors/app.error.js";


class DisciplineIdInvalidError extends AppError {
    constructor(){
        super('Id de disciplina inválido', 400);
    }
}
class DisciplineNameInvalidError extends AppError {
    constructor(){
        super('Nome de disciplina inválido', 400);
    }
}

class DisciplineNotFoundError extends AppError {
    constructor(){
        super('Disciplina não encontrada', 400);
    }
}

class DisciplineNameNotInformedError extends AppError {
    constructor(){
        super('Nome de disciplina não informada', 400);
    }
}

class DisciplineNameAlredyRegisteredError extends AppError {
    constructor(){
        super('Nome de disciplina já registrado', 400);
    }
}

class DisciplineUpdateInvalidError extends AppError {
    constructor(){
        super('Pelo menos um campo válido deve ser fornecido', 400);
    }
}

export {
    DisciplineIdInvalidError,
    DisciplineNameInvalidError,
    DisciplineNotFoundError,
    DisciplineNameAlredyRegisteredError,
    DisciplineUpdateInvalidError,
    DisciplineNameNotInformedError
}