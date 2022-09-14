import { React, useEffect } from "react"
import { shallowEqual, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { profile, userAdmin, userLoading } from "../../store/profile/selectors";
import './Home.css';

export default function Home() {
  const { authed, user } = useSelector(profile, shallowEqual);
  const loading = useSelector(userLoading, shallowEqual);
  const admin = useSelector(userAdmin, shallowEqual);

  useEffect(() => {
    document.querySelector('.heading').textContent = 'Chats App';
  }, []);

  return (
    <div className="homePage pageContent">
      {!authed && (
        <p className="homePage__text">
          Приветствуем тебя, наш пользователь. Чтобы воспользоваться чат-приложением, нужно <Link className="mainLink" to="/auth">Авторизоваться</Link>
        </p>
      )}
      {loading && <CircularProgress className="reqLoading" />}
      {!!authed && !!user.id && (
        <p className="homePage__text">
          Приветствуем тебя, <span className={admin ? "adminText homePage__userName" : "userText homePage__userName"}>{user.name}</span><br />
          Теперь у тебя есть доступ к чат-приложению. Чтобы изменить личные данные, перейди в <Link className="mainLink" to="/profile">Профиль</Link>
        </p>
      )}
      {!!authed && !!user.id && !!admin && (
        <p className="homePage__text moderText">
          Также у тебя есть права модератора (возможность добавления/удаление чатов)
        </p>
      )}
    </div>
  );
};
