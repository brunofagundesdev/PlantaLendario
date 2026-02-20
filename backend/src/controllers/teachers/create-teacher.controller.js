import { createTeacherService } from "../../services/teachers/create-teacher.service.js";

async function createTeacherController(request, reply) {
    let teacher = request.body;

    let createdTeacher = await createTeacherService(teacher);

    return reply.status(201).send()
}

export {
    createTeacherController
}