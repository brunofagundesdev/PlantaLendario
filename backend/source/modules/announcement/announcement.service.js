/**
 * @typedef {import('./announcement.type.js').Announcement} Announcement
 * @typedef {import('./announcement.type.js').AnnouncementUpdateData} AnnouncementUpdateData
*/

import announcementRepository from "./announcement.repository.js";
import * as AnnouncementErrors from "./announcement.error.js";

import filterAllowedFields from "../../utils/filter-allowed-fields.js";

/**
 * Service responsável por gerenciar operações relacionadas a avisos.
 * Atua como camada de regra de negócio entre o controller e o repository.
*/
class AnnouncementService {
    static updateAllowedFields = ["title", "message", "updatedBy"];

    /**
     * Cria um novo anúncio.
     *
     * @param {Object} params
     * @param {Object} params.data - Dados necessários para criação do anúncio
     * @returns {Promise<Announcement>} Anúncio criado
    */
    async create({ data }) {
        let createdAnnouncement = await announcementRepository.create({ data });
        return createdAnnouncement;
    }

    /**
     * Busca um aviso pelo ID.
     *
     * @param {Object} params
     * @param {number|string} params.id - ID do aviso
     * @returns {Promise<Announcement>} Aviso encontrado
     * @throws {AnnouncementNotFoundError} Caso o aviso não exista
    */
    async get({ id }) {
        const caughtAnnouncement = await announcementRepository.getById({ id });
        if (!caughtAnnouncement) {
            throw new AnnouncementErrors.AnnouncementNotFoundError();
        }
        return caughtAnnouncement;
    }

    /**
     * Lista todos os avisos.
     *
     * @returns {Promise<Announcement[]>} Lista de avisos
    */
    async list() {
        const listedAnnouncements = await announcementRepository.list();
        return listedAnnouncements;
    }

    /**
     * Atualiza um aviso existente.
     *
     * Aplica whitelist de campos permitidos antes de enviar ao repository.
     *
     * @param {Object} params
     * @param {number|string} params.id - ID do aviso a ser atualizado
     * @param {AnnouncementUpdateData} params.data - Dados para atualização
     * @returns {Promise<Announcement>} Aviso atualizado
     *
     * @throws {AnnouncementUpdateInvalidError}
     * Caso nenhum campo permitido tenha sido enviado
     *
     * @throws {AnnouncementNotFoundError}
     * Caso o aviso não exista
    */
    async update({ id, data }) {
        let filteredData = filterAllowedFields(data, AnnouncementService.updateAllowedFields);
        if (!Object.keys(filteredData).length) {
            throw new AnnouncementErrors.AnnouncementUpdateInvalidError();
        }

        let updatedAnnouncement = await announcementRepository.update({ id, data: filteredData });
        if (!updatedAnnouncement) {
            throw new AnnouncementErrors.AnnouncementNotFoundError();
        }

        return updatedAnnouncement;
    }

    /**
     * Remove um aviso pelo ID.
     *
     * @param {Object} params
     * @param {number|string} params.id - ID do aviso
     * @returns {Promise<Boolean>} Aviso removido
     *
     * @throws {AnnouncementNotFoundError}
     * Caso o aviso não exista
    */
    async delete({ id }) {
        let deletedAnnouncement = await announcementRepository.delete({ id });
        if (!deletedAnnouncement) {
            throw new AnnouncementErrors.AnnouncementNotFoundError();
        }
        return deletedAnnouncement;
    }
}

const announcementService = new AnnouncementService();
export default announcementService;