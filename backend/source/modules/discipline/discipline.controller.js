/**
 * @typedef {import('./discipline.type.js').Discipline} Discipline
 * @typedef {import('./discipline.type.js').DisciplineUpdateData} DisciplineUpdateData
 *
 * @typedef {import('fastify').FastifyRequest} FastifyRequest
 * @typedef {import('fastify').FastifyReply} FastifyReply
*/

import disciplineService from "./discipline.service.js";
import DisciplineSanitizer from "./discipline.sanitizer.js";

/**
 * Controller responsável por lidar com requisições HTTP de disciplinas.
 * Atua como camada de entrada da aplicação, delegando validação ao sanitizer
 * e regras de negócio ao service.
*/
class DisciplineController {

    /**
     * Cria uma nova disciplina.
     *
     * Fluxo:
     * - Extrai dados do body
     * - Sanitiza entrada
     * - Delega criação ao service
     *
     * @param {FastifyRequest} request
     * @param {FastifyReply} reply
     * @returns {Promise<void>}
     *
     * @status 201 Created
     * @throws {DisciplineNameAlredyRegisteredError}
    */
    async create(request, reply) {
        let data = request.body;

        let sanitized = DisciplineSanitizer.parseCreate({ data });

        let createdDiscipline = await disciplineService.create(sanitized);
        return reply.status(201).send(createdDiscipline);
    }

    /**
     * Busca uma disciplina pelo ID.
     *
     * Fluxo:
     * - Extrai ID dos parâmetros
     * - Sanitiza entrada
     * - Delega busca ao service
     *
     * @param {FastifyRequest} request
     * @param {FastifyReply} reply
     * @returns {Promise<void>}
     *
     * @status 200 OK
     * @throws {DisciplineNotFoundError}
    */
    async get(request, reply) {
        let { id } = request.params;
        let sanitized = DisciplineSanitizer.parseGet({ id });

        let caughtDiscipline = await disciplineService.get(sanitized);
        return reply.status(200).send(caughtDiscipline);
    }

    /**
     * Lista todas as disciplinas.
     *
     * Fluxo:
     * - Delegação direta ao service
     *
     * @param {FastifyRequest} request
     * @param {FastifyReply} reply
     * @returns {Promise<void>}
     *
     * @status 200 OK
    */
    async list(request, reply) {
        let listedDisciplines = await disciplineService.list();
        return reply.status(200).send(listedDisciplines);
    }

    /**
     * Atualiza uma disciplina existente.
     *
     * Fluxo:
     * - Extrai ID e dados
     * - Sanitiza entrada
     * - Delega atualização ao service
     *
     * @param {FastifyRequest} request
     * @param {FastifyReply} reply
     * @returns {Promise<void>}
     *
     * @status 200 OK
     * @throws {DisciplineUpdateInvalidError}
     * @throws {DisciplineNameAlredyRegisteredError}
     * @throws {DisciplineNotFoundError}
    */
    async update(request, reply) {
        let { id } = request.params;
        let data = request.body;

        let sanitized = DisciplineSanitizer.parseUpdate({ id, data });
        let updatedDiscipline = await disciplineService.update(sanitized);
        return reply.status(200).send(updatedDiscipline);
    }

    /**
     * Remove uma disciplina pelo ID.
     *
     * Fluxo:
     * - Extrai ID
     * - Sanitiza entrada
     * - Delega remoção ao service
     *
     * @param {FastifyRequest} request
     * @param {FastifyReply} reply
     * @returns {Promise<void>}
     *
     * @status 204 No Content
     * @throws {DisciplineNotFoundError}
    */
    async delete(request, reply) {
        let { id } = request.params;
        let sanitized = DisciplineSanitizer.parseDelete({ id });

        let deletedDiscipline = await disciplineService.delete(sanitized);
        return reply.status(204).send();
    }
}

const disciplineController = new DisciplineController();
export default disciplineController;