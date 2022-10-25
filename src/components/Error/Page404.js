import React, { Component } from "react";
import { withTranslation } from 'react-i18next';
import logo from '../../assets/images/logo.png';

/**
 * The Error Page 404, that displays a user not authorized message.
 *
 * @version 1.0.1
 * @author [Gina Chatzimarkaki]
 */
class Page404 extends Component {
    /**
     * constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);

        /**
         * @type {object}
         * @property {string} className the body class name
         * @property {string} title the body title after text
         */
        this.state = {
            className: this.props.className,
            title: this.props.title,
        };
    }

    /**
     * Gets called and triggers the componentDidMount to change the browser tab title and body class.
     *
     * @author [Gina Chatzimarkaki]
     */
    componentDidMount() {
        document.body.className = 'no-touch bg-usee error';
        document.title = 'Usee | Error';
    }

    /**
     * Gets called to render the document html
     *
     * @return {ReactElement} markup 
     * @author [Gina Chatzimarkaki]
     */
    render() {
        return (
            <div id="layout-container">
                <div className="layout-panel">
                    <div id="logo" onClick={() => { window.location.href = '/'; }}><img alt="" src={logo} /></div>
                    <h1>{this.props.t('errorPages.pageNotFound')}</h1>
                </div>
            </div>
        );
    }
}

export default withTranslation()(Page404);