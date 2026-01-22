import { getUserByIdRepository } from "../../repository/users/get-user-by-id.repository.js";
import * as UserErrors from "../../errors/user.errors.js";
import { validate as uuidValidate} from "uuid";

export async function getUserService({ id } = {}) {

  if(!uuidValidate(id)){
    throw new UserErrors.UserIdInvalidError();
  }

  const user = await getUserByIdRepository({ id });

  if (!user) {
    throw new UserErrors.UserNotFoundError();
  }
  return user;
}
