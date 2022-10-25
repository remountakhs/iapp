
/**
 * @type {object}
 * @property {object} isError error messages 
 * @returns true if the form fields are all valid
 */
export function formIsAllValid({ isError, ...rest }) {
    let isValid = false;

    Object.values(isError).forEach(val => {
        if (val.length > 0) {
            isValid = false
        } else {
            isValid = true
        }
    });

    Object.values(rest).forEach(val => {
        if (val.length <= 0) {
            isValid = false
        } else {
            isValid = true
        }
    });

    return isValid;
};

/**
 * @type {object}
 * @property {object} isError error messages 
 * @returns true if the form is valid
 */
export function formIsValid(isError) {
    let isValid = true;
    Object.values(isError).forEach((val) =>
        // if we have an error string set valid to false
        val.length > 0 && (isValid = false)
    );

    return isValid;
};

export default class formValidation {
    static formIsAllValid({ isError, ...rest }) { formIsAllValid({ isError, ...rest }); }
    static formIsValid({ isError, ...rest }) { formIsValid({ isError, ...rest }); }
}