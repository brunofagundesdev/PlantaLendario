import jwt from "jsonwebtoken";
import "dotenv/config.js";

import { UnauthorizedError } from "../errors/auth.errors.js";

class JWT {

    static verify(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
            
        } catch (error) {
            throw new UnauthorizedError();
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