import disciplineTeacherController from "./discipline-teacher.controller.js";
import ensureAuthenticated from "../../middlewares/ensure-authenticated.middleware.js";
import ensureAdmin from "../../middlewares/ensure-admin.middleware.js";

/**
 * Rotas para gerenciar a relação entre disciplinas e professores.
 * 
 * Rotas disponíveis:
 * - POST /disciplines/:disciplineId/teachers - Atribui um professor a uma disciplina
 * - DELETE /disciplines/:disciplineId/teachers/:teacherId - Remove um professor de uma disciplina
 *
 * @param {import('fastify').FastifyInstance} app - Instância do Fastify
*/
export default async function disciplineTeacherRoute(app) {
    /**
     * POST /
     * Atribui um professor a uma disciplina.
     * 
     * Body:
     * {
     *   "teacherId": "uuid-do-professor"
     * }
     * 
     * @throws {DisciplineNotFoundError} Se disciplina não existe
     * @throws {TeacherNotFoundError} Se professor não existe
     * @throws {DisciplineAlreadyHasTeacherError} Se professor já está atribuído
    */
    app.post("/", { preHandler: [ensureAuthenticated, ensureAdmin] }, disciplineTeacherController.assign);

    /**
     * DELETE /:teacherId
     * Remove um professor de uma disciplina.
     * 
     * Params:
     * - disciplineId: ID da disciplina (vem da rota pai)
     * - teacherId: ID do professor
     * 
     * @throws {DisciplineNotFoundError} Se disciplina não existe
     * @throws {TeacherNotFoundError} Se professor não existe
     * @throws {DisciplineMissingTeacherError} Se professor não está atribuído
    */
    app.delete("/:teacherId", { preHandler: [ensureAuthenticated, ensureAdmin] }, disciplineTeacherController.deassign);
}