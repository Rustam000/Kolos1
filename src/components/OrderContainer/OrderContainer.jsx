import styles from "./OrderContainer.module.css";

export default function OrderContainer({ children, className = "" }) {
  return (
    <main className={`${styles.OrderContainer} ${className}`}>{children}</main>
  );
}
