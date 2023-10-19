import React, { useState } from 'react';
import styles from "./EditProduct.module.css";
import { Link } from 'react-router-dom';

export default function EditProduct() {
  const [name, setName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [sum, setSum] = useState('');
  const [unit, setUnit] = useState('шт');
  const [category, setCategory] = useState('Алкогольное');

  const handleSave = (e) => {
    e.preventDefault(); // Prevent default behaviors like form submission
    console.log({
      name,
      idNumber,
      quantity,
      price,
      sum,
      unit,
      category
    });
  };

  return (
    <div className={styles.header}>
      <div className={styles.cancel_button}>
        <button className={styles.back}>
          <Link to="/Warehouse" className={styles.cancel_text}>
          <span className={styles.fi_sr_angle_small_left}></span>
          <span className={styles.cancel_text}>Отменить</span>
          </Link>
          <div className={styles.create_product}>Создать товар</div>
        </button>
      </div>
      <div className={styles.cube}>
        <div className={styles.input_field}>
          <input 
            type="text" 
            className={styles.input} 
            placeholder="Пиво"
            value={name}
            onChange={e => setName(e.target.value)} 
          />
          <span className={styles.sampleText}>Наименование</span>
        </div>

        <div className={styles.input_field} style={{ left: "480px" }}>
          <input 
            type="text" 
            className={styles.input}
            value={idNumber}
            onChange={e => setIdNumber(e.target.value)} 
          />
          <span className={styles.sampleText}>Идентификационный номер</span>
        </div>

        <div className={styles.input_field} style={{width: "150px", height: "50px", left: "360px", top: "230px"}}>
          <input 
            type="text" 
            className={styles.input} 
            placeholder="1000"
            value={quantity}
            onChange={e => setQuantity(e.target.value)} 
          />
          <span className={styles.sampleText}>Количество</span>
        </div>

        <div className={styles.input_field} style={{width: "150px", height: "50px", left: "540px", top: "230px"}}>
          <input 
            type="text" 
            className={styles.input} 
            placeholder="0.00"
            value={price}
            onChange={e => setPrice(e.target.value)} 
          />
          <span className={styles.sampleText}>Цена</span>
        </div>

        <div className={styles.input_field} style={{width: "150px", height: "50px", left: "720px", top: "230px"}}>
          <input 
            type="text" 
            className={styles.input} 
            placeholder="0.00"
            value={sum}
            onChange={e => setSum(e.target.value)} 
          />
          <span className={styles.sampleText}>Сумма</span>
        </div>

        <div className={styles.dropdown} style={{width: "290px", height: "50px", left: "50px", top: "230px"}}>
          <select 
            className={styles.dropdown_select}
            value={unit}
            onChange={e => setUnit(e.target.value)}
          >
            <option value="шт">шт</option>
            <option value="кг">кг</option>
            <option value="л">л</option>
            <option value="м">м</option>
          </select>
          <span className={styles.sampleText}>Ед.измерения</span>
        </div>

        <div className={styles.category_dropdown} style={{width: "250px", height: "50px", left: "50px", top: "350px"}}>
          <select 
            className={styles.category_dropdown_select}
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value="Алкогольное">Алкогольное</option>
            <option value="Безалкогольное">Безалкогольное</option>
            <option value="Category 3">Category 3</option>
          </select>
          <span className={styles.sampleText}>Категория</span>
        </div>
      </div>

      <button className={styles.frame_300}>
       Удалить
      </button>

      <button className={styles.frame_301} onClick={handleSave} type="button">
        <span className={styles.save_button}>Сохранить</span>
      </button>

      <div className={styles.selection}>
        <span className={styles.selectionTitle}>Ваш текст здесь</span>
        <div className={styles.checkBoxes}>
          <label className={styles.frame}>
            <input type="checkbox" className={styles.radioButton} checked readOnly />
            <span className={styles.checkboxLabel}>Норма</span>
          </label>
          <label className={styles.frame}>
            <input type="checkbox" className={styles.radioButton} disabled />
            <span className={styles.checkboxLabel}>Брак</span>
          </label>
          <label className={styles.frame}>
            <input type="checkbox" className={styles.radioButton} disabled />
            <span className={styles.checkboxLabel}>Просрочка</span>
          </label>
        </div>
      </div>
    </div>
  );
}
