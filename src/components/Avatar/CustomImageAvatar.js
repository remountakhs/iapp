import { Avatar, Stack } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { Component } from 'react';
import CustomTypography from '../Typography/CustomTypography';

/**
 * The Custom Image Avatar, that display a letter avatar on the sidebar.
 *
 * @version 1.0.1
 * @author [Gina Chatzimarkaki]
 */
class CustomImageAvatar extends Component {
    /**
     * constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);

        /**
         * @type {object}
         * @property {string} name the avatar name
         * @property {string} image the user image asset path
         */
        this.state = {
            name: this.props.name,
            image: this.props.image
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
            <Stack direction="column" spacing={1} sx={{ alignSelf: "center", paddingTop: "10px" }}>
                <Avatar src={this.state.image} sx={{ bgcolor: grey[500], width: 100, height: 100 }} />
                <CustomTypography text={this.state.name} variant="body2" sx={{ paddingTop: "20px" }} />
            </Stack>
        );
    }
}

CustomImageAvatar.defaultProps = {
    name: "",
    image: ""
}
export default CustomImageAvatar;