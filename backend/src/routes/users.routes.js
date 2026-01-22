// import do auth e controller
import { createUserController } from "../controllers/users/create-user.controller.js";
import { deleteUserController } from "../controllers/users/delete-user.controller.js";
import { getUsersController } from "../controllers/users/get-users.controller.js";
import { getUserController } from "../controllers/users/get-user.controller.js";
import { putUserController } from "../controllers/users/put-user.controller.js";
import { patchUserController } from "../controllers/users/patch-user.controller.js";

export function userRoutes(app) {

    app.get("/", { preHandler: [] }, getUsersController);
    app.get("/:id", { preHandler: [] }, getUserController);

    app.post("/", { preHandler: [] }, createUserController);
    app.put("/:id", { preHandler: [] }, putUserController);
    app.patch("/:id", { preHandler: [] }, patchUserController);
    app.delete("/:id", { preHandler: [] }, deleteUserController);
}