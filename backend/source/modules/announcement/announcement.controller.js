/**
 * @typedef {import('./announcement.type.js').Announcement} Announcement
 * @typedef {import('./announcement.type.js').AnnouncementUpdateData} AnnouncementUpdateData
 * 
 * @typedef {import('fastify').FastifyRequest} FastifyRequest
 * @typedef {import('fastify').FastifyReply} FastifyReply
*/

import announcementService from "./announcement.service.js";
import AnnouncementSanitizer from "./announcement.sanitizer.js";

/**
 * Controller responsável por lidar com requisições HTTP de avisos.
 * Atua como camada de entrada da aplicação, delegando validação ao sanitizer
 * e regras de negócio ao service.
*/
class AnnouncementController {

    /**
     * Cria um novo aviso.
     *
     * Fluxo:
     * - Extrai dados do body
     * - Sanitiza entrada
     * - Injeta usuário autenticado como criador
     * - Delega criação ao service
     *
     * @param {FastifyRequest} request
     * @param {FastifyReply} reply
     * @returns {Promise<void>}
     *
     * @status 201 Created
    */
    async create(request, reply) {
        let data = request.body;

        let sanitized = AnnouncementSanitizer.parseCreate({ data });

        let createdAnnouncement = await announcementService.create({
            data: {
                ...sanitized.data,
                createdBy: request.user.id
            }
        });
        return reply.status(201).send(createdAnnouncement);
    }

    /**
     * Busca um aviso pelo ID.
     *
     * Fluxo:
     * - Extrai ID dos parâmetros
     * - Sanitiza entrada
     * - Delega busca ao service
     *
     * @param {import('fastify').FastifyRequest} request
     * @param {import('fastify').FastifyReply} reply
     * @returns {Promise<void>}
     *
     * @status 200 OK
     * @throws {AnnouncementNotFoundError}
    */
    async get(request, reply) {
        let { id } = request.params;
        let sanitized = AnnouncementSanitizer.parseGet({ id });

        let caughtAnnouncement = await announcementService.get(sanitized);
        return reply.status(200).send(caughtAnnouncement);
    }

    /**
     * Lista todos os anúncios.
     *
     * Fluxo:
     * - Delegação direta ao service
     *
     * @param {import('fastify').FastifyRequest} request
     * @param {import('fastify').FastifyReply} reply
     * @returns {Promise<void>}
     *
     * @status 200 OK
    */
    async list(request, reply) {
        let listedAnnouncements = await announcementService.list();
        return reply.status(200).send(listedAnnouncements);
    }

    /**
     * Atualiza um anúncio existente.
     *
     * Fluxo:
     * - Extrai ID e dados
     * - Sanitiza entrada
     * - Injeta usuário autenticado como responsável pela atualização
     * - Delega atualização ao service
     *
     * @param {import('fastify').FastifyRequest} request
     * @param {import('fastify').FastifyReply} reply
     * @returns {Promise<void>}
     *
     * @status 200 OK
     * @throws {AnnouncementUpdateInvalidError}
     * @throws {AnnouncementNotFoundError}
    */
    async update(request, reply) {
        let { id } = request.params;
        let data = request.body;

        let sanitized = AnnouncementSanitizer.parseUpdate({ id, data });

        let updatedAnnouncement = await announcementService.update({
            data: {
                ...sanitized.data,
                updatedBy: request.user.id
            }
        });
        return reply.status(200).send(updatedAnnouncement);
    }

    /**
     * Remove um aviso pelo ID.
     *
     * Fluxo:
     * - Extrai ID
     * - Sanitiza entrada
     * - Delega remoção ao service
     *
     * @param {import('fastify').FastifyRequest} request
     * @param {import('fastify').FastifyReply} reply
     * @returns {Promise<void>}
     *
     * @status 204 No Content
     * @throws {AnnouncementNotFoundError}
    */
    async delete(request, reply) {
        let { id } = request.params;
        let sanitized = AnnouncementSanitizer.parseDelete({ id });

        let deletedAnnouncement = await announcementService.delete(sanitized);
        return reply.status(204).send();
    }
}

const announcementController = new AnnouncementController({ service: announcementService });
export default announcementController;