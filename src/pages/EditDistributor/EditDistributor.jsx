import { useState } from "react";
import styles from "./EditDistributor.module.css";
import PageHeading from "../../components/PageHeading/PageHeading";
import FormContainer from "../../components/FormContainer/FormContainer";
import CustomButton from "../../components/UI/CustomButton/CustomButton";
import getApp from "../../assets/icons/get_app.svg";
import KolosModal from "../../components/KolosModal/KolosModal";

export default function EditDistributor() {
  const [formData, setFormData] = useState({
    photo: null,
    fullName: "",
    region: "",
    inn: "",
    address: "",
    actualAddress: "",
    passportSeriesAndNumber: "",
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);
  }


  return (
    <div className={styles.EditDistributor}>
      <div className={styles.narrowContainer}>
        <PageHeading heading="Создать дистрибьютора" />
        <FormContainer>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.fileInput}>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
              />
              <div className={styles.getPhoto}>
                <img src={getApp} alt="icon" />
                <span>Добавить</span>
                <span>фотографию</span>
              </div>
            </label>
            <fieldset className={styles.formFlexRow}>
              <label className={styles.formInput}>
                <p>ФИО</p>
                <input
                  className={styles.forSizeRed}
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
                  className={styles.forSizeRed}
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
                  className={styles.forSizeRed}
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
                  className={styles.forSizeOrange}
                  type="text"
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  placeholder="Например: Чуй"
                  required
                />
              </label>

              <label className={styles.formInput}>
                <p>Серия и номер паспорта</p>
                <input
                  className={styles.forSizeOrange}
                  type="text"
                  name="passportSeriesAndNumber"
                  value={formData.passportSeriesAndNumber}
                  onChange={handleInputChange}
                  placeholder="ID"
                  required
                />
              </label>
            </fieldset>
            <fieldset className={styles.formFlexRow}>
              <label className={styles.formInput}>
                <p>ИНН</p>
                <input
                  className={styles.forSizeBlue}
                  type="text"
                  name="inn"
                  value={formData.inn}
                  onChange={handleInputChange}
                  placeholder="0000000000"
                  required
                />
              </label>

              <label className={styles.formInput}>
                <p>Орган выдачи</p>
                <input
                  className={styles.forSizePink}
                  type="text"
                  name="issuedBy"
                  value={formData.issuedBy}
                  onChange={handleInputChange}
                  placeholder="МКК"
                  required
                />
              </label>
              <label className={styles.formInput}>
                <p>Дата выдачи</p>
                <input
                  className={styles.forSizePink}
                  type="text"
                  name="issueDate"
                  value={formData.issueDate}
                  onChange={handleInputChange}
                  placeholder="00.00.0000"
                  required
                />
              </label>
              <label className={styles.formInput}>
                <p>Срок действия</p>
                <input
                  className={styles.forSizePink}
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  placeholder="00.00.0000"
                  required
                />
              </label>
            </fieldset>
            <fieldset className={styles.formFlexRow}>
              <label className={styles.formInput}>
                <p>Контактный номер №1</p>
                <div className={styles.inputContainer}>
                <div className={styles.exampleNum}>+996</div>
                <input
                  className={styles.forSizeBlue}
                  type="tel"
                  name="phoneNumber1"
                  value={formData.phoneNumber1}
                  onChange={handleInputChange}
                  required
                />
                </div>
              </label>
              <label className={styles.formInput}>
                <p>Контактный номер №2</p>
                <div className={styles.inputContainer}>
                  <div className={styles.exampleNum}>+996</div>
                  <input
                    className={styles.forSizeBlue}
                    type="tel"
                    value={formData.phoneNumber2}
                    name="phoneNumber2"
                    onChange={handleInputChange}
                    />
                </div>
              </label>
            </fieldset>
            <div className={styles.formButtonRow}>
              <CustomButton type="button" variant="secondary">
                Удалить
              </CustomButton>
              <CustomButton width="xwide" onClick={handleSave}>
                Сохранить
              </CustomButton>
            </div>
          </form>
        </FormContainer>
      </div>
    </div>
  );
}
