import { getUserRepository } from "../../repository/users/get-user.repository.js";
import { getUserByEmailRepository } from "../../repository/users/get-user-by-email.repository.js";
import * as UserErrors from "../../errors/user.errors.js";
import { validate as uuidValidate } from "uuid";
import { normalizeEmail } from 'email-normalizer';
import { isValidEmail } from "../../utils/validate-email.js";
import bcrypt from "bcrypt";

import { putUserRepository } from "../../repository/users/put-user.repository.js";

export async function putUserService({ id, body = {} }) {

    if (!uuidValidate(id)) {
        throw new UserErrors.UserIdInvalidError();
    }

    const user = await getUserRepository({ id });

    if (!user) {
        throw new UserErrors.UserNotFoundError();
    }

    let {
        name,
        email,
        password
    } = body;

    if (!name || !email || !password) {
        throw new UserErrors.InvalidUserPutError();
    }

    let normalizedEmail = normalizeEmail({ email });

    if (!isValidEmail({ email: normalizedEmail })) {
        throw new UserEmailInvalidError();
    }

    let getUserRegistered = await getUserByEmailRepository({ email:normalizedEmail });

    if (getUserRegistered.length) {
        throw new UserAlreadyExistsError();
    }

    // Hash da senha
    const hash = await bcrypt.hash(password, 12);


    return await putUserRepository({
        id,
        body: {
            name,
            email: normalizedEmail,
            password: hash
        }
    });
}