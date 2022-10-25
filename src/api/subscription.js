import { request } from '../constants/alias';
import { API } from "../constants/config";

/**
 * The rest request which attempts to get the subscriptions list from the database.
 * @param {object} pageable includes all pageable details (page, size, sort, direction)
 * 
 * @returns an object with an attribute containing the subscriptions list
 */
export async function fetchAll(pageable) {
    let config = {
        baseURL: process.env.REACT_APP_AXIOSBASE,
        params: pageable !== undefined ? pageable : {}
    }

    return await request.get(`${API}subscription`, config);
}

/**
 * The rest request which attempts to get the subscriptions list with the provided status from the database.
 * @param {string} status the status of the subscription
 * @param {object} pageable includes all pageable details (page, size, sort, direction)
 * 
 * @returns an object with an attribute containing the subscriptions list with specific status
 */
export async function fetchAllByStatus(status, pageable) {
    let config = {
        baseURL: process.env.REACT_APP_AXIOSBASE,
        params: pageable !== undefined ? pageable : {}
    }

    return await request.get(`${API}subscription/status/${status}`, config);
}

/**
 * The rest request which attempts to get the subscriptions list with the provided status from the database.
 * @param {string} organizationID the organization ID
 * @param {object} pageable includes all pageable details (page, size, sort, direction)
 * 
 * @returns an object with an attribute containing the subscriptions list with specific status
 */
export async function fetchAllByOrg(organizationID, pageable) {
    let config = {
        baseURL: process.env.REACT_APP_AXIOSBASE,
        params: pageable !== undefined ? pageable : {}
    }

    return await request.get(`${API}subscription/org/${organizationID}`, config);
}

/**
 * The rest request which attempts to get an existing subscription information.
 * @param {*} subscriptionId The id of the subscription to be fetched
 * 
 * @returns an object with an attribute containing the current infromation of the subscription
 */
export async function fetchOne(subscriptionId) {
    return await request.get(`${API}subscription/${subscriptionId}`);
}

/**
 * The rest request which attempts to create a new subscription.
 * @param {*} data A JSON object which contains new subscription infromation
 * 
 * @returns an object refering to the success or failure of the request
 */
export async function create(data) {
    return await request.post(`${API}subscription`, data);
}

/**
 * The rest request which attempts to activate an existing subscription.
 * @param {*} subscriptionId The id of the subscription to be activated
 * 
 * @returns an object refering to the success or failure of the request
 */
export async function activate(subscriptionId) {
    return await request.post(`${API}subscription/${subscriptionId}/activate`);
}

/**
 * The rest request which attempts to cancel an existing subscription.
 * @param {*} subscriptionId The id of the subscription to be cancel
 * 
 * @returns an object refering to the success or failure of the request
 */
export async function cancel(subscriptionId) {
    return await request.post(`${API}subscription/${subscriptionId}/cancel`);
}

/**
 * The rest request which attempts to update an existing subscription.
 * @param {*} data A JSON object which contains the updated infromation of the subscription
 * 
 * @returns an object refering to the success or failure of the request
 */
export async function update(data) {
    return await request.put(`${API}subscription`, data);
}

/**
 * The rest request to delete a specific subscription.
 * @param {*} subscriptionId The id of the subscription to be deleted
 * 
 * @returns an object refering to the success or failure of the request
 */
export async function deleteById(subscriptionId) {
    return await request.delete(`${API}subscription/${subscriptionId}`);
}

const subscriptionApi = {
    fetchAll,
    fetchOne,
    create,
    activate,
    cancel,
    update,
    deleteById
}

export default subscriptionApi;