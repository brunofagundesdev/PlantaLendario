// Controllers
import { createUserController } from "../controllers/users/create-user.controller.js";
import { deleteUserController } from "../controllers/users/delete-user.controller.js";
import { getUsersController } from "../controllers/users/get-users.controller.js";
import { getUserController } from "../controllers/users/get-user.controller.js";
import { putUserController } from "../controllers/users/put-user.controller.js";
import { patchUserController } from "../controllers/users/patch-user.controller.js";
// Middlewares
import { ensureAuthenticated } from "../middlewares/ensure-authenticated.middleware.js";

// Roles
import { userRoleRoutes } from "./usersRoles.routes.js";

export async function userRoutes(app) {

    //CRUD
    app.get("/", { preHandler: [ensureAuthenticated] }, getUsersController);
    app.get("/:id", { preHandler: [] }, getUserController);

    app.post("/", { preHandler: [] }, createUserController);
    app.put("/:id", { preHandler: [] }, putUserController);
    app.patch("/:id", { preHandler: [] }, patchUserController);
    app.delete("/:id", { preHandler: [] }, deleteUserController);

    // Roles
    app.register(userRoleRoutes, { prefix: "/:id/roles"});
}