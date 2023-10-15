import Button from "../../components/UI/Button/Button";
import styles from "./DistributorProfile.module.css";

export default function DistributorProfile() {
  return (
    <div className={styles.DistributorProfile}>
      <h1 style={{ textAlign: "center" }}>Страница Карточка дистрибьютора</h1>
      <div
        style={{
          height: "500px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <Button>Список история продаж</Button>
        <Button variant="secondary" width="narrow">
          Список история возврата
        </Button>
        <Button disabled={true}>Список история продаж</Button>
        <Button disabled={true} variant="secondary">
          Список история возврата
        </Button>
      </div>
    </div>
  );
}
