import styles from "./CustomButton.module.css";

/**
 * @typedef {'narrow' | 'wide' | 'full'} ButtonWidth
 * @typedef {'primary' | 'secondary'} ButtonVariant
 * @typedef {'submit' | 'button'|'reset'} ButtonType
 *
 * @param {Object} param0
 * @param {import("react").ReactNode} param0.children Button text or icon
 * @param {ButtonWidth} [param0.width="wide"] narrow|medium|wide|full
 * @param {ButtonVariant} [param0.variant="primary"] primary|secondary
 * @param {ButtonType} [param0.type="submit"] primary|secondary
 * @param {boolean} [param0.disabled=false]
 * @param {()=>unknown|undefined} [param0.onClick=undefined]
 *
 * @description width can be: narrow|medium|wide|full
 * @description variant can be: primary|secondary
 *
 */
export default function CustomButton({
  children,
  width = "wide", //narrow|medium|wide|full
  variant = "primary", //primary|secondary
  disabled = false,
  type = "submit",
  onClick = undefined,
}) {
  return (
    <button
      type={type}
      className={`${styles.Button} ${styles[width]} ${styles[variant]}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
