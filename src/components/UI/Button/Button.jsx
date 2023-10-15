import styles from "./Button.module.css";

export default function Button({
  children,
  width = "wide",
  variant = "primary",
  disabled = false,
  onClick = undefined,
}) {
  return (
    <button
      className={`${styles.Button} ${styles[width]} ${styles[variant]}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
