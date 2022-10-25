import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { getLangOptions } from '../../constants/langOptions';
import AnonymousHomeComponent from '../../pages/home/anonymous-home.component';
import Page401 from '../Error/Page401';
import Page403 from '../Error/Page403';
import Page404 from '../Error/Page404';

/**
 * The Anonymous Routes.
 *
 * @version 1.0.0
 * @author [Gina Chatzimarkaki]
 */
class Anonymous extends Component {

  /**
   * Gets called to render the document html
   *
   * @return {ReactElement} markup
   * @author [Gina Chatzimarkaki]
   */
  render() {
    return (
      <Switch>
        {getLangOptions().map((lang, i) =>
          <>
            <Route key="401" exact sensitive path={"/" + lang + "/page-401"} component={Page401} />
            <Route key="403" exact sensitive path={"/" + lang + "/page-403"} component={Page403} />
            <Route key="404" exact sensitive path={"/" + lang + "/page-404"} component={Page404} />
            <Route key="anonymous-home" exact sensitive path={"/" + lang} component={AnonymousHomeComponent} />
            <Route key="other" exact path={["/", "", "*", "/" + lang + "/login", "/" + lang + "/auth/login"]} component={() => <Redirect to={"/" + localStorage.getItem("i18nextLng").substring(0, 2)} />} />
          </>
        )}
      </Switch>
    )
  }
}

export default Anonymous;