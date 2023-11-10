import React from 'react';
import styles from './OrderButton.module.css';
import DeleteIcon from '../../../assets/icons/delete.svg'; 
import PlusIcon from '../../../assets/icons/plus.svg'; 

const OrderButton = ({ variant, onClick }) => {
  let buttonContent;

  if (variant === 'add') {
    buttonContent = <img src={PlusIcon} alt='Add' className={styles.icon} />;
  } else if (variant === 'remove') {
    buttonContent = <img src={DeleteIcon} alt='Remove' className={styles.icon} />;
  }

  return (
    <button onClick={onClick} className={`${styles.button} ${styles[variant]}`}>
      {buttonContent}
    </button>
  );
};

export default OrderButton;
