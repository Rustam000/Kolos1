import styles from "./Order.module.css";
import { useNavigate } from "react-router-dom";
import editIcon from "../../assets/icons/Vector.svg";
import { Table } from "antd";
import TableButton from "../../components/UI/TableButton/TableButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchItems } from "../../redux/warehouseSlice";
import searchIcon from "../../assets/icons/search.svg";

export default function Order() {
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
    },
    {
      title: "Кол-во",
      dataIndex: "quantity",
      key: "quantity",
      align: "left",
    },
    {
      title: "Цена",
      dataIndex: "price",
      key: "price",
      align: "left",
    },
    {
      title: "Дублировать",
      key: "action",
      align: "center",
      render: (_, record) => (
        <TableButton
          onClick={() =>
            navigate(`/edit-product/${record._id}`, { state: record })
          }
        >
          <img src={editIcon} alt="edit icon" />
        </TableButton>
      ),
    },
  ];
  return (
    <div className={styles.Order}>
      <input className={styles.search} type="search" placeholder="Поиск..." />
      <div className={styles.box}>
        <div className={styles.dis}>
          <div className={styles.destre}>
            <div className={styles.bgimg}></div>
            <div className={styles.info}>
              <p>
                <span className={styles.infoRow}>ФИО:</span>Баланчаев Баланча
                баланчаевич
              </p>
              <p>
                <span className={styles.infoRow}>Регион:</span>Чуй
              </p>
              <p>
                <span className={styles.infoRow}>ИНН:</span>22708198700000
              </p>
              <p>
                <span className={styles.infoRow}>Контактный номер:</span>
                +996 550 366 000
              </p>
              <p>
                <span className={styles.infoRow}>Контактный номер:</span>
                +996 550 366 001
              </p>
              <p style={{ marginTop: "40px" }}>
                <span className={styles.infoRow}>Номер накладного:</span>
                123a5f789545785
              </p>
            </div>
          </div>
        </div>
        <div className={styles.prod}>
          <h2 className={styles.product}>Товар со склада </h2>
          <div className={styles.table}>
            <Table
              bordered
              dataSource={products}
              rowKey="_id"
              columns={tableColumns}
              pagination={false}
              scroll={{ y: "40vh", scrollToFirstRowOnChange: true }}
            />
          </div>
          <div className={styles.result}>
            <span>
              Итог: <h2>9999</h2>
            </span>
          </div>
        </div>
      </div>
      <div className={styles.btn}>
        <div>
          <button className={styles.back}>
            <h2>Назад</h2>
          </button>
          <button className={styles.print}>
            <h2>Распечатать</h2>
          </button>
        </div>
        <button className={styles.save}>
          <h2>Сохранить</h2>
        </button>
      </div>
    </div>
  );
}
