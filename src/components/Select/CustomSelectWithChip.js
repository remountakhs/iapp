import React, { Component } from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

/**
 * The Custom Chip Multi Select Field, that display customized {@link Chip}.
 *
 * @version 1.0.1
 * @author [Gina Chatzimarkaki]
 */
class CustomSelectWithChip extends Component {
    /**
     * constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);

        /**
         * @type {object}
         * @property {string} id the text field id
         * @property {string} labelID the text field label id
         * @property {string} name the text field name
         * @property {string} className the text field class
         * @property {string} label Applies the theme typography styles.
         * @property {array} defaultValue the text field default value
         * @property {string} placeholder the text field placeholder
         * @property {boolean} required if the value is required at this text field 
         * @property {boolean} error if text field is at an error state
         * @property {boolean} isMultiple if multiple selection is enabled
         *
        */
        this.state = {
            id: this.props.id,
            labelID: this.props.labelID,
            name: this.props.name,
            className: this.props.className,
            label: this.props.label,
            defaultValue: this.props.defaultValue,
            placeholder: this.props.placeholder,
            required: this.props.required,
            error: this.props.error,
            isMultiple: this.props.isMultiple,
            options: this.props.options
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
            <>
                <InputLabel id={this.state.labelID} style={{ display: "none" }}>{this.state.label}</InputLabel>
                <Select
                    labelId={this.state.labelID}
                    multiple={this.state.isMultiple}
                    onChange={this.props.onChange}
                    input={<OutlinedInput id={this.state.id} name={this.state.name} />}
                    required={this.state.required}
                    defaultValue={this.state.defaultValue}
                    renderValue={(selected) => {
                        return (<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip color={this.props.color} key={value} label={value} onDelete={(event) => this.props.onDelete(event, value)} onMouseDown={(event) => { event.stopPropagation(); }} />
                            ))}
                        </Box>
                        );
                    }}
                    MenuProps={MenuProps}
                >
                    {this.state.options.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </>
        );
    }
}

CustomSelectWithChip.defaultProps = {
    id: "",
    labelID: "",
    name: "",
    className: "",
    label: "",
    defaultValue: [],
    placeholder: "",
    required: true,
    error: false,
    isMultiple: true,
    color: "default"
}
export default CustomSelectWithChip;