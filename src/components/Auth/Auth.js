import { React, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@material-ui/core";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { userLogin, userRegister } from "../../store/profile/actions";
import { userFailure, userLoading } from "../../store/profile/selectors";
import './Auth.css';

export default function Auth() {
  const history = useHistory();
  const { params } = useParams();
  const dispatch = useDispatch();
  const loading = useSelector(userLoading, shallowEqual);
  const userError = useSelector(userFailure, shallowEqual);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [passConfirm, setPassConfirm] = useState('');
  const [error, setError] = useState('');
  const [errorPass, setErrorPass] = useState(false);
  const [errorPassConfirm, setErrorPassConfirm] = useState(false);

  const login = params === 'login';
  const signup = params === 'signup';

  useEffect(() => {
    document.querySelector('.heading').textContent = 'Авторизация';
  }, []);

  useEffect(() => {
    if (!!params && !login && !signup) history.push('/auth');
    if (!!params && (login || signup)) setOpen(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const handlePassChange = (e) => {
    setPass(e.target.value);
    setError('');
    setErrorPass(false);
  };

  const handlePassConfirmChange = (e) => {
    setPassConfirm(e.target.value);
    setError('');
    setErrorPassConfirm(false)
  };

  const handleOpen = (path) => {
    history.push(path);
  };

  const handleClose = () => {
    setOpen(false);
    setError('');
    setErrorPass(false);
    setErrorPassConfirm(false)
    setEmail('');
    setPass('');
    setPassConfirm('');
    history.push('/auth');
  };

  const sendLogin = (email, pass) => {
    dispatch(userLogin(email, pass));
    handleClose();
  };

  const sendSignUp = async (email, pass) => {
    dispatch(userRegister(email, pass));
    handleClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const truePass = pass.length < 6;

    if (!email && !pass && !passConfirm) setError('Заполните все данные!');

    if (email && pass && truePass) {
      setError('Пароль должен быть не менее 6 символов!');
      setErrorPass(true);
      return;
    }

    if (login && email && pass && !truePass) sendLogin(email, pass);

    if (signup && email && pass && passConfirm && !truePass) {
      if(pass === passConfirm) {
        sendSignUp(email, pass);
      } else {
        setError('Пароли не совпадают!');
        setErrorPassConfirm(true)
      }
    }
  };

  return (
    <div className="authPage pageContent">
      {loading ? (
        <CircularProgress className="reqLoading" />
      ) : (
        <div className="auth">
          <div className="auth__btn">
            <Button variant="outlined" color="primary" onClick={() => handleOpen('/auth/login')}>
              Войти
            </Button>
            <Button variant="outlined" color="primary" onClick={() => handleOpen('/auth/signup')}>
              Зарегистрироваться
            </Button>
          </div>
          {!!userError && (
            <p className="reqError">
              {userError}
            </p>
          )}
        </div>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {login && 'Войти'}
          {signup && 'Регистрация'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Введи свои данные
          </DialogContentText>
          <form id="dialogFrom" onSubmit={handleSubmit}>
            <TextField
              type="email"
              name="email"
              label="Email"
              required fullWidth
              margin="dense"
              value={email}
              onChange={handleEmailChange}
            />
            <TextField
              type="password"
              label="Пароль (не менее 6 символов)"
              required fullWidth
              error={errorPass}
              margin="dense"
              value={pass}
              onChange={handlePassChange}
            />
            {signup &&
              <TextField
                type="password"
                label="Подтверди пароль"
                required fullWidth
                error={errorPassConfirm}
                margin="dense"
                value={passConfirm}
                onChange={handlePassConfirmChange}
              />
            }
          </form>
          <p className="dialogError">
            {error}
          </p>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            Отмена
          </Button>
          <Button type="submit" form="dialogFrom" color="primary">
            Отправить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
