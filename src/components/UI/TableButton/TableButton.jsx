import styles from "./TableButton.module.css";

export default function TableButton({ children, onClick }) {
  return (
    <div className={styles.tableButtonContainer}>
      <button className={styles.TableButton} onClick={onClick}>
        {children}
      </button>
    </div>
  );
}
