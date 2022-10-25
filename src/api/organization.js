import { request } from '../constants/alias';
import { API } from "../constants/config";

/**
 * The rest request which attempts to get the organizations list from the database.
 * @param {object} pageable includes all pageable details (page, size, sort, direction)
 * 
 * @returns an object with an attribute containing the organizations list
 */
export async function fetchAll(pageable) {
    let config = {
        baseURL: process.env.REACT_APP_AXIOSBASE,
        params: pageable !== undefined ? pageable : {}
    }

    return await request.get(`${API}organization`, config);
}

/**
 * The rest request which return required information to be presented on add new organization page.
 * @returns an object with an attribute containing the requested information to be presented on the organization page
 */
export async function fetchNew() {
    return await request.get(`${API}organization/add`);
}

/**
 * The rest request which attempts to get an existing organization information.
 * @param {*} orgID The id of the organization to be fetched
 * 
 * @returns an object with an attribute containing the current infromation of the organization
 */
export async function fetchOne(orgID) {
    return await request.get(`${API}organization/${orgID}`);
}

/**
 * The rest request which attempts to create a new organization.
 * @param {*} data A JSON object which contains new organization infromation
 * 
 * @returns an object refering to the success or failure of the request
 */
export async function create(data) {
    return await request.post(`${API}organization`, data);
}

/**
 * The rest request which attempts to update an existing organization.
 * @param {*} data A JSON object which contains the updated infromation of the organization
 * 
 * @returns an object refering to the success or failure of the request
 */
export async function update(data) {
    return await request.put(`${API}organization`, data);
}

/**
 * The rest request to delete a specific organization.
 * @param {*} id The id of the organization to be deleted
 * 
 * @returns an object refering to the success or failure of the request
 */
export async function deleteById(id) {
    return await request.delete(`${API}organization/${id}`);
}

const organizationApi = {
    fetchAll,
    fetchNew,
    fetchOne,
    create,
    update,
    deleteById
}

export default organizationApi;