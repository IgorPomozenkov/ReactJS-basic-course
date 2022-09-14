import { shallowEqual, useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { profile } from "../../store/profile/selectors";

export const PublicRoute = ({ ...props }) => {
  const { authed } = useSelector(profile, shallowEqual);

  return (
    <>
      {!authed ? (
        <Route {...props} />
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};
