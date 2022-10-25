import { API } from "../constants/config"
import { request } from '../constants/alias'
import userApi from "../api/user";
import cookiesService from "./cookies.service";

/**
 * The Usee Application
 *
 * @version 1.0.1
 * @author [Gina Chatzimarkaki]
 */
class AuthService {
    /**
     * Function that triggers the update of the username after username value has change.
     *
     * @param {string} username
     * @param {string} password
     * @returns {object} the cookie and the auth_token
      */
    login(username, password) {

        const requestData = {
            username: username,
            password: password,
        };

        return request.post(`${API}auth/login`, requestData)
            .then((response) => {
                console.log("response", response);

                let token = JSON.stringify(response.headers.authorization);
                if (response.headers.authorization) {
                    this.removeAccess();
                    token = token.substring(8, token.length - 1);
                    localStorage["token"] = token;
                    localStorage.setItem("token", token);
                    this.setLogin(true);
                    this.goHome();
                }
            });
    }

    /**
     * Function that triggered after the user logged out
     */
    logout() {
        userApi.logout().then((r) => {
            if (r.data.code === "SUCCESS") {
                this.removeAccess();
                this.goHome();
                cookiesService.logOut();
            }
        }).catch((e) => {
            // console.log(e);
        })
    }

    /**
     * Function that goes to the front page
     **/
    goHome() {
        window.location.href = `/`;
    };


    // Define redirect page
    // redirectTopage = document.getElementById("redirect-to-page").value;

    /**
     * Function that triggers the update of the username after username value has change.
     *
     * @param {type} event
     * @returns {undefined}
     */
    setLogin(login) {
        localStorage["LOGGED_IN"] = login;
    };

    /**
     * Function that triggers the update of the username after username value has change.
     *
     */
    hasAccess() {
        return localStorage.getItem("LOGGED_IN") !== null;
    };

    /**
     * Function that triggers the update of the username after username value has change.
     *
     */
    removeAccess() {
        localStorage.removeItem("LOGGED_IN");
        localStorage.removeItem("token");
    };
}

export default new AuthService();
