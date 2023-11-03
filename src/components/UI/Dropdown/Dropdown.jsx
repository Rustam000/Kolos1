import styles from "./Dropdown.module.css";

//'options' prop is an array of Option objects.
//each Option must have 'label' property
export default function Dropdown({
  children,
  options,
  onClick = console.log,
  className,
}) {
  const hasOptions = options?.length > 0;

  return (
    <div
      className={`${styles.Dropdown} ${
        hasOptions ? styles.hasOptions : ""
      } ${className}`}
    >
      {children}
      <div className={styles.relativeContainer}>
        <ul className={styles.optionsContainer}>
          {options.map((option) => (
            <li
              className={styles.option}
              key={option.label}
              onClick={() => onClick(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
