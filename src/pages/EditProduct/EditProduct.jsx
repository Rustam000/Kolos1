import styles from "./EditProduct.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeading from "../../components/PageHeading/PageHeading";
import FormContainer from "../../components/FormContainer/FormContainer";
import CustomButton from "../../components/UI/CustomButton/CustomButton";
import CustomRadioButton from "../../components/UI/CustomRadioButton/CustomRadioButton";
import CustomModal from "../../components/CustomModal/CustomModal";
import CustomSelect from "../../components/UI/CustomSelect/CustomSelect";
import { useDispatch, useSelector } from "react-redux";
import {
  archiveProductById,
  getProductById,
  postProduct,
  productSliceActions,
  updateProductById,
} from "../../redux/editproductSlice";

export default function EditProduct() {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const formData = useSelector((state) => state.product.data);
  const { setData, clearData } = productSliceActions;
  const { id } = useParams();
  const isEdit = id !== undefined;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit) {
      dispatch(getProductById(id));
    }
  }, [id]);

  const confirmDelete = () => {
    setShowDeleteModal(false);
    dispatch(archiveProductById(id)).then(() => {
      dispatch(clearData());
      navigate("/warehouse");
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSaveModal(true);
  };

  const confirmSave = () => {
    setShowSaveModal(false);
    if (isEdit) {
      dispatch(updateProductById(id)).then(() => {
        dispatch(clearData());
        navigate("/warehouse");
      });
      return;
    }
    dispatch(postProduct()).then(() => {
      dispatch(clearData());
      navigate("/warehouse");
    });
  };

  const isFormValid = () => {
    const requiredFields = ["name", "idNumber", "quantity", "price"];
    return requiredFields.every((field) => formData[field] !== "");
  };

  const sum = (formData.quantity * formData.price).toFixed(2);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setData({ [name]: value }));
  };

  const handleNumericInputChange = (e) => {
    const { value } = e.target;
    if (!isNaN(value) && !value.includes("e")) {
      handleInputChange(e);
    }
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
                  name="identification_number"
                  value={formData.identification_number}
                  onChange={handleInputChange}
                />
              </label>
            </fieldset>
            <fieldset className={styles.formFlexRow}>
              <label
                className={`${styles.formInput} ${styles.wideFormInput} ${styles.unitSelectInput}`}
              >
                <p>Ед.измерения</p>
                <CustomSelect
                  className={styles.unitSelect}
                  name="unit"
                  value={formData.unit}
                  options={[
                    { value: "item", label: "ШТ" },
                    { value: "kilogram", label: "КГ" },
                    { value: "liter", label: "Л" },
                    { value: "m", label: "М" },
                  ]}
                  onChange={(value) => dispatch(setData({ unit: value }))}
                />
              </label>
              <label className={styles.formInput}>
                <p>Количество</p>
                <input
                  type="text"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleNumericInputChange}
                  placeholder="Пример: 1000"
                />
              </label>
              <label className={styles.formInput}>
                <p>Цена</p>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleNumericInputChange}
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
              <label
                className={`${styles.formInput} ${styles.wideFormInput} ${styles.categorySelectInput}`}
              >
                <p>Категория</p>
                <CustomSelect
                  className={styles.categorySelect}
                  name="category"
                  value={formData.category}
                  options={[
                    { value: "alcohol", label: "Алкогольный" },
                    { value: "Безалкогольный", label: "Безалкогольный" },
                  ]}
                  onChange={(value) => dispatch(setData({ category: value }))}
                />
              </label>
              <div className={styles.formInput}>
                <p>Состояние</p>
                <div className={styles.radioButtonGroup}>
                  <label className={styles.radioLabel}>
                    <CustomRadioButton
                      className={styles.radioButton}
                      name="state"
                      value="Normal"
                      checked={formData.state === "Normal"}
                      onChange={handleInputChange}
                    />
                    <span>Норма</span>
                  </label>
                  <label className={styles.radioLabel}>
                    <CustomRadioButton
                      className={styles.radioButton}
                      name="state"
                      value="Invalid"
                      checked={formData.state === "Invalid"}
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
