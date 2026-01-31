import getRolesService from "../../services/roles/get-roles.service.js"

async function getRolesController(request, reply){

    let roles = await getRolesService();
    return reply.status(200).send(roles);
}

export {
    getRolesController
}