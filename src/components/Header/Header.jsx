import styles from "./Header.module.css";
import { Link, NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import CustomButton from "../UI/CustomButton/CustomButton";
import { useDispatch } from "react-redux";
import { pingTestEndpoint } from "../../redux/authSlice";

export default function Header() {
  const dispatch = useDispatch();

  function getNavlinkClasses({ isActive }) {
    return isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;
  }

  return (
    <header className={styles.Header}>
      <div className="container">
        <div className={styles.flexContainer}>
          <span
            className={styles.logoWrapper}
            onClick={() => dispatch(pingTestEndpoint())}
          >
            <Logo />
          </span>
          <NavLink className={getNavlinkClasses} to="/warehouse">
            Склад
          </NavLink>
          <NavLink className={getNavlinkClasses} to="/distributors">
            Дистрибьюторы
          </NavLink>
          <Link to="/logout">
            <CustomButton variant="secondary" height="low" width="narrow">
              Выйти
            </CustomButton>
          </Link>
        </div>
      </div>
    </header>
  );
}
