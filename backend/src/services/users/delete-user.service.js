import { deleteUserRepository } from "../../repository/users/delete-user.repository.js";
import { getUserByIdRepository } from "../../repository/users/get-user-by-id.repository.js";
import { validate as uuidValidate } from "uuid";
import * as UserErrors from "../../errors/user.errors.js";

export async function deleteUserService({ id } = {}) {
    if (!uuidValidate(id)) {
        throw new UserErrors.UserIdInvalidError();
    }

    const user = await getUserByIdRepository({ id });

    if (!user) {
        throw new UserErrors.UserNotFoundError();
    }

    return await deleteUserRepository({ id });
}