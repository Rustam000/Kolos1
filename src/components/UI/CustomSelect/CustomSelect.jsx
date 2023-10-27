import  { useState } from 'react';
import styles from './CustomSelect.module.css';

const CustomSelect = ({ options, label, name}) => {
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
    <div className={styles['select-box']}>
      <div className={`${styles['selected']} ${isOpen ? styles.active : ''}`} onClick={toggleDropdown}>
        {selectedOption || label}
      </div>
      <div className={`${styles['options-container']} ${isOpen ? styles.active : ''}`}>
        {options.map((option) => (
          <div key={option} className={styles.option} onClick={() => handleOptionClick(option)}>
            <input
              type="radio"
              className={styles.radio}
              id={option}
              name={name}
              value={option}
              checked={selectedOption === option}
              onChange={() => handleOptionClick(option)}
            />
            <label htmlFor={option}>{option}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomSelect;





