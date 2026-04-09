import authController from "./auth.controller.js";

export default async function authRoute(app) {

    app.post("/register", { preHandler: [] }, authController.register);
    app.post("/login", { preHandler: [] }, authController.login);
    app.post("/logout", { preHandler: [] }, authController.logout);

}