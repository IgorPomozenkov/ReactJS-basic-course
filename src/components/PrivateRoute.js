import { shallowEqual, useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { selectProfile } from "../store/profile/selectors";

export const PrivateRoute = ({ ...props }) => {
    const { authed } = useSelector(selectProfile, shallowEqual);

    if(authed) {
        return <Route {...props} />;
    }else return <Redirect to="/login" />;
}