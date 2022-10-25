import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from "react";
import { AuthConsumer } from '../../context/AuthContext';
import LoadingSkeleton from "../Loading/LoadingSkeleton";
import MiniMenu from './mini-menu.component';

/**
 * The TopHeader, that display the Top bar with the search placehold, the 
 * account button and the notifications button.
 *
 * @version 1.0.1
 * @author [Gina Chatzimarkaki]
 */
class TopHeader extends Component {
    /**
     * constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);

        /**
         * @type {object}
         * @property {object} redirect the information related to the redirect after successfully submit a query
         */
        this.state = {
            redirect: {
                perform: false,
                url: ""
            }
        };
    }

    /**
     * Gets called to render the document html
     *
     * @return {ReactElement} markup
     * @author [Gina Chatzimarkaki]
     */
    render() {
        if (this.state.redirect.perform) {
            window.location.href = this.state.redirect.url;
            return (
                <LoadingSkeleton lines={9} />
            );
        } else {
            return (
                <AuthConsumer>
                    {({ sidenav, handleSidenavStateChange }) => (
                        <header id="header-wrapper" className="column tr" role="banner">
                            <div id="menu-toggle" className="classic-btn tr" onClick={() => handleSidenavStateChange(!sidenav.expanded)}>
                                <FontAwesomeIcon aria-hidden="true" icon={faBars} />
                            </div>
                            <MiniMenu />
                        </header>
                    )}
                </AuthConsumer>
            );
        }
    }
}

export default TopHeader;