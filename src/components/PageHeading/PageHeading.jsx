import styles from "./PageHeading.module.css";
import { useNavigate } from "react-router-dom";
import KolosModal from "../KolosModal/KolosModal";
import CustomButton from "../UI/CustomButton/CustomButton";
import { useState } from "react";

export default function PageHeading({
  heading,
  buttonText = "Отменить",
  modalOnLeave = false,
  backLink = -1,
}) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.PageHeading}>
        <button
          className={styles.goBack}
          onClick={
            modalOnLeave
              ? () => {
                  setShowModal(true);
                }
              : () => navigate(backLink)
          }
        >
          <span className={styles.angleBracket}></span>
          {buttonText}
        </button>
        <h2 className={styles.heading}>{heading}</h2>
      </div>
      {modalOnLeave && showModal && (
        <KolosModal message="Вы точно хотите отменить всё и покинуть страницу?">
          <CustomButton
            height="low"
            variant="primary"
            onClick={() => {
              setShowModal(false);
              navigate(backLink);
            }}
          >
            Да
          </CustomButton>
          <CustomButton
            height="low"
            variant="secondary"
            onClick={() => {
              setShowModal(false);
            }}
          >
            Нет
          </CustomButton>
        </KolosModal>
      )}
    </>
  );
}
