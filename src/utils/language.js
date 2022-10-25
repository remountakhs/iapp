import { getLangOptions } from "../constants/langOptions";
import i18n from "../i18n";
import { isStringContainsTextFromArrayOfSubstrings } from "./functions";

/**
 * Change the language.
 * 
 * @param {String} langCode the language code to be set (if given)
 */
export function changeLanguage(langCode = undefined) {
    let lang = (langCode === undefined) ? getLanguageFromURL() : langCode;
    i18n.changeLanguage(lang);
}

/**
 * Get current language from url path. If language code not matching 
 * the available languages returns default language code.
 * 
 * @returns the lang code
 */
export function getLanguageFromURL() {
    let pageUrl = window.location.pathname;
    if (isStringContainsTextFromArrayOfSubstrings(pageUrl, getLangOptions().map(function (e) { return '/' + e }))) {
        return pageUrl.split("/")[1];
    }
    return "en";
}

export default class functions {
    static changeLanguage(langCode) { return changeLanguage(langCode); };
    static getLanguageFromURL() { return getLanguageFromURL(); };
}