import styles from "./PageHeading.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CustomModal from "../CustomModal/CustomModal";

export default function PageHeading({
  children,
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
        <div className={styles.headingPrimarySection}>
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
        {children}
      </div>
      {modalOnLeave && showModal && (
        <CustomModal
          message="Вы точно хотите отменить всё и покинуть страницу?"
          primaryAction={() => {
            setShowModal(false);
            navigate(backLink);
          }}
          secondaryAction={() => {
            setShowModal(false);
          }}
        />
      )}
    </>
  );
}
