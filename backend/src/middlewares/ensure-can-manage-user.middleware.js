import "dotenv/config.js";

import { UserNotAuthorized } from "../errors/userRoles.errors.js";

async function ensureCanManageUser(request) {
    let jwtId = request.user?.id;
    let requestId = request.params.id;

    if (
        !request.user.roles.some(role => role.id === process.env.DAVE_ID) &&
        jwtId !== requestId
    ) {
        throw new UserNotAuthorized();
    }
}

export {
    ensureCanManageUser
}