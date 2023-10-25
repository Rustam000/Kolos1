import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Table } from "antd";
import PageHeading from "../../components/PageHeading/PageHeading";
import CustomButton from "../../components/UI/CustomButton/CustomButton";
import { products } from "../../assets/beer_data";
import { distributors } from "../../assets/distributor_data";
import styles from "./Archive.module.css";
import TableButton from "../../components/UI/TableButton/TableButton";
import restoreIcon from "../../assets/icons/restore.svg";

export default function Archive() {
  const location = useLocation();
  const navigate = useNavigate();
  const isWarehouse = location.pathname === "/archive/warehouse";
  const dataToShow = isWarehouse ? products : distributors;
  const navigateTo = (path) => {
    navigate(path);
  };

  const total = products?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const distributorColumns = [
    {
      title: "№",
      dataIndex: "rowIndex",
      key: "rowIndex",
      align: "center",
      width: "5%",
      render: (text, record, index) => index + 1, // автоматическое нумерование
    },
    {
      title: "ФИО",
      dataIndex: "name",
      key: "name",
      width: "15%",
    },
    {
      title: "Регион",
      dataIndex: "region",
      key: "region",
      width: "15%",
    },
    {
      title: "Контактный номер (1)",
      dataIndex: "phoneNumberOne",
      key: "phoneNumberOne",
    },
    {
      title: "Контактный номер (2)",
      dataIndex: "phoneNumberTwo",
      key: "phoneNumberTwo",
    },
    {
      title: "Дата удаления",
      dataIndex: "dataDeletion",
      key: "dataDeletion",
      align: "center",
    },
    {
      title: "Восстановить",
      key: "restore",
      width: "8%",
      align: "center",
      render: (_, record) => (
        <TableButton onClick={() => navigate()}>
          <img src={restoreIcon} alt="restore" />
        </TableButton>
      ),
    },
  ];

  const productColumns = [
    {
      title: "№",
      dataIndex: "rowIndex",
      key: "rowIndex",
      align: "center",
      width: "5%",
      render: (text, record, index) => index + 1, // автоматическое нумерование
    },
    {
      title: "Наименование",
      dataIndex: "name",
      key: "name",
      align: "left",
      width: "15%",
    },
    {
      title: "Уникальный код",
      dataIndex: "num_id",
      key: "num_id",
      align: "left",
      width: "15%",
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
      title: "Сумма",
      dataIndex: "sum",
      key: "sum",
      align: "left",
    },
    {
      title: "Дата удаления",
      dataIndex: "dataDeletionOne",
      key: "dataDeletionOne",
      align: "left",
    },
    {
      title: "Статус возврата",
      dataIndex: "returnStatus",
      key: "returnStatus",
      align: "left",
    },
    {
      title: "Восстановить",
      key: "action",
      align: "center",
      width: "8%",
      render: (_, record) => (
        <TableButton onClick={() => navigate()}>
          <img src={restoreIcon} alt="restore" />
        </TableButton>
      ),
    },
  ];
  const displayColumns = isWarehouse ? productColumns : distributorColumns;
  const displayData = isWarehouse ? products : distributors;

  return (
    <div className={styles.Archive}>
      <div className={styles.container}>
        <PageHeading heading="Архив" buttonText="Назад" backLink="/warehouse" />
        <div className={styles.buttonDiv}>
          <div className={styles.twoButtons}>
            <CustomButton
              variant={isWarehouse ? "primary" : "secondary"}
              onClick={() => navigateTo("/archive/warehouse")}
            >
              Товары
            </CustomButton>
            <CustomButton
              variant={!isWarehouse ? "primary" : "secondary"}
              onClick={() => navigateTo("/archive/distributors")}
            >
              Дистрибьюторы
            </CustomButton>
          </div>

          {isWarehouse && (
            <span className={styles.total}>
              {"Итого: "}
              {total}
            </span>
          )}
        </div>

        <Table
          bordered
          dataSource={displayData}
          columns={displayColumns}
          pagination={false}
          rowKey="_id"
          scroll={{ y: "45vh", scrollToFirstRowOnChange: true }}
        />
      </div>
    </div>
  );
}
