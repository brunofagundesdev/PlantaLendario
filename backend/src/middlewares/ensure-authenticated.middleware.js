import { JWT } from "../utils/jwt.js";

import { UnauthorizedError, MissingTokenError} from "../errors/auth.errors.js";

async function ensureAuthenticated(request) {
    let authorization = request.headers.authorization;
    
    if (!authorization) {
        throw new MissingTokenError();
    }
    
    if (!authorization.startsWith("Bearer ")) {
        throw new UnauthorizedError();
    }
    
    let token = authorization.slice(7);
    
    let payload = JWT.verify(token);
    request.user = payload;
}

export {
    ensureAuthenticated
}