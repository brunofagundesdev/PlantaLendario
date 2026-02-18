import "dotenv/config.js";

// Errors
import { UserUnauthorizedError } from "../errors/user-role.errors.js";

async function ensureAdmin(request) {
    let userHasAdminRole = request.user.roles.some(role => role.id === process.env.DAVE_ID);
    if (!userHasAdminRole) {
        throw new UserUnauthorizedError();
    }
}

export {
    ensureAdmin
}