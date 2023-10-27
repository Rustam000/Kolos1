import styles from "./CustomRadioButton.module.css";

export default function CustomRadioButton({
  className = "",
  name = "",
  value = "",
  checked = false,
  onChange = undefined,
  disabled = false,
}) {
  return (
    <input
      className={`${styles.CustomRadioButton} ${className}`}
      type="radio"
      name={name}
      value={value}
      checked={checked}
      disabled={disabled}
      onChange={onChange}
    />
  );
}
