import "dotenv/config.js";

import { UserUnauthorizedError } from "../modules/user-role/user-role.error.js";

async function ensureCanManageUser(request) {
    let jwtId = request.user?.id;
    let requestId = request.params.id;

    if (
        !request.user.roles.some(role => role.id === process.env.DAVE_ID) &&
        jwtId !== requestId
    ) {
        throw new UserUnauthorizedError();
    }
}

export {
    ensureCanManageUser
}