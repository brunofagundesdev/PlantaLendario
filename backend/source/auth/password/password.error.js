import PasswordValidator from "./password.validator.js";

// criacao - alteracao
class PasswordShortError extends AppError {
    constructor() {
        super(`A senha deve conter no mínimo ${PasswordValidator.rules.length.min} caracteres`, 400);
    }
}

class PasswordLongError extends AppError {
    constructor() {
        super(`A senha deve conter no máximo ${PasswordValidator.rules.length.max} caracteres`, 400);
    }
}

export {
    PasswordShortError,
    PasswordLongError,

}