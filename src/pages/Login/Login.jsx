import { useDispatch, useSelector } from "react-redux";
import eyeIconShow from "../../assets/icons/eye.svg";
import eyeIconHide from "../../assets/icons/eyeslash.svg";
import { useEffect, useRef, useState } from "react";
import styles from "./Login.module.css";
import { authActions, logUserIn } from "../../redux/authSlice";

export default function Login() {
  const [login, setLogin] = useState("dev");
  const [password, setPassword] = useState("dev");
  const [hidePassword, setHidePassword] = useState(true);
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const fieldsAreEmpty = !login || !password;

  function handleSubmit(event) {
    event.preventDefault();
    const formData = {
      login,
      password,
    };
    //dispatch(authActions.logUserIn(formData));
    dispatch(logUserIn(formData));
  }

  useEffect(() => {
    formRef.current?.login.focus();
  }, []);

  useEffect(() => {
    dispatch(authActions.clearError());
  }, [login, password]);

  useEffect(() => {
    if (error === "access_denied") {
      setLogin("");
      setPassword("");
    }
  }, [error]);

  return (
    <div className={styles.LoginPage}>
      <form className={styles.form} ref={formRef} onSubmit={handleSubmit}>
        <h2 className={styles.heading}>Авторизация</h2>
        {/*  */}
        <label className={styles.label}>
          <p className={styles.inputCaption}>Логин</p>
          <input
            className={`${styles.input} ${error && styles.invalid}`}
            type="text"
            name="login"
            value={login}
            onChange={(event) => setLogin(event.target.value)}
            autoComplete="off"
          />
        </label>
        {/*  */}
        <label className={styles.label}>
          <p className={styles.inputCaption}>Пароль</p>
          <div className={styles.inputWrapper}>
            <input
              className={`${styles.input} ${error && styles.invalid}`}
              type={hidePassword ? "password" : "text"}
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="off"
            />
            <img
              className={styles.passwordIcon}
              role="button"
              src={hidePassword ? eyeIconHide : eyeIconShow}
              alt="show password"
              onClick={() => setHidePassword(!hidePassword)}
            />
          </div>
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
          {error === "try_again" && "Неправильные данные! Попробуйте еще раз!"}
        </p>
      </form>
    </div>
  );
}
