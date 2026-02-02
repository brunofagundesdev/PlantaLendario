import { getRolesRepository } from "../../repository/roles/get-roles.repository.js"

async function getRolesService() {

    return await getRolesRepository();

}

export {
    getRolesService
}