/**
 * @typedef {import('./discipline-teacher.type.js').DisciplineTeacher} DisciplineTeacher
 * @typedef {import('./discipline-teacher.type.js').DisciplineTeacherAssignData} DisciplineTeacherAssignData
*/

import { database } from "../../infra/database.js";

/**
 * Repository responsável pela persistência da relação entre disciplina e professor.
 * Gerencia as operações de atribuição e remoção de professores em disciplinas.
*/
class DisciplineTeacherRepository {

    /**
     * Atribui um professor a uma disciplina.
     *
     * @param {Object} params
     * @param {string} params.disciplineId - ID da disciplina
     * @param {string} params.teacherId - ID do professor
     * @returns {Promise<DisciplineTeacher>}
    */
    async assign({ disciplineId, teacherId }) {
        let [result] = await database`
            insert into discipline_teacher(discipline, teacher)
            values (${disciplineId}, ${teacherId})
            returning discipline, teacher;
        `;
        return result;
    }

    /**
     * Remove um professor de uma disciplina.
     *
     * @param {Object} params
     * @param {string} params.disciplineId - ID da disciplina
     * @param {string} params.teacherId - ID do professor
     * @returns {Promise<Boolean>}
    */
    async deassign({ disciplineId, teacherId }) {
        let result = await database`
            delete from discipline_teacher
            where discipline = ${disciplineId} and teacher = ${teacherId}
            returning discipline, teacher;
        `;
        return result.length > 0;
    }

    /**
     * Verifica se um professor já está atribuído a uma disciplina.
     *
     * @param {Object} params
     * @param {string} params.disciplineId - ID da disciplina
     * @param {string} params.teacherId - ID do professor
     * @returns {Promise<Boolean>}
    */
    async exists({ disciplineId, teacherId }) {
        let result = await database`
            select 1
            from discipline_teacher
            where discipline = ${disciplineId} and teacher = ${teacherId}
            limit 1;
        `;
        return result.length > 0;
    }
}

const disciplineTeacherRepository = new DisciplineTeacherRepository();
export default disciplineTeacherRepository;