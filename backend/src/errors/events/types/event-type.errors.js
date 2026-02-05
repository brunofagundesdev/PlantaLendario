import { AppError } from "../../appError.error.js";

class EventTypeNameInvalidError extends AppError {
    constructor(){
        super('Nome de tipo de evento inválido', 400);
    }
}

export {
    EventTypeNameInvalidError
}