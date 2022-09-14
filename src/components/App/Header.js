import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Avatar, Box, Button, CircularProgress, Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@material-ui/core";
import { AccountCircle, ExitToApp} from "@material-ui/icons";
import { profile, userAdmin, userLoading } from "../../store/profile/selectors";
import { initUser, userLogout } from "../../store/profile/actions";

export default function Header() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { authed, user } = useSelector(profile, shallowEqual);
  const loading = useSelector(userLoading, shallowEqual);
  const admin = useSelector(userAdmin, shallowEqual);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (!!authed) dispatch(initUser());
    // return () => {
    //   console.log('header')
    // }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!!anchorEl) handleClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    const res = window.confirm('Подтвердите выход из аккаунта!');
    if (res) dispatch(userLogout());
  };

  return (
    <header className="appHeader">
      <div className="container">
        <nav className="nav">
          <Link className="nav__link" to="/">HOME</Link>
          <Link className="nav__link" to="/chats">CHATS</Link>
          <span className="nav__disable">USERS</span>
        </nav>
        <nav className="nav navRight">
          <IconButton color="inherit" size="medium" onClick={handleMenu}>
            {!!authed ? (
              <Avatar
                className={admin ? "adminBg" : "userBg"}
                children={user.name?.slice(0, 1)}
              />
            ) : (
              <AccountCircle fontSize="large" />
            )}
          </IconButton>
          <Menu className="menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            transformOrigin={{ vertical: 'top', horizontal: 'right', }}
            anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
          >
            {loading && <CircularProgress className="menu__loading" />}
            {!!authed ? (
              <Box>
                <MenuItem button={false}>
                  <Avatar
                    className={admin ? "adminBg menu__userAvatar" : "userBg menu__userAvatar"}
                    children={user.name?.slice(0, 1)}
                  />
                  <ListItemText className="menu__userName" primary={user?.name} secondary={user?.email} />
                </MenuItem>
                <MenuItem button={true} onClick={() => history.push('/profile')}>
                  Мой профиль
                </MenuItem>
                <Divider className="menu__hr" />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon><ExitToApp fontSize="small" /></ListItemIcon>
                  Выйти
                </MenuItem>
              </Box>
            ) : (
              <Box className="menu__login">
                <Button variant="outlined" color="primary" onClick={() => history.push('/auth/login')}>
                  Войти
                </Button>
              </Box>
            )}
          </Menu>
        </nav>
      </div>
      <div className="appHeader__heading">
        <div className="container">
          <h2 className="heading"> </h2>
        </div>
      </div>
    </header>
  );
};
