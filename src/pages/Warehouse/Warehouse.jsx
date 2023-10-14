import BasicTable from "../../components/MUITable/MUITable";
import { products } from "../../components/MUITable/beer_data";
import styles from "./Warehouse.module.css";

const columns = [
  {
    id: "index",
    label: "№",
    align: "left",
  },
  {
    id: "name",
    label: "Наименование",
    align: "left",
  },
  {
    id: "num_id",
    label: "Уникальный код",
    align: "left",
  },
  {
    id: "unit",
    label: "Ед. изм.",
    align: "left",
  },
  {
    id: "quantity",
    label: "Кол-во",
    align: "left",
  },
  {
    id: "price",
    label: "Цена",
    align: "left",
  },
  {
    id: "action",
    label: "Ред.",
    align: "left",
    onClick: (id) => console.log(id),
    icon: "icon",
  },
];

export default function Warehouse() {
  return (
    <div className={styles.Warehouse}>
      <div className="container">
        <h1>страница Cклад</h1>
        <BasicTable data={products} columns={columns} />
      </div>
    </div>
  );
}
