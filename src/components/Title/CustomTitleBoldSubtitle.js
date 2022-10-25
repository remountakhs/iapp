import React, { Component } from 'react';

/**
 * The CustomTitleBoldSubtitle, that display each page custom title with bold subtitle.
 *
 * @version 1.0.1
 * @author [Gina Chatzimarkaki]
 */
class CustomTitleBoldSubtitle extends Component {
    /**
     * constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);

        /**
         * @type {object}
         * @property {string} title the page title
         * @property {string} subtitleboldText the page bold subtitle section
         * @property {string} subtitleBeforeText the before subtitle text
         * @property {string} subtitleBeforeText the after subtitle text
         * 
         */
        this.state = {
            title: this.props.title,
            subtitleboldText: this.props.subtitleboldText,
            subtitleBeforeText: this.props.subtitleBeforeText,
            subtitleAfterText: this.props.subtitleAfterText,
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
                {this.state.title !== undefined && <h1>{this.state.title}</h1>}
                <h3 className="usee-h3">
                    {this.state.subtitleBeforeText}
                    {this.state.subtitleboldText !== "" && <strong>{this.state.subtitleboldText}</strong>}
                    {this.state.subtitleAfterText}
                </h3>
            </>
        );
    }
}

CustomTitleBoldSubtitle.defaultProps = {
    subtitleBeforeText: "",
    subtitleboldText: "",
    subtitleAfterText: ""
}

export default CustomTitleBoldSubtitle;