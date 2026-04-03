import jwt from "jsonwebtoken";
import "dotenv/config.js";

import * as AuthErrors from "../auth/auth.error.js";

class JWT {

    static verify(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
            
        } catch (error) {
            throw new AuthErrors.AuthUnauthorizedError();
        }
    }

    static generate(payload) {
        let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
        return token;
    }
}

export {
    JWT
}