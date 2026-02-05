import "dotenv/config.js";

// Errors
import { UserNotAuthorized } from "../errors/userRoles.errors.js";

async function ensureAdmin(request) {
    if (!request.user.roles.some(role => role.id === process.env.DAVE_ID)) {
        throw new UserNotAuthorized();
    }
}

export {
    ensureAdmin
}