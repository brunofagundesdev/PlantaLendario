// import do auth e controller
import { createUserController } from "../controllers/users/create-user.controller.js";

export function eventRoutes(app) {
    app.get("/users", (request, reply) => {
        
    })

    app.get("/users/:id", (request, reply) => {

    })

    app.post("/users",{ preHandler: []}, createUserController); //usar esse pra todos outros métodos

    app.patch("/users/:id", (request, reply) => {
        
    })

    app.put("/users/:id", (request, reply) => {

    })

    app.delete("/users/:id", (request, reply) => {

    })
}