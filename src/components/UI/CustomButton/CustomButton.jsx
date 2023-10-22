import styles from "./CustomButton.module.css";

/**
 * @typedef {'narrow' | 'wide' | 'full'} ButtonWidth
 * @typedef {'defauly' | 'low'|'auth'} ButtonHeight
 * @typedef {'primary' | 'secondary'} ButtonVariant
 * @typedef {'submit' | 'button'|'reset'} ButtonType
 *
 * @param {Object} param0
 * @param {import("react").ReactNode} param0.children Button text or icon
 * @param {ButtonWidth} [param0.width="wide"] narrow|medium|wide|full|flex
 * @param {ButtonHeight} [param0.height="default"] default|low|auth
 * @param {ButtonVariant} [param0.variant="primary"] primary|secondary
 * @param {ButtonType} [param0.type="submit"]
 * @param {boolean} [param0.disabled=false]
 * @param {()=>unknown|undefined} [param0.onClick=undefined]
 * @param {string} [param0.className='']
 *
 * @description width can be: narrow|medium|wide|full|flex
 * @description variant can be: primary|secondary
 *
 */
export default function CustomButton({
  children,
  width = "wide", //narrow|medium|wide|full|flex
  height = "default", //default|low|auth
  variant = "primary", //primary|secondary
  disabled = false,
  type = "submit",
  onClick = undefined,
  className = "",
}) {
  return (
    <button
      type={type}
      className={`${styles.Button} ${styles[width]} ${styles[height]} ${styles[variant]} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
