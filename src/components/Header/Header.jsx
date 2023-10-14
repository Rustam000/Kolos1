import Logo from "../Logo/Logo";
import styles from "./Header.module.css";

export default function Header({ children }) {
  return (
    <header className={styles.Header}>
      <div className="container">
        <div className={styles.flexContainer}>
          <Logo />
          {children}
        </div>
      </div>
    </header>
  );
}
