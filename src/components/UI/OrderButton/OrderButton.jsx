import React from "react";
import styles from "./OrderButton.module.css";
import deleteIcon from "../../../assets/icons/delete.svg";
import addIcon from "../../../assets/icons/add.svg";

export default function OrderButton({
  variant = "add",
  onClick = () => {},
  className = "",
}) {
  return (
    <button onClick={onClick} className={`${styles.OrderButton} ${className}`}>
      <img
        src={variant === "remove" ? deleteIcon : addIcon}
        alt={variant}
        width={12}
      />
    </button>
  );
}
