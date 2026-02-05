import { getUserRepository } from "../../repository/users/get-user.repository.js";
import { getUserByEmailRepository } from "../../repository/users/get-user-by-email.repository.js";
import * as UserErrors from "../../errors/user.errors.js";
import { validate as uuidValidate } from "uuid";
import { normalizeEmail } from 'email-normalizer';
import { isValidEmail } from "../../utils/validate-email.js";
import bcrypt from "bcrypt";

import { patchUserRepository } from "../../repository/users/patch-user.repository.js";
import { UserNameInvalidError } from "../../errors/user.errors.js";

export async function patchUserService({ id, body = {} }) {

    // Id
    if (!uuidValidate(id)) {
        throw new UserErrors.UserIdInvalidError();
    }

    const user = await getUserRepository({ id });
    if (!user) {
        throw new UserErrors.UserNotFoundError();
    }

    // Body
    let { name, email, password } = body;

    if (name == null && email == null && password == null) {
        throw new UserErrors.InvalidUserPatchError();
    }

    // Name
    if (name != null) {
        if (typeof name !== 'string') {
            throw new UserNameInvalidError();
        }
    }

    let normalizedEmail;
    if (email != null) {
        normalizedEmail = normalizeEmail({ email });

        if (!isValidEmail({ email: normalizedEmail })) {
            throw new UserErrors.UserEmailInvalidError();
        }

        const existing = await getUserByEmailRepository({
            email: normalizedEmail
        });

        if (existing) {
            throw new UserErrors.UserEmailDuplicatedError();
        }
    }

    let hash;
    if (password != null) {
        hash = await bcrypt.hash(password, 12);
    }

    const patchBody = {};
    if (name != null) patchBody.name = name;
    if (normalizedEmail != null) patchBody.email = normalizedEmail;
    if (hash != null) patchBody.password = hash;

    return await patchUserRepository({ id, body: patchBody });
}
