import CloseRounded from '@mui/icons-material/CloseRounded';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton
} from '@mui/material';
import React, { Component } from 'react';

/**
 * The CustomDialog, that display a customized dialog
 *
 * @version 1.0.1
 * @author [Gina Chatzimarkaki]
 */
class CustomDialog extends Component {
    /**
     * constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);

        /**
         * @type {object}
         * @property {boolean} isOpen If the values is `true`, the modal should be open and visible.
         * @property {string} id the dialog id
         * @property {string} title the dialog title
         * @property {string} message the dialog message
         * @property {string} message the dialog cancel label
         * @property {string} actionLabel the dialog action label
         * 
         */
        this.state = {
            isOpen: this.props.isOpen,
            id: this.props.id,
            title: this.props.title,
            message: this.props.message,
            cancelLabel: this.props.cancelLabel,
            actionLabel: this.props.actionLabel
        };

        // Our event handlers
        this.handleDialogState = this.handleDialogState.bind(this);
    }

    /**
     * Function that handles the visualize modal open or close state.
     * @property {boolean} isOpen If the values is `true`, the modal should be open and visible.
     */
    handleDialogState = (isOpen) => {
        this.setState({
            isOpen: isOpen
        });
        this.props.handleOpen(isOpen);
    }

    /**
     * Gets called to render the document html
     *
     * @return {ReactElement} markup
     * @author [Gina Chatzimarkaki]
     */
    render() {
        return (
            <Dialog
                id={this.state.id}
                open={this.state.isOpen}
                onClose={() => { this.handleDialogState(false) }}
                aria-describedby="alert-dialog-slide-description"
                className="dialog-title"
            >
                <DialogTitle className="dialog-headers">
                    {this.state.title}
                    <IconButton onClick={() => { this.handleDialogState(false) }} sx={{ float: "right" }}>
                        <CloseRounded />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description" className="dialog-desciption">
                        {this.state.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions className="dialog-actions">
                    <Button className="dialog-cancel-btn" onClick={() => { this.handleDialogState(false) }}>{this.state.cancelLabel}</Button>
                    <Button className="dialog-action-btn" onClick={() => { this.props.action() }}>{this.state.actionLabel.toUpperCase()}</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default CustomDialog;