import { request } from '../constants/alias';
import { API } from "../constants/config";

/**
 * The rest request which attempts to get the subscription plans list from the database.
 * @param {object} pageable includes all pageable details (page, size, sort, direction)
 * 
 * @returns an object with an attribute containing the subscription plans list
 */
export async function fetchAll(pageable) {
    let config = {
        baseURL: process.env.REACT_APP_AXIOSBASE,
        params: pageable !== undefined ? pageable : {}
    }

    return await request.get(`${API}subscriptionplan`, config);
}

/**
 * The rest request which attempts to get an existing subscription plan information.
 * @param {*} subscriptionPlanId The id of the subscription plan to be fetched
 * 
 * @returns an object with an attribute containing the current infromation of the subscription plan
 */
export async function fetchOne(subscriptionPlanId) {
    return await request.get(`${API}subscriptionplan/${subscriptionPlanId}`);
}

/**
 * The rest request which return required information to be presented on add new subscription plan page.
 * @returns an object with an attribute containing the requested information to be presented on the subscription plan page
 */
export async function fetchNew() {
    return await request.get(`${API}subscriptionplan/add`);
}

/**
 * The rest request which attempts to create a new subscription plan.
 * @param {*} data A JSON object which contains new subscription plan infromation
 * 
 * @returns an object refering to the success or failure of the request
 */
export async function create(data) {
    return await request.post(`${API}subscriptionplan`, data);
}

/**
 * The rest request which attempts to activate an existing subscription plan.
 * @param {*} subscriptionPlanId The id of the subscription plan to be activated
 * 
 * @returns an object refering to the success or failure of the request
 */
export async function activate(subscriptionPlanId) {
    return await request.post(`${API}subscriptionplan/${subscriptionPlanId}/activate`);
}

/**
 * The rest request which attempts to disable an existing subscription plan.
 * @param {*} subscriptionPlanId The id of the subscription plan to be disabled
 * 
 * @returns an object refering to the success or failure of the request
 */
export async function disable(subscriptionPlanId) {
    return await request.post(`${API}subscriptionplan/${subscriptionPlanId}/disable`);
}

/**
 * The rest request which attempts to update an existing subscription plan.
 * @param {*} data A JSON object which contains the updated infromation of the subscription plan
 * 
 * @returns an object refering to the success or failure of the request
 */
export async function update(data) {
    return await request.put(`${API}subscriptionplan`, data);
}

/**
 * The rest request to delete a specific subscription plan.
 * @param {*} subscriptionPlanIdThe id of the subscription plan to be deleted
 * 
 * @returns an object refering to the success or failure of the request
 */
export async function deleteById(subscriptionPlanId) {
    return await request.delete(`${API}subscriptionplan/${subscriptionPlanId}`);
}

const subscriptionPlanApi = {
    fetchAll,
    fetchOne,
    fetchNew,
    create,
    activate,
    disable,
    update,
    deleteById
}

export default subscriptionPlanApi;