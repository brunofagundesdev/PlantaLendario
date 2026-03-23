import teacherService from "./teacher.service.js";
import TeacherSanitizer from "./teacher.sanitizer.js";

class TeacherController {
    constructor({ service }) {
        this.service = service;
    }

    async create(request, reply) {
        let data = request.body;

        let sanitized = TeacherSanitizer.parseCreate({ data });

        let createdTeacher = await teacherService.create(sanitized);
        return reply.status(201).send(createdTeacher);
    }

    async delete(request, reply) {
        let { id } = request.params;
        let sanitized = TeacherSanitizer.parseDelete({ id });

        let deletedTeacher = await teacherService.delete(sanitized);
        return reply.status(204).send();
    }

    async get(request, reply) {
        let { id } = request.params;
        let sanitized = TeacherSanitizer.parseGet({ id });

        let caughtTeacher = await teacherService.get(sanitized);
        return reply.status(204).send(caughtTeacher);
    }

    async list(request, reply) {
        let listedTeachers = await teacherService.list();
        return reply.status(200).send(listedTeachers);
    }

    async update(request, reply) {
        let { id } = request.params;
        let data = request.body;

        let sanitized = TeacherSanitizer.parseUpdate({ id, data });
        let updatedTeacher = await teacherService.update(sanitized);
        return reply.status(200).send(updatedTeacher);

    }
}

const teacherController = new TeacherController({ service: teacherService });
export default teacherController;