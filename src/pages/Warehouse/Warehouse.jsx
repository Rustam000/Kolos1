import styles from "./Warehouse.module.css";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/UI/CustomButton/CustomButton";
import searchIcon from "../../assets/icons/search.svg";
import editIcon from "../../assets/icons/mode_edit.svg";
import TableButton from "../../components/UI/TableButton/TableButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchItems } from "../../redux/warehouseSlice";
import ADTable from "../../components/ADTable/ADTable";

export default function Warehouse() {
  const { products } = useSelector((state) => state.warehouse);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItems());
  }, []);

  const tableColumns = [
    {
      title: "№",
      dataIndex: "rowIndex",
      key: "rowIndex",
      align: "center",
      width: 55,
      render: (text, record, index) => index + 1, // автоматическое нумерование
    },
    {
      title: "Наименование",
      dataIndex: "name",
      key: "name",
      align: "left",
    },
    {
      title: "Уникальный код",
      dataIndex: "num_id",
      key: "num_id",
      align: "left",
    },
    {
      title: "Ед. изм.",
      dataIndex: "unit",
      key: "unit",
      align: "left",
      width: "11%",
    },
    {
      title: "Кол-во",
      dataIndex: "quantity",
      key: "quantity",
      align: "left",
      width: "11%",
    },
    {
      title: "Цена",
      dataIndex: "price",
      key: "price",
      align: "left",
      width: "11%",
    },
    {
      title: "Ред.",
      key: "action",
      align: "center",
      width: 78,
      render: (_, record) => (
        <TableButton
          onClick={() =>
            navigate(`/product/edit/${record._id}`, { state: record })
          }
        >
          <img src={editIcon} alt="edit icon" />
        </TableButton>
      ),
    },
  ];

  return (
    <div className={styles.Warehouse}>
      <div className="container">
        <form className={styles.filterbar}>
          <div className={styles.inputContainer}>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Поиск..."
            />
            <img src={searchIcon} alt="icon" className={styles.searchIcon} />
          </div>
          <select
            className={styles.select}
            name="category"
            id="Warehouse_category"
          >
            <option value="all">Все товары</option>
            <option value="Алкогольные">Алкогольные</option>
            <option value="Безалкогольные">Безалкогольные</option>
            <option value="Сырье">Сырье</option>
          </select>
          <select
            className={styles.select}
            name="condition"
            id="Warehouse_condition"
          >
            <option value="normal">Норма</option>
            <option value="defect">Брак</option>
          </select>
          <CustomButton
            type="button"
            variant="secondary"
            onClick={() => navigate("/archive/warehouse")}
          >
            Архив
          </CustomButton>
          <CustomButton
            type="button"
            variant="primary"
            onClick={() => navigate("/product/create")}
          >
            Создать
          </CustomButton>
        </form>
        <ADTable
          dataSource={products}
          rowKey="_id"
          columns={tableColumns}
          height="70vh"
        />
      </div>
    </div>
  );
}
