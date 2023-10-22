import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/UI/CustomButton/CustomButton";
import styles from "./Distributors.module.css";
import { distributors } from "../../assets/distributor_data";
import { Table } from "antd";
import TableButton from "../../components/UI/TableButton/TableButton";
import editIcon from "../../assets/icons/mode_edit.svg";

const tableColumns = [
  {
    title: "№",
    dataIndex: "rowIndex",
    key: "rowIndex",
    align: "center",
    width: 50,
    render: (text, record, index) => index + 1, // автоматическое нумерование
  },
  {
    title: "ФИО",
    dataIndex: "name",
    key: "name",
    align: "left",
    width: 350,
  },
  {
    title: "Регион",
    dataIndex: "region",
    key: "region",
    align: "left",
    width: 325,
  },
  {
    title: "Ред.",
    key: "action",
    align: "center",
    width: 78,
    render: (_, record) => (
      <TableButton onClick={() => console.log(record._id)}>
        <img src={editIcon} alt="edit icon" />
      </TableButton>
    ),
  },
];

export default function Distributors() {
  const navigate = useNavigate();
  return (
    <div className={styles.Distributors}>
      <div className="container">
        {/* <h1 style={{ textAlign: "center" }}>Страница Перечень дистрибьюторов</h1> */}
        <div className={styles.filterbar}>
          <CustomButton
            height="low"
            variant="primary"
            onClick={() => navigate("/create-distributor")}
          >
            Создать
          </CustomButton>
        </div>

        <Table
          bordered
          dataSource={distributors}
          rowKey="_id"
          columns={tableColumns}
          pagination={false}
        />
      </div>
    </div>
  );
}
