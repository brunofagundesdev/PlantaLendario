/**
 * @typedef {import('./discipline.type.js').Discipline} Discipline
 * @typedef {import('./discipline.type.js').DisciplineUpdateData} DisciplineUpdateData
*/

import disciplineRepository from "./discipline.repository.js";
import * as DisciplineErrors from "./discipline.error.js";
import teacherRepository from "../teacher/teacher.repository.js";

import filterAllowedFields from "../../utils/filter-allowed-fields.js";

/**
 * Service responsável por gerenciar operações relacionadas a disciplinas.
 * Atua como camada de regra de negócio entre o controller e o repository.
*/
class DisciplineService {
    static updateAllowedFields = ["name"];

    /**
     * Cria uma nova disciplina.
     *
     * @param {Object} params
     * @param {Object} params.data - Dados necessários para criação da disciplina
     * @returns {Promise<Discipline>} Disciplina criada
     *
     * @throws {DisciplineNameAlredyRegisteredError}
     * Caso o nome da disciplina já esteja registrado
    */
    async create({ data }) {
        const nameAlreadyExists = await disciplineRepository.exists({ criteria: { name: data.name } });
        if (nameAlreadyExists) {
            throw new DisciplineErrors.DisciplineNameAlredyRegisteredError();
        }
        
        let createdDiscipline = await disciplineRepository.create({ data });
        return createdDiscipline;
    }

    /**
     * Busca uma disciplina pelo ID.
     *
     * @param {Object} params
     * @param {string} params.id - ID da disciplina
     * @returns {Promise<Discipline>} Disciplina encontrada com lista de professores
     *
     * @throws {DisciplineNotFoundError}
     * Caso a disciplina não exista
    */
    async get({ id }) {
        const caughtDiscipline = await disciplineRepository.getById({ id });
        if (!caughtDiscipline) {
            throw new DisciplineErrors.DisciplineNotFoundError();
        }
        const listedTeachersByDiscipline = await teacherRepository.listByDiscipline({ id });
        return {
            ...caughtDiscipline,
            teachers: listedTeachersByDiscipline
        };
    }

    /**
     * Lista todas as disciplinas.
     *
     * @returns {Promise<Discipline[]>} Lista de disciplinas
    */
    async list() {
        const listedDisciplines = await disciplineRepository.list();
        return listedDisciplines;
    }

    /**
     * Atualiza uma disciplina existente.
     *
     * Aplica whitelist de campos permitidos antes de enviar ao repository.
     *
     * @param {Object} params
     * @param {string} params.id - ID da disciplina a ser atualizada
     * @param {DisciplineUpdateData} params.data - Dados para atualização
     * @returns {Promise<Discipline>} Disciplina atualizada
     *
     * @throws {DisciplineUpdateInvalidError}
     * Caso nenhum campo permitido tenha sido enviado
     *
     * @throws {DisciplineNameAlredyRegisteredError}
     * Caso o nome da disciplina já esteja registrado
     *
     * @throws {DisciplineNotFoundError}
     * Caso a disciplina não exista
    */
    async update({ id, data }) {
        let filteredData = filterAllowedFields(data, DisciplineService.updateAllowedFields);
        if (!Object.keys(filteredData).length) {
            throw new DisciplineErrors.DisciplineUpdateInvalidError();
        }

        const caughtDiscipline = await disciplineRepository.getById({ id });
        if (!caughtDiscipline) {
            throw new DisciplineErrors.DisciplineNotFoundError();
        }

        if (filteredData.name) {
            const nameAlreadyExists = await disciplineRepository.exists({ criteria: { name: filteredData.name } });
            if (nameAlreadyExists && caughtDiscipline.name !== filteredData.name) {
                throw new DisciplineErrors.DisciplineNameAlredyRegisteredError();
            }
        }

        let updatedDiscipline = await disciplineRepository.update({ id, data: filteredData });
        return updatedDiscipline;
    }

    /**
     * Remove uma disciplina pelo ID.
     *
     * @param {Object} params
     * @param {string} params.id - ID da disciplina
     * @returns {Promise<Boolean>} Disciplina removida com sucesso
     *
     * @throws {DisciplineNotFoundError}
     * Caso a disciplina não exista
    */
    async delete({ id }) {
        const caughtDiscipline = await disciplineRepository.getById({ id });
        if (!caughtDiscipline) {
            throw new DisciplineErrors.DisciplineNotFoundError();
        }

        let deletedDiscipline = await disciplineRepository.delete({ id });
        return deletedDiscipline;
    }
}

const disciplineService = new DisciplineService();
export default disciplineService;