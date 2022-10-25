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
import ar from "../../assets/images/flags/ar.png";
import bg from "../../assets/images/flags/bg.png";
import cs from "../../assets/images/flags/cs.png";
import de from "../../assets/images/flags/de.png";
import el from "../../assets/images/flags/el.png";
import en from "../../assets/images/flags/en.png";
import es from "../../assets/images/flags/es.png";
import et from "../../assets/images/flags/et.png";
import fr from "../../assets/images/flags/fr.png";
import it from "../../assets/images/flags/it.png";
import lt from "../../assets/images/flags/lt.png";
import nl from "../../assets/images/flags/nl.png";
import pl from "../../assets/images/flags/pl.png";
import ro from "../../assets/images/flags/ro.png";
import ru from "../../assets/images/flags/ru.png";
import tr from "../../assets/images/flags/tr.png";
import uk from "../../assets/images/flags/uk.png";
import CustomFlagTextField from '../Text/CustomFlagTextField';

/**
 * The CustomTranslationsDialog, that display a customized dialog to insert translated texts.
 *
 * @version 1.0.1
 * @author [Gina Chatzimarkaki]
 */
class CustomTranslationsDialog extends Component {
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
         * @property {string} cancelLabel the dialog cancel label
         * @property {string} actionLabel the dialog action label
         * @property {object} translations the translations object
         * @property {string} field the field of the instance to configure its translations
         * 
         */
        this.state = {
            isOpen: this.props.isOpen,
            id: this.props.id,
            title: this.props.title,
            cancelLabel: this.props.cancelLabel,
            actionLabel: this.props.actionLabel,
            translations: this.props.translations,
            field: this.props.field
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
        this.props.handleOpen(isOpen, this.state.translations, this.state.field);
    }

    handleAction = () => {
        let translations = {};
        let translationElements = document.querySelectorAll('[name^="translation."]');
        for (let i = 0; i < translationElements.length - 1/*last one is the loading*/; i++) {
            translations[translationElements[i].name.split(".")[1]] = translationElements[i].value
        }
        this.props.action(translations, this.state.field);
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
                        <CustomFlagTextField country="el" flag={el} name="translation.el" id="el" defaultValue={this.state.translations.el} />
                        <CustomFlagTextField country="en" flag={en} name="translation.en" id="en" defaultValue={this.state.translations.en} />
                        <CustomFlagTextField country="de" flag={de} name="translation.de" id="de" defaultValue={this.state.translations.de} />
                        <CustomFlagTextField country="fr" flag={fr} name="translation.fr" id="fr" defaultValue={this.state.translations.fr} />
                        <CustomFlagTextField country="it" flag={it} name="translation.it" id="it" defaultValue={this.state.translations.it} />
                        <CustomFlagTextField country="ru" flag={ru} name="translation.ru" id="ru" defaultValue={this.state.translations.ru} />
                        <CustomFlagTextField country="uk" flag={uk} name="translation.uk" id="uk" defaultValue={this.state.translations.uk} />
                        <CustomFlagTextField country="es" flag={es} name="translation.es" id="es" defaultValue={this.state.translations.es} />
                        <CustomFlagTextField country="nl" flag={nl} name="translation.nl" id="nl" defaultValue={this.state.translations.nl} />
                        <CustomFlagTextField country="cs" flag={cs} name="translation.cs" id="cs" defaultValue={this.state.translations.cs} />
                        <CustomFlagTextField country="pl" flag={pl} name="translation.pl" id="pl" defaultValue={this.state.translations.pl} />
                        <CustomFlagTextField country="bg" flag={bg} name="translation.bg" id="bg" defaultValue={this.state.translations.bg} />
                        <CustomFlagTextField country="ar" flag={ar} name="translation.ar" id="ar" defaultValue={this.state.translations.ar} />
                        <CustomFlagTextField country="et" flag={et} name="translation.et" id="et" defaultValue={this.state.translations.et} />
                        <CustomFlagTextField country="lt" flag={lt} name="translation.lt" id="lt" defaultValue={this.state.translations.lt} />
                        <CustomFlagTextField country="ro" flag={ro} name="translation.ro" id="ro" defaultValue={this.state.translations.ro} />
                        <CustomFlagTextField country="tr" flag={tr} name="translation.tr" id="tr" defaultValue={this.state.translations.tr} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions className="dialog-actions">
                    <Button className="dialog-cancel-btn" onClick={() => { this.handleDialogState(false) }}>{this.state.cancelLabel}</Button>
                    <Button className="dialog-action-btn" onClick={this.handleAction}>{this.state.actionLabel.toUpperCase()}</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default CustomTranslationsDialog;