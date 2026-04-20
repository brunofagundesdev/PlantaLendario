/**
 * @typedef {import('./discipline-teacher.type.js').DisciplineTeacherAssignData} DisciplineTeacherAssignData
*/

import BaseSanitizer from "../../utils/base.sanitizer.js";

import * as DisciplineErrors from "../discipline/discipline.error.js";
import * as TeacherErrors from "../teacher/teacher.error.js";

/**
 * Sanitizer responsável por validação e sanitização de dados da relação discipline-teacher.
 * Valida IDs de disciplina e professor.
*/
export default class DisciplineTeacherSanitizer extends BaseSanitizer {

    /**
     * Parseia dados para atribuição de professor.
     *
     * @param {Object} params
     * @param {string} params.disciplineId - ID da disciplina
     * @param {string} params.teacherId - ID do professor
     * @returns {DisciplineTeacherAssignData} Dados sanitizados
    */
    static parseAssign({ disciplineId, teacherId }) {
        let parsed = {};
        parsed.disciplineId = this.parseDisciplineId(disciplineId);
        parsed.teacherId = this.parseTeacherId(teacherId);

        return parsed;
    }

    /**
     * Parseia dados para remoção de professor.
     *
     * @param {Object} params
     * @param {string} params.disciplineId - ID da disciplina
     * @param {string} params.teacherId - ID do professor
     * @returns {DisciplineTeacherAssignData} Dados sanitizados
    */
    static parseDeassign({ disciplineId, teacherId }) {
        let parsed = {};
        parsed.disciplineId = this.parseDisciplineId(disciplineId);
        parsed.teacherId = this.parseTeacherId(teacherId);

        return parsed;
    }

    // ==================================================================

    /**
     * Valida e parseia ID da disciplina.
     *
     * @param {string} id - ID da disciplina
     * @returns {string} ID validado
     *
     * @throws {DisciplineIdInvalidError}
    */
    static parseDisciplineId(id) {
        if (typeof id !== "string") {
            throw new DisciplineErrors.DisciplineIdInvalidError();
        }
        this.validateDisciplineId(id);
        return id;
    }

    /**
     * Valida e parseia ID do professor.
     *
     * @param {string} id - ID do professor
     * @returns {string} ID validado
     *
     * @throws {TeacherIdInvalidError}
    */
    static parseTeacherId(id) {
        if (typeof id !== "string") {
            throw new TeacherErrors.TeacherIdInvalidError();
        }
        this.validateTeacherId(id);
        return id;
    }

    // ==================================================================

    /**
     * Valida ID da disciplina.
     *
     * @param {string} id - ID da disciplina
     * @throws {DisciplineIdInvalidError}
    */
    static validateDisciplineId(id) {
        if (!this.validateSerial(id)) {
            throw new DisciplineErrors.DisciplineIdInvalidError();
        }
        return;
    }

    /**
     * Valida ID do professor.
     *
     * @param {string} id - ID do professor
     * @throws {TeacherIdInvalidError}
    */
    static validateTeacherId(id) {
        if (!this.validateUUID(id)) {
            throw new TeacherErrors.TeacherIdInvalidError();
        }
        return;
    }
}