import { createContext } from "react";

export const authContext = createContext({
  isAuthenticated: false, // to check if authenticated or not
  user: {}, // store all the user details
  preferences: {}, // store user's preferences
  sidenav: {
    expanded: true,
    activeKey: '1'
  }, // to store sidenav info
  handleLogin: () => { }, // to start the login process
  handleChangeUser: () => { }, // change user object values (example usage on profile/account page)
  handleChangeUserPreferences: () => { }, // store all user preferences (general purpose property)
  handleLogoutNoRequest: () => { }, // reset AuthContext state without calling logout REST endpoint
  handleLogout: () => { }, // logout the user
  handleTokenExpiration: () => { }, // request re-authentication of user
  handleChangeTimezoneAndDateformat: () => { }, //change timezone and dateformat
  handleSidenavStateChange: () => { }, //change sidenav open/close state
  handleSidenavActiveKeyChange: () => { } //change sidenav activeKey value
});

export const AuthProvider = authContext.Provider;
export const AuthConsumer = authContext.Consumer;
export default authContext;