import teacherRepository from "./teacher.repository.js";
import * as TeacherErrors from "./teacher.error.js";

class TeacherService {
    constructor({ repository }) {
        this.repository = repository;

    }

    async create({ data }) {
        const caughtTeacherByName = await this.repository.get({ criteria: { name: data.name } });
        if (caughtTeacherByName) {
            throw new TeacherErrors.TeacherNameAlredyRegisteredError();
        }

        if (data.email !== undefined) {
            const caughtTeacherByEmail = await this.repository.get({ criteria: { email: data.email } });
            if (caughtTeacherByEmail) {
                throw new TeacherErrors.TeacherEmailAlredyRegisteredError();
            }
        }

        if (data.telephone !== undefined) {
            const caughtTeacherByTelephone = await this.repository.get({ criteria: { telephone: data.telephone } });
            if (caughtTeacherByTelephone) {
                throw new TeacherErrors.TeacherTelephoneAlredyRegisteredError()
            }
        }

        let createdTeacher = await this.repository.create({ data });
        return createdTeacher;
    }

    async get({ id }) {
        let caughtTeacher = await this.repository.get({ criteria: { id } });
        if (!caughtTeacher) {
            throw new TeacherErrors.TeacherNotFoundError();
        }
        return caughtTeacher;
    }

    async list() {
        let listedTeachers = await this.repository.list();
        return listedTeachers;
    }

    async update({ id, data }) {

        if (data.name !== undefined) {
            const caughtTeacherByName = await this.repository.get({ criteria: { name: data.name } });
            if (caughtTeacherByName) {
                throw new TeacherErrors.TeacherNameAlredyRegisteredError();
            }
        }

        if (data.email !== undefined) {
            const caughtTeacherByEmail = await this.repository.get({ criteria: { email: data.email } });
            if (caughtTeacherByEmail) {
                throw new TeacherErrors.TeacherEmailAlredyRegisteredError();
            }
        }

        if (data.telephone !== undefined) {
            const caughtTeacherByTelephone = await this.repository.get({ criteria: { telephone: data.telephone } });
            if (caughtTeacherByTelephone) {
                throw new TeacherErrors.TeacherTelephoneAlredyRegisteredError();
            }
        }
        let updatedTeacher = await this.repository.update({ id, data });
        return updatedTeacher;

    }

    async delete({ id }) {
        let caughtTeacher = await this.repository.get({ criteria: { id } });
        if (!caughtTeacher) {
            throw new TeacherErrors.TeacherNotFoundError();
        }

        let deletedTeacher = await this.repository.delete({ id });
        return deletedTeacher;
    }
}

const teacherService = new TeacherService({ repository: teacherRepository });
export default teacherService; 