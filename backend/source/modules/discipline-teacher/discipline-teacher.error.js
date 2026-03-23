import AppError from "../../errors/app.error.js";

class DisciplineAlreadyHasTeacherError extends AppError {
    constructor() {
        super('A disciplina já é ministrada por esse professor', 400);
    }
}

class DisciplineUnauthorizedError extends AppError {
    constructor() {
        super('Você não tem autorização para essa ação', 400);
    }
}

class DisciplineMissingTeacherError extends AppError {
    constructor() {
        super('A disciplina não é ministrada por esse professor', 400);
    }
}



export {
    DisciplineAlreadyHasTeacherError,
    DisciplineUnauthorizedError,
    DisciplineMissingTeacherError
}