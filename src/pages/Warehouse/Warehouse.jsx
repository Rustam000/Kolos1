import { useNavigate } from "react-router-dom";
import CustomTable from "../../components/CustomTable/CustomTable";
import { products } from "../../components/CustomTable/beer_data";
import CustomButton from "../../components/UI/CustomButton/CustomButton";
import styles from "./Warehouse.module.css";

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
          <CustomButton variant="secondary">Архив</CustomButton>
          <CustomButton
            variant="primary"
            onClick={() => navigate("/create-product")}
          >
            Создать
          </CustomButton>
        </div>
        <CustomTable data={products} columns={tableColumns} />
      </div>
    </div>
  );
}
