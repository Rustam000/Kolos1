import styles from "./Archive.module.css";
import PageHeading from "../../components/PageHeading/PageHeading";
import CustomButton from "../../components/UI/CustomButton/CustomButton";
import { products } from "../../components/CustomTable/beer_data"

export default function Archive() {
  const total = products?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  return <div className={styles.Archive}>
    <div className={styles.container}>
      <PageHeading heading="Архив"  buttonText="Назад" />
      <div className={styles.buttonDiv}>
        <div className={styles.twoButtons}>
        <CustomButton variant="primary">Товары</CustomButton>
        <CustomButton variant="secondary">Дистрибьюторы</CustomButton>
        </div>
        <span className={styles.total}>
              {"Итого: "}
              {total}
            </span>

      </div>
    </div>

  </div>;
}
