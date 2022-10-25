import { request } from '../constants/alias';
import { API } from "../constants/config";

/**
 * The rest request which attempts to get the users list from the database.
 * @param {object} pageable includes all pageable details (page, size, sort, direction)
 * @returns an object with an attribute containing the users list
 */
export async function fetchAll(pageable) {
    let config = {
        baseURL: process.env.REACT_APP_AXIOSBASE,
        params: pageable !== undefined ? pageable : {}
    }

    return await request.get(`${API}user`, config);
}

/**
 * The rest request which return required information to be presented on add new user page.
 * @returns an object with an attribute containing the requested information to be presented on the user page
 */
export async function fetchNew() {
    return await request.get(`${API}user/add`);
}

/**
 * The rest request which return required information to be presented on aaccount pop up.
 * @returns an object with an attribute containing the requested information of the authenticated user
 */
export async function fetchAuth() {
    return await request.get(`${API}user/auth`);
}

/**
 * The rest request which attempts to get an existing user information.
 * @param {*} userID The id of the user to be fetched
 * @returns an object with an attribute containing the current infromation of the user
 */
export async function fetchOne(userID) {
    return await request.get(`${API}user/${userID}`);
}

/**
 * The rest request which attempts to create a new user.
 * @param {*} data A JSON object which contains new user infromation
 * @returns an object refering to the success or failure of the request
 */
export async function create(data) {
    return await request.post(`${API}user`, data);
}

/**
 * The rest request which attempts to update an existing user.
 * @param {*} data A JSON object which contains the updated infromation of the user
 * @returns an object refering to the success or failure of the request
 */
export async function update(data) {
    return await request.put(`${API}user`, data);
}

/**
 * The rest request which attempts to change the password of a specific user.
 * @param {*} userID The id of the user to change the password
 * @param {*} data A JSON object which contains the updated infromation of the user password
 * @returns an object refering to the success or failure of the request
 */
export async function changePassword(userID, data) {
    return await request.put(`${API}user/${userID}/password`, data);
}

/**
 * The rest request which attempts to enable an existing user.
 * @param {*} userId The id of the user to be enabled
 * 
 * @returns an object refering to the success or failure of the request
 */
export async function enable(userId) {
    return await request.post(`${API}user/${userId}/enable`);
}

/**
 * The rest request which attempts to disable an existing user.
 * @param {*} userId The id of the user to be disabled
 * 
 * @returns an object refering to the success or failure of the request
 */
export async function disable(userId) {
    return await request.post(`${API}user/${userId}/disable`);
}

/**
 * The rest request which request a user logout action to be performed.
 * @returns an object refering to the success or failure of the request
 */
export async function logout() {
    return await request.post(`${API}user/logout`);
}

const userApi = {
    fetchAll,
    fetchNew,
    fetchOne,
    fetchAuth,
    create,
    update,
    enable,
    disable,
    changePassword,
    logout
}

export default userApi;