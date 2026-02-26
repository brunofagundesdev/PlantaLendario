import { validate as uuidValidate } from "uuid";
import { normalizeEmail } from "email-normalizer";

export class BaseSanitizer {

    static validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    static validateUUID(id) {
        return uuidValidate(id);
    }

    static validateSerial(id) {
        return Number.isInteger(id) && id > 0;
    }

    static validateName(name, { testNumber = true } = {}) {
        if (typeof name !== 'string') return false;

        name = name.trim();

        let isValid = true;
        if (testNumber) {
            const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
            isValid = regex.test(name);
        }

        return isValid;

    }

    // =======================NORMALIZERS===========================
    static normalizeName(name, { trim = true, accentuation = false, duplicatedSpaces = false, lowerCase = false } = {}) {

        if (trim) name = name.trim();
        if (!accentuation) name = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (!duplicatedSpaces) name.replace(/\s+/g, " ");
        if (lowerCase) name = name.toLowerCase();

        return name;
    }

    static normalizeEmail(email) {
        return normalizeEmail({ email });
    }
}