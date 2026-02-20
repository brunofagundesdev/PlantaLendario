// import { createTeacherRepository } from "../../repository/teachers/create-teacher.repository.js";

import { getTeacherByNameRepository } from "../../repository/teachers/get-teacher-by-name.repository.js";

import { normalizeName } from "../../utils/normalize-name.js";
import { validateName } from "../../utils/validate-name.js";

import { normalizeEmail } from "email-normalizer";
import { validateEmail } from "../../utils/validate-email.js";

import * as TeacherErrors from "../../errors/teacher.errors.js";

async function createTeacherService({ name, email, telephone }) {

    if (!validateName(name)) {
        throw new TeacherErrors.TeacherNameInvalidError();
    }

    let normalizedName = normalizeName(name, { lowerCase: true });


    let teacherByName = await getTeacherByNameRepository({ name: normalizedName });

    if (teacherByName) {
        throw new TeacherErrors.TeacherNameAlredyExistsError();
    }

    if (!validateEmail({ email })) {
        throw new TeacherErrors.TeacherEmailInvalidError();
    }
    let normalizedEmail = normalizeEmail({ email });




    // let createdTeacher = await createTeacherRepository({ name: normalizedName, email, telephone });

}

export {
    createTeacherService
}