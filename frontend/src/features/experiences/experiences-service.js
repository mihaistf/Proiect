import { get, post } from '../../utils/request';

const EXPERIENCES_API_URL = '/api/experiences';

const create = async (requestPayload) => {
    return post(EXPERIENCES_API_URL, requestPayload);
}

const readAll = () => {
    return get(EXPERIENCES_API_URL);
}

const experiencesService = {
    create,
    readAll
}

export default experiencesService;