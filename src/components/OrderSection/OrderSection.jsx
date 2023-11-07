import styles from "./OrderSection.module.css";

export default function OrderSection({ children, className = "" }) {
  return (
    <section className={`${styles.OrderSection} ${className}`}>
      {children}
    </section>
  );
}
