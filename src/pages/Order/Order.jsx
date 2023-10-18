import styles from "./Order.module.css";
import { products } from "../../components/CustomTable/beer_data";
import CustomTable from "../../components/CustomTable/CustomTable";

const columns = [
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

export default function Order() {
  return (
    <div className={styles.Order}>
      <input
        className={styles.search}
        type="search"
        placeholder="Поиск..."
      ></input>
      <div className={styles.box}>
        <div className={styles.dis}>
          <div className={styles.destre}>
            <div className={styles.bgimg}></div>
            <div className={styles.info}>
              <p style={{ marginTop: "10px" }}>
                <span className={styles.infoRow}>ФИО:</span>Баланчаев Баланча
                баланчаевич
              </p>
              <p style={{ marginTop: "10px" }}>
                <span className={styles.infoRow}>Регион:</span>Чуй
              </p>
              <p style={{ marginTop: "10px" }}>
                <span className={styles.infoRow}>ИНН:</span>22708198700000
              </p>
              <p style={{ marginTop: "10px" }}>
                <span className={styles.infoRow}>Контактный номер:</span>
                +996 550 366 000
              </p>
              <p style={{ marginTop: "10px" }}>
                <span className={styles.infoRow}>Контактный номер:</span>
                +996 550 366 001
              </p>
              <p style={{ marginTop: "40px" }}>
                <span className={styles.infoRow}>Номер накладного:</span>
                123a5f789545785
              </p>
            </div>
          </div>
        </div>
        <div className={styles.prod}>
          <h2>Товар со склада </h2>
          <CustomTable data={products} columns={columns} />
          <p className={styles.result}>
            Итог: <h2 style={{ margin: "-7px 10px" }}>9999</h2>
          </p>
        </div>
      </div>
      <div className={styles.btn}>
        <div>
          <button className={styles.back}>
            <h2>Назад</h2>
          </button>
          <button className={styles.print}>
            <h2>Распечатать</h2>
          </button>
        </div>
        <button className={styles.save}>
          <h2>Сохранить</h2>
        </button>
      </div>
    </div>
  );
}
