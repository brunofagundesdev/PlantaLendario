import { BaseSanitizer } from "./base.sanitizer.js";

import * as UserErrors from "../errors/user.errors.js";

class UserSanitizer extends BaseSanitizer {
    // =======================PARSERS DO REQUEST===========================
    static parseCreate({ data }) {
        let name = this.parseName(data.name);
        let email = this.parseEmail(data.email);
        
        return {
            name,
            email,
            password
        }
    }
    static parseGet({ data }) {
        
    }
    static parseList({ data }) {
        
    }
    static parseUpdate({ data }) {
        
    }
    static parseDelete({ data }) {
        
    }

    // =======================PARSERS DOS CAMPOS===========================
    static parseName(name) {
        if (typeof name !== "string") {
            throw new UserErrors.UserNameInvalidError();
        }

        name = this.normalizeName()
    }

    static parseEmail(email) {
        if (typeof email !== "string") {
            throw new UserErrors.UserEmailInvalidError();
        }

        email.normalizeEmail
    }

    // =======================VALIDATORS ESTRUTURAIS===========================
    static validateName(name) {
        if (!name) return null;

        if (typeof name !== "string") {
            throw new UserErrors.UserNameInvalidError();
        }

        return name;
    }

    static validateOptionalEmail(email) {
        if (!email) return null;

        if (typeof email !== "string" || !this.validateEmail(email)) {
            throw new UserErrors.UserEmailInvalidError();
        }

        return email;
    }

    static validatePassword(password) {

    }


    // =======================NORMALIZERS===========================
    
}

export default UserSanitizer; 