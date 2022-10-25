import React, { Component } from 'react';

/**
 * The CustomAddEditBreadcrumbMultiParent, that display an add/edit page custom breadcrumb.
 *
 * @version 1.0.1
 * @author [Gina Chatzimarkaki]
 */
class CustomAddEditBreadcrumbMultiParent extends Component {
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
         * @property {array} parents the parents details (url and name)
         * @property {string} instanceName the instance name to be editted if the {@link isAdd} is false
         */
        this.state = {
            isAdd: this.props.isAdd,
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
                <span>{this.state.isAdd ? 'Create' : (this.state.instanceName === undefined ? 'Edit' : this.state.instanceName)}</span>
            </nav>
        );
    }
}

CustomAddEditBreadcrumbMultiParent.defaultProps = {
    isAdd: true
}

export default CustomAddEditBreadcrumbMultiParent;