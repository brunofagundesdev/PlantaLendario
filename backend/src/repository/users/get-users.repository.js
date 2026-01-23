import { database } from "../../infra/database.js";

export async function getUsersRepository({
    orderBy = null,
    order = 'asc',
    limit = null,
    offset = 0,
} = {}) {


    const orderClause =
        orderBy === null
            ? database``
            : database`order by ${database.unsafe(orderBy)} ${database.unsafe(order)}`;

    const limitClause =
        limit === null
            ? database``
            : database`limit ${limit}`;

    const result = await database`
        select *
        from account
        ${orderClause}
        ${limitClause}
        offset ${offset}
    `;

    return result;
}