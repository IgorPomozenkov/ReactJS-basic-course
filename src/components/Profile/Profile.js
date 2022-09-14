import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { TextField, Button, Avatar, CircularProgress } from '@material-ui/core';
import { profile, userFailure, userLoading } from '../../store/profile/selectors';
import { changeUserData } from '../../store/profile/actions';
import './Profile.css';

export default function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector(profile, shallowEqual);
  const loading = useSelector(userLoading, shallowEqual);
  const userError = useSelector(userFailure, shallowEqual);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [btnText, setBtnText] = useState('Сохранено');

  useEffect(() => {
    document.querySelector('.heading').textContent = 'Профиль';
  }, []);

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
  }, [user.name, user.email]);

  const handleChangeName = (e) => {
    if (e.target.value.length < 35) setName(e.target.value);
    setBtnText( 'Сохранить');
  };

  const handleChangeEmail = (e) => {
    if (e.target.value.length < 40) setEmail(e.target.value);
    setBtnText( 'Сохранить');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!!name && name !== user.name) {
      const obj = {
        name,
      };
      dispatch(changeUserData(obj));
    }
    setBtnText('Сохранено');
  };

  return (
    <div className="profilePage pageContent">
      {loading ? (
        <CircularProgress className="reqLoading" />
      ) : (
        <div className="profile">
          <div className="userPhoto">
            <Avatar className="userPhoto__avatar" />
          </div>
          <div className="userData">
            <form className="userData__form" onSubmit={handleSubmit}>
              <TextField className="userData__field"
                type="text"
                label="Имя"
                variant="outlined"
                required fullWidth
                color="primary"
                margin="dense"
                value={name}
                onChange={handleChangeName}
              />
              <TextField className="userData__field"
                type="email"
                name="email"
                label="Email"
                variant="outlined"
                required fullWidth
                margin="dense"
                disabled
                value={email}
                onChange={handleChangeEmail}
              />
              <Button className="userData__btn"
                type="submit"
                variant="outlined"
                color="primary"
                disabled={false}
              >
                {btnText}
              </Button>
            </form>
            {!!userError && (
              <p className="reqError">
                {userError}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
