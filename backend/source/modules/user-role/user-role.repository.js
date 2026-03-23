import { database } from "../../infra/database.js";

class UserRoleRepository {
    constructor({ database }) {
        this.database = database;
    }

    async assign({ userId, roleId }) {
        let result = await this.database`
            insert into account_role(account, role)
            values (${userId}, ${roleId})
            returning account, role;
        `;

        return result;
    }

    async getRolesByUser({ userId }) {
        let result = await this.database`
            select role.id, role.name, role.color
            from role
            join account_role on account_role.role = role.id
            where account_role.account = ${userId};
        `;

        return result;
    }

    async deassign({ userId, roleId }) {
        let result = await this.database`
            delete from account_role
            where account = ${userId} and role = ${roleId}
            returning account, role;
        `;

        return result;
    }
}

const userRoleController = new UserRoleRepository({ database: database });
export default userRoleController;