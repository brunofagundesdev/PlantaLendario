import { database } from "../../infra/database.js";

class DisciplineTeacherRepository {
    constructor({ database }) {
        this.database = database;
    }

    async assign({ disciplineId, teacherId }) {
        let result = await this.database`
            insert into discipline_teacher(discipline, teacher)
            values (${disciplineId}, ${teacherId})
            returning discipline, teacher;
        `;
        return result;
    }

    async getRolesByUser({ disciplineId }) {
        let result = await this.database`
            select teacher.id, teacher.name, teacher.email, teacher.telephone
            from teacher
            join discipline_teacher on discipline_teacher.teacher = teacher.id
            where discipline_teacher.discipline = ${disciplineId};
        `;
        return result;
    }

    async deassign({ disciplineId, teacherId }) {
        let [result] = await this.database`
            delete from discipline_teacher
            where discipline = ${disciplineId} and teacher = ${teacherId}
            returning discipline, teacher;
        `;
        return result;
    }
}

const disciplineTeacherController = new DisciplineTeacherRepository({ database: database });
export default disciplineTeacherController;