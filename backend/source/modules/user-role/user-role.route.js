import userRoleController from "./user-role.controller.js";
// import ensureAdmin

async function userRoleRoute(app) { // /users/:id/roles
    app.post("/", { preHandler: [] }, userRoleController.assign);
    app.delete("/:roleId", { preHandler: [] }, userRoleController.deassign);
}

export {
    userRoleRoute
}