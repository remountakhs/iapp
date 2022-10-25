import { faEye, faEyeSlash, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from "react";
import { withTranslation } from 'react-i18next';
import { Redirect } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import '../../assets/scss/app.scss';
import LanguageSelector from '../../components/Language/LanguageSelector';
import { AuthConsumer } from '../../context/AuthContext';
import { formIsAllValid } from "../../utils/form-validation";
import { getLanguageFromURL } from '../../utils/language';


/**
 * The Home component before user logged-in
 *
 * @version 1.0.1
 * @author [Gina Chatzimarkaki]
 */
class AnonymousHomeComponent extends Component {
    /**
     * constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);

        /**
         * @type {object}
         * @property {string} username the username to attempt login
         * @property {string} password the password to attempt login
         * @property {object} isError the password to attempt login
         */
        this.state = {
            //form fields
            username: "",
            password: "",
            passwordShown: false,
            shownPasswordIcon: faEyeSlash,
            // error messages per field
            isError: {
                username: "",
                password: ""
            }
        };

        // Our event handlers
        this.keyPressedOnLoginPasswordField = this.keyPressedOnLoginPasswordField.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
    }

    /**
     * Gets called and triggers the componentDidMount to change the browser tab title and body class.
     *
     * @author [Gina Chatzimarkaki]
     */
    componentDidMount() {
        document.body.className = 'no-touch bg-usee front'; //Here gray-by is the bg color which I have set
        document.title = `Usee | Login`;
    }

    /**
     * Function to trigger Signin when a user press enter on password text field
     *
     * @param {type} event
     */
    keyPressedOnLoginPasswordField = (event) => {
        var key = event.keyCode || event.which;
        //On enter pressed send login request
        if (key === 13) {
            // TODO: check existance
            this.loginHandler();
        }
    }

    /**
     * Function to trigger Sign-in when a user press "Sign in" button
     */
    loginHandler = (event, contextLogin) => {
        if (this.formValidation()) {
            contextLogin(this.state.username, this.state.password).then((response) => {
                window.location.reload();
            },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        loading: false,
                        message: resMessage
                    });
                }
            );
        }
    }

    /**
     * Function that triggers the form value change.
     *
     * @param {type} event 
     */
    formValChange = (event) => {
        event.preventDefault();
        // get input tag name and value
        const { name, value } = event.target;
        let isError = { ...this.state.isError };

        isError[name] = value.length < 1 ? "The value is required." : ""

        this.setState({
            isError,
            [name]: value
        })
    };

    /**
     * Function that triggers form validation and print out if the form is valid or not.
     * @returns true if form is Valid
     */
    formValidation() {
        const credentials = {
            isError: this.createErrorMessages(),
            username: this.state.username,
            password: this.state.password
        }
        if (formIsAllValid(credentials)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Function that create error messages for each required field that are not filled out.
     * @returns the object with the error messages for each form field
     */
    createErrorMessages() {
        let isError = { ...this.state.isError };
        isError.username = this.state.username.length < 1 ? "The value is required." : "";
        isError.password = this.state.password.length < 1 ? "The value is required." : "";
        this.setState({
            isError
        });
        return isError;
    }

    /**
     * Password toggle handler
     */
    togglePassword = () => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown and icon to be shown
        this.setState({
            shownPasswordIcon: !this.state.passwordShown ? faEye : faEyeSlash,
            passwordShown: !this.state.passwordShown
        });
    };

    /**
     * Image click handler
     */
    imageClick = () => {
        return <Redirect to="/" />;
    }

    /**
     * Gets called to render the document html
     *
     * @return {ReactElement} markup
     * @author [Gina Chatzimarkaki]
     */
    render() {
        const { isError } = this.state;

        return (
            <AuthConsumer>
                {({ handleLogin }) => (
                    // ANONYMOUS - HTML for homepage
                    <div id="anonymous-home">
                        <LanguageSelector class={"anonymous"} />
                        <main id="block-login" className="cc">
                            <div id="logo"><img alt="" src={logo} onClick={this.imageClick} /></div>

                            <form id="login" className="white-area" onSubmit={(e) => { return false; }}>
                                <div className="form-group">
                                    <div id="user-wrap" className="form-item nolabel">
                                        <FontAwesomeIcon icon={faUser} />
                                        <input id="username"
                                            name="username"
                                            type="text"
                                            value={this.state.username}
                                            placeholder={this.props.t('username')}
                                            required="required"
                                            className="tc"
                                            autoCapitalize="none"
                                            onChange={this.formValChange}
                                        />
                                        {isError.username.length > 0 && (
                                            <ul className="parsley-errors-list filled" id="parsley-id-33" aria-hidden="false"><li className="parsley-required">{isError.username}</li></ul>
                                        )}
                                    </div>

                                    <div id="pass-wrap" className="form-item nolabel">
                                        <FontAwesomeIcon icon={faLock} />
                                        <input id="password"
                                            name="password"
                                            type={this.state.passwordShown ? "text" : "password"}
                                            value={this.state.password}
                                            placeholder={this.props.t('password')}
                                            required="required"
                                            className="tc"
                                            onKeyPress={this.keyPressedOnLoginPasswordField}
                                            onChange={this.formValChange}
                                        />
                                        <FontAwesomeIcon icon={this.state.shownPasswordIcon} onClick={this.togglePassword} />
                                        {isError.password.length > 0 && (
                                            <ul className="parsley-errors-list filled" id="parsley-id-33" aria-hidden="false"><li className="parsley-required">{isError.password}</li></ul>
                                        )}
                                    </div>
                                </div>

                                <div id="button-wrapper">
                                    <button id="btn-login" className="btn blue" type="button" form="login" data-redirect="stay" onClick={(event) => this.loginHandler(event, handleLogin)}>{this.props.t('login')}</button>
                                </div>

                                <div className="info">
                                    <span><a className="link" href={`/${getLanguageFromURL()}/forgot-password`}>{this.props.t('forgotPassword')}</a></span>
                                    <span style={{ paddingTop: "20px" }}>{this.props.t('haveAccount')}<a className="link" href={`/${getLanguageFromURL()}/${this.props.t('signInURLPath')}`}> {this.props.t('signIn')}</a> </span>
                                </div>
                            </form>
                        </main>

                        <footer id="footer-wrapper" role="contentinfo">
                            <div className="copyright">&copy; <span >{new Date().getFullYear()}</span> Usee | <a className="link" href={`/${getLanguageFromURL()}/${this.props.t('aboutURLPath')}`}>{this.props.t('aboutLabel')}</a> | <a className="link" href={`/${getLanguageFromURL()}/${this.props.t('termsOfUseURLPath')}`}>{this.props.t('termsOfUseLabel')}</a> | <a className="link" href={this.props.t('privacyPolicyURLPath')}>{this.props.t('privacyPolicyLabel')}</a></div>
                        </footer>
                    </div>
                )}
            </AuthConsumer>
        );
    }
}

export default withTranslation()(AnonymousHomeComponent);