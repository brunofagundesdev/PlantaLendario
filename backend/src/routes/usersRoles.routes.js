import { assignRoleController } from "../controllers/usersRoles/assign-role.controller.js"
import { removeRoleController } from "../controllers/usersRoles/remove-role.controller.js"

async function userRoleRoutes(app) {

    app.post("/", { preHandler: [] }, assignRoleController);
    app.delete("/:roleId", { preHandler: [] }, removeRoleController);
    
}

export {
    userRoleRoutes
}