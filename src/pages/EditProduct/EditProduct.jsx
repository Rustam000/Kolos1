import { useState } from "react";
import styles from "./EditProduct.module.css";
import FormContainer from "../../components/FormContainer/FormContainer";
import CustomButton from "../../components/UI/CustomButton/CustomButton";

export default function EditProduct() {
  const [formData, setFormData] = useState({
    name: '',
    idNumber: '',
    quantity: '',
    price: '',
    sum: '',
    unit: 'шт',
    category: 'Алкогольное'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className={styles.EditProduct}>
      <div className={styles.narrowContainer}>
        <FormContainer>
          <form className={styles.form} onSubmit={handleSave}>
            <fieldset className={styles.formFlexRow}>
              <label className={styles.formInput}>
                <p>Наименование</p>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Пиво"
                />
              </label>
              <label className={styles.formInput}>
                <p>Идентификационный номер</p>
                <input
                  type="text"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleInputChange}
                />
              </label>
              <label className={styles.formInput}>
                <p>Количество</p>
                <input
                  type="text"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="1000"
                />
              </label>
              <label className={styles.formInput}>
                <p>Цена</p>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                />
              </label>
              <label className={styles.formInput}>
                <p>Сумма</p>
                <input
                  type="text"
                  name="sum"
                  value={formData.sum}
                  onChange={handleInputChange}
                  placeholder="0.00"
                />
              </label>
            </fieldset>
            <fieldset className={styles.formFlexRow}>
              <label className={styles.formDropdown}>
                <p>Ед.измерения</p>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                  className={styles.dropdown_select}
                >
                  <option value="шт">шт</option>
                  <option value="кг">кг</option>
                  <option value="л">л</option>
                  <option value="м">м</option>
                </select>
              </label>
              <label className={styles.formDropdown}>
                <p>Категория</p>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={styles.category_dropdown_select}
                >
                  <option value="Алкогольное">Алкогольное</option>
                  <option value="Безалкогольное">Безалкогольное</option>
                  <option value="Category 3">Category 3</option>
                </select>
              </label>
            </fieldset>
            <div className={styles.formButtonRow}>
              <CustomButton type="button" variant="secondary">
                Удалить
              </CustomButton>
              <CustomButton type="submit" width="xwide">
                Сохранить
              </CustomButton>
            </div>
          </form>
        </FormContainer>
      </div>
    </div>
  );
}
