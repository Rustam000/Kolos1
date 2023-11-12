import styles from "./TransactionSection.module.css";

export default function TransactionSection({ children, className = "" }) {
  return (
    <section className={`${styles.TransactionSection} ${className}`}>
      {children}
    </section>
  );
}
