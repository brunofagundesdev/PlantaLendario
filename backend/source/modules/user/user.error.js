import AppError from "../../errors/app.error.js";

class UserEmailDuplicatedError extends AppError {
  constructor() {
    super('Email de usuário já registrado', 409);
  }
}

class UserEmailInvalidError extends AppError {
  constructor() {
    super('Email de usuário inválido', 400);
  }
}

class UserNameInvalidError extends AppError {
  constructor() {
    super('Nome de usuário inválido', 400);
  }
}

class UserNameAlredyRegisteredError extends AppError {
  constructor() {
    super('Nome de usuário já registrado', 400)
  }
}

class UserEmailAlredyRegisteredError extends AppError {
  constructor() {
    super('Email de usuário já registrado', 400)
  }
}

class UserIdInvalidError extends AppError {
  constructor() {
    super('Id de usuário inválido', 400);
  }
}

class UserNotFoundError extends AppError {
  constructor() {
    super('Usúario não encontrado', 404);
  }
}

class UserUpdateInvalidError extends AppError {
  constructor() {
    super('Pelo menos um campo válido deve ser fornecido', 400);
  }
}

export {
  UserEmailDuplicatedError,
  UserEmailInvalidError,
  UserIdInvalidError,
  UserNotFoundError,
  UserUpdateInvalidError,
  UserNameInvalidError,
  UserNameAlredyRegisteredError,
  UserEmailAlredyRegisteredError
}