import styles from "./CustomSearch.module.css";
import searchIcon from "../../../assets/icons/search.svg";
import { useRef } from "react";
import Dropdown from "../Dropdown/Dropdown";

export default function CustomSearch({
  className,
  placeholder = "Поиск...",
  value = "",
  options = [],
  onChange = () => undefined,
  onSearch = () => undefined,
}) {
  const inputRef = useRef(null);

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      onSearch(inputRef.current?.value);
    }
  }

  //temporary!!!
  /* const tempOptions = inputRef.current
    ? inputRef.current.value.split("").map((char) => ({ label: char }))
    : []; */
  //temporary!!!

  return (
    <span className={`${styles.CustomSearch} ${className}`}>
      <Dropdown options={options}>
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
      </Dropdown>
    </span>
  );
}
