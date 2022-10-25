import Snackbar from '@mui/material/Snackbar';
import React, { Component } from 'react';

const styles = {
    "& .MuiSnackbarContent-root": {
        backgroundColor: "#177910",
        color: "#fff",
        fontSize: 13,
        fontWeight: 500,
        borderRadius: "5px",
        marginTop: "10px",
        justifyContent: "center"
    }
};

/**
 * A custom Snackbar for the different type of alerts after rest API calls.
 *
 * @version 1.0.1
 * @author [Gina Chatzimarkaki]
 */
class CustomSnackbar extends Component {
    /**
    * constructor
    * @param {object} props
    */
    constructor(props) {
        super(props);

        /**
         * @type {object}
         * @property {boolean} isOpen If `true`, the component is shown.
         * @property {number | null} autoHideDuration  The number of milliseconds to wait before automatically calling the `onClose` function. `onClose` should then set the state of the `open` prop to hide the Snackbar. This behavior is disabled by default with the `null` value.
         * @property {SxProps<Theme>} sx The system prop that allows defining system overrides as well as additional CSS styles.
         * @property {string} message The message to display.
         * @property {string} key When displaying multiple consecutive Snackbars from a parent rendering a single <Snackbar/>, add the key prop to ensure independent treatment of each message. e.g. <Snackbar key={message} />, otherwise, the message may update-in-place and features such as autoHideDuration may be canceled.
         * @property {Partial<SnackbarClasses>} classes Override or extend the styles applied to the component.
         * @property {SnackbarOrigin} anchorOrigin The anchor of the `Snackbar`. On smaller screens, the component grows to occupy all the available width, the horizontal alignment is ignored. @default { vertical: 'bottom', horizontal: 'left' }
         */
        this.state = {
            isOpen: this.props.isOpen,
            autoHideDuration: this.props.autoHideDuration,
            message: this.props.message,
            sx: this.props.sx,
            classes: this.props.classes,
            key: this.props.key,
            anchorOrigin: this.props.anchorOrigin,
            backgroundColor: this.props.backgroundColor
        };

        // Our event handlers
        this.handleState = this.handleState.bind(this);
    }

    /**
     * Function that handles the visualize modal open or close state.
     * @property {boolean} isOpen If the values is `true`, the modal should be open and visible.
     */
    handleState = (isOpen) => {
        this.setState({
            isOpen: isOpen
        });
        this.props.handleSnackbarOpen(isOpen);
    }

    /**
     * Gets called to render the document html
     *
     * @return {ReactElement} markup
     * @author [Gina Chatzimarkaki]
     */
    render() {

        return (
            <Snackbar
                open={this.state.isOpen}
                autoHideDuration={this.state.autoHideDuration}
                onClose={() => { this.handleState(false) }}
                anchorOrigin={this.state.anchorOrigin}
                sx={{ ...styles, "& .MuiSnackbarContent-root": { backgroundColor: this.state.backgroundColor } }}
                classes={this.state.classes}
                message={this.state.message}>
            </Snackbar>
        );
    }
}

CustomSnackbar.defaultProps = {
    isOpen: false,
    autoHideDuration: 6000,
    anchorOrigin: { vertical: "bottom", horizontal: "right" },
    message: "",
    backgroundColor: "#177910"
}

export default CustomSnackbar;