import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

/**
 * The CustomAddEditTitle, that display each add/edit page custom title.
 *
 * @version 1.0.1
 * @author [Gina Chatzimarkaki]
 */
class CustomAddEditTitle extends Component {
    /**
     * constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);

        /**
         * @type {object}
         * @property {boolean} isAdd If the values is `true`, the page is about creating a new instance.
         *                              Otherwise referring to the update of a instance details.
         * @property {string} title the page title
         * @property {string} subtitle the page subtitle
         * @property {string} titleCreateText the page after title text if {@link isAdd} is `true`
         * @property {string} subtitleCreateText the page after title text if {@link isAdd} is `true`
         * @property {string} instanceName the instance name to be editted
         */
        this.state = {
            isAdd: this.props.isAdd,
            title: this.props.title,
            titleCreateText: this.props.titleCreateText ? this.props.titleCreateText : this.props.t("actions.create"),
            subtitleCreateText: this.props.subtitleCreateText ? this.props.subtitleCreateText : this.props.t("actions.create"),
            subtitle: this.props.subtitle,
            instanceName: this.props.instanceName,
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
                <h1>{this.state.title} | {this.state.isAdd ? this.state.titleCreateText : this.props.t("actions.edit")}</h1>

                {this.state.isAdd ?
                    <h3 className="usee-h3">{this.state.subtitleCreateText} a new {this.state.subtitle}</h3>
                    :
                    <h3 className="usee-h3">Edit {this.state.subtitle} <strong>{this.state.instanceName}</strong></h3>
                }
            </>
        );
    }
}

export default withTranslation()(CustomAddEditTitle);