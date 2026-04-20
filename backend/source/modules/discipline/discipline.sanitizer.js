import * as DisciplineErrors from "./discipline.error.js";
import BaseSanitizer from "../../utils/base.sanitizer.js"

/**
 * Sanitizer responsável por validação e sanitização de dados de disciplinas.
 * Estende BaseSanitizer com métodos específicos de validação.
*/
export default class DisciplineSanitizer extends BaseSanitizer {

    /**
     * Parseia dados para criação de disciplina.
     *
     * @param {Object} params
     * @param {Object} params.data
     * @param {string} params.data.name
     * @returns {Object} Dados sanitizados para criação
    */
    static parseCreate({ data }) {
        const parsed = { data: {} };
        parsed.data.name = this.parseName(data.name);

        return parsed;
    }

    /**
     * Parseia ID para busca de disciplina.
     *
     * @param {string} id
     * @returns {Object} ID validado
    */
    static parseGet({ id }) {
        const parsed = {};
        parsed.id = this.parseId(id);

        return parsed;
    }

    /**
     * Parseia dados para atualização de disciplina.
     *
     * @param {Object} params
     * @param {string} params.id
     * @param {Object} params.data
     * @returns {Object} Dados sanitizados para atualização
     *
     * @throws {DisciplineUpdateInvalidError}
     * Caso nenhum campo permitido tenha sido enviado
    */
    static parseUpdate({ id, data }) {
        const parsed = { data: {} };
        parsed.id = this.parseId(id);

        if (data.name !== undefined) {
            parsed.data.name = this.parseName(data.name);
        }

        if (!Object.keys(parsed.data).length) {
            throw new DisciplineErrors.DisciplineUpdateInvalidError();
        }

        return parsed;
    }

    /**
     * Parseia ID para deleção de disciplina.
     *
     * @param {string} id
     * @returns {Object} ID validado
    */
    static parseDelete({ id }) {
        const parsed = {};
        parsed.id = this.parseId(id);

        return parsed;
    }

    // ==================================================================

    /**
     * Parseia ID.
     *
     * @param {string} id
     * @returns {string} ID validado
     *
     * @throws {DisciplineIdInvalidError}
    */
    static parseId(id) {
        if (typeof id !== "string") {
            throw new DisciplineErrors.DisciplineIdInvalidError();
        }
        this.validadeId(id);

        return id;
    }

    /**
     * Parseia nome da disciplina.
     *
     * @param {string} name
     * @returns {string} Nome validado e normalizado
     *
     * @throws {DisciplineNameInvalidError}
    */
    static parseName(name) {
        if (typeof name !== "string") {
            throw new DisciplineErrors.DisciplineNameInvalidError();
        }
        name = this.normalizeName(name, { accentuation: true });
        this.validateName(name);

        return name;
    }

    // ==================================================================

    /**
     * Valida nome da disciplina.
     *
     * @param {string} name
     * @throws {DisciplineNameInvalidError}
    */
    static validateName(name) {
        if (!super.validateName(name)) {
            throw new DisciplineErrors.DisciplineNameInvalidError()
        }
        return;
    }

    /**
     * Valida ID da disciplina.
     *
     * @param {string} id
     * @throws {DisciplineIdInvalidError}
    */
    static validadeId(id) {
        if (this.validateSerial(id)) {
            throw new DisciplineErrors.DisciplineIdInvalidError();
        }
        return;
    }
}