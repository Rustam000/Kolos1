import styles from "./CustomSelect.module.css";
import { useEffect, useState } from "react";
import arrowUpIcon from "../../../assets/icons/arrow-up.svg";
import arrowDownIcon from "../../../assets/icons/arrow-down.svg";

const CustomSelect = ({
  options = [{ label: "---", value: "" }],
  value,
  name,
  className,
  onChange = undefined,
}) => {
  const firstOption = options[0] || { value: "", label: "---" };
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(firstOption);
  const selectedOptionValue = selectedOption.value;

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
    setIsOpen(false);
  }

  useEffect(() => {
    const receivedOption = options.find((opt) => opt.value === value);
    if (receivedOption) {
      setSelectedOption(receivedOption);
    }
  }, [value]);

  useEffect(() => {
    setSelectedOption(firstOption);
  }, [options.length]);

  useEffect(() => {
    if (onChange) {
      onChange(selectedOptionValue);
    }
  }, [selectedOptionValue]);

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
