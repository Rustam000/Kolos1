import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./Order.module.css";
import PageHeading from "../../components/PageHeading/PageHeading";
import CustomSearch from "../../components/UI/CustomSearch/CustomSearch";
import ADTable from "../../components/ADTable/ADTable";
import DistributorInfo from "../../components/DistributorInfo/DistributorInfo";
import CustomButton from "../../components/UI/CustomButton/CustomButton";
import TotalIndicator from "../../components/UI/TotalIndicator/TotalIndicator";
import OrderSection from "../../components/OrderSection/OrderSection";
import OrderButton from "../../components/UI/OrderButton/OrderButton";
import QuantityControl from "../../components/UI/QuantityControl/QuantityControl";
import { axiosPrivate } from "../../api/axiosPrivate";
import { axiosDummy } from "../../api/axiosDummy";

export default function Order() {
  const { id } = useParams();
  const [distributor, setDistributor] = useState({});
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [formData, setFormData] = useState({ nackladnoy_number: "" });

  useEffect(() => {
    async function fetchCredentials() {
      const response = await axiosPrivate.get(`/distributors/${id}`);
      setDistributor(response.data);
    }
    fetchCredentials();
  }, [id]);

  useEffect(() => {
    async function fetchItems() {
      const response = await axiosDummy.get(`/warehouse/`);
      setItems(response.data.results);
    }
    fetchItems();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const addToOrder = (item) => {
    setOrderItems((prevItems) => {
      const existingItem = prevItems.find(
        (i) => i.identification_number === item.identification_number,
      );
      if (existingItem) {
        return prevItems.map((i) =>
          i.identification_number === item.identification_number
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromOrder = (identification_number) => {
    setOrderItems((prevItems) =>
      prevItems.filter(
        (i) => i.identification_number !== identification_number,
      ),
    );
  };

  const [orderTableColumns] = useState([
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
      //width: "15%",
    },
    {
      title: "Уникальный код",
      dataIndex: "identification_number",
      key: "identification_number",
      align: "left",
      //width: 150,
    },
    {
      title: "Ед. измер.",
      dataIndex: "unit",
      key: "unit",
      align: "left",
      //width: "11%",
    },
    {
      title: "Кол-во",
      dataIndex: "quantity",
      key: "quantity",
      align: "left",
      //width: "8%",
    },
    {
      title: "Цена",
      dataIndex: "price",
      key: "price",
      align: "left",
      //width: "8%",
    },
    {
      title: "Сумма",
      dataIndex: "sum",
      key: "sum",
      align: "left",
      render: (text, record) => record.quantity * record.price,
    },
    {
      title: "Дата",
      dataIndex: "date",
      key: "date",
      align: "left",
    },
    {
      title: "Отм.",
      dataIndex: "cancel",
      key: "cancel",
      align: "center",
      width: 50,
      render: (_, record) => (
        <OrderButton variant="remove" onClick={() => cancelOrder(record)} />
      ),
    },
  ]);

  const [warehouseTableColumns] = useState([
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
      width: 150,
    },
    {
      title: "Ед. измер.",
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
      title: "Отп.",
      key: "action",
      align: "center",
      width: 50,
      render: (_, record) => (
        <OrderButton variant="add" onClick={() => addToOrder(record)} />
      ),
    },
  ]);

  // console.log ({items})
  // console.log ({orderItems})

  return (
    <div className={styles.container}>
      <PageHeading buttonText="Назад" heading="Оформление заявки">
        <CustomSearch />
      </PageHeading>
      <main className={styles.main}>
        <OrderSection>
          <div className={styles.infoWrapper}>
            <DistributorInfo info={distributor} variant="small" />
            <label className={styles.formInput}>
              <input
                type="text"
                name="nackladnoy_number"
                value={formData.nackladnoy_number}
                onChange={handleInputChange}
                placeholder="Номер накладного"
              />
            </label>
          </div>
          <ADTable
            size="small"
            dataSource={orderItems}
            rowKey="identification_number"
            columns={orderTableColumns}
            height="50vh"
          />
          <div className={styles.controls}>
            <TotalIndicator
              className={styles.total}
              value={orderItems.reduce(
                (acc, item) => acc + item.quantity * item.price,
                0,
              )}
            />
            <CustomButton
              className={styles.orderButton}
              width="narrow"
              variant="secondary"
            >
              Распечатать
            </CustomButton>
            <CustomButton
              className={styles.orderButton}
              width="narrow"
              variant="primary"
            >
              Сохранить
            </CustomButton>
          </div>
        </OrderSection>
        <OrderSection>
          <h3 className={styles.sectionHeading}>Товар со склада</h3>
          <ADTable
            size="small"
            dataSource={items}
            rowKey="id"
            columns={warehouseTableColumns}
            height="50vh"
          />
        </OrderSection>
      </main>
    </div>
  );
}
