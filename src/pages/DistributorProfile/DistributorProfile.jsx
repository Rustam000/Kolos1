import CustomTable from "../../components/CustomTable/CustomTable";
import { products } from "../../components/CustomTable/beer_data";
import Button from "../../components/UI/Button/Button";
import styles from "./DistributorProfile.module.css";
import angleBracketLeftIcon from "../../assets/icons/fi-sr-angle-small-left.svg";
import editIcon from "../../assets/icons/edit.svg";

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
    0,
  );
  return (
    <div className={styles.DistributorProfile}>
      <div className="container">
        <p className={styles.undo}>
          <img src={angleBracketLeftIcon} alt="icon" />
          Отменить
        </p>
        <h1 className={styles.heading}>Карточка дистрибьютора</h1>
        <main className={styles.mainSection}>
          <div className={styles.infoBlock}>
            <img
              className={styles.photo}
              src="/temporary_distributor_image.png"
              alt="фото дистрибьютора"
              width={196}
            />
            <div className={styles.infoRows}>
              <p className="infoRow">
                <span className={styles.infoRowLabel}>ФИО:</span>Баланчаев
                Баланча баланчаевич
              </p>
              <p className="infoRow">
                <span className={styles.infoRowLabel}>Регион:</span>Чуй
              </p>
              <p className="infoRow">
                <span className={styles.infoRowLabel}>ИНН:</span>22708198700000
              </p>
              <p className="infoRow">
                <span className={styles.infoRowLabel}>Контактный номер:</span>
                +996 550 366 000
              </p>
              <p className="infoRow">
                <span className={styles.infoRowLabel}>Контактный номер:</span>
                +996 550 366 001
              </p>
              <div className={styles.actions}>
                <Button variant="secondary">Возврат</Button>
                <Button variant="secondary">Продать</Button>
                <Button variant="primary" width="narrow">
                  <img src={editIcon} alt="edit icon" />
                </Button>
              </div>
            </div>
          </div>
          <form className={styles.filterbar}>
            <input type="search" placeholder="Поиск..." />
            <select name="" id="">
              <option value="all">Все товары</option>
            </select>
            <label className={styles.filterbarDate}>
              <span>Дата</span>
              <input type="date" />
            </label>
          </form>
          <CustomTable data={products} columns={tableColumns} />
          <div className={styles.nav}>
            <Button variant="primary">Список история продаж</Button>
            <Button variant="secondary">Список история возврата</Button>
            <span className={styles.total}>
              {"Итого: "}
              {total}
            </span>
          </div>
        </main>
      </div>
    </div>
  );
}
