import { patchEventOptionService } from "../../../services/events/options/patch-event-option.service.js";

async function patchEventOptionController(request, reply) {

    let { id } = request.params;
    let { name } = request.body;

    let eventOption = await patchEventOptionService({ id, name });

    return reply.status(201).send(eventOption)

}

export {
    patchEventOptionController
}