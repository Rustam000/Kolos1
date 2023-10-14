import { useDispatch, useSelector } from "react-redux";
import eyeIconShow from "../../assets/icons/eye.svg";
import eyeIconHide from "../../assets/icons/eyeslash.svg";
import { useEffect, useRef, useState } from "react";
import styles from "./Login.module.css";
import { authActions } from "../../redux/authSlice";

export default function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const fieldsAreEmpty = !login || !password;

  function handleSubmit(event) {
    event.preventDefault();
    //const form = event.target;
    const formData = {
      login,
      password,
    };
    dispatch(authActions.logUserIn(formData));
  }

  useEffect(() => {
    formRef.current?.login.focus();
  }, []);

  return (
    <div className={styles.LoginPage}>
      <form className={styles.form} ref={formRef} onSubmit={handleSubmit}>
        <h2 className={styles.heading}>Авторизация</h2>
        {/*  */}
        <label className={styles.label}>
          <p className={styles.inputCaption}>Логин</p>
          <input
            className={styles.input}
            type="text"
            name="login"
            value={login}
            onChange={(event) => setLogin(event.target.value)}
          />
          <p className={styles.error}>
            {error === "try_again" &&
              "Неправильные данные! Попробуйте еще раз!"}
          </p>
        </label>
        {/*  */}
        <label className={styles.label}>
          <p className={styles.inputCaption}>Пароль</p>
          <div className={styles.inputWrapper}>
            <input
              className={styles.input}
              type={hidePassword ? "password" : "text"}
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <img
              className={styles.passwordIcon}
              role="button"
              src={hidePassword ? eyeIconShow : eyeIconHide}
              alt="show password"
              onClick={() => setHidePassword(!hidePassword)}
            />
          </div>
          <p className={styles.error}>
            {error === "try_again" &&
              "Неправильные данные! Попробуйте еще раз!"}
          </p>
        </label>
        {/*  */}
        <button
          className={styles.submitButton}
          disabled={fieldsAreEmpty || error === "access_denied"}
        >
          Войти
        </button>
        <p className={styles.error}>
          {error === "access_denied" &&
            "Программа временно не работает. Обратитесь к администратору!"}
        </p>
      </form>
      {/* //////////////////////////////////////// */}
      {/* //////////////////////////////////////// */}
      {/* временная кнопка для быстрой аутентификации на время разработки*/}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          padding: "1rem",
          backgroundColor: "orange",
        }}
      >
        <span>
          {"Это временный элемент. Логин и пароль на данный момент: dev/dev."}
          <br />
          {"Кнопка позволяет быстро авторизоваться ========>>>>>>>>>     "}
        </span>
        <button
          style={{
            padding: "0.5rem",
          }}
          tabIndex="-1"
          onClick={() => {
            const formData = {
              login: "dev",
              password: "dev",
            };
            dispatch(authActions.logUserIn(formData));
          }}
        >
          быстрый вход
        </button>
      </div>
    </div>
  );
}
