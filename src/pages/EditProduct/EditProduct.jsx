import styles from "./EditProduct.module.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../components/PageHeading/PageHeading";
import FormContainer from "../../components/FormContainer/FormContainer";
import CustomButton from "../../components/UI/CustomButton/CustomButton";
import CustomRadioButton from "../../components/UI/CustomRadioButton/CustomRadioButton";
import CustomModal from "../../components/CustomModal/CustomModal";
import CustomSelect from "../../components/UI/CustomSelect/CustomSelect";

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

  const confirmDelete = () => {
    setShowDeleteModal(false);
    navigate("/warehouse");
  };

  const handleSubmit = (e) => {
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
      <div className="narrowContainer">
        <PageHeading
          heading={isEdit ? "Редактировать товар" : "Создать товар"}
          modalOnLeave={true}
        />
        <FormContainer>
          <form className={styles.form} onSubmit={handleSubmit}>
            <fieldset className={styles.formFlexRow}>
              <label className={styles.formInput}>
                <p>Наименование</p>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Пример: Пиво"
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
                <CustomSelect
                  className={styles.unitSelect}
                  name="unit"
                  options={[
                    { value: "piece", label: "ШТ" },
                    { value: "kilogram", label: "КГ" },
                    { value: "liter", label: "Л" },
                    { value: "meter", label: "М" },
                  ]}
                />
              </label>
              <label className={styles.formInput}>
                <p>Количество</p>
                <input
                  type="text"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="Пример: 1000"
                />
              </label>
              <label className={styles.formInput}>
                <p>Цена</p>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="00.00"
                />
              </label>
              <label className={styles.formInput}>
                <p>Сумма</p>
                <input
                  type="text"
                  name="sum"
                  value={sum}
                  readOnly
                  placeholder="00.00"
                />
              </label>
            </fieldset>
            <fieldset className={styles.formFlexRow}>
              <label className={`${styles.formInput} ${styles.wideFormInput}`}>
                <p>Категория</p>

                <CustomSelect
                  className={styles.categorySelect}
                  name="category"
                  options={[
                    { value: "all", label: "Все товары" },
                    { value: "alcohol", label: "Алкогольные" },
                    { value: "nonalcohol", label: "Безалкогольные" },
                    { value: "raw", label: "Сырье" },
                  ]}
                />
              </label>
              <div className={styles.formInput}>
                <p>Состояние</p>
                <div className={styles.radioButtonGroup}>
                  <label className={styles.radioLabel}>
                    <CustomRadioButton
                      className={styles.radioButton}
                      name="productCondition"
                      value="norm"
                      checked={formData.productCondition === "norm"}
                      onChange={handleInputChange}
                    />
                    <span>Норма</span>
                  </label>
                  <label className={styles.radioLabel}>
                    <CustomRadioButton
                      className={styles.radioButton}
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
      {/* ------------------------------------------modals */}
      {showSaveModal && (
        <CustomModal
          message="Вы точно хотите сохранить?"
          primaryAction={confirmSave}
          secondaryAction={() => {
            setShowSaveModal(false);
          }}
        />
      )}
      {showDeleteModal && (
        <CustomModal
          message="Вы точно хотите удалить?"
          primaryAction={confirmDelete}
          secondaryAction={() => {
            setShowDeleteModal(false);
          }}
        />
      )}
    </div>
  );
}
