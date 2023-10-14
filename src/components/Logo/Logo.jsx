import styles from "./Logo.module.css";
import logo from "../../assets/logo.svg";

export default function Logo() {
  return (
    <div className={styles.Logo}>
      <img src={logo} alt="logo" />
      <span>Колос</span>
    </div>
  );
}
