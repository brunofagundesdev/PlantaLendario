import { getUserRepository } from "../../repository/users/get-user.repository.js";
import { getRolesByUserIdRepository } from "../../repository/usersRoles/get-roles-by-user-id.repository.js";
import * as UserErrors from "../../errors/user.errors.js";
import { validate as uuidValidate } from "uuid";

export async function getUserService({ id } = {}) {

  if (!uuidValidate(id)) {
    throw new UserErrors.UserIdInvalidError();
  }

  const user = await getUserRepository({ id });
  const roles = await getRolesByUserIdRepository({ id });

  if (!user) {
    throw new UserErrors.UserNotFoundError();
  }
  return {
    ...user,
    roles
  };
}
