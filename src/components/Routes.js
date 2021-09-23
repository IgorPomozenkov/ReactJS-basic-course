import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Home from "./Home";
import Chats from "./Chats";
import Profile from "./Profile";

function Routes() {
    
    return (
        <BrowserRouter>
            <header className="appHeader">
                <nav className="appNav">
                    <Link to="/">HOME</Link>
                    <Link to="/chats">CHATS</Link>
                    <Link to="/profile">PROFILE</Link>
                </nav>
            </header>
            <main className="appMain container">
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/chats/:chatId?">
                        <Chats />
                    </Route>
                    <Route path="/profile">
                        <Profile />
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