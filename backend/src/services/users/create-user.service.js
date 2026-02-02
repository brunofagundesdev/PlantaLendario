import { createUserRepository } from "../../repository/users/create-user.repository.js";
import { getUserByEmailRepository } from "../../repository/users/get-user-by-email.repository.js";
import { normalizeName } from "../../utils/normalize-name.js";
import bcrypt from "bcrypt";
import { normalizeEmail } from 'email-normalizer';
import { isValidEmail } from "../../utils/validate-email.js";
// Erros
import { UserEmailInvalidError, UserEmailDuplicatedError } from "../../errors/user.errors.js";

export async function createUserService({ name, email, password }) { // Object

    // Normalização e Validação
    let normalizedName = normalizeName(name);
    let normalizedEmail = normalizeEmail({ email });

    if (!isValidEmail({ email })) {
        throw new UserEmailInvalidError();
    }

    // Regras de negócio
    let getUserRegistered = await getUserByEmailRepository({ email: normalizedEmail });

    if (getUserRegistered) {
        throw new UserEmailDuplicatedError();
    }

    // Hash da senha
    const hash = await bcrypt.hash(password, 12);

    // Criar conta no banco
    return await createUserRepository({ name: normalizedName, email: normalizedEmail, password: hash });
}
