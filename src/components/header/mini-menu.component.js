import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import userApi from '../../api/user';
import { AuthConsumer } from '../../context/AuthContext';
import AuthService from '../../services/auth.service';
import { hasRoleAdminOrDirector } from "../../utils/auth";
import { getLanguageFromURL } from "../../utils/language";
import { miniMenuToggleBox } from "../../utils/theme";
import LanguageSelector from '../Language/LanguageSelector';
import DarkModeToggleButton from '../Theme/DarkModeToggleButton';

/**
 * The MiniMenuComponent, that displays the mini menu.
 *
 * @version 1.0.1
 * @author [Gina Chatzimarkaki]
 */
class MiniMenuComponent extends Component {
    /**
     * constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);

        this.action = this.props.action;
        this.state = {
            userAuth: {}
        };

        // Our event handlers
        this.getAuthUser = this.getAuthUser.bind(this);
    }

    /**
     * Gets called and triggers the componentDidMount.
     *
     * @author [Gina Chatzimarkaki]
     */
    componentDidMount() {
        this.getAuthUser();
    }

    /**
     * The rest endpoint to get the notifications list.
     */
    getAuthUser = () => {
        userApi.fetchAuth().then((r) => {
            this.setState({
                userAuth: r.data.returnobject
            });
        }).catch((e) => {
            // console.log(e);
        });
    }

    render() {
        return (
            //  HEADER - Mini menu -->
            <AuthConsumer>
                {({ user }) => (
                    <div id="mini-menu-wrapper">
                        <nav>
                            <ul>
                                <li id="theme-li" key="theme">
                                    <DarkModeToggleButton isLightModeEnabled={localStorage.getItem("theme") === "light"} />
                                </li>
                                ,
                                <li id="account-li" key="account" onClick={miniMenuToggleBox}>
                                    <AccountCircleIcon className="click mm-icons account-icon" aria-hidden="true" />
                                    <div id="account" className="box tr">
                                        <div className="box-field box-close-btn"><CloseIcon className="click" aria-hidden="true" onClick={miniMenuToggleBox} /></div>
                                        <div className="box-field box-title"><a className="link" href={`/${getLanguageFromURL()}/user/${user.username}/profile`} key="link-user-profile">{this.props.t("label.profile")}</a>
                                            {hasRoleAdminOrDirector(user.roles) &&
                                                [
                                                    " - "
                                                    ,
                                                    <a className="link" href={`/${getLanguageFromURL()}/user`} key="link-user-management">{this.props.t("user.subtitle")}</a>
                                                ]
                                            }
                                        </div>
                                        <div className="box-field box-image">
                                            <AccountCircleIcon style={{ fontSize: '85px' }} aria-hidden="true" onClick={miniMenuToggleBox} />
                                        </div>
                                        <div className="box-field box-name">{this.state.userAuth.firstName + ' ' + this.state.userAuth.lastName}</div>
                                        <div className="box-field box-email"><a href={'mailto:' + this.state.userAuth.email}>{this.state.userAuth.email}</a></div>
                                        <div className="box-field box-buttons">
                                            <a href={`/${getLanguageFromURL()}/user/${this.state.userAuth.id}`} id="manage-account" className="btn darkblue">{this.props.t("user.manageAccount")}</a>
                                            <button className="btn blue" onClick={() => AuthService.logout()} data-redirect="stay">{this.props.t("logout")}</button>
                                        </div>
                                    </div>
                                </li>
                                ,
                                <li id="menu-toggle-small" key="mini-menu">
                                    <MenuIcon className="click mm-icons" aria-hidden="true" />
                                </li>
                                ,
                                <li id="lang-li" key="lang">
                                    <LanguageSelector />
                                </li>
                            </ul>
                        </nav>
                    </div>
                )}
            </AuthConsumer>
        );
    }
}

export default withTranslation()(MiniMenuComponent);