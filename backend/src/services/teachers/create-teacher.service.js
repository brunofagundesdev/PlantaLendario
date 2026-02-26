// import { createTeacherRepository } from "../../repository/teachers/create-teacher.repository.js";

import { getTeacherByNameRepository } from "../../repository/teachers/get-teacher-by-name.repository.js";

import { normalizeName } from "../../utils/normalize-name.js";
import { validateName } from "../../utils/validate-name.js";

import { normalizeEmail } from "email-normalizer";
import { validateEmail } from "../../utils/validate-email.js";

import parsePhoneNumber, { isValidPhoneNumber } from "libphonenumber-js";

import * as TeacherErrors from "../../errors/teacher.errors.js";

async function createTeacherService({ name, email = null, telephone = null }) {
    // Name
    if (!validateName(name)) {
        throw new TeacherErrors.TeacherNameInvalidError();
    }

    let normalizedName = normalizeName(name, { lowerCase: true });


    let teacherByName = await getTeacherByNameRepository({ name: normalizedName });

    if (teacherByName) {
        throw new TeacherErrors.TeacherNameAlredyExistsError();
    }

    // Email
    let normalizedEmail;
    if (email) {
        
        if (!validateEmail({ email })) {
            throw new TeacherErrors.TeacherEmailInvalidError();
        }
        normalizedEmail = normalizeEmail({ email });
    }


    // Telephone
    let normalizedTelephone;
    if (telephone) {
        if (!isValidPhoneNumber(telephone, "BR")) {
            throw new TeacherErrors.TeacherTelephoneInvalidError();
        }
        normalizedTelephone = parsePhoneNumber(telephone, "BR").number;
    }




    console.log(normalizedName, normalizedEmail, normalizedTelephone)




    // let createdTeacher = await createTeacherRepository({ name: normalizedName, email, telephone });

}

export {
    createTeacherService
}