/**
 * @typedef {import('./discipline-teacher.type.js').DisciplineTeacher} DisciplineTeacher
 * @typedef {import('./discipline-teacher.type.js').DisciplineTeacherAssignData} DisciplineTeacherAssignData
*/

import disciplineTeacherRepository from "./discipline-teacher.repository.js";
import disciplineRepository from "../discipline/discipline.repository.js";
import teacherRepository from "../teacher/teacher.repository.js";

import * as DisciplineErrors from "../discipline/discipline.error.js";
import * as TeacherErrors from "../teacher/teacher.error.js";
import * as DisciplineTeacherErrors from "./discipline-teacher.error.js";

/**
 * Service responsável por gerenciar a relação entre disciplinas e professores.
 * Atua como camada de regra de negócio, validando existência de ambas entidades
 * e verificando conflitos de atribuição.
*/
class DisciplineTeacherService {

    /**
     * Atribui um professor a uma disciplina.
     *
     * @param {Object} params
     * @param {string} params.disciplineId - ID da disciplina
     * @param {string} params.teacherId - ID do professor
     * @returns {Promise<DisciplineTeacher>}
     *
     * @throws {DisciplineNotFoundError}
     * Caso a disciplina não exista
     *
     * @throws {TeacherNotFoundError}
     * Caso o professor não exista
     *
     * @throws {DisciplineAlreadyHasTeacherError}
     * Caso o professor já esteja atribuído à disciplina
    */
    async assign({ disciplineId, teacherId }) {
        // Valida se disciplina existe
        const discipline = await disciplineRepository.getById({ id: disciplineId });
        if (!discipline) {
            throw new DisciplineErrors.DisciplineNotFoundError();
        }

        // Valida se professor existe
        const teacher = await teacherRepository.getById({ id: teacherId });
        if (!teacher) {
            throw new TeacherErrors.TeacherNotFoundError();
        }

        // Verifica se professor já está atribuído
        const alreadyAssigned = await disciplineTeacherRepository.exists({ disciplineId, teacherId });
        if (alreadyAssigned) {
            throw new DisciplineTeacherErrors.DisciplineAlreadyHasTeacherError();
        }

        let assignment = await disciplineTeacherRepository.assign({ disciplineId, teacherId });
        return assignment;
    }

    /**
     * Remove um professor de uma disciplina.
     *
     * @param {Object} params
     * @param {string} params.disciplineId - ID da disciplina
     * @param {string} params.teacherId - ID do professor
     * @returns {Promise<Boolean>}
     *
     * @throws {DisciplineNotFoundError}
     * Caso a disciplina não exista
     *
     * @throws {TeacherNotFoundError}
     * Caso o professor não exista
     *
     * @throws {DisciplineMissingTeacherError}
     * Caso o professor não esteja atribuído à disciplina
    */
    async deassign({ disciplineId, teacherId }) {
        // Valida se disciplina existe
        const discipline = await disciplineRepository.getById({ id: disciplineId });
        if (!discipline) {
            throw new DisciplineErrors.DisciplineNotFoundError();
        }

        // Valida se professor existe
        const teacher = await teacherRepository.getById({ id: teacherId });
        if (!teacher) {
            throw new TeacherErrors.TeacherNotFoundError();
        }

        // Verifica se professor está atribuído
        const isAssigned = await disciplineTeacherRepository.exists({ disciplineId, teacherId });
        if (!isAssigned) {
            throw new DisciplineTeacherErrors.DisciplineMissingTeacherError();
        }

        let deassignment = await disciplineTeacherRepository.deassign({ disciplineId, teacherId });
        return deassignment;
    }
}

const disciplineTeacherService = new DisciplineTeacherService();
export default disciplineTeacherService;