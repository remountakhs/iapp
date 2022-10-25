import React, { Component } from 'react';

/**
 * The CustomTitle, that display each page custom title.
 *
 * @version 1.0.1
 * @author [Gina Chatzimarkaki]
 */
class CustomTitle extends Component {
    /**
     * constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);

        /**
         * @type {object}
         * @property {string} title the page title
         * @property {string} subtitle the page subtitle
         * @property {string} subtitleClass the page subtitle class
         * 
         */
        this.state = {
            title: this.props.title,
            subtitle: this.props.subtitle,
            subtitleClass: this.props.subtitleClass,
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
                <h3 className={this.state.subtitleClass}>{this.state.subtitle}</h3>
            </>
        );
    }
}

CustomTitle.defaultProps = {
    subtitle: "",
    subtitleClass: "usee-h3"
}
export default CustomTitle;