import { request } from '../constants/alias';
import { API } from "../constants/config";

/**
 * The rest request which attempts to get the equipments list from the database.
 * @param {*} outletID The id of the equipment outlet id
 * @param {object} pageable includes all pageable details (page, size, sort, direction)
 * 
 * @returns an object with an attribute containing the equipments list
 */
export async function fetchAll(outletID, pageable) {
    let params = {};
    if (pageable !== undefined) {
        params = pageable;
    }

    if (outletID !== null && outletID !== "") {
        params.outletID = outletID;
    }

    let config = {
        baseURL: process.env.REACT_APP_AXIOSBASE,
        params: params
    }
    return await request.get(`${API}equipment`, config);
}

/**
 * The rest request which return required information to be presented on add new equipment page.
 * @returns an object with an attribute containing the requested information to be presented on the equipment page
 */
export async function fetchNew() {
    return await request.get(`${API}equipment/add`);
}

/**
 * The rest request which attempts to get an existing equipment information.
 * @param {*} outletID The id of the equipment outlet id
 * @param {*} id The id of the equipment to be fetched
 * 
 * @returns an object with an attribute containing the current infromation of the equipment
 */
export async function fetchOne(outletID, id) {
    let params = {};
    if (outletID !== null && outletID !== "") {
        params.outletID = outletID;
    }

    let config = {
        baseURL: process.env.REACT_APP_AXIOSBASE,
        params: params
    }
    return await request.get(`${API}equipment/${id}`, config);
}

/**
 * The rest request which attempts to create a new equipment.
 * @param {*} data A JSON object which contains new equipment infromation
 * 
 * @returns an object refering to the success or failure of the request
 */
export async function create(data) {
    return await request.post(`${API}equipment`, data);
}

/**
 * The rest request which attempts to update an existing equipment.
 * @param {*} data A JSON object which contains the updated infromation of the equipment
 * 
 * @returns an object refering to the success or failure of the request
 */
export async function update(data) {
    return await request.put(`${API}equipment`, data);
}

/**
 * The rest request to delete a specific equipment.
 * @param {*} id The id of the equipment to be deleted
 * 
 * @returns an object refering to the success or failure of the request
 */
export async function deleteById(id) {
    return await request.delete(`${API}equipment/${id}`);
}

const equipmentApi = {
    fetchAll,
    fetchNew,
    fetchOne,
    create,
    update,
    deleteById
}

export default equipmentApi;