import styles from "./CustomSelect.module.css";
import { useState } from "react";
import arrowUpIcon from "../../../assets/icons/arrow-up.svg";

const CustomSelect = ({ options = [], label, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value) => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  return (
    <div
      className={`${styles.CustomSelect} ${isOpen ? styles.open : ""}`}
      onClick={toggleDropdown}
    >
      <div className={styles.selectedOption}>
        {selectedOption || label}
        <img
          className={styles.arrowIcon}
          src={arrowUpIcon}
          alt="arrow icon"
          width="9"
        />
      </div>
      <div className={styles.dropdown}>
        <div
          className={`${styles.optionContainer} ${isOpen ? styles.open : ""}`}
        >
          {options.map((option) => (
            <label
              className={styles.option}
              key={option}
              /* onClick={() => handleOptionClick(option)} */
            >
              <input
                className={styles.radio}
                type="radio"
                id={name + option}
                name={name}
                value={option}
                checked={selectedOption === option}
                onChange={() => handleOptionClick(option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomSelect;
