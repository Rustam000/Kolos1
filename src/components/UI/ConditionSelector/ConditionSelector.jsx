import styles from "./ConditionSelector.module.css";
import expandIcon from "../../../assets/icons/expand_more.svg";

export default function ConditionSelector({ children, onClick }) {
  return (
    <button className={styles.ConditionSelector} onClick={onClick}>
      <span>{children}</span>
      <img src={expandIcon} alt="expand icon" />
    </button>
  );
}
