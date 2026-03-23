import { validate as uuidValidate } from "uuid";
import { normalizeEmail } from "email-normalizer";
import parsePhoneNumber, { isValidPhoneNumber } from "libphonenumber-js";

export default class BaseSanitizer {

    static validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    static validateUUID(id) {
        return uuidValidate(id);
    }

    static validateSerial(id) {
        return Number.isInteger(id) && id > 0;
    }

    static validateName(name) {
        if (typeof name !== "string") return false;

        const normalized = name.trim();

        if (normalized.length < 2) return false;

        const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+([ '-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;

        return regex.test(normalized);
    }

    static validateTelephone(telephone) {
        return isValidPhoneNumber(telephone, "BR");
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

    static normalizeTelephone(telephone) {
        return parsePhoneNumber(telephone, "BR").formatNational();
    }
}