import styles from "./CustomSelect.module.css";
import { useState } from "react";
import arrowUpIcon from "../../../assets/icons/arrow-up.svg";

const CustomSelect = ({ options = [], name, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  function handleBlur() {
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  }

  return (
    <div
      className={`${styles.CustomSelect} ${
        isOpen ? styles.open : ""
      } ${className}`}
      onClick={toggleDropdown}
    >
      <div className={styles.displayedOption}>
        <input
          className={styles.input}
          type="text"
          name={name}
          id={`CustomSelect-${name}`}
          value={selectedOption}
          readOnly
          onBlur={handleBlur}
        />
        <img className={styles.arrowIcon} src={arrowUpIcon} alt="arrow icon" />
      </div>
      <div className={styles.dropdown}>
        <ul
          className={`${styles.optionContainer} ${isOpen ? styles.open : ""}`}
        >
          {options.map((option) => (
            <li
              className={styles.option}
              key={option}
              onClick={() => {
                setSelectedOption(option);
                setIsOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomSelect;
