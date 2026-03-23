import bcrypt from "bcrypt";
import { createHash } from "node:crypto";

export default class PasswordUtil {
    static hash = {
        saltRounds: 12
    }

    static async hash(password) {

        let preHash = createHash("sha256").update(password).digest("hex");
        let finalHash = await bcrypt.hash(preHash, this.hash.saltRounds);

        return finalHash;
    }

    static async compare(sentPassword, savedPassword) {

        sentPassword = createHash("sha256").update(sentPassword).digest("hex");
        let compare = await bcrypt.compare(sentPassword, savedPassword);
        return compare;
    }
}