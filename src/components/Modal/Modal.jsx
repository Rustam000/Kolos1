import styles from "./Modal.module.css";

/**
 *
 * @description
 * Компонент принимает проп message и две кнопки через children
 * @example
 * {showModal && (
 *   <Modal message="Вы точно хотите отменить все и покинуть страницу?">
 *     <CustomButton
 *       width="flex"
 *       height="low"
 *       variant="primary"
 *       onClick={() => setShowModal(false)}
 *     >
 *       Да
 *     </CustomButton>
 *     <CustomButton
 *       width="flex"
 *       height="low"
 *       variant="secondary"
 *       onClick={() => setShowModal(false)}
 *     >
 *       Нет
 *     </CustomButton>
 *   </Modal>
 * )}
 */
export default function Modal({ children, message }) {
  return (
    <div className={styles.ModalBackdrop}>
      <div className={styles.modalWindow}>
        <h2 className={styles.message}>{message}</h2>
        <div className={styles.buttonGridContainer}>{children}</div>
      </div>
    </div>
  );
}
