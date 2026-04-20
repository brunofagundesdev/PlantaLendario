/**
 * @typedef {import('./discipline-teacher.type.js').DisciplineTeacher} DisciplineTeacher
 * @typedef {import('./discipline-teacher.type.js').DisciplineTeacherAssignData} DisciplineTeacherAssignData
 *
 * @typedef {import('fastify').FastifyRequest} FastifyRequest
 * @typedef {import('fastify').FastifyReply} FastifyReply
*/

import disciplineTeacherService from "./discipline-teacher.service.js";
import DisciplineTeacherSanitizer from "./discipline-teacher.sanitizer.js";

/**
 * Controller responsável por lidar com requisições HTTP de relação discipline-teacher.
 * Atua como camada de entrada da aplicação, delegando validação ao sanitizer
 * e regras de negócio ao service.
*/
class DisciplineTeacherController {

    /**
     * Atribui um professor a uma disciplina.
     *
     * Fluxo:
     * - Extrai disciplineId dos parâmetros e teacherId do body
     * - Sanitiza entrada
     * - Delega atribuição ao service
     *
     * @param {FastifyRequest} request
     * @param {FastifyReply} reply
     * @returns {Promise<void>}
     *
     * @status 201 Created
     * @throws {DisciplineNotFoundError}
     * @throws {TeacherNotFoundError}
     * @throws {DisciplineAlreadyHasTeacherError}
    */
    async assign(request, reply) {
        let { disciplineId } = request.params;
        let { teacherId } = request.body;

        let sanitized = DisciplineTeacherSanitizer.parseAssign({ disciplineId, teacherId });
        let assignment = await disciplineTeacherService.assign(sanitized);

        return reply.status(201).send(assignment);
    }

    /**
     * Remove um professor de uma disciplina.
     *
     * Fluxo:
     * - Extrai disciplineId e teacherId dos parâmetros
     * - Sanitiza entrada
     * - Delega remoção ao service
     *
     * @param {FastifyRequest} request
     * @param {FastifyReply} reply
     * @returns {Promise<void>}
     *
     * @status 204 No Content
     * @throws {DisciplineNotFoundError}
     * @throws {TeacherNotFoundError}
     * @throws {DisciplineMissingTeacherError}
    */
    async deassign(request, reply) {
        let { disciplineId, teacherId } = request.params;

        let sanitized = DisciplineTeacherSanitizer.parseDeassign({ disciplineId, teacherId });
        let deassignment = await disciplineTeacherService.deassign(sanitized);

        return reply.status(204).send();
    }
}

const disciplineTeacherController = new DisciplineTeacherController();
export default disciplineTeacherController;