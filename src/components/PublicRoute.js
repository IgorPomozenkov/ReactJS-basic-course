import { shallowEqual, useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { selectProfile } from "../store/profile/selectors";

export const PublicRoute = ({ ...props }) => {
    const { authed } = useSelector(selectProfile, shallowEqual);

    return (
        <>
            {!authed ? (<Route {...props} />) : (<Redirect to="/chats" />)}
        </>
    )
}