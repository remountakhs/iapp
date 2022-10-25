import { request } from '../constants/alias';
import { API } from "../constants/config";

/**
 * The rest request which attempts to fetch the vat details by validating the 
 * provided VAT number.
 * 
 * @param countryCode the country 2 charachter identifying code
 * @param vatNumber   VAT is an identifier used in many countries, including the
 *                    countries of the European Union, for value-added tax
 *                    purposes
 * 
 * @returns an object with an attribute containing the vat details
 */
export async function fetch(countryCode, vatNumber) {
    return await request.get(`${API}vat/${countryCode}/${vatNumber}`);
}

const vatApi = {
    fetch
}

export default vatApi;