import React, { Component } from 'react';

/**
 * The CustomAddEditBreadcrumb, that display an add/edit page custom breadcrumb.
 *
 * @version 1.0.1
 * @author [Gina Chatzimarkaki]
 */
class CustomAddEditBreadcrumb extends Component {
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
         * @property {string} parentUrl the parent page url
         * @property {string} parentName the parent page name
         * @property {string} instanceName the instance name to be editted if the {@link isAdd} is false
         */
        this.state = {
            isAdd: this.props.isAdd,
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
                <span>{this.state.isAdd ? 'Create' : (this.state.instanceName === undefined ? 'Edit' : this.state.instanceName)}</span>
            </nav>
        );
    }
}

CustomAddEditBreadcrumb.defaultProps = {
    isAdd: true
}

export default CustomAddEditBreadcrumb;