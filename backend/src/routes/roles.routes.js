// Controllers
import { getRolesController } from "../controllers/roles/get-roles.controller.js";
import { getRoleController } from "../controllers/roles/get-role.controller.js";
import { createRoleController } from "../controllers/roles/create-role.controller.js";
import { deleteRoleController } from "../controllers/roles/delete-role.controller.js";
import { patchRoleController } from "../controllers/roles/patch-role.controller.js";

// // Middlewares
// import { ensureAuthenticated } from "../middlewares/ensure-authenticated.middleware.js";

function roleRoutes(app) {

    app.get("/", { preHandler: [] }, getRolesController);
    app.get("/:id", { preHandler: [] }, getRoleController);

    app.post("/", { preHandler: [] }, createRoleController);
    app.patch("/:id", { preHandler: [] }, patchRoleController);
    app.delete("/:id", { preHandler: [] }, deleteRoleController);
}

export {
    roleRoutes
}