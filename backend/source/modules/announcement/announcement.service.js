import announcementRepository from "./announcement.repository.js";
import * as AnnouncementErrors from "./announcement.error.js";

class AnnouncementService {
    constructor({ repository }) {
        this.repository = repository;
    }

    async create({ data }) {
        let createdAnnouncement = await this.repository.create({ data });
        return createdAnnouncement;
    }

    async get({ id }) {
        const caughtAnnouncement = await this.repository.get({ criteria: { id } });
        if (!caughtAnnouncement) {
            throw new AnnouncementErrors.AnnouncementNotFoundError();
        }
        return caughtAnnouncement;
    }

    async list() {
        const listedAnnouncements = await this.repository.list();
        return listedAnnouncements;
    }

    async update({ id, data }) {
        const caughtAnnouncement = await this.repository.get({ criteria: { id } });
        if (!caughtAnnouncement) {
            throw new AnnouncementErrors.AnnouncementNotFoundError();
        }

        let updatedAnnouncement = await this.repository.update({ id, data });
        return updatedAnnouncement;
    }

    async delete({ id }) {
        const caughtAnnouncement = await this.repository.get({ criteria: { id } });
        if (!caughtAnnouncement) {
            throw new AnnouncementErrors.AnnouncementNotFoundError();
        }

        let deletedAnnouncement = await this.repository.delete({ id });
        return deletedAnnouncement;
    }
}

const announcementService = new AnnouncementService({ repository: announcementRepository });
export default announcementService;