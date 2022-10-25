import React, { Component } from 'react';

/**
 * The CustomBreadcrumb, that display a page custom breadcrumb.
 *
 * @version 1.0.1
 * @author [Gina Chatzimarkaki]
 */
class CustomBreadcrumb extends Component {
    /**
     * constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);

        /**
         * @type {object}
         * @property {string} parentUrl the parent page url
         * @property {string} parentName the parent page name
         * @property {string} instanceName the page instance name/submitted date/
         * 
         */
        this.state = {
            parentUrl: this.props.parentUrl,
            parentName: this.props.parentName,
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
            <nav id="breadcrumb">
                <a className="tr link" style={{ "fontSize": "12px" }} href={this.state.parentUrl}>{this.state.parentName}</a><span className="arrow"></span>
                <span>{this.state.instanceName}</span>
            </nav>
        );
    }
}

export default CustomBreadcrumb;