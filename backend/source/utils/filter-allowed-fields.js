/**
 * Filtra um objeto mantendo apenas os campos permitidos.
 *
 * @param {Object} data - Objeto original
 * @param {string[]} allowedFields - Lista de campos permitidos
 * @returns {Object} Novo objeto apenas com campos válidos
 */
export default function filterAllowedFields(data, allowedFields) {
    return Object.fromEntries(
        Object.entries(data).filter(([key]) =>
            allowedFields.includes(key)
        )
    );
}