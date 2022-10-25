import React, { Component } from "react";
import { withTranslation } from 'react-i18next';

/**
 * The UserGenericErrorComponent, that displays an error message
 *  when something went wrong.
 *
 * @version 1.0.1
 * @author [Gina Chatzimarkaki]
 */
class UserGenericErrorComponent extends Component {
    /**
     * Gets called to render the document html
     *
     * @return {ReactElement} markup
     * @author [Gina Chatzimarkaki]
     */
    render() {
        return (
            <div id="error-generic">
                <h1>{this.props.t('label.error')}</h1>

                <div id="main-area">
                    <div className="body">
                        {this.props.t('errorPages.somethingWentWrong')}
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation()(UserGenericErrorComponent);