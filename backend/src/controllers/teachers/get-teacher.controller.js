import { getTeacherService } from "../../services/teachers/get-teacher.service.js";

async function getTeacherController(request, reply) {
    let { id } = request.params;

    let teacher = await getTeacherService({ id });

    return reply.status(200).send(teacher);
}

export {
    getTeacherController
}