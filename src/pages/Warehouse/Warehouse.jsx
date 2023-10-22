import { useNavigate } from "react-router-dom";
import CustomTable from "../../components/CustomTable/CustomTable";
import { products } from "../../assets/beer_data";
import CustomButton from "../../components/UI/CustomButton/CustomButton";
import styles from "./Warehouse.module.css";
import searchIcon from "../../assets/icons/search.svg";
import editIcon from "../../assets/icons/mode_edit.svg";
import { Table } from "antd";
import TableButton from "../../components/UI/TableButton/TableButton";

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
    title: "Наименование",
    dataIndex: "name",
    key: "name",
    align: "left",
    width: 350,
  },
  {
    title: "Уникальный код",
    dataIndex: "num_id",
    key: "num_id",
    align: "left",
    width: 325,
  },
  {
    title: "Ед. изменения.",
    dataIndex: "unit",
    key: "unit",
    align: "left",
    width: 150,
  },
  {
    title: "Кол-во",
    dataIndex: "quantity",
    key: "quantity",
    align: "left",
    width: 125,
  },
  {
    title: "Цена",
    dataIndex: "price",
    key: "price",
    align: "left",
    width: 125,
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

export default function Warehouse() {
  const navigate = useNavigate();
  return (
    <div className={styles.Warehouse}>
      <div className="container">
        <div className={styles.filterbar}>
          <div className={styles.inputContainer}>
            <input type="search" placeholder="Поиск..." />
            <img src={searchIcon} alt="icon" className={styles.searchIkon} />
          </div>
          <select name="category" id="">
            <option value="all">Все товары</option>
            <option value="Алкогольное">Алкогольное</option>
            <option value="Безалкогольное">Безалкогольное</option>
            <option value="Category 4">Category 4</option>
          </select>
          <select name="condition" id="">
            <option value="normal">Норма</option>
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
        <Table
          bordered
          dataSource={products}
          rowKey="_id"
          columns={tableColumns}
          pagination={false}
        />
      </div>
    </div>
  );
}
