import LogoutIcon from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import React, { Component } from "react";
import { withTranslation } from 'react-i18next';
import logo from '../../assets/images/logo.png';
import CustomImageAvatar from "../../components/Avatar/CustomImageAvatar";
import CustomListItem from "../../components/Drawer/CustomListItem";
import TopHeader from "../../components/header/TopHeader";
import AuthRoutes from "../../components/Routes/AuthRoutes";
import { getMenuItems } from "../../constants/menuItems";
import { AuthConsumer } from "../../context/AuthContext";
import { hasAnyOfRoles } from '../../utils/auth';
import theme from "../../utils/theme";
import AuthService from '../../services/auth.service';

/**
 * The Home component after user has Logged in successfully.
 *
 * @version 1.0.1
 * @author [Gina Chatzimarkaki]
 */
class AuthenticatedHomeComponent extends Component {
    /**
     * constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);

        /**
         * @type {object}
         * @property {object} alertBox holds snackbar infromation and style
         */
        this.state = {
            handleChangeUserPreferences: this.props.handleChangeUserPreferences,
            handleLogoutNoRequest: this.props.handleLogoutNoRequest,
            open: true,
            menuItems: getMenuItems()
        };
    }


    /**
     * Gets called and triggers the componentDidMount to change the browser tab  body class.
     *
     * @author [Gina Chatzimarkaki]
     */
    componentDidMount() {
        document.body.className = 'no-touch usee';
    }

    /**
     * Gets called to render the document html
     *
     * @author [Gina Chatzimarkaki]
     */
    render() {
        return (
            <React.Fragment>
                <AuthConsumer>
                    {({ user, sidenav }) => (
                        [
                            <TopHeader key="th" />
                            ,
                            <div id="content-wrapper" className="column" data-select2-id="content-wrapper" key="cw">

                                <Drawer id="layout-sidebar" variant="permanent" open={sidenav.expanded}>
                                    <div id="logo">
                                        <a href="/"><img src={logo} alt="" /></a>
                                    </div>
                                    <Divider />

                                    {/* user avatar */}
                                    <CustomImageAvatar name={user.username} />

                                    {/* menu items */}
                                    <List sx={{ paddingTop: "40px" }}>
                                        {this.state.menuItems.map((menuItem) =>
                                            hasAnyOfRoles(user.roles, menuItem.roles) &&
                                            <CustomListItem key={menuItem.label} sidenav={sidenav} label={this.props.t(`menu.${menuItem.label}`)} icon={menuItem.icon} link={menuItem.link} roles={user.roles} children={menuItem.children} />
                                        )}
                                    </List>
                                    <Divider />

                                    <CustomListItem sidenav={sidenav} label={this.props.t('logout')} icon={<LogoutIcon />} onClick={() => AuthService.logout()} />
                                    <Divider />

                                    <footer id="footer-wrapper-auth" role="contentinfo" style={{ width: "250px", paddingTop: "20px" }}>
                                        <div className="copyright">&copy; <span >{new Date().getFullYear()}</span> Usee</div>
                                        <div className="copyright"> <a className="link" href={this.props.t('aboutURLPath')}>{this.props.t('aboutLabel')}</a> | <a className="link" href={this.props.t('termsOfUseURLPath')}>{this.props.t('termsOfUseLabel')}</a> | <a className="link" href={this.props.t('privacyPolicyURLPath')}>{this.props.t('privacyPolicyLabel')}</a></div>
                                    </footer>
                                </Drawer>

                                <div id="main-wrapper" className="tr">
                                    <div className="dark-cover tr" onClick={theme.closeMenu}></div>
                                    <div className="loader tr hide"></div>
                                    <AuthRoutes />
                                </div>
                            </div>
                        ]
                    )}
                </AuthConsumer>
            </React.Fragment>
        );
    }
}

export default withTranslation()(AuthenticatedHomeComponent);