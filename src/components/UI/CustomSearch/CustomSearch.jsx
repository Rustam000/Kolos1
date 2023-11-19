import styles from "./CustomSearch.module.css";
import searchIcon from "../../../assets/icons/search.svg";
import clearIcon from "../../../assets/icons/clear.svg";
import { useEffect, useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import { SEARCH_DEBOUNCE_DELAY } from "../../../common/constants";
import { useDebounce } from "../../../hooks/useDebounce";
import { axiosPrivate } from "../../../api/axiosPrivate";

export default function CustomSearch({
  className,
  placeholder = "Поиск...",
  params = {},
  delay = SEARCH_DEBOUNCE_DELAY || 700,
  onSearch = () => undefined,
}) {
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, delay);

  useEffect(() => {
    if (debouncedSearch === "") {
      setOptions([]);
      return;
    }

    async function getSearchMatches() {
      try {
        const response = await axiosPrivate.get(
          `/products/tip/?search=${debouncedSearch}`,
        );
        const options = response.data.results
          .map((item) => item.name)
          .filter((item) => {
            return Object.keys(params).reduce(
              (acc, key) => acc * (item[key] === params[key]),
              true,
            );
          });
        const uniqueOptions = [...new Set(options)].map((item) => ({
          label: item,
          value: item,
        }));
        setOptions(uniqueOptions);
      } catch (error) {
        return error;
      }
    }

    getSearchMatches();
  }, [debouncedSearch]);

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      onSearch(debouncedSearch);
    }
    if (event.key === "Escape") {
      handleClear();
    }
  }

  function handleBlur() {
    setOptions([]);
  }

  function handleClear() {
    setSearch("");
    setOptions([]);
    onSearch("");
  }

  return (
    <span className={`${styles.CustomSearch} ${className}`}>
      <Dropdown options={options}>
        <div className={styles.inputIconContainer}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder={placeholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
          />
          {search === "" ? (
            <img src={searchIcon} alt="icon" className={styles.searchIcon} />
          ) : (
            <img
              src={clearIcon}
              alt="icon"
              className={styles.clearIcon}
              onClick={handleClear}
            />
          )}
        </div>
      </Dropdown>
    </span>
  );
}
