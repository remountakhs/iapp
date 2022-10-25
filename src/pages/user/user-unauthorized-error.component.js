import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from "react";
import { withTranslation } from 'react-i18next';

/**
 * The UserUnauthorizedErrorComponent, that displays an unauthorized user
 * error message.
 *
 * @version 1.0.1
 * @author [Gina Chatzimarkaki]
 */
class UserUnauthorizedErrorComponent extends Component {
    /**
     * Gets called to render the document html
     *
     * @return {ReactElement} markup
     * @author [Gina Chatzimarkaki]
     */
    render() {
        return (
            <div id="error-unauthorized">
                <h1>{this.props.t('errorPages.authorizationFailed')}</h1>

                <div id="main-area">
                    <div className="body">
                        <FontAwesomeIcon icon={faExclamationTriangle} aria-hidden="true" style={{ "fontSize": "90px", "color": "#840909" }} />
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation()(UserUnauthorizedErrorComponent);