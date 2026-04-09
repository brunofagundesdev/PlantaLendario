import "dotenv/config.js";

// Errors
import * as UserRoleErrors from "../modules/user-role/user-role.error.js";

export default async function ensureAdmin(request) {
    let userHasAdminRole = request.user.roles.some(role => role.id === process.env.DAVE_ID);
    if (!userHasAdminRole) {
        throw new UserRoleErrors.UserUnauthorizedError();
    }
}