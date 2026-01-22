import { getUsersRepository } from "../../repository/users/get-users.repository.js";
import * as UserErrors from "../../errors/user.errors.js";

export async function getUsersService({
  orderBy = undefined,
  order = "asc",
  limit = undefined,
  offset = 0
} = {}) {

  const allowedOrderBy = ["created_at", "name"];
  const allowedOrder = ["asc", "desc"];

  if (orderBy !== undefined && !allowedOrderBy.includes(orderBy)) {
    throw new UserErrors.InvalidUserOrderByError();
  }

  if (!allowedOrder.includes(order)) {
    throw new UserErrors.InvalidUserOrderError();
  }

  if (limit !== undefined) {
    if (!Number.isInteger(limit) || limit < 1) {
      throw new UserErrors.InvalidUserLimitError();
    }
  }

  if (!Number.isInteger(offset) || offset < 0) {
    throw new UserErrors.InvalidUserOffsetError();
  }

  return await getUsersRepository({ orderBy, order, limit, offset });
}
