
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { Component } from 'react';
import { getThemeColor } from '../../constants/theme';
import { getTheme } from "../../utils/theme";

/**
 * The Custom Edit Button, that display an edit button for table actions section.
 *
 * @version 1.0.1
 * @author [Gina Chatzimarkaki]
 */
class CustomClickEditButton extends Component {
    /**
     * constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);

        /**
         * @type {object}
         * @property {string} label the button text value
         */
        this.state = {
            label: this.props.label
        };
    }

    getMuiTheme = () => createTheme({
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        backgroundColor: getThemeColor()[getTheme()]["ButtonBackgroundColor"],
                        margin: "0px"
                    },
                    startIcon: {
                        margin: "0px",
                        padding: "0px"
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
                <Button variant="contained" startIcon={<EditIcon />} onClick={this.props.onClick}>{this.props.shownLabel ? this.state.label : ""}</Button>
            </ThemeProvider>
        );
    }
}

CustomClickEditButton.defaultProps = {
    label: "",
    shownLabel: true
}
export default CustomClickEditButton;