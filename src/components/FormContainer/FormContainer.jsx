import styles from "./FormContainer.module.css";

export default function FormContainer({ children }) {
  return <div className={styles.FormContainer}>{children}</div>;
}
