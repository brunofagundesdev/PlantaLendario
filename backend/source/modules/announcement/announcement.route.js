import announcementController from "./announcement.controller.js";

import ensureAuthenticated from "../../middlewares/ensure-authenticated.middleware.js";
import ensureAdmin from "../../middlewares/ensure-admin.middleware.js";

/**
 * Rotas para gerenciar avisos (announcements).
 *
 * Endpoints disponíveis:
 * - POST / - Cria um novo aviso
 * - GET / - Lista todos os avisos
 * - GET /:id - Busca um aviso específico
 * - PATCH /:id - Atualiza um aviso
 * - DELETE /:id - Remove um aviso
 *
 * @param {import('fastify').FastifyInstance} app - Instância do Fastify
*/
export default function announcementRoute(app) {

    /**
     * POST /
     * Cria um novo aviso.
     *
     * Requer autenticação e permissão de admin.
     *
     * Body:
     * {
     *   "title": "string - título do aviso",
     *   "message": "string - mensagem do aviso"
     * }
     *
     * Response: 201 Created
     * {
     *   "id": "uuid",
     *   "title": "string",
     *   "message": "string",
     *   "createdAt": "ISO-8601",
     *   "createdBy": "uuid do usuário autenticado",
     *   "updatedAt": null,
     *   "updatedBy": null
     * }
     *
     * @throws {AnnouncementTitleInvalidError} Se título inválido
     * @throws {AnnouncementMessageInvalidError} Se mensagem inválida
    */
    app.post("/", { preHandler: [ensureAuthenticated, ensureAdmin] }, announcementController.create);

    /**
     * GET /
     * Lista todos os avisos.
     *
     * Requer autenticação.
     *
     * Response: 200 OK
     * Array de avisos com seus dados completos.
    */
    app.get("/", { preHandler: [ensureAuthenticated] }, announcementController.list);

    /**
     * GET /:id
     * Busca um aviso específico pelo ID.
     *
     * Requer autenticação.
     *
     * Params:
     * - id: UUID do aviso
     *
     * Response: 200 OK
     * {
     *   "id": "uuid",
     *   "title": "string",
     *   "message": "string",
     *   "createdAt": "ISO-8601",
     *   "createdBy": "uuid",
     *   "updatedAt": "ISO-8601 | null",
     *   "updatedBy": "uuid | null"
     * }
     *
     * @throws {AnnouncementIdInvalidError} Se ID inválido
     * @throws {AnnouncementNotFoundError} Se aviso não existe
    */
    app.get("/:id", { preHandler: [ensureAuthenticated] }, announcementController.get);

    /**
     * PATCH /:id
     * Atualiza um aviso existente.
     *
     * Requer autenticação e permissão de admin.
     *
     * Params:
     * - id: UUID do aviso
     *
     * Body (opcional):
     * {
     *   "title": "string - novo título",
     *   "message": "string - nova mensagem"
     * }
     *
     * Response: 200 OK
     * Aviso atualizado com todos seus dados.
     *
     * @throws {AnnouncementIdInvalidError} Se ID inválido
     * @throws {AnnouncementTitleInvalidError} Se título inválido
     * @throws {AnnouncementMessageInvalidError} Se mensagem inválida
     * @throws {AnnouncementUpdateInvalidError} Se nenhum campo válido enviado
     * @throws {AnnouncementNotFoundError} Se aviso não existe
    */
    app.patch("/:id", { preHandler: [ensureAuthenticated, ensureAdmin] }, announcementController.update);

    /**
     * DELETE /:id
     * Remove um aviso.
     *
     * Requer autenticação e permissão de admin.
     *
     * Params:
     * - id: UUID do aviso
     *
     * Response: 204 No Content
     *
     * @throws {AnnouncementIdInvalidError} Se ID inválido
     * @throws {AnnouncementNotFoundError} Se aviso não existe
    */
    app.delete("/:id", { preHandler: [ensureAuthenticated, ensureAdmin] }, announcementController.delete);
}