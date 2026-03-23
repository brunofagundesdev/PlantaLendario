import { JWT } from "../utils/jwt.js";

import * as AuthErrors from "../auth/auth.error.js";

async function ensureAuthenticated(request) {
    let { authorization } = request.headers;

    if (!authorization) {
        throw new AuthErrors.AuthMissingTokenError();
    }

    if (!authorization.startsWith("Bearer ")) {
        throw new AuthErrors.AuthUnauthorizedError();
    }

    let token = authorization.slice(7);

    let payload = JWT.verify(token);
    request.user = payload;
    console.log(request.user)
}

export {
    ensureAuthenticated
}