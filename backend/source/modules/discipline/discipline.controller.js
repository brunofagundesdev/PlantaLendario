import disciplineService from "./discipline.service.js";
import DisciplineSanitizer from "./discipline.sanitizer.js";

class DisciplineController {
    constructor({ service }) {
        this.service = service;
    }

    async create(request, reply) {
        let data = request.body;

        let sanitized = DisciplineSanitizer.parseCreate({ data });

        let createdDiscipline = await disciplineService.create(sanitized);
        return reply.status(201).send(createdDiscipline);
    }

    async delete(request, reply) {
        let { id } = request.params;
        let sanitized = DisciplineSanitizer.parseDelete({ id });

        let deletedDiscipline = await disciplineService.delete(sanitized);
        return reply.status(204).send();
    }

    async get(request, reply) {
        let { id } = request.params;
        let sanitized = DisciplineSanitizer.parseGet({ id });

        let caughtDiscipline = await disciplineService.get(sanitized);
        return reply.status(200).send(caughtDiscipline);
    }

    async list(request, reply) {
        let listedDisciplines = await disciplineService.list();
        return reply.status(200).send(listedDisciplines);
    }

    async update(request, reply) {
        let { id } = request.params;
        let data = request.body;

        let sanitized = DisciplineSanitizer.parseUpdate({ id, data });
        let updatedDiscipline = await disciplineService.update(sanitized);
        return reply.status(200).send(updatedDiscipline);

    }
}

const disciplineController = new DisciplineController({ service: disciplineService });
export default disciplineController;