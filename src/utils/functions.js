
/**
 * Check if a string contains text from an array of substrings.
 * 
 * @param {String} str the full string
 * @param {*} substrings array of substrings to check
 * 
 * @returns true if string contains text from an array of substrings.
 */
export function isStringContainsTextFromArrayOfSubstrings(str, substrings) {
  return substrings.some(v => str.includes(v));
}

export function equalsIgnoreCase(str1, str2) {
  if (str1 === undefined || str2 === undefined) return false;
  return str1.toLowerCase() === str2.toLowerCase();
}

export default class functions {
  static isStringContainsTextFromArrayOfSubstrings(str, substrings) { return isStringContainsTextFromArrayOfSubstrings(str, substrings); }
  static equalsIgnoreCase(str1, str2) { return equalsIgnoreCase(str1, str2); }
}