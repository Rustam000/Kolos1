import React, { useState } from 'react';
import styles from './QuantityControl.module.css';

const QuantityControl = ({ min = 1, max = 9999 }) => {
  const [quantity, setQuantity] = useState(min);

  const increment = () => {
    setQuantity((prevQuantity) => Math.min(prevQuantity + 1, max));
  };

  const decrement = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, min));
  };

  const handleChange = (e) => {
    const newQuantity = Math.min(Math.max(Number(e.target.value), min), max);
    setQuantity(newQuantity);
  };

  return (
    <div className={styles.container}>
      <input
        type="number"
        className={styles.quantityInput}
        value={quantity}
        onChange={handleChange}
        min={min}
        max={max}
      />
      <div className={styles.arrowButtonContainer}>
        <button className={styles.arrowButton} onClick={increment} aria-label="Increase quantity">
          &#9650; {/* Default HTML up triangle */}
        </button>
        <button className={styles.arrowButton} onClick={decrement} aria-label="Decrease quantity">
          &#9660; {/* Default HTML down triangle */}
        </button>
      </div>
    </div>
  );
};

export default QuantityControl;
