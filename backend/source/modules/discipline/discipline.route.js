// Controllers
import disciplineController from "./discipline.controller.js";

// // Middlewares
import ensureAuthenticated from "../../middlewares/ensure-authenticated.middleware.js";
import ensureAdmin from "../../middlewares/ensure-admin.middleware.js";

import disciplineTeacherRoute from "../discipline-teacher/discipline-teacher.route.js";

/**
 * Rotas para gerenciar disciplinas.
 *
 * Endpoints disponíveis:
 * - POST / - Cria uma nova disciplina
 * - GET / - Lista todas as disciplinas
 * - GET /:id - Busca uma disciplina específica
 * - PATCH /:id - Atualiza uma disciplina
 * - DELETE /:id - Remove uma disciplina
 * - /:disciplineId/teachers - Sub-rotas para gerenciar professores de uma disciplina
 *
 * @param {import('fastify').FastifyInstance} app - Instância do Fastify
*/
export default function disciplineRoute(app) {

    /**
     * POST /
     * Cria uma nova disciplina.
     *
     * Requer autenticação e permissão de admin.
     *
     * Body:
     * {
     *   "name": "string - nome da disciplina"
     * }
     *
     * Response: 201 Created
     * {
     *   "id": "serial/number",
     *   "name": "string"
     * }
     *
     * @throws {DisciplineNameInvalidError} Se nome inválido
     * @throws {DisciplineNameAlredyRegisteredError} Se disciplina com este nome já existe
    */
    app.post("/", { preHandler: [ensureAuthenticated, ensureAdmin] }, disciplineController.create);

    /**
     * GET /
     * Lista todas as disciplinas.
     *
     * Requer autenticação.
     *
     * Response: 200 OK
     * Array de disciplinas com seus dados:
     * [
     *   {
     *     "id": "serial/number",
     *     "name": "string"
     *   },
     *   ...
     * ]
    */
    app.get("/", { preHandler: [ensureAuthenticated] }, disciplineController.list);

    /**
     * GET /:id
     * Busca uma disciplina específica pelo ID.
     *
     * Requer autenticação.
     *
     * Params:
     * - id: Serial/number - ID da disciplina
     *
     * Response: 200 OK
     * {
     *   "id": "serial/number",
     *   "name": "string",
     *   "teachers": [
     *     {
     *       "id": "uuid",
     *       "name": "string",
     *       "registry": "string",
     *       "email": "string",
     *       "telephone": "string",
     *       "department": "string",
     *       "createdAt": "ISO-8601",
     *       "createdBy": "uuid",
     *       "updatedAt": "ISO-8601 | null",
     *       "updatedBy": "uuid | null"
     *     },
     *     ...
     *   ]
     * }
     *
     * @throws {DisciplineIdInvalidError} Se ID inválido
     * @throws {DisciplineNotFoundError} Se disciplina não existe
    */
    app.get("/:id", { preHandler: [ensureAuthenticated] }, disciplineController.get);

    /**
     * PATCH /:id
     * Atualiza uma disciplina existente.
     *
     * Requer autenticação e permissão de admin.
     *
     * Params:
     * - id: Serial/number - ID da disciplina
     *
     * Body (opcional):
     * {
     *   "name": "string - novo nome da disciplina"
     * }
     *
     * Response: 200 OK
     * Disciplina atualizada com todos seus dados.
     *
     * @throws {DisciplineIdInvalidError} Se ID inválido
     * @throws {DisciplineNameInvalidError} Se nome inválido
     * @throws {DisciplineUpdateInvalidError} Se nenhum campo válido enviado
     * @throws {DisciplineNameAlredyRegisteredError} Se novo nome já existe em outra disciplina
     * @throws {DisciplineNotFoundError} Se disciplina não existe
    */
    app.patch("/:id", { preHandler: [ensureAuthenticated, ensureAdmin] }, disciplineController.update);

    /**
     * DELETE /:id
     * Remove uma disciplina.
     *
     * Requer autenticação e permissão de admin.
     *
     * Params:
     * - id: Serial/number - ID da disciplina
     *
     * Response: 204 No Content
     *
     * @throws {DisciplineIdInvalidError} Se ID inválido
     * @throws {DisciplineNotFoundError} Se disciplina não existe
    */
    app.delete("/:id", { preHandler: [ensureAuthenticated, ensureAdmin] }, disciplineController.delete);

    /**
     * Sub-rotas: /:disciplineId/teachers
     * Gerencia a relação entre disciplinas e professores.
     * Ver discipline-teacher.route.js para documentação completa.
    */
    app.register(disciplineTeacherRoute, { prefix: "/:disciplineId/teachers" })
}