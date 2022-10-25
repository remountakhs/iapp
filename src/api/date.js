import { request } from '../constants/alias';
import { API } from "../constants/config";

/**
 * The rest request which attempts to retrieve the next Easter Sunday date.
 * @param {*} year the year of the date
 * @returns an object with an attribute containing the date
 */
export async function fetchEasteerSundayOfYear(year) {
    return await request.get(`${API}date/${year}/eastersunday`);
}

/**
 * The rest request which attempts to retrieve the Clean Monday date of the
 * provided year.
 *
 * @param year the year of the date
 * @returns an object with an attribute containing the date
 */
export async function fetchCleanMondayOfYear(year) {
    return await request.get(`${API}date/${year}/cleanmonday`);
}

/**
 * The rest request which attempts to retrieve the Easter Monday date of the
 * provided year.
 *
 * @param year the year of the date
 * @returns an object with an attribute containing the date
 */
export async function fetchGreatFridayOfYear(year) {
    return await request.get(`${API}date/${year}/greatfriday`);
}

/**
 * The rest request which attempts to retrieve the Easter Monday date of the
 * provided year.
 *
 * @param year the year of the date
 * @returns an object with an attribute containing the date
 */
export async function fetchEasterMondayOfYear(year) {
    return await request.get(`${API}date/${year}/eastermonday`);
}

/**
 * The rest request which attempts to retrieve the Whit Monday date of the
 * provided year.
 *
 * @param year the year of the date
 * @returns an object with an attribute containing the date
 */
export async function fetchWhitMondayOfYear(year) {
    return await request.get(`${API}date/${year}/whitmonday`);
}

/**
 * The rest request which attempts to retrieve the New Year's Day date of 
 * the provided year.
 *
 * @param year the year of the date
 * @returns an object with an attribute containing the date
 */
export async function fetchNewYearsDayOfYear(year) {
    return await request.get(`${API}date/${year}/newyearsday`);
}

/**
 * The rest request which attempts to retrieve the Epiphany date of the
 * provided year.
 *
 * @param year the year of the date
 * @returns an object with an attribute containing the date
 */
export async function fetchEpiphanyOfYear(year) {
    return await request.get(`${API}date/${year}/epiphany`);
}

/**
 * The rest request which attempts to retrieve the Independence Day date of the
 * provided year.
 *
 * @param year the year of the date
 * @returns an object with an attribute containing the date
 */
export async function fetchIndependenceDayOfYear(year) {
    return await request.get(`${API}date/${year}/independenceday`);
}

/**
 * The rest request which attempts to retrieve the Labourday Day date of 
 * the provided year.
 *
 * @param year the year of the date
 * @returns an object with an attribute containing the date
 */
export async function fetchLabourDayOfYear(year) {
    return await request.get(`${API}date/${year}/labourday`);
}

/**
 * The rest request which attempts to retrieve the Assumption Day date of the
 * provided year.
 *
 * @param year the year of the date
 * @returns an object with an attribute containing the date
 */
export async function fetchAssumptionDayOfYear(year) {
    return await request.get(`${API}date/${year}/assumptionday`);
}

/**
 * The rest request which attempts to retrieve the Ochi Day date of the
 * provided year.
 *
 * @param year the year of the date
 * @returns an object with an attribute containing the date
 */
export async function fetchOchiDayOfYear(year) {
    return await request.get(`${API}date/${year}/ochiday`);
}

/**
 * The rest request which attempts to retrieve the Christmas Day date of 
 * the provided year.
 *
 * @param year the year of the date
 * @returns an object with an attribute containing the date
 */
export async function fetchChristmasDayOfYear(year) {
    return await request.get(`${API}date/${year}/christmasday`);
}

/**
 * The rest request which attempts to retrieve the Glorifying Mother of God 
 * date of the provided year.
 *
 * @param year the year of the date
 * @returns an object with an attribute containing the date
 */
export async function fetchGlorifyingMotherOfGodOfYear(year) {
    return await request.get(`${API}date/${year}/glorifyingmotherofgod`);
}

/**
 * The rest request which attempts to retrieve the Three Holy Hierarchs Day
 * date of the provided year.
 *
 * @param year the year of the date
 * @returns an object with an attribute containing the date
 */
export async function fetchTheThreeHolyHierarchsDayOfYear(year) {
    return await request.get(`${API}date/${year}/thethreeholyhierarchs`);
}

/**
 * The rest request which attempts to retrieve the Polytechnio Day
 * date of the provided year.
 *
 * @param year the year of the date
 * @returns an object with an attribute containing the date
 */
export async function fetchPolytechnioOfYear(year) {
    return await request.get(`${API}date/${year}/polytechnio`);
}



const dateApi = {
    fetchEasteerSundayOfYear,
    fetchCleanMondayOfYear,
    fetchGreatFridayOfYear,
    fetchEasterMondayOfYear,
    fetchWhitMondayOfYear,
    fetchNewYearsDayOfYear,
    fetchEpiphanyOfYear,
    fetchIndependenceDayOfYear,
    fetchLabourDayOfYear,
    fetchAssumptionDayOfYear,
    fetchOchiDayOfYear,
    fetchChristmasDayOfYear,
    fetchGlorifyingMotherOfGodOfYear,
    fetchTheThreeHolyHierarchsDayOfYear,
    fetchPolytechnioOfYear
}

export default dateApi;