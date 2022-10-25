import jwt_decode from "jwt-decode";
import React, { Component } from "react";
import { request } from '../constants/alias';
import { API, CRUD } from '../constants/config';
import { AuthProvider } from '../context/AuthContext';

/**
 * The Auth Provider.
 *
 * @version 1.0.0
 * @author [Gina Chatzimarkaki]
 */
class Authenticate extends Component {
  /**
   * constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      children: this.props.children,
      isAuthenticated: false,
      getAuthenticatedUserCompleted: false,
      user: {
        roles: ['anonymous'],
      },
      preferences: {},
      sidenav: {
        expanded: true,
        activeKey: '1'
      }
    };

  }

  /**
   * Gets called and triggers the componentDidMount.
   *
   * @author [Gina Chatzimarkaki]
   */
  componentDidMount() {
    this.getAuthenticatedUser()
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  /**
   * Function that gets the authenticated user details.
   */
  async getAuthenticatedUser() {
    try {

      const token = localStorage.getItem("token");

      let data = jwt_decode(token);
      if (data.exp < Math.floor(Date.now() / 1000)) {
        this.handleTokenExpiration();
        return `Token for user ${data.sub} Expired!`
      }

      this.setState({
        isAuthenticated: true,
        getAuthenticatedUserCompleted: true,
        user: {
          username: data.sub,
          roles: [data.role],
          // id: data.userid,
          // fullname: data.userfullname,
          // email: data.email,
          // avatar: data.avatar,
          // timezone: data.timezone,
          // dateformat: data.dateformat
        },
        preferences: {},
      });

      // return `User ${data.email} is authenticated`;
      return `User ${data.sub} is authenticated`;

    } catch (ex) {
      console.log(ex);

      const user = {
        roles: ['anonymous'],
      };

      this.setState({
        ...this.state,
        user: user,
        getAuthenticatedUserCompleted: true
      });

      throw new Error(ex);

    }
  }

  /**
   * Function that triggers the update of the username after username value has change.
   *
   * @param {string} username
   * @param {string} password
   * @param webAuthnBody - if U2F enabled else undefined
   * @returns {Promise<any>} the cookie and the auth_token
    */
  handleLogin = (username, password, webAuthnBody) => {
    return new Promise((resolve, reject) => {
      const requestData = {
        username: username,
        password: password,
      };

      if (webAuthnBody) {
        requestData.webAuthnBody = JSON.stringify(webAuthnBody);
      }

      request
        .post(`${API}auth/login`, requestData)
        .then((response) => {
          let token = JSON.stringify(response.headers.authorization)
          token = token.substring(8, token.length - 1);
          localStorage.setItem("token", token);//auth-token === cookie
          localStorage.setItem("theme", "light");
          // localStorage.setItem("refresh_token", response.data.refresh_token);
          setTimeout(() => {
            this.getAuthenticatedUser()
              .then(response => console.log(response))
              .catch(error => console.error(error));
          }, CRUD.delay);
        })
        .catch((error) => {
          const { response: { status } } = error;

          if (status === 401 || status === 403) {
            reject('Wrong username or password');
          } else {
            reject('Something went wrong. Please contact the system administrator');
          }
        });
    });
  }

  /**
   * Function that updates the user information after user change.
   * @param {object} user the new user details
   */
  handleChangeUser = (user) => {
    this.setState({
      ...this.state,
      user: user,
    });
  }

  /**
   * Function that updates the user preferences after user change.
   * @param {object} preferences the new user preferences
   */
  handleChangeUserPreferences = (preferences) => {
    this.setState({
      ...this.state,
      preferences: preferences
    });
  }

  /**
   * Function that updates the timezone and date format.
   * @param {string} timezone the new timezone format
   * @param {string} dateformat the new date format
   */
  handleChangeTimezoneAndDateformat = (timezone, dateformat) => {
    this.setState({
      ...this.state,
      user: {
        ...this.state.user,
        timezone: timezone,
        dateformat: dateformat
      }
    })
  }

  /**
   * Function that clears the request interceptor after logout is performed.
   */
  handleLogoutNoRequest() {
    // Clear request interceptor
    if ('requestInterceptor' in this.state.preferences) {
      // requestInterceptor is used to monitor unauthorized access to the platform
      request.interceptors.response.eject(this.state.preferences.requestInterceptor);
    }
  }

  /**
   * Function that triggers the re-authentication of user 
   * after token expires.
   */
  handleTokenExpiration() {
    return new Promise((resolve, reject) => {
      // Clear request interceptor
      if ('requestInterceptor' in this.state.preferences) {
        // requestInterceptor is used to monitor unauthorized access to the platform
        request.interceptors.response.eject(this.state.preferences.requestInterceptor);
      }

      setTimeout(() => {

        this.setState({
          isAuthenticated: false,
          user: {
            roles: ['anonymous'],
          },
          preferences: {},
          getAuthenticatedUserCompleted: true
        });

      }, CRUD.delay);

      localStorage.removeItem("token");
    });

  }

  /**
   * Function that triggers the user logged out
   */
  handleLogout() {
    return new Promise((resolve, reject) => {
      // Clear request interceptor
      if ('requestInterceptor' in this.state.preferences) {
        // requestInterceptor is used to monitor unauthorized access to the platform
        request.interceptors.response.eject(this.state.preferences.requestInterceptor);
      }

      setTimeout(() => {

        this.setState({
          isAuthenticated: false,
          user: {
            roles: ['anonymous'],
          },
          preferences: {},
          getAuthenticatedUserCompleted: true
        });

      }, CRUD.delay);

      localStorage.clear()

    });
  }

  /**
   * Function that handles the sidenav open/close status.
   */
  handleSidenavStateChange = (expanded) => {
    this.setState({ sidenav: { ...this.state.sidenav, expanded: expanded !== undefined ? expanded : !this.state.sidenav.expanded } });
  }

  /**
   * Function that handles the sidenav active key value.
   */
  handleSidenavActiveKeyChange = (activeKey) => {
    this.setState({ sidenav: { ...this.state.sidenav, activeKey: activeKey } });
  }

  render() {
    if (!this.state.getAuthenticatedUserCompleted) return '';

    const authProviderValue = {
      ...this.state,
      handleLogin: this.handleLogin,
      handleChangeUser: this.handleChangeUser,
      handleChangeUserPreferences: this.handleChangeUserPreferences,
      handleLogoutNoRequest: this.handleLogoutNoRequest,
      handleLogout: this.handleLogout,
      handleChangeTimezoneAndDateformat: this.handleChangeTimezoneAndDateformat,
      handleSidenavStateChange: this.handleSidenavStateChange,
      handleSidenavActiveKeyChange: this.handleSidenavActiveKeyChange
    };

    return (
      <AuthProvider value={authProviderValue}>
        {this.state.children}
      </AuthProvider>
    )
  }
}

export default Authenticate;