import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { getLangOptions } from "../../constants/langOptions";
import { AuthConsumer } from "../../context/AuthContext";
import SubscriptionListComponent from "../../pages/subscriptions/subscription-list.component";
import SubscriptionPlanAddEditComponent from "../../pages/subscriptions/subscription-plan-add-edit.component";
import SubscriptionPlanListComponent from "../../pages/subscriptions/subscription-plan-list.component";
import UserAddEditComponent from "../../pages/user/user-add-edit.component";
import UserListComponent from "../../pages/user/user-list.component";
import { hasAnyRole, hasRoleAdmin } from "../../utils/auth";

/**
 * The Auth Routes.
 *
 * @version 1.0.1
 * @author [Gina Chatzimarkaki]
 */
class AuthRoutes extends Component {
  /**
   * constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user,
      //snackbar
      alertBox: this.props.alertBox
    }
  }

  /**
   * Gets called to render the document html
   *
   * @return {ReactElement} markup
   * @author [Gina Chatzimarkaki]
   */
  render() {
    return (
      <React.Fragment>
        <AuthConsumer>
          {({ user, handleLogout }) => (
            <Switch>
              {getLangOptions().map((lang, i) =>
                <>
                  {hasRoleAdmin(user.roles) &&
                    <>
                      {/* USER */}
                      <Route key="menu-user-add-or-edit" exact path={`/${lang}/user/:id`}
                        render={(props) => {
                          return (props.match.params.id === "add") ?
                            <UserAddEditComponent />
                            :
                            <UserAddEditComponent userID={props.match.params.id} />
                        }} />
                      <Route key="menu-user-list" exact path={`/${lang}/user`} component={UserListComponent} />

                      {/* SUBSCRIPTION PLANS */}
                      <Route key="menu-subscription-plan-add-or-edit" exact path={`/${lang}/subscriptionplan/:id`}
                        render={(props) => {
                          return (props.match.params.id === "add") ?
                            <SubscriptionPlanAddEditComponent />
                            :
                            <SubscriptionPlanAddEditComponent subscriptionPlanID={props.match.params.id} />
                        }} />
                      <Route key="menu-subscription-plan-list" exact path={`/${lang}/subscriptionplan`} component={SubscriptionPlanListComponent} />

                      {/* SUBSCRIPTIONS */}
                      <Route key="menu-subscription-list" exact path={`/${lang}/subscription`} component={SubscriptionListComponent} />

                    </>
                  }

                  {hasAnyRole(user.roles) &&
                    <>
                      {/* Dashboard */}
                      <Route key="menu-dashboard" path={`/${lang}`}></Route>

                      {/* ORGANIZATION */}
                      {/* <Route key="menu-organization-list" path={`/${lang}/organization`} component={OrganizationListComponent} /> */}


                      <Route key="menu-logout" exact path={`/${lang}/logout`} component={(event) => handleLogout(event)} />
                      <Route key="auth-login" exact path={["login", "/auth/login"]} component={() => <Redirect to={"/" + localStorage.getItem("i18nextLng").substring(0, 2)} />} />
                      <Route key="other-auth" exact path={`/${lang}/home`} component={() => <Redirect to={"/" + localStorage.getItem("i18nextLng").substring(0, 2)} />} />
                    </>
                  }
                </>
              )}
            </Switch>
          )}
        </AuthConsumer>
      </React.Fragment >
    )
  }
}

export default AuthRoutes;