import * as ResourceErrors from "./resource.error.js";

import BaseSanitizer from "../../utils/base.sanitizer.js";

export default class ResourceSanitizer extends BaseSanitizer {

    static parseCreate({ data }) {
        const parsed = {};
        parsed.data.title = this.parseTitle(data.title);
        parsed.data.description = this.parseDescription(data.description);
        parsed.data.type = this.parseType(data.type)

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

        if (data.description !== undefined) {
            parsed.data.description = this.parseDescription(data.description);
        }

          if (data.type !== undefined) {
            parsed.data.type = this.parseType(data.type);
        }

        if (!Object.keys(parsed.data).length) {
            throw new ResourceErrors.ResourceUpdateInvalidError();
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
            throw new ResourceErrors.ResourceIdInvalidError();
        }
        this.validadeId(id);

        return id;
    }

    static parseTitle(title) {
        if (typeof title !== "string") {
            throw new ResourceErrors.ResourceTitleInvalidError();
        }
        title = this.normalizeTitle(title, { accentuation: true });
        this.validateTitle(title);

        return title;
    }

        static parsetype(type) {
        if (typeof type !== "string") {
            throw new ResourceErrors.ResourceTypeInvalidError();
        }
        title = this.normalizeType(type, { accentuation: true });
        this.validateType(type);

        return type;
    }

    static parseDescription(description) {
        if (typeof description !== "string") {
            throw new ResourceErrors.ResourceDescriptionInvalidError();
        }
        description = this.normalizeDescription(description, { accentuation: true });
        this.validateDescription(description);

        return description;
    }

    // ==================================================================

    static validateTitle(title) {
        if (!super.validateName(title)) {
            throw new ResourceErrors.ResourceTitleInvalidError()
        }
        return;
    }

    static validadeId(id) {
        if (super.validateUUID(id)) {
            throw new ResourceErrors.ResourceIdInvalidError();
        }
        return;
    }

}

  // =====================================================================
