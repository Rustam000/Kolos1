import styles from "./Order.module.css";
import editIcon from "../../assets/icons/Vector.svg";
import { Table } from "antd";
import TableButton from "../../components/UI/TableButton/TableButton";
import PageHeading from "../../components/PageHeading/PageHeading";
import CustomSearch from "../../components/UI/CustomSearch/CustomSearch";
import { useState } from "react";
import { products } from "../../assets/beer_data";
import ADTable from "../../components/ADTable/ADTable";

export default function Order() {
  const [search, setSearch] = useState("");

  const tableColumns = [
    {
      title: "№",
      dataIndex: "rowIndex",
      key: "rowIndex",
      align: "center",
      width: 55,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Наименование",
      dataIndex: "name",
      key: "name",
      align: "left",
    },
    {
      title: "Уникальный код",
      dataIndex: "identification_number",
      key: "identification_number",
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
      title: "+",
      key: "action",
      align: "center",
      width: 30,
      render: (_, record) => (
        <TableButton
          onClick={() =>
            navigate(`/warehouse/product/edit/${record.id}`, { state: record })
          }
        >
          <img src={editIcon} alt="edit icon" />
        </TableButton>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <PageHeading buttonText="Назад" heading="Оформление заявки">
        <CustomSearch
          className={styles.searchInput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </PageHeading>
      <main className={styles.main}>
        <section
          className={`${styles.section} ${styles.leftSection}`}
        ></section>
        <section className={`${styles.section} ${styles.rightSection}`}>
          <h3 className={styles.sectionHeading}>Товар со склада</h3>
          <ADTable
            dataSource={products}
            rowKey="_id"
            columns={tableColumns}
            height="70vh"
          />
        </section>
      </main>
    </div>
  );
}
