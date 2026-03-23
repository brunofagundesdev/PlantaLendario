import { UserNotAuthorized } from "../errors/userRoles.errors.js";

async function ensureSelf(request){
    let jwtId = request.user.id;
    let requestId = request.params.id;

    if (jwtId !== requestId) {
        throw new UserNotAuthorized();
    }
}

export {
    ensureSelf
}