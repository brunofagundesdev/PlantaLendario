import announcementService from "./announcement.service.js";
import AnnouncementSanitizer from "./announcement.sanitizer.js";

class AnnouncementController {
    constructor({ service }) {
        this.service = service;
    }

    async create(request, reply) {
        let data = request.body;

        let sanitized = AnnouncementSanitizer.parseCreate({ data });

        let createdAnnouncement = await announcementService.create({
            ...sanitized,
            created_by: request.user.id
        });
        return reply.status(201).send(createdAnnouncement);
    }

    async get(request, reply) {
        let { id } = request.params;
        let sanitized = AnnouncementSanitizer.parseGet({ id });

        let caughtAnnouncement = await announcementService.get(sanitized);
        return reply.status(200).send(caughtAnnouncement);
    }

    async list(request, reply) {
        let listedAnnouncements = await announcementService.list();
        return reply.status(200).send(listedAnnouncements);
    }

    async update(request, reply) {
        let { id } = request.params;
        let data = request.body;

        let sanitized = AnnouncementSanitizer.parseUpdate({ id, data });
        let updatedAnnouncement = await announcementService.update({
            ...sanitized,
            updated_by: request.user.id
        });
        return reply.status(200).send(updatedAnnouncement);
    }

    async delete(request, reply) {
        let { id } = request.params;
        let sanitized = AnnouncementSanitizer.parseDelete({ id });

        let deletedAnnouncement = await announcementService.delete(sanitized);
        return reply.status(204).send();
    }
}

const announcementController = new AnnouncementController({ service: announcementService });
export default announcementController;