import { getTeachersRepository } from "../../repository/teachers/get-teachers.repository.js";

async function getTeachersService() {
    let teachers = await getTeachersRepository();
    return teachers;
}

export {
    getTeachersService
}