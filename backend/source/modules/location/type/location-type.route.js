import locationTypeController from "./location-type.controller.js";

export default async function locationTypeRoute(app) { // /locations/types

    app.post("/", { preHandler: [] }, locationTypeController.create);
    app.get("/:id", { preHandler: [] }, locationTypeController.get);
    app.get("/", { preHandler: [] }, locationTypeController.list);
    app.patch("/:id", { preHandler: [] }, locationTypeController.update);
    app.delete("/:id", { preHandler: [] }, locationTypeController.delete);
    
}