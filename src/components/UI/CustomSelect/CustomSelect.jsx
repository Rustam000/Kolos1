import styles from "./CustomSelect.module.css";
import { useState } from "react";
import arrowUpIcon from "../../../assets/icons/arrow-up.svg";
import arrowDownIcon from "../../../assets/icons/arrow-down.svg";

const CustomSelect = ({
  options = [],
  name,
  className,
  dispatchNewValue = (value) => console.log(value),
}) => {
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

  function handleChange(option) {
    setSelectedOption(option);
    dispatchNewValue(option.value);
    setIsOpen(false);
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
          value={selectedOption.label}
          readOnly
          onBlur={handleBlur}
        />
        <img
          className={styles.arrowIcon}
          src={isOpen ? arrowUpIcon : arrowDownIcon}
          alt="arrow icon"
        />
      </div>
      <div className={styles.dropdown}>
        <ul
          className={`${styles.optionContainer} ${isOpen ? styles.open : ""}`}
        >
          {options.map((option) => (
            <li
              className={styles.option}
              key={option.value}
              onClick={() => handleChange(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomSelect;
