import React, { Component } from 'react';
import { getLangOptions } from '../../constants/langOptions';
import { changeLanguage } from '../../utils/language';

/**
 * The header language selector component.
 *
 * @version 1.0.0
 * @author [Gina Chatzimarkaki]
 */
class LanguageSelector extends Component {

    /**
     * Handles the language change.
     * 
     * @param {*} event 
     * @param {String} path the path to redirect
     */
    changeLanguageHandler = (event, lang, path) => {
        changeLanguage(lang);
        window.location.href = "/" + lang + path;
    }
    /**
     * Gets called to render the document html
     *
     * @return {ReactElement} markup
     * @author [Gina Chatzimarkaki]
     */
    render() {
        let pageUrl = window.location.pathname;
        let pageLang = pageUrl;
        if (pageUrl.includes("/el") || pageUrl.includes("/en")) {
            pageLang = pageLang.split("/")[1];
        }
        let pagePath = pageUrl.split(pageLang)[1];

        return (
            <ul className={this.props.class + " lang-list"}>
                {getLangOptions().map((lang) => (
                    <li key={lang} className={this.props.class + " lang-list-item"}>
                        <img src={require("../../assets/images/flags/" + lang + ".png")} alt={"flag " + lang.toUpperCase()} width="32" onClick={(event) => this.changeLanguageHandler(event, lang, pagePath)} />
                        {/* {lang.toUpperCase()} */}
                    </li>
                ))}
            </ul>
        )
    }
}

LanguageSelector.defaultProps = {
    class: "auth"
}

export default LanguageSelector;