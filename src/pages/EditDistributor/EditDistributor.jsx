import { useState } from "react";
import styles from "./EditDistributor.module.css";
import PageHeading from "../../components/PageHeading/PageHeading";
import FormContainer from "../../components/FormContainer/FormContainer";

export default function EditDistributor() {
  const [formData, setFormData] = useState({
    photo: null,
    fullName: "",
    region: "",
    inn: "",
    address: "",
    actualAddress: "",
    passportSeries: "",
    passportNumber: "",
    issuedBy: "",
    issueDate: "", //date?
    expiryDate: "", //date?
    phoneNumber1: "",
    phoneNumber2: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const photo = e.target.files[0];
    setFormData({ ...formData, photo });
  };

  const handleSave = () => {
    // Здесь отправьте данные formData на сервер через API
  };

  return (
    <div className={styles.EditDistributor}>
      <div className={styles.narrowContainer}>
        <PageHeading heading="Создать дистрибьютора" />
        <FormContainer>
          <form className={styles.form}>
            <label className={styles.fileInput}>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
              />
            </label>
            <fieldset className={styles.formFlexRow}>
              <label className={styles.formInput}>
                <p>ФИО</p>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Иванов Иван Иванович"
                  required
                />
              </label>
              <label className={styles.formInput}>
                <p>Фактическое место жительства</p>
                <input
                  type="text"
                  name="actualAddress"
                  value={formData.actualAddress}
                  onChange={handleInputChange}
                  placeholder="Пример: обл. Чуй, рай. Сокулук, с. Село, "
                  required
                />
              </label>
            </fieldset>
            <fieldset className={styles.formFlexRow}>
              <label className={styles.formInput}>
                <p>Адрес по прописке</p>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Пример: обл. Чуй, рай. Сокулук, с. Село, "
                  required
                />
              </label>
              <label className={styles.formInput}>
                <p>Регион</p>
                <input
                  type="text"
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  placeholder="Например: Чуй"
                  required
                />
              </label>
              <label className={styles.formInput}>
                <p>ИНН</p>
                <input
                  type="text"
                  name="inn"
                  value={formData.inn}
                  onChange={handleInputChange}
                  placeholder="0000000000"
                  required
                />
              </label>
            </fieldset>
            <fieldset className={styles.formFlexRow}>
              <label className={styles.formInput}>
                <p>Номер паспорта</p>
                <input
                  type="text"
                  name="passportNumber"
                  value={formData.passportNumber}
                  onChange={handleInputChange}
                  placeholder="000000"
                  required
                />
              </label>
              <label className={styles.formInput}>
                <p>Серия паспорта</p>
                <input
                  type="text"
                  name="passportSeries"
                  value={formData.passportSeries}
                  onChange={handleInputChange}
                  placeholder="000000"
                  required
                />
              </label>
              <label className={styles.formInput}>
                <p>Орган выдачи</p>
                <input
                  type="text"
                  name="issuedBy"
                  value={formData.issuedBy}
                  onChange={handleInputChange}
                  placeholder="000000"
                  required
                />
              </label>
              <label className={styles.formInput}>
                <p>Дата выдачи</p>
                <input
                  type="text"
                  name="issueDate"
                  value={formData.issueDate}
                  onChange={handleInputChange}
                  placeholder="000000"
                  required
                />
              </label>
              <label className={styles.formInput}>
                <p>Срок действия</p>
                <input
                  type="text"
                  name="validity"
                  value={formData.expireDate}
                  onChange={handleInputChange}
                  placeholder="0000000"
                  required
                />
              </label>
            </fieldset>
            <fieldset className={styles.formFlexRow}>
              <label className={styles.formInput}>
                <p>Контактный номер №1</p>
                <input
                  type="text"
                  name="contactNumber1"
                  value={formData.contactNumber1}
                  onChange={handleInputChange}
                  placeholder="+996 "
                  required
                />
              </label>
              <label className={styles.formInput}>
                <p>Контактный номер №2</p>
                <input
                  type="text"
                  name="contactNumber2"
                  value={formData.contactNumber2}
                  onChange={handleInputChange}
                  placeholder="+996"
                  required
                />
              </label>
            </fieldset>
            <div className={styles.formButtonRow}>
              <button className={styles.remove} type="button">
                Удалить
              </button>
              <button className={styles.saveButton} onClick={handleSave}>
                Сохранить
              </button>
            </div>
          </form>
        </FormContainer>
      </div>
    </div>
  );
}
