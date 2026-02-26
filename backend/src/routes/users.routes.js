// Controller
import userController from "../controllers/user.controller.js";

// Middlewares
import { ensureAuthenticated } from "../middlewares/ensure-authenticated.middleware.js";
import { ensureAdmin } from "../middlewares/ensure-admin.middleware.js";
import { ensureCanManageUser } from "../middlewares/ensure-can-manage-user.middleware.js";

// Roles
import { userRoleRoutes } from "./users-roles.routes.js";

async function userRoutes(app) {

    //CRUD
    app.post("/", { preHandler: [] }, userController.create);
    app.get("/:id", { preHandler: [ensureAuthenticated, ensureCanManageUser] }, userController.list);
    app.get("/", { preHandler: [ensureAuthenticated, ensureAdmin] }, userController.get);

    app.patch("/:id", { preHandler: [ensureAuthenticated, ensureCanManageUser] }, userController.update);
    app.delete("/:id", { preHandler: [ensureAuthenticated, ensureCanManageUser] }, userController.delete);

    // Roles
    app.register(userRoleRoutes, { prefix: "/:id/roles" });
}

export {
    userRoutes
}