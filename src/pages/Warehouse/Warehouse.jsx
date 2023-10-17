import { useNavigate } from "react-router-dom";
import BasicTable from "../../components/MUITable/MUITable";
import { products } from "../../components/MUITable/beer_data";
import Button from "../../components/UI/Button/Button";
import styles from "./Warehouse.module.css";

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

export default function Warehouse() {
  const navigate = useNavigate();
  return (
    <div className={styles.Warehouse}>
      <div className="container">
        {/* <h1 style={{ textAlign: "center" }}>Страница Склад</h1> */}
        <div className={styles.filterbar}>
          <input type="search" placeholder="Поиск..." />
          <select name="" id="">
            <option value="all">Все товары</option>
          </select>
          <select name="" id="">
            <option value="all">Норма</option>
          </select>
          <Button variant="secondary">Архив</Button>
          <Button variant="primary" onClick={() => navigate("/create-product")}>
            Создать
          </Button>
        </div>
        <BasicTable data={products} columns={columns} />
      </div>
    </div>
  );
}
