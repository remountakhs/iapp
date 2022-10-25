import React, { Component } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import Authenticate from '../../containers/Authenticate';
import { AuthConsumer } from '../../context/AuthContext';
import Anonymous from '../Routes/Anonymous';
import AuthenticatedHomeComponent from '../../pages/home/authenticated-home.component';

class AuthController extends React.Component {

    /**
     * Gets called to render the document html
     *
     * @return {ReactElement} markup
     * 
 * @version 1.0.0
     * @author [Gina Chatzimarkaki]
     */
    render() {
        return (
            <React.Fragment>
                <AuthConsumer>
                    {({ isAuthenticated, user, handleChangeUserPreferences, handleLogoutNoRequest }) => (
                        [
                            isAuthenticated ? (
                                <AuthenticatedHomeComponent
                                    user={user}
                                    handleChangeUserPreferences={handleChangeUserPreferences}
                                    handleLogoutNoRequest={handleLogoutNoRequest}
                                    key={"auth-routes"}
                                />
                            ) : (
                                <Anonymous key={"anon-routes"} />
                            )
                        ]
                    )}
                </AuthConsumer>
            </React.Fragment>
        )
    }
}

/**
 * The Home component before user logged-in
 *
 * @version 1.0.1
 * @author [Gina Chatzimarkaki]
 */
class App extends Component {

    /**
     * Gets called to render the document html
     *
     * @return {ReactElement} markup
     * @author [Gina Chatzimarkaki]
     */
    render() {
        return (
            <Router>
                <Authenticate>
                    <AuthController />
                </Authenticate>
            </Router>
        )
    }
}

export default App;