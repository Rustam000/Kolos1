import styles from "./EditProduct.module.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../components/PageHeading/PageHeading";
import FormContainer from "../../components/FormContainer/FormContainer";
import CustomButton from "../../components/UI/CustomButton/CustomButton";
import KolosModal from "../../components/KolosModal/KolosModal";

export default function EditProduct() {
  const location = useLocation();
  const isEdit = location.pathname.includes("/edit");
  const navigate = useNavigate();
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const initialData = isEdit
    ? {
        name: "Пиво звезда",
        idNumber: "32462021-938f-4090",
        quantity: "10",
        price: "100.55",
        unit: "шт",
        category: "Алкогольное",
        productCondition: "norm",
      }
    : {
        name: "",
        idNumber: "",
        quantity: "",
        price: "",
        unit: "",
        category: "",
        productCondition: "norm",
      };
  const [formData, setFormData] = useState(initialData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
  };

  const sum = (formData.quantity * formData.price).toFixed(2);

  const handleCancel = () => {
    setShowDeleteModal(false);
    navigate("/warehouse");
  };

  const handleSave = (e) => {
    e.preventDefault();
    setShowSaveModal(true);
  };

  const confirmSave = () => {
    console.log(formData);
    setShowSaveModal(false);
    navigate("/warehouse");
  };

  const isFormValid = () => {
    const requiredFields = ["name", "idNumber", "quantity", "price"];
    return requiredFields.every((field) => formData[field] !== "");
  };

  return (
    <div className={styles.EditProduct}>
      <div className={styles.narrowContainer}>
        <PageHeading
          heading={isEdit ? "Редактировать товар" : "Создать товар"}
          modalOnLeave={true}
        />
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
            </fieldset>
            <fieldset className={styles.formFlexRow}>
              <label className={`${styles.formInput} ${styles.wideFormInput}`}>
                <p>Ед.измерения</p>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                >
                  <option value="шт">шт</option>
                  <option value="кг">кг</option>
                  <option value="л">л</option>
                  <option value="м">м</option>
                </select>
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
                  value={sum}
                  readOnly
                  placeholder="0.00"
                />
              </label>
            </fieldset>
            <fieldset className={styles.formFlexRow}>
              <label className={`${styles.formInput} ${styles.wideFormInput}`}>
                <p>Категория</p>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="Алкогольное">Алкогольное</option>
                  <option value="Безалкогольное">Безалкогольное</option>
                </select>
              </label>
              <div className={styles.formInput}>
                <p>Состояние</p>
                <div className={styles.radioButtonGroup}>
                  <label className={styles.radioLabel}>
                    <input
                      className={styles.radioButton}
                      type="radio"
                      name="productCondition"
                      value="norm"
                      checked={formData.productCondition === "norm"}
                      onChange={handleInputChange}
                    />
                    <span>Норма</span>
                  </label>
                  <label className={styles.radioLabel}>
                    <input
                      className={styles.radioButton}
                      type="radio"
                      name="productCondition"
                      value="defect"
                      checked={formData.productCondition === "defect"}
                      onChange={handleInputChange}
                      disabled={!isEdit}
                    />
                    <span>Брак</span>
                  </label>
                </div>
              </div>
            </fieldset>
            <div className={`${styles.formFlexRow} ${styles.formButtonRow}`}>
              {isEdit && (
                <CustomButton
                  type="button"
                  variant="secondary"
                  onClick={() => setShowDeleteModal(true)}
                >
                  Удалить
                </CustomButton>
              )}
              <CustomButton
                type="submit"
                width="xwide"
                disabled={!isFormValid()}
              >
                Сохранить
              </CustomButton>
            </div>
          </form>
        </FormContainer>
      </div>

      {showSaveModal && (
        <KolosModal message="Вы точно хотите сохранить?">
          <CustomButton
            width="flex"
            height="low"
            variant="primary"
            onClick={confirmSave}
          >
            Да
          </CustomButton>
          <CustomButton
            width="flex"
            height="low"
            variant="secondary"
            onClick={() => setShowSaveModal(false)}
          >
            Нет
          </CustomButton>
        </KolosModal>
      )}

      {showDeleteModal && (
        <KolosModal message="Вы точно хотите удалить?">
          <CustomButton
            width="flex"
            height="low"
            variant="primary"
            onClick={handleCancel}
          >
            Да
          </CustomButton>
          <CustomButton
            width="flex"
            height="low"
            variant="secondary"
            onClick={() => setShowDeleteModal(false)}
          >
            Нет
          </CustomButton>
        </KolosModal>
      )}
    </div>
  );
}
