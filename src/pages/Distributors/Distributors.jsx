import { useNavigate } from "react-router-dom";
import BasicTable from "../../components/MUITable/MUITable";
import { products } from "../../components/MUITable/beer_data";
import Button from "../../components/UI/Button/Button";
import styles from "./Distributors.module.css";
import { distributors } from "./distributor_data";

const tableColumns = [
  {
    dataKey: "rowIndex",
    label: "№",
    align: "left",
  },
  {
    dataKey: "name",
    label: "ФИО",
    align: "left",
  },
  {
    dataKey: "region",
    label: "Регион",
    align: "left",
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
        <BasicTable data={distributors} columns={tableColumns} />
      </div>
    </div>
  );
}
