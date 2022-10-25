
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { Component } from 'react';
import { getThemeColor } from '../../constants/theme';
import { getTheme } from "../../utils/theme";

/**
 * The Custom control Button, that display an edit button for table actions section.
 *
 * @version 1.0.1
 * @author [Gina Chatzimarkaki]
 */
class CustomControlButton extends Component {
    /**
     * constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);

        /**
         * @type {object}
         * @property {string} label the button text value
         * @property {string} color the control button color
         */
        this.state = {
            label: this.props.label,
            color: this.props.isEnabled ? "trueCcontrolButtonColor" : "falseControlButtonColor"
        };
    }

    getMuiTheme = () => createTheme({
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        backgroundColor: "transparent",
                        color: getThemeColor()[getTheme()][this.state.color],
                        margin: "0px",
                        boxShadow: "none",
                        transition: "none",
                        ":hover": {
                            backgroundColor: "transparent",
                            color: getThemeColor()[getTheme()][this.state.color],
                            margin: "0px",
                            boxShadow: "none",
                            transition: "none"
                        },
                    },
                    startIcon: {
                        margin: "0px",
                        padding: "0px",
                        "*:nth-of-type(1)": {
                            fontSize: "40px"
                        }
                    }
                }
            }
        }
    })

    /**
     * Gets called to render the document html
     *
     * @return {ReactElement} markup
     * @author [Gina Chatzimarkaki]
     */
    render() {
        return (
            <ThemeProvider theme={this.getMuiTheme()}>
                <Button variant="contained" startIcon={this.props.isEnabled ? <ToggleOnIcon /> : <ToggleOffIcon />} onClick={this.props.onClick}>{this.props.shownLabel ? this.state.label : ""}</Button>
            </ThemeProvider>
        );
    }
}

CustomControlButton.defaultProps = {
    label: "",
    shownLabel: true,
    isEnabled: true
}
export default CustomControlButton;