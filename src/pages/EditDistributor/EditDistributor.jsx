import styles from "./EditDistributor.module.css";
import { useEffect, useRef, useState } from "react";
import PageHeading from "../../components/PageHeading/PageHeading";
import FormContainer from "../../components/FormContainer/FormContainer";
import CustomButton from "../../components/UI/CustomButton/CustomButton";
import getApp from "../../assets/icons/get_app.svg";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomModal from "../../components/CustomModal/CustomModal";
import { useDispatch } from "react-redux";
import { getDistributorById } from "../../redux/editDistributorSlice";

export default function EditDistributor() {
  const [formData, setFormData] = useState({
    photo: null,
    fullName: "",
    region: "",
    inn: "",
    address: "",
    actualAddress: "",
    passport: "",
    issuedBy: "",
    issueDate: "",
    expiryDate: "",
    phoneNumber1: "",
    phoneNumber2: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const formRef = useRef(null);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { pathname } = useLocation();
  const isEdit = id !== undefined;

  useEffect(() => {
    if (isEdit) {
      dispatch(getDistributorById(id)).then((data) => setFormData(data));
    }
  }, [id]);

  //временная "валидация"
  function isFormValid() {
    const requiredFields = [
      "fullName",
      "region",
      "inn",
      "address",
      "actualAddress",
      "passport",
      "issuedBy",
      "issueDate",
      "expiryDate",
      "phoneNumber1",
    ];
    return requiredFields.every((field) => formData[field] !== "");
  }

  const formIsValid = isFormValid();

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
    setShowSaveModal(true);
  }

  return (
    <>
      <div className={styles.EditDistributor}>
        <div className="narrowContainer">
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
                <label className={`${styles.formInput} ${styles.addressInput}`}>
                  <p>ФИО</p>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Пример: Иванов Иван Иванович"
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
                <label className={`${styles.formInput} ${styles.addressInput}`}>
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
                    placeholder="Пример: Чуй"
                    required
                  />
                </label>

                <label className={styles.formInput}>
                  <p>Серия и номер паспорта</p>
                  <input
                    type="text"
                    name="passport"
                    value={formData.passport}
                    onChange={handleInputChange}
                    placeholder="ID"
                    required
                  />
                </label>
              </fieldset>
              <fieldset className={styles.formFlexRow}>
                <label className={`${styles.formInput} ${styles.innInput}`}>
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

                <label className={styles.formInput}>
                  <p>Орган выдачи</p>
                  <input
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
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    placeholder="00.00.0000"
                    required
                  />
                </label>
              </fieldset>
              <fieldset
                className={`${styles.formFlexRow} ${styles.phoneNumberRow}`}
              >
                <label className={`${styles.formInput} ${styles.phoneInput}`}>
                  <p>Контактный номер 1</p>
                  <div className={styles.inputContainer}>
                    <span className={styles.countryCode}>+996</span>
                    <input
                      type="tel"
                      name="phoneNumber1"
                      value={formData.phoneNumber1}
                      onChange={handleInputChange}
                      placeholder=""
                      required
                    />
                  </div>
                </label>
                <label className={`${styles.formInput} ${styles.phoneInput}`}>
                  <p>
                    Контактный номер 2
                    <span className={styles.optional}>
                      {" (необязательно)"}
                    </span>
                  </p>
                  <div className={styles.inputContainer}>
                    <span className={styles.countryCode}>+996</span>
                    <input
                      type="tel"
                      name="phoneNumber2"
                      value={formData.phoneNumber2}
                      onChange={handleInputChange}
                      placeholder=""
                    />
                  </div>
                </label>
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
                <CustomButton width="xwide" disabled={!formIsValid}>
                  Сохранить
                </CustomButton>
              </div>
            </form>
          </FormContainer>
        </div>
      </div>
      {/* ------------------------------------------modals */}
      {showSaveModal && (
        <CustomModal
          message="Вы точно хотите сохранить?"
          primaryAction={() => {
            console.log(formData);
            setShowSaveModal(false);
            navigate("/distributors");
          }}
          secondaryAction={() => {
            setShowSaveModal(false);
          }}
        />
      )}
      {showDeleteModal && (
        <CustomModal
          message="Вы точно хотите удалить?"
          primaryAction={() => {
            setShowDeleteModal(false);
            navigate("/distributors");
          }}
          secondaryAction={() => {
            setShowDeleteModal(false);
          }}
        />
      )}
    </>
  );
}
