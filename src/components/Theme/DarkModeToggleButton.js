import React, { Component } from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';

/**
 * The DarkModeToggleButton, that display a toggle to change between themes.
 *
 * @version 1.0.1
 * @author [Gina Chatzimarkaki]
 */
class DarkModeToggleButton extends Component {
    /**
     * constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);

        /**
         * @type {object}
         * @property {boolean} isLightModeEnabled the page title
         */
        this.state = {
            isLightModeEnabled: this.props.isLightModeEnabled
        };
    }

    /**
     * Function that handles the theme change.
     * @param {*} event the event details
     */
    handleThemeChange(event) {
        console.log(event.target.checked)
        // if true -> activated dark mode
        localStorage.setItem("theme", event.target.checked ? 'dark' : 'light');
    }


    /**
     * Gets called to render the document html
     *
     * @return {ReactElement} markup
     * @author [Gina Chatzimarkaki]
     */
    render() {
        return (
            <div className="theme switch-container">
                <input type="checkbox" id="switch" value={this.state.isLightModeEnabled} onChange={this.handleThemeChange}/>
                <label htmlFor="switch">
                    <LightModeIcon className="fas fa-sun" />
                    <ModeNightIcon className="fas fa-moon" />
                    <span className="ball"></span>
                </label>
            </div>
        );
    }
}

DarkModeToggleButton.defaultProps = {
    isLightModeEnabled: true
}
export default DarkModeToggleButton;