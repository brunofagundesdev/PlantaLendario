// Controller
import userController from "./user.controller.js";

// Middlewares
import ensureAuthenticated from "../../middlewares/ensure-authenticated.middleware.js";
import ensureAdmin from "../../middlewares/ensure-admin.middleware.js";
import ensureCanManageUser from "../../middlewares/ensure-can-manage-user.middleware.js";

// Roles
import userRoleRoute from "../user-role/user-role.route.js";

export default async function userRoute(app) {

    //CRUD
    app.post("/", { preHandler: [ensureAuthenticated, ensureAdmin] }, userController.create);
    app.get("/:id", { preHandler: [ensureAuthenticated, ensureCanManageUser] }, userController.get);
    app.get("/", { preHandler: [ensureAuthenticated, ensureAdmin] }, userController.list);

    app.patch("/:id", { preHandler: [ensureAuthenticated, ensureCanManageUser] }, userController.update);
    app.delete("/:id", { preHandler: [ensureAuthenticated, ensureCanManageUser] }, userController.delete);

    // Roles
    app.register(userRoleRoute, { prefix: "/:userId/roles" });
}