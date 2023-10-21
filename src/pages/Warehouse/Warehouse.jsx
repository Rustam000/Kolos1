import { useNavigate } from "react-router-dom";
import CustomTable from "../../components/CustomTable/CustomTable";
import { products } from "../../components/CustomTable/beer_data";
import CustomButton from "../../components/UI/CustomButton/CustomButton";
import styles from "./Warehouse.module.css";
import searchIkon from "../../assets/icons/search.svg" 

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
          <div className={styles.inputContainer}>
          <input type="search" placeholder="Поиск..." />
          <img src={searchIkon} alt="icon" className={styles.searchIkon} />
          </div>
          <select name="" id="">
            <option value="all">Все товары</option>
            <option value="Алкогольное">Алкогольное</option>
            <option value="Безалкогольное">Безалкогольное</option>
            <option value="Category 4">Category 4</option>
          </select>
          <select name="" id="">
            <option value="normal">Норма</option>
            <option value="overdue">Просрочка</option>
            <option value="defect">Брак</option>
          </select>
          <CustomButton
            variant="secondary"
            onClick={() => navigate("/archive")}
            >
              Архив
          </CustomButton>
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
