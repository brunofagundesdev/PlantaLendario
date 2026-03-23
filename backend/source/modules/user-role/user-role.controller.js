import userRoleService from "./user-role.service.js";
import UserRoleSanitizer from "./user-role.sanitizer.js";

class UserRoleController {
    constructor({ service }) {
        this.service = service;
    }

    async assign(request, reply) {
        let { userId } = request.params;
        let { roleId } = request.body;

        let sanitized = UserRoleSanitizer.parseAssign({ userId, roleId });
        let assignment = await this.service.assign(sanitized);

        return reply.status(201).send(assignment);
    }

    async deassign(request, reply) {
        let { userId, roleId } = request.params;
        
        let sanitized = UserRoleSanitizer.parseDeassign({ userId, roleId });
        let deassignment = await this.service.deassign(sanitized);

        return reply.status(204).send();
    }
}

const userRoleController = new UserRoleController({ service: userRoleService });
export default userRoleController;