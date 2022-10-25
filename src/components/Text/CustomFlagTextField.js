import { createTheme, ThemeProvider } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

/**
 * The Custom Flag Text Field, that display customized {@link TextField}.
 *
 * @version 1.0.1
 * @author [Gina Chatzimarkaki]
 */
class CustomFlagTextField extends Component {
    /**
     * constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);

        /**
         * @type {object}
         * @property {string} id the text field id
         * @property {string} name the text field name
         * @property {string} type the text field type
         * @property {string} className the text field class
         * @property {string} label Applies the theme typography styles.
         * @property {string} defaultValue the text field default value
         * @property {string} placeholder the text field placeholder
         * @property {string} helperText the text field helper text
         * @property {boolean} error if text field is at an error state
         * @property {string} country the text field language code
         * @property {string} flag the text field language flag
         *
        */
        this.state = {
            id: this.props.id,
            name: this.props.name,
            type: this.props.type,
            className: this.props.className,
            label: this.props.label,
            defaultValue: this.props.defaultValue,
            placeholder: this.props.placeholder,
            error: this.props.error,
            extraTags: this.props.extraTags,
            helperText: this.props.helperText,
            country: this.props.country,
            flag: this.props.flag
        };
    }


    getMuiTheme = (sx) => createTheme({
        components: {
            MuiOutlinedInput: {
                styleOverrides: {
                    input: {
                        width: "auto",
                        padding: "7px"
                    }
                }
            },


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
            <ThemeProvider theme={this.getMuiTheme(this.props.sx)}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: "10px" }}>
                    <TextField
                        id={this.state.id}
                        name={this.state.name}
                        type={this.state.type}
                        className={this.state.className}
                        label={this.state.label}
                        defaultValue={this.state.defaultValue ? this.state.defaultValue : ""}
                        placeholder={this.state.placeholder ? this.state.placeholder : this.props.t(`languages.${this.state.country}`)}
                        helperText={this.state.helperText}
                        error={this.state.error}
                        sx={{
                            padding: "0px"
                        }}
                        InputProps={{
                            startAdornment: <img src={this.state.flag} width="30" alt={this.state.country} style={{ placeSelf: "center" }} />
                        }}
                    />
                </Box>
            </ThemeProvider>
        );
    }
}

CustomFlagTextField.defaultProps = {
    country: "en",
    id: "",
    name: "",
    type: "text",
    className: "",
    label: "",
    placeholder: "",
    helperText: "",
    error: false
}
export default withTranslation()(CustomFlagTextField);