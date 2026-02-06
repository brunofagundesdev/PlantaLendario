import { getEventTypesRepository } from "../../../repository/events/types/get-event-types.repository.js";

async function getEventTypesService() {
    
    let eventTypes = await getEventTypesRepository();
    return eventTypes;
}

export {
    getEventTypesService
}