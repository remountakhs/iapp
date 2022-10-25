import { request } from '../constants/alias';
import { API } from "../constants/config";

/**
 * The rest request which attempts to get the outlets list from the database.
 * @param {object} pageable includes all pageable details (page, size, sort, direction)
 * 
 * @returns an object with an attribute containing the outlets list
 */
export async function fetchAll(pageable) {
    let config = {
        baseURL: process.env.REACT_APP_AXIOSBASE,
        params: pageable !== undefined ? pageable : {}
    }

    return await request.get(`${API}outlet`, config);
}

/**
 * The rest request which return required information to be presented on add new outlet page.
 * @returns an object with an attribute containing the requested information to be presented on the outlet page
 */
export async function fetchNew() {
    return await request.get(`${API}outlet/add`);
}

/**
 * The rest request which attempts to get an existing outlet information.
 * @param {*} outletID The id of the outlet to be fetched
 * 
 * @returns an object with an attribute containing the current infromation of the outlet
 */
export async function fetchOne(outletID) {
    return await request.get(`${API}outlet/${outletID}`);
}

/**
 * The rest request which attempts to create a new outlet.
 * @param {*} data A JSON object which contains new outlet infromation
 * 
 * @returns an object refering to the success or failure of the request
 */
export async function create(data) {
    return await request.post(`${API}outlet`, data);
}

/**
 * The rest request which attempts to update an existing outlet.
 * @param {*} data A JSON object which contains the updated infromation of the outlet
 * 
 * @returns an object refering to the success or failure of the request
 */
export async function update(data) {
    return await request.put(`${API}outlet`, data);
}

/**
 * The rest request to delete a specific outlet.
 * @param {*} id The id of the outlet to be deleted
 * 
 * @returns an object refering to the success or failure of the request
 */
export async function deleteById(id) {
    return await request.delete(`${API}outlet/${id}`);
}

const outletApi = {
    fetchAll,
    fetchNew,
    fetchOne,
    create,
    update,
    deleteById
}

export default outletApi;