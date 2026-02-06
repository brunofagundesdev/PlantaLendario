import { createUserRepository } from "../../repository/users/create-user.repository.js";

import { getUserByEmailRepository } from "../../repository/users/get-user-by-email.repository.js";
import { getUserByNameRepository } from "../../repository/users/get-user-by-name.repository.js";

import bcrypt from "bcrypt";
import { isValidEmail } from "../../utils/validate-email.js";

import { normalizeName } from "../../utils/normalize-name.js";
import { normalizeEmail } from 'email-normalizer';
// Erros
import * as UserErrors from "../../errors/user.errors.js";


export async function createUserService({ name, email, password }) { // Object

    //Name
    if (typeof name !== 'string') {
        throw new UserErrors.UserNameInvalidError();
    }

    let normalizedName = normalizeName(name);

    if (!normalizedName) {
        throw new UserErrors.UserNameInvalidError();
    }

    let existingUserName = await getUserByNameRepository({ name: normalizedName });

    if (existingUserName) {
        throw new UserErrors.UserNameAlredyExistsError();
    }

    //Email
    let normalizedEmail = normalizeEmail({ email });

    if (!isValidEmail({ email })) {
        throw new UserErrors.UserEmailInvalidError();
    }

    

    // Regras de negócio
    let getUserRegistered = await getUserByEmailRepository({ email: normalizedEmail });

    if (getUserRegistered) {
        throw new UserErrors.UserEmailDuplicatedError();
    }

    // Hash da senha
    const hash = await bcrypt.hash(password, 12);

    // Criar conta no banco
    return await createUserRepository({ name: normalizedName, email: normalizedEmail, password: hash });
}
