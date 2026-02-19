import { createEventService } from "../../services/events/create-event.service.js";

async function createEventController(request, reply) {

    let {
        // event
        title,
        description,
        typeId,

        assessment,

        schedule,

        filesId
    } = request.body;

    let createdEvent = await createEventService({
        title,
        description,
        typeId,
        assessment,
        schedule,
        filesId
    });

    return reply.status(201).send(createdEvent);
}

export {
    createEventController
}

// {
//     id,
//     title,
//     description,
//     type,
//     // se for evento em uma data(s) especifica
//     schedule
//         date,
//         timetable,
//         location,

//     // se for avaliacao
//     assessment: {
//         discipline,
//         weight,
//         trimester,
//         // se tiver aula vinculada
//         lesson
//     }
// }