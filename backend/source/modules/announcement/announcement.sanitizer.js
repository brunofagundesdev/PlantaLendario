import * as AnnouncementErrors from "./announcement.error.js";

import BaseSanitizer from "../../utils/base.sanitizer.js";

export default class AnnouncementSanitizer extends BaseSanitizer {

    static parseCreate({ data }) {
        const parsed = { data: {} };
        parsed.data.title = this.parseTitle(data.title);
        parsed.data.message = this.parseMessage(data.message);

        return parsed;
    }

    static parseGet({ id }) {
        const parsed = {};
        parsed.id = this.parseId(id);

        return parsed;
    }
    
    static parseUpdate({ id, data }) {
        const parsed = { data: {} };
        parsed.id = this.parseId(id);

        if (data.title !== undefined) {
            parsed.data.title = this.parseTitle(data.title);
        }

        if (data.message !== undefined) {
            parsed.data.message = this.parseMessage(data.message);
        }

        if (!Object.keys(parsed.data).length) {
            throw new AnnouncementErrors.AnnouncementUpdateInvalidError();
        }

        return parsed;
    }

    static parseDelete({ id }) {
        const parsed = {};
        parsed.id = this.parseId(id);

        return parsed;
    }

    // ==================================================================

    static parseId(id) {
        if (typeof id !== "string") {
            throw new AnnouncementErrors.AnnouncementIdInvalidError();
        }
        this.validadeId(id);

        return id;
    }

    static parseTitle(title) {
        if (typeof title !== "string") {
            throw new AnnouncementErrors.AnnouncementTitleInvalidError();
        }
        title = this.normalizeName(title, { accentuation: true });
        this.validateTitle(title);

        return title;
    }

    static parseMessage(message) {
        if (typeof message !== "string") {
            throw new AnnouncementErrors.AnnouncementMessageInvalidError();
        }
        message = this.normalizeName(message, { accentuation: true });
        this.validateMessage(message);

        return message;
    }

    // ==================================================================

    static validateTitle(title) {
        if (!this.validateName(title, { testNumber: true, specialChars: "/*,.!@#$%&():;" })) {
            throw new AnnouncementErrors.AnnouncementTitleInvalidError()
        }
        return;
    }

    static validateMessage(message) {
        if (!this.validateName(message, { testNumber: true, specialChars: "/*,.!@#$%&():;" })) {
            throw new AnnouncementErrors.AnnouncementMessageInvalidError()
        }
        return;
    }

    static validadeId(id) {
        if (!super.validateUUID(id)) {
            throw new AnnouncementErrors.AnnouncementIdInvalidError();
        }
        return;
    }
}