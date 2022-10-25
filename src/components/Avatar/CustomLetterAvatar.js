import { Avatar, Stack } from '@mui/material';
import React, { Component } from 'react';

/**
 * The Custom Letter Avatar, that display a letter avatar on the sidebar.
 *
 * @version 1.0.1
 * @author [Gina Chatzimarkaki]
 */
class CustomLetterAvatar extends Component {
    /**
     * constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);

        /**
         * @type {object}
         * @property {string} name the avatar name
         */
        this.state = {
            name: this.props.name,
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
            <Stack direction="row" spacing={2}>
                <Avatar sx={{ bgcolor: "#54b1d2" }}>{this.state.name}</Avatar>
            </Stack>
        );
    }
}

CustomLetterAvatar.defaultProps = {
    name: "",
}
export default CustomLetterAvatar;