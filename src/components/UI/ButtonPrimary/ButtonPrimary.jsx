import styles from "./ButtonPrimary.module.css";

export default function ButtonPrimary({ children }) {
  return <button className={styles.ButtonPrimary}>{children}</button>;
}
