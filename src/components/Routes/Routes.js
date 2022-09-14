import { BrowserRouter, Switch, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import Header from "../App/Header";
import Footer from "../App/Footer";
import Home from "../Home/Home";
import Chats from "../Chats/Chats";
import Profile from "../Profile/Profile";
import Auth from "../Auth/Auth";
import NotFound from "../NotFound/NotFound";

const theme = createTheme({
  palette: {
    primary: {
      main: '#310040',
    },
    secondary: {
      main: '#000',
    },
    info: {
      main: '#000',
    }
  }
});

export default function Routes() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Header />
        <main className="appMain">
          <div className="container">
            <Switch>
              <PublicRoute exact path="/auth/:params?">
                <Auth />
              </PublicRoute>
              <Route exact path="/">
                <Home />
              </Route>
              <PrivateRoute path="/chats/:chatId?">
                <Chats />
              </PrivateRoute>
              <PrivateRoute exact path="/profile">
                <Profile />
              </PrivateRoute>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </div>
        </main>
        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  );
};
