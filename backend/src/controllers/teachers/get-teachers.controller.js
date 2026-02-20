import { getTeachersService } from "../../services/teachers/get-teachers.service.js";

async function getTeachersController(request, reply) {

    let teachers = await getTeachersService();

    return reply.status(200).send(teachers);
}

export {
    getTeachersController
}