import { useRef, useState } from "react";
import styles from "./EditDistributor.module.css";
import PageHeading from "../../components/PageHeading/PageHeading";
import FormContainer from "../../components/FormContainer/FormContainer";
import CustomButton from "../../components/UI/CustomButton/CustomButton";
import getApp from "../../assets/icons/get_app.svg";
import { useLocation, useNavigate } from "react-router-dom";
import KolosModal from "../../components/KolosModal/KolosModal";

export default function EditDistributor() {
  const formRef = useRef(null);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isEdit = !!pathname.match("/edit");
  const [formData, setFormData] = useState({
    photo: null,
    fullName: "Баланчаев Баланча Баланчаевич",
    region: "Чуй",
    inn: "22703199519876",
    address: "10 мкр, дом 6, кв №5",
    actualAddress: "мкр Тунгуч, дом 17, кв №44",
    passportSeriesAndNumber: "ID4395993",
    issuedBy: "МКК 211021",
    issueDate: "21.10.2023", //date?
    expiryDate: "21.10.2033", //date?
    phoneNumber1: "550456784",
    phoneNumber2: "770456784",
  });

  //временная "валидация"
  const formIsValid =
    formRef.current &&
    Array.from(formRef.current)
      .map((field) => field.validity.valid)
      .reduce((acc, item) => !!(acc * item), true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const photo = e.target.files[0];
    setFormData({ ...formData, photo });
  };

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);
  }


  return (
    <>
      <div className={styles.EditDistributor}>
        <div className={styles.narrowContainer}>
          <PageHeading
            heading={
              isEdit ? "Редактировать дистрибьютора" : "Создать дистрибьютора"
            }
            modalOnLeave={true}
          />
          <FormContainer>
            <form className={styles.form} ref={formRef} onSubmit={handleSubmit}>
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
                    className={styles.classInput}
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
                    className={styles.classInput}
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
                    className={`${styles.classInput} ${styles.sizeForAdressInput}`}
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
                    className={styles.classInput}
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
                    className={styles.classInput}
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
                    className={`${styles.classInput} ${styles.sizeForInn}`}
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
                    className={styles.classInput}
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
                    className={styles.classInput}
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
                    className={styles.classInput}
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
                    className={`${styles.classInput} ${styles.SizePhoneInput}`}
                    type="tel"
                    name="phoneNumber1"
                    value={formData.phoneNumber1}
                    onChange={handleInputChange}
                    placeholder=""
                    required
                  />
                  </div>
                </label>
                <label className={styles.formInput}>
                <p>Контактный номер №2</p>
                <div className={styles.inputContainer}>
                  <div className={styles.exampleNum}>+996</div>
                  <input
                    className={`${styles.classInput} ${styles.SizePhoneInput}`}
                    type="tel"
                    value={formData.phoneNumber2}
                    name="phoneNumber2"
                    onChange={handleInputChange}
                    placeholder=""
                  />
                </div>
              </label>
              </fieldset>
              <div className={styles.formButtonRow}>
                <CustomButton
                  type="button"
                  variant="secondary"
                  onClick={() => setShowDeleteModal(true)}
                  disabled={!isEdit}
                >
                  Удалить
                </CustomButton>
                <CustomButton
                  width="xwide"
                  onClick={() => setShowSaveModal(true)}
                  disabled={!formIsValid}
                >
                  Сохранить
                </CustomButton>
              </div>
            </form>
          </FormContainer>
        </div>
      </div>
      {/* ------------------------------------------modals */}
      {showSaveModal && (
        <KolosModal message={"Вы точно хотите сохранить?"}>
          <CustomButton
            height="low"
            variant="primary"
            onClick={() => {
              setShowSaveModal(false);
              navigate("/distributors");
            }}
          >
            Да
          </CustomButton>
          <CustomButton
            height="low"
            variant="secondary"
            onClick={() => {
              setShowSaveModal(false);
            }}
          >
            Нет
          </CustomButton>
        </KolosModal>
      )}
      {showDeleteModal && (
        <KolosModal message={"Вы точно хотите удалить?"}>
          <CustomButton
            height="low"
            variant="primary"
            onClick={() => {
              setShowDeleteModal(false);
              navigate("/distributors");
            }}
          >
            Да
          </CustomButton>
          <CustomButton
            height="low"
            variant="secondary"
            onClick={() => {
              setShowDeleteModal(false);
            }}
          >
            Нет
          </CustomButton>
        </KolosModal>
      )}
    </>
  );
}
