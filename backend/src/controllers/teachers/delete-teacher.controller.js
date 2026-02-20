import { deleteTeacherService } from "../../services/teachers/delete-teacher.service.js";

async function deleteTeacherController(request, reply) {
    let { id } = request.params;
    let deletedTeacher = await deleteTeacherService({ id });
    return reply.status(204).send();
}

export {
    deleteTeacherController
}