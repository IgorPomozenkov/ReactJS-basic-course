import { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Home from "./Home";
import Chats from "./Chats";
import Profile from "./Profile";
import Quotes from "./Quotes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { onAuthStateChanged } from "firebase/auth";
import { auth, login, logOut, signUp } from "../services/firebase";

function Routes() {
    const [authed, setAuthed] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user) {
                setAuthed(true);
            }else setAuthed(false);
        });
        return unsubscribe;
    }, []);

    const handleLogin = async (email, pass) => {
        try {
            await login(email, pass);
        } catch (e) {
            console.log(e);
            setError(e.message);
        }
    }

    const handleSignUp = async (email, pass) => {
        try {
            await signUp(email, pass);
        } catch (e) {
            console.log(e);
            setError(e.message);
        }
    }

    const handleLogout = async () => {
        try {
            await logOut();
        } catch (e) {
          console.log(e);
        }
    }
    //console.log(auth)
    
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
                    <PublicRoute exact path="/" authed={authed}>
                        <Home />
                    </PublicRoute>
                    <PublicRoute exact path="/login" authed={authed}>
                        <Home onLogin={handleLogin} error={error} />
                    </PublicRoute>
                    <PublicRoute exact path="/signup" authed={authed}>
                        <Home onSignUp={handleSignUp} error={error} />
                    </PublicRoute>
                    <PrivateRoute path="/chats/:chatId?" authed={authed}>
                        <Chats />
                    </PrivateRoute>
                    <PrivateRoute exact path="/profile" authed={authed}>
                        <Profile onLogout={handleLogout} />
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