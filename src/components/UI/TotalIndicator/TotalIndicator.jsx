import styles from "./TotalIndicator.module.css";

export default function TotalIndicator({ className, value }) {
  return (
    <span className={`${styles.TotalIndicator} ${className}`}>
      <span>{`Итого: ${value.toLocaleString("de-CH")}`}</span>
    </span>
  );
}
