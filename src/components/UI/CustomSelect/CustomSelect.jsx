import styles from "./CustomSelect.module.css";
import { useState } from "react";
import arrowUpIcon from "../../../assets/icons/arrow-up.svg";

const CustomSelect = ({ options = [], name, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`${styles.CustomSelect} ${
        isOpen ? styles.open : ""
      } ${className}`}
      onClick={toggleDropdown}
    >
      <div className={styles.displayedOption}>
        {selectedOption}
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
            <label className={styles.option} key={option}>
              <input
                className={styles.radio}
                type="radio"
                id={name + option}
                name={name}
                value={option}
                checked={selectedOption === option}
                onChange={() => {
                  setSelectedOption(option);
                  setIsOpen(false);
                }}
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
