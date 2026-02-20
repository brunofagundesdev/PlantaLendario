import { deleteTeacherRepository } from "../../repository/teachers/delete-teacher.repository.js";

import { getTeacherRepository } from "../../repository/teachers/get-teacher.repository.js";

import { validate as uuidValidate } from "uuid";

import * as TeacherErrors from "../../errors/teacher.errors.js";

async function deleteTeacherService({ id }) {

    if (!uuidValidate(id)) {
        throw TeacherErrors.TeacherIdInvalidError();
    }

    let teacher = await getTeacherRepository({ id });

    if (!teacher) {
        throw new TeacherErrors.TeacherNotFoundError();
    }

    let deletedTeacher = await deleteTeacherRepository({ id });
    return;
}

export {
    deleteTeacherService
}