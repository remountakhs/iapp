import { Typography } from '@mui/material';
import React, { Component } from 'react';

/**
 * The Custom Typography, that display customized {@link Typography}.
 *
 * @version 1.0.1
 * @author [Gina Chatzimarkaki]
 */
class CustomTypography extends Component {
    /**
     * constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);

        /**
         * @type {object}
         * @property {string} text the typography text
         * @property {string} variant Applies the theme typography styles.
         * @property {object} sx defining system overrides as well as additional CSS styles
         *
        */
        this.state = {
            text: this.props.text,
            variant: this.props.variant,
            sx: this.props.sx
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
                <Typography variant={this.state.variant} sx={this.state.sx}>
                    {this.state.text}
                </Typography>
        );
    }
}

CustomTypography.defaultProps = {
    text: "",
    variant: "body1"
}
export default CustomTypography;