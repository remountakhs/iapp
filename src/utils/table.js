import CustomControlButton from "../components/Button/CustomControlButton";
import CustomChip from "../components/Chip/CustomChip";
import DateTimeFormatter from "./date-time-formatter";

/**
 * This function will format the roles to the required format.
 * 
 * @param {*} cell the cell of the table of the row that being formatted
 * @param {*} row the row of the table to be formatted
 * @param {*} rowIndex  the row index of the table to be formatted
 * @param {*} formatExtraData parse extra data
 */
export function rolesFormatter(cell, row, rowIndex, formatExtraData) {
    if (row.roles !== null) {
        if (row.roles.length === 0) {
            return <span>{formatExtraData.emptyMessage}</span>
        } else if (row.roles.length > 0) {
            let object = [];
            for (let i = 0; i < row.roles.length; i++) {
                object.push(<CustomChip label={row.roles[i]} rowIndex={rowIndex} />);
            }
            return object;
        }
    }

    return (
        <span>{formatExtraData.emptyMessage}</span>
    );
}

/**
 * This function will format the date to the required format.
 * 
 * @param {*} cell the cell of the table of the row that being formatted
 * @param {*} row the row of the table to be formatted
 */
export function dateFormatter(cell, row) {
    if (row.dateCreated) {
        return <DateTimeFormatter text={row.dateCreated} />;
    }

    return (
        cell
    );
}

/**
 * This function will format the date to the required format.
 * 
 * @param {*} cell the cell of the table of the row that being formatted
 * @param {*} row the row of the table to be formatted
 * @param {*} rowIndex  the row index of the table to be formatted
 * @param {*} formatExtraData parse extra data
 */
export function nanFormatter(cell, row, rowIndex, formatExtraData) {
    if (cell === null || cell === "") {
        return formatExtraData.emptyMessage;
    } else {
        return (
            cell
        );
    }
}

/**
 * This function will format username to the required format.
 * 
 * @param {*} cell the cell of the table of the row that being formatted
 * @param {*} row the row of the table to be formatted
 * @param {*} rowIndex  the row index of the table to be formatted
 * @param {*} formatExtraData parse extra data
 */
export function usernameFormatter(cell, row, rowIndex, formatExtraData) {
    if (row.username) {
        return <a className="link" href={formatExtraData.url}>{row.username}</a>
    } else {
        return ""
    }
}

/**
 * This function will format the control field to the required format.
 * 
 * @param {*} cell the cell of the table of the row that being formatted
 * @param {*} row the row of the table to be formatted
 * @param {*} rowIndex  the row index of the table to be formatted
 * @param {*} formatExtraData parse onclick functions for enable/disable a control field
 */
export function iconFormatter(cell, row, rowIndex, formatExtraData) {
    console.log(cell)
    return <CustomControlButton shownLabel={false} onClick={(event) => cell ? formatExtraData.disable(event, row.id) : formatExtraData.enable(event, row.id)} isEnabled={cell} />;
}

export default class functions {
    static rolesFormatter(cell, row, rowIndex, formatExtraData) { return rolesFormatter(cell, row, rowIndex, formatExtraData); };
    static dateFormatter(cell, row,) { return dateFormatter(cell, row); };
    static nanFormatter(cell, row, rowIndex, formatExtraData) { return nanFormatter(cell, row, rowIndex, formatExtraData); };
    static usernameFormatter(cell, row, rowIndex, formatExtraData) { return usernameFormatter(cell, row, rowIndex, formatExtraData); };
    static iconFormatter(cell, row, rowIndex, formatExtraData) { return iconFormatter(cell, row, rowIndex, formatExtraData); };
}