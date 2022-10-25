import React, { Component } from 'react';

/**
 * The CustomBreadcrumbMultiParent, that display a page custom breadcrumb 
 * with multiple parents.
 *
 * @version 1.0.1
 * @author [Gina Chatzimarkaki]
 */
class CustomBreadcrumbMultiParent extends Component {
    /**
     * constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);

        /**
         * @type {object}
           @property {array} parents the parents details (url and name)
         * @property {string} instanceName the page instance name/submitted date/
         * 
         */
        this.state = {
            parents: this.props.parents,
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
                {this.state.parents.map((parent, index) =>
                    <React.Fragment key={index}>
                        <a className="tr link" style={{ "fontSize": "12px" }} href={parent.url}>{parent.name}</a>
                        <span className="arrow"></span>
                    </React.Fragment>
                )}
                <span>{this.state.instanceName}</span>
            </nav>
        );
    }
}

export default CustomBreadcrumbMultiParent;