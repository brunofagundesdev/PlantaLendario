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

    static validateName(name, { testNumber = false } = {}) {
        if (typeof name !== "string") return false;

        const normalized = name.trim();

        if (normalized.length < 2) return false;

        const chars = testNumber ? "A-Za-zÀ-ÖØ-öø-ÿ0-9" : "A-Za-zÀ-ÖØ-öø-ÿ";
        const regex = new RegExp(`^[${chars}]+([ '-][${chars}]+)*$`);

        return regex.test(normalized);
    }


    static validateTelephone(telephone) {
        return isValidPhoneNumber(telephone, "BR");
    }

    // =======================NORMALIZERS===========================
    static normalizeName(name, { trim = true, accentuation = false, duplicatedSpaces = false, lowerCase = false } = {}) {

        if (trim) name = name.trim();
        if (!accentuation) name = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (!duplicatedSpaces) name = name.replace(/\s+/g, " ");
        if (lowerCase) name = name.toLowerCase();

        return name;
    }

    static normalizeEmail(email) {
        return normalizeEmail({ email });

    }

    static normalizeTelephone(telephone) {
        return parsePhoneNumber(telephone, "BR").formatNational();
    }

    static capitalizeName(name) {
        return name
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
}