// Controllers
import roleController from "./role.controller.js";

// // Middlewares
import ensureAuthenticated from "../../middlewares/ensure-authenticated.middleware.js";
import ensureAdmin from "../../middlewares/ensure-admin.middleware.js";

export default function roleRoute(app) {
    
    app.post("/", { preHandler: [ensureAuthenticated, ensureAdmin] }, roleController.create);
    app.get("/:id", { preHandler: [ensureAuthenticated] }, roleController.get);
    app.get("/", { preHandler: [ensureAuthenticated] }, roleController.list);
    app.patch("/:id", { preHandler: [ensureAuthenticated, ensureAuthenticated] }, roleController.update);
    app.delete("/:id", { preHandler: [ensureAuthenticated, ensureAdmin] }, roleController.delete);
}