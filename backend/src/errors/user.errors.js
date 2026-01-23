import { AppError } from './appError.error.js';

class UserEmailDuplicatedError extends AppError {
  constructor() {
    super('Email já registrado no sistema', 409);
  }
}

class UserEmailInvalidError extends AppError {
  constructor() {
    super('Email inválido', 400);
  }
}

class UserIdInvalidError extends AppError {
  constructor() {
    super('Id inválido', 400);
  }
}

class UserNotFoundError extends AppError {
  constructor() {
    super('Usúario não encontrado', 404);
  }
}



class InvalidUserOrderByError extends AppError {
  constructor() {
    super('Campo de ordenação inválido', 400);
  }
}

class InvalidUserOrderError extends AppError {
  constructor() {
    super('Direção de ordenação inválida', 400);
  }
}

class InvalidUserLimitError extends AppError {
  constructor() {
    super('Limite inválido', 400);
  }
}

class InvalidUserOffsetError extends AppError {
  constructor() {
    super('Offset inválido', 400);
  }
}

class InvalidUserPutError extends AppError {
  constructor(){
    super('Todos os campos obrigatórios devem ser preenchidos.' ,400);
  }
}
class InvalidUserPatchError extends AppError {
  constructor(){
    super('Pelo menos um campo válido deve ser fornecido.' ,400);
  }
}

export {
  UserEmailDuplicatedError,
  UserEmailInvalidError,
  UserIdInvalidError,
  UserNotFoundError,
  InvalidUserOrderByError,
  InvalidUserOrderError,
  InvalidUserLimitError,
  InvalidUserOffsetError,
  InvalidUserPutError,
  InvalidUserPatchError
}