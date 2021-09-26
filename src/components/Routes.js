import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Home from "./Home";
import Chats from "./Chats";
import Profile from "./Profile";
import Quotes from "./Quotes";

function Routes() {
    
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
                    <Route path="/chats/:chatId?">
                        <Chats />
                    </Route>
                    <Route exact path="/profile">
                        <Profile />
                    </Route>
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