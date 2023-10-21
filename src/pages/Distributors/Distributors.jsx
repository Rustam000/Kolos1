import CustomTable from "../../components/CustomTable/CustomTable";
import CustomButton from "../../components/UI/CustomButton/CustomButton";
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
          <CustomButton
            variant="primary"
            onClick={() => navigate("/create-distributor")}
          >
            Создать
          </CustomButton>
        </div>

        <CustomTable data={distributors} columns={tableColumns} />
      </div>
    </div>
  );
}
