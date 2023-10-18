import styles from "./CustomButton.module.css";

/**
 * @typedef {'narrow' | 'wide' | 'full'} ButtonWidth
 * @typedef {'primary' | 'secondary'} ButtonVariant
 *
 * @param {Object} param0
 * @param {import("react").ReactNode} param0.children Button text or icon
 * @param {ButtonWidth} [param0.width="wide"] wide|narrow|full
 * @param {ButtonVariant} [param0.variant="primary"] primary|secondary
 * @param {boolean} [param0.disabled=false]
 * @param {()=>unknown|undefined} [param0.onClick=undefined]
 *
 * @description width can be: wide|narrow|full
 * @description variant can be: primary|secondary
 *
 */
export default function CustomButton({
  children,
  width = "wide", //wide|narrow|full
  variant = "primary", //primary|secondary
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