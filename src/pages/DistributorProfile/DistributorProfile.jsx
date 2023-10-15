import BasicTable from "../../components/MUITable/MUITable";
import { products } from "../../components/MUITable/beer_data";
import Button from "../../components/UI/Button/Button";
import styles from "./DistributorProfile.module.css";

const tableColumns = [
  {
    dataKey: "rowIndex",
    label: "№",
    align: "left",
  },
  {
    dataKey: "name",
    label: "Наименование",
    align: "left",
  },
  {
    dataKey: "num_id",
    label: "Уникальный код",
    align: "left",
  },
  {
    dataKey: "unit",
    label: "Ед. изм.",
    align: "left",
  },
  {
    dataKey: "quantity",
    label: "Кол-во",
    align: "left",
  },
  {
    dataKey: "price",
    label: "Цена",
    align: "left",
  },
  {
    dataKey: "action",
    label: "Ред.",
    align: "left",
    onClick: (dataKey) => console.log(dataKey),
    icon: "icon",
  },
];

export default function DistributorProfile() {
  const total = products?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  return (
    <div className={styles.DistributorProfile}>
      <div className="container">
        <p>{"< Отменить"}</p>
        <h1 className={styles.heading}>Карточка дистрибьютора</h1>
        <main>
          <div className={styles.infoBlock}>
            <img className={styles.photo} src="" alt="" />
            <div className={styles.info}>
              <p className={styles.name}>name</p>
              <p className={styles.region}>region</p>
              <p className={styles.inn}>inn</p>
              <p className={styles.phone}>phone</p>
              <p className={styles.phone}>phone</p>
              <div className={styles.controls}>
                <Button variant="secondary">Возврат</Button>
                <Button variant="secondary">Продать</Button>
                <Button variant="primary" width="narrow">
                  edit
                </Button>
              </div>
            </div>
          </div>
          <form className={styles.filterBar}>
            <input type="text" />
            <label>
              <span>Дата</span>
              <input type="date" />
            </label>
          </form>
          <BasicTable data={products} columns={tableColumns} />
          <div className={styles.nav}>
            <Button variant="primary">Список история продаж</Button>
            <Button variant="secondary">Список история возврата</Button>
            <span className={styles.total}>Итого:{total}</span>
          </div>
        </main>
      </div>
    </div>
  );
}
