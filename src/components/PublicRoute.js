import { Redirect, Route } from "react-router-dom";

export const PublicRoute = ({authed, ...props}) => !authed ? <Route {...props} /> : <Redirect to="/chats" />;