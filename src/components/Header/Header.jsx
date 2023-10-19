import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";
import styles from "./Header.module.css";
import CustomButton from "../UI/CustomButton/CustomButton";

export default function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <header className={styles.Header}>
      <div className="container">
        <div className={styles.flexContainer}>
          <span className={styles.logoWrapper}>
            <Logo />
          </span>
          <CustomButton
            variant={pathname === "/warehouse" ? "primary" : "secondary"}
            width="narrow"
            onClick={() => navigate("/warehouse")}
          >
            Склад
          </CustomButton>
          <CustomButton
            variant={pathname === "/distributors" ? "primary" : "secondary"}
            width="narrow"
            onClick={() => navigate("/distributors")}
          >
            Дистрибьюторы
          </CustomButton>
        </div>
      </div>
    </header>
  );
}
