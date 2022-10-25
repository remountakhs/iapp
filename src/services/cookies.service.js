import Cookies from 'js-cookie'

/**
 * The Usee Cookie Service
 *
 * @version 1.0.1
 * @author [Gina Chatzimarkaki]
 */
class CookieService {
  getSession = () => {
    const jwt = Cookies.get('usee-cookie');
    let session = "";

    try {
      if (jwt) {
        const base64Url = jwt.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        // what is window.atob ?
        // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/atob
        session = JSON.parse(window.atob(base64));
      }
    } catch (error) {
      console.log(error)
    }
    return session
  }

  /**
   * Function that removes the cookie
   **/
  logOut() {
    Cookies.remove('usee-cookie');
    Cookies.remove('auth_token');
  }

  /**
   * Function thatsets the cookie
   **/
  setCookie = (cookie) => {
    Cookies.set('usee-cookie', cookie);

  }
}

export default new CookieService();
