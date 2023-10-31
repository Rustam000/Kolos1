import styles from "./CustomSearch.module.css";
import searchIcon from "../../../assets/icons/search.svg";
import { useRef } from "react";

export default function CustomSearch({
  className,
  placeholder = "Поиск...",
  value = "",
  options = [],
  onChange = () => undefined,
  onSearch = () => undefined,
}) {
  const inputRef = useRef(null);
  const hasOptions = options.length > 0;

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      onSearch(inputRef.current?.value);
    }
  }

  return (
    <span
      className={`${styles.CustomSearch} ${
        hasOptions ? styles.hasOptions : ""
      } ${className}`}
    >
      <div className={styles.dropdownContainer}>
        <div className={styles.inputIconContainer}>
          <input
            className={styles.searchInput}
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyDown={handleKeyDown}
          />
          <img
            src={searchIcon}
            alt="icon"
            className={styles.searchIcon}
            onClick={() => onSearch(inputRef.current.value)}
          />
        </div>
        <div className={styles.dropdown}>
          <ul
            className={`${styles.optionContainer} ${
              hasOptions ? styles.hasOptions : ""
            }`}
          >
            {options.map((option) => (
              <li
                className={styles.option}
                key={option}
                onClick={() => console.log(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </span>
  );
}
