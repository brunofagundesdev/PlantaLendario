import { assignRoleToUserController } from "../controllers/users-roles/assign-role-to-user.controller.js"
import { removeRoleFromUserController } from "../controllers/users-roles/remove-role-from-user.controller.js"

async function userRoleRoutes(app) {

    app.post("/", { preHandler: [] }, assignRoleToUserController);
    app.delete("/:roleId", { preHandler: [] }, removeRoleFromUserController);
    
}

export {
    userRoleRoutes
}