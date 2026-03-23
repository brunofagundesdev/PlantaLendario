import disciplineTeacherService from "./discipline-teacher.service.js";
import DisciplineTeacherSanitizer from "./discipline-teacher.sanitizer.js";

class DisciplineTeacherController { // /disciplines/:id/teachers
    constructor({ service }) {
        this.service = service;
    }

    async assign(request, reply) {
        let { disciplineId } = request.params;
        let { teacherId } = request.body;

        let sanitized = DisciplineTeacherSanitizer.parseAssign({ disciplineId, teacherId });
        let assignment = await this.service.assign(sanitized);

        return reply.status(201).send(assignment);
    }

    async deassign(request, reply) {
        let { disciplineId, teacherId } = request.params;

        let sanitized = DisciplineTeacherSanitizer.parseDeassign({ disciplineId, teacherId });
        let deassignment = await this.service.deassign(sanitized);

        return reply.status(204).send();
    }
}

const disciplineTeacherController = new DisciplineTeacherController({ service: disciplineTeacherService });
export default disciplineTeacherController;