import { TextField } from '@mui/icons-material';
import React, { Component } from 'react';

/**
 * The Custom Text Field, that display customized {@link TextField}.
 *
 * @version 1.0.1
 * @author [Gina Chatzimarkaki]
 */
class CustomTextField extends Component {
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
         * @property {boolean} required if the value is required at this text field 
         * @property {boolean} error if text field is at an error state
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
            required: this.props.required,
            error: this.props.error,
            extraTags: this.props.extraTags,
            helperText: this.props.helperText
        };
    }

    /**
     * Gets called to render the document html
     *
     * @return {ReactElement} markup
     * @author [Gina Chatzimarkaki]
     */
    render() {
        return (
            <TextField
                id={this.state.id}
                name={this.state.name}
                type={this.state.type}
                className={this.state.className}
                label={this.state.label}
                defaultValue={this.state.defaultValue}
                placeholder={this.state.placeholder}
                helperText={this.state.helperText}
                required={this.state.required}
                error={this.state.error}
                onChange={this.props.onChange}
            />
        );
    }
}

CustomTextField.defaultProps = {
    id: "",
    name: "",
    type: "",
    className: "",
    label: "",
    defaultValue: "",
    placeholder: "",
    helperText: "",
    required: true,
    error: false
}
export default CustomTextField;