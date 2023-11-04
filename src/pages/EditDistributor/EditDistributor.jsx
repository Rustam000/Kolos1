import styles from "./EditDistributor.module.css";
import { useEffect, useRef, useState } from "react";
import PageHeading from "../../components/PageHeading/PageHeading";
import FormContainer from "../../components/FormContainer/FormContainer";
import CustomButton from "../../components/UI/CustomButton/CustomButton";
import getApp from "../../assets/icons/get_app.svg";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomModal from "../../components/CustomModal/CustomModal";
import { useDispatch } from "react-redux";
import {
  archiveDistributorById,
  createDistributor,
  editDistributorById,
  getDistributorById,
} from "../../redux/editDistributorSlice";

export default function EditDistributor() {
  const [formData, setFormData] = useState({
    photo: null,
    name: "",
    region: "",
    inn: "",
    address: "",
    actual_place_of_residence: "",
    passport_series: "",
    passport_id: "",
    issued_by: "",
    issue_date: "",
    validity: "",
    contact1: "",
    contact2: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const formRef = useRef(null);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { pathname } = useLocation();
  const isEdit = id !== undefined;
  //TODO: if pathname includes 'edit', must have an id
  const passport =
    formData.passport_series.toString() + formData.passport_id.toString();
  useEffect(() => {
    if (isEdit) {
      dispatch(getDistributorById(id)).then((action) => {
        console.log(action);
        setFormData(action.payload);
      });
    }
  }, [id]);

  //временная "валидация"
  function isFormValid() {
    const requiredFields = [
      "name",
      "region",
      "inn",
      "address",
      "actual_place_of_residence",
      "passport",
      "issued_by",
      "issue_date",
      "validity",
      "contact1",
    ];
    return requiredFields.every((field) => formData[field] !== "");
  }

  const formIsValid = isFormValid();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  function handlePassportChange(event) {
    const valueArray = event.target.value.split("");
    const passportSeriesArray = [];
    const passportNumberArray = [];
    valueArray.forEach((char, index) => {
      if (index <= 1) {
        passportSeriesArray.push(char);
        return;
      }
      passportNumberArray.push(char);
    });
    const passport_series = passportSeriesArray.join("");
    const passport_id = passportNumberArray.join("");
    setFormData({ ...formData, passport_series, passport_id });
  }

  const handlePhotoChange = (e) => {
    const photo = e.target.files[0];
    setFormData({ ...formData, photo });
  };

  function handleSubmit(event) {
    event.preventDefault();
    setShowSaveModal(true);
  }

  function handleConfirmSave() {
    if (isEdit) {
      dispatch(editDistributorById({ id, formData })).then((action) => {
        setShowSaveModal(false);
        navigate("/distributors");
      });
      return;
    }
    dispatch(createDistributor(formData)).then((action) => {
      setShowSaveModal(false);
      navigate("/distributors");
    });
  }

  function handleConfirmDelete() {
    dispatch(archiveDistributorById({ id, formData })).then((action) => {
      setShowDeleteModal(false);
      navigate("/distributors");
    });
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
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Пример: Иванов Иван Иванович"
                    required
                  />
                </label>
                <label className={styles.formInput}>
                  <p>Фактическое место жительства</p>
                  <input
                    type="text"
                    name="actual_place_of_residence"
                    value={formData.actual_place_of_residence}
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
                    value={passport}
                    onChange={handlePassportChange}
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
                    name="issued_by"
                    value={formData.issued_by}
                    onChange={handleInputChange}
                    placeholder="МКК"
                    required
                  />
                </label>
                <label className={styles.formInput}>
                  <p>Дата выдачи</p>
                  <input
                    type="text"
                    name="issue_date"
                    value={formData.issue_date}
                    onChange={handleInputChange}
                    placeholder="00.00.0000"
                    required
                  />
                </label>
                <label className={styles.formInput}>
                  <p>Срок действия</p>
                  <input
                    type="text"
                    name="validity"
                    value={formData.validity}
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
                      name="contact1"
                      value={formData.contact1 || ""}
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
                      name="contact2"
                      value={formData.contact2 || ""}
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
          primaryAction={handleConfirmSave}
          secondaryAction={() => {
            setShowSaveModal(false);
          }}
        />
      )}
      {showDeleteModal && (
        <CustomModal
          message="Вы точно хотите удалить?"
          primaryAction={handleConfirmDelete}
          secondaryAction={() => {
            setShowDeleteModal(false);
          }}
        />
      )}
    </>
  );
}
