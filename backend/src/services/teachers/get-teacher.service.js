import { getTeacherRepository } from "../../repository/teachers/get-teacher.repository.js";

import { validate as uuidValidate } from "uuid";

import * as TeacherErrors from "../../errors/teacher.errors.js";

async function getTeacherService({ id }) {

    if (!uuidValidate(id)) {
        throw new TeacherErrors.TeacherIdInvalidError();
    }

    let teacher = await getTeacherRepository({ id });

    if (!teacher) {
        throw new TeacherErrors.TeacherNotFoundError();
    }

    return teacher;
}

export {
    getTeacherService
}