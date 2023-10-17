import { useNavigate } from "react-router-dom";
import BasicTable from "../../components/MUITable/MUITable";
import { products } from "../../components/MUITable/beer_data";
import Button from "../../components/UI/Button/Button";
import styles from "./Distributors.module.css";

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

export default function Distributors() {
  return (
    <div className={styles.Distributors}>
      <div className="container">
        {/* <h1 style={{ textAlign: "center" }}>Страница Перечень дистрибьюторов</h1> */}
        <div className={styles.filterbar}>
          <input type="search" placeholder="Поиск..." />

          <Button
            variant="primary"
            onClick={() => navigate("/create-distributor")}
          >
            Создать
          </Button>
        </div>
        <BasicTable data={products} columns={tableColumns} />
      </div>
    </div>
  );
}
