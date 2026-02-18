// Controllers
import { createUserController } from "../controllers/users/create-user.controller.js";
import { deleteUserController } from "../controllers/users/delete-user.controller.js";
import { getUsersController } from "../controllers/users/get-users.controller.js";
import { getUserController } from "../controllers/users/get-user.controller.js";
import { patchUserController } from "../controllers/users/patch-user.controller.js";

// Middlewares
import { ensureAuthenticated } from "../middlewares/ensure-authenticated.middleware.js";
import { ensureAdmin } from "../middlewares/ensure-admin.middleware.js";
import { ensureCanManageUser } from "../middlewares/ensure-can-manage-user.middleware.js";

// Roles
import { userRoleRoutes } from "./users-roles.routes.js";

async function userRoutes(app) {

    //CRUD
    app.get("/", { preHandler: [ensureAuthenticated, ensureAdmin] }, getUsersController);
    app.get("/:id", { preHandler: [ensureAuthenticated, ensureCanManageUser] }, getUserController);

    app.post("/", { preHandler: [] }, createUserController);
    app.patch("/:id", { preHandler: [ensureAuthenticated, ensureCanManageUser] }, patchUserController);
    app.delete("/:id", { preHandler: [ensureAuthenticated, ensureCanManageUser] }, deleteUserController);

    // Roles
    app.register(userRoleRoutes, { prefix: "/:id/roles" });
}

export {
    userRoutes
}