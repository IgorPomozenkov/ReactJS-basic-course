import { useEffect } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import Home from "./Home";
import Chats from "./Chats";
import Profile from "./Profile";
import Quotes from "./Quotes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { initUser } from "../store/profile/actions";

function Routes() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initUser());
        // eslint-disable-next-line
    }, []);
    
    return (
        <BrowserRouter>
            <header className="appHeader">
                <nav className="appNav">
                    <Link to="/">HOME</Link>
                    <Link to="/chats">CHATS</Link>
                    <Link to="/profile">PROFILE</Link>
                    <Link to="quotes">QUOTES</Link>
                </nav>
            </header>
            <main className="appMain container">
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <PublicRoute exact path="/login">
                        <Home />
                    </PublicRoute>
                    <PublicRoute exact path="/signup">
                        <Home />
                    </PublicRoute>
                    <PrivateRoute path="/chats/:chatId?">
                        <Chats />
                    </PrivateRoute>
                    <PrivateRoute exact path="/profile">
                        <Profile />
                    </PrivateRoute>
                    <Route exact path="/quotes">
                        <Quotes />
                    </Route>
                    <Route>
                        <h1>404: Page not found</h1>
                    </Route>
                </Switch>
            </main>
        </BrowserRouter>
    );
}

export default Routes