import Logo from "../Logo/Logo";
import styles from "./Header.module.css";

export default function Header({ children }) {
  return (
    <header className={styles.Header}>
      <div className="container">
        <div className={styles.flexContainer}>
          <span className={styles.logoWrapper}>
            <Logo />
          </span>
          {children}
        </div>
      </div>
    </header>
  );
}
