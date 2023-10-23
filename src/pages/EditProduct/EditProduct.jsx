import { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./EditProduct.module.css";
import PageHeading from "../../components/PageHeading/PageHeading";
import FormContainer from "../../components/FormContainer/FormContainer";
import CustomButton from "../../components/UI/CustomButton/CustomButton";
import KolosModal from "../../components/KolosModal/KolosModal";

export default function EditProduct() {
  const location = useLocation();
  const isEdit = location.pathname.includes("/edit-product");

  const [formData, setFormData] = useState({
    name: '',
    idNumber: '',
    quantity: '',
    price: '',
    sum: '',
    unit: 'шт',
    category: 'Алкогольное'
  });

  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { ...formData, [name]: value };
    if (name === "quantity" || name === "price") {
      const quantity = parseFloat(updatedData["quantity"]) || 0;
      const price = parseFloat(updatedData["price"]) || 0;
      updatedData["sum"] = (quantity * price).toString();
    }
    setFormData(updatedData);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setShowSaveModal(true);
  };

  const confirmSave = () => {
    console.log(formData);
    setShowSaveModal(false);
  };

  const isFormValid = () => {
    const requiredFields = ['name', 'idNumber', 'quantity', 'price'];
    return requiredFields.every(field => formData[field] !== '');
  };

  const handleCancel = () => {
    setShowCancelModal(true);
  };

  return (
    <div className={styles.EditProduct}>
      <div className={styles.narrowContainer}>
        <PageHeading heading={isEdit ? "Редактировать товар" : "Создать товар"} modalOnLeave={true} />
        <FormContainer>
          <form className={styles.form} onSubmit={handleSave}>
            <fieldset className={styles.formFlexRowTop}>
              <label className={styles.formInput}>
                <p>Наименование</p>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Пиво" />
              </label>
              <label className={styles.formInput}>
                <p>Идентификационный номер</p>
                <input type="text" name="idNumber" value={formData.idNumber} onChange={handleInputChange} />
              </label>
            </fieldset>
            <fieldset className={styles.formFlexRow}>
              <div className={styles.measurementCategoryContainer}>
                <label className={styles.formDropdown}>
                  <p>Ед.измерения</p>
                  <select name="unit" value={formData.unit} onChange={handleInputChange} className={styles.dropdown_select}>
                    <option value="шт">шт</option>
                    <option value="кг">кг</option>
                    <option value="л">л</option>
                    <option value="м">м</option>
                  </select>
                </label>
              </div>
              <label className={styles.formInput}>
                <p>Количество</p>
                <input type="text" name="quantity" value={formData.quantity} onChange={handleInputChange} placeholder="1000" />
              </label>
              <label className={styles.formInput}>
                <p>Цена</p>
                <input type="text" name="price" value={formData.price} onChange={handleInputChange} placeholder="0.00" />
              </label>
              <label className={styles.formInput}>
                <p>Сумма</p>
                <input type="text" name="sum" value={formData.sum} readOnly placeholder="0.00" />
              </label>
            </fieldset>
            <fieldset className={styles.formBottom}>
              <div className={styles.measurementCategoryContainer}>
                <label className={styles.formDropdown}>
                  <p>Категория</p>
                  <select name="category" value={formData.category} onChange={handleInputChange} className={styles.category_dropdown_select}>
                    <option value="Алкогольное">Алкогольное</option>
                    <option value="Безалкогольное">Безалкогольное</option>
                  </select>
                </label>
              </div>
              <div className={styles.selection}>
                <span className={styles.selectionTitle}>Состояние</span>
                <div className={styles.radioButtonGroup}>
                  <label className={styles.frame}>
                    <input type="radio" className={styles.radio} name="productCondition" value="norm" defaultChecked={!isEdit} readOnly={!isEdit} />
                    <span className={styles.radioLabel}>Норма</span>
                  </label>
                  <label className={styles.frame}>
                    <input type="radio" className={styles.radio} name="productCondition" value="defect" disabled={!isEdit} />
                    <span className={styles.radioLabel}>Брак</span>
                  </label>
                </div>
              </div>
            </fieldset>
            <div className={styles.formButtonRow}>
              <CustomButton type="button" variant="secondary" onClick={() => setShowCancelModal(true)} disabled={!isEdit}>
                Удалить
              </CustomButton>
              <CustomButton type="submit" width="xwide" disabled={!isFormValid()}>
                Сохранить
              </CustomButton>
            </div>
          </form>
        </FormContainer>
      </div>

      {showSaveModal && (
        <KolosModal message="Вы точно хотите сохранить?">
          <CustomButton width="flex" height="low" variant="primary" onClick={confirmSave}>
            Да
          </CustomButton>
          <CustomButton width="flex" height="low" variant="secondary" onClick={() => setShowSaveModal(false)}>
            Нет
          </CustomButton>
        </KolosModal>
      )}

      {showCancelModal && (
        <KolosModal message="Вы точно хотите отменить все и покинуть страницу?">
          <CustomButton width="flex" height="low" variant="primary" onClick={() => setShowCancelModal(false)}>
            Да
          </CustomButton>
          <CustomButton width="flex" height="low" variant="secondary" onClick={() => setShowCancelModal(false)}>
            Нет
          </CustomButton>
        </KolosModal>
      )}
    </div>
  );
}
