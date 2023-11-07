import styles from "./Order.module.css";
import editIcon from "../../assets/icons/Vector.svg";
import PageHeading from "../../components/PageHeading/PageHeading";
import CustomSearch from "../../components/UI/CustomSearch/CustomSearch";
import { products } from "../../assets/beer_data";
import ADTable from "../../components/ADTable/ADTable";
import DistributorInfo from "../../components/DistributorInfo/DistributorInfo";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDistributorCredentials,
  orderActions,
} from "../../redux/orderSlice";
import CustomButton from "../../components/UI/CustomButton/CustomButton";
import TotalIndicator from "../../components/UI/TotalIndicator/TotalIndicator";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import OrderSection from "../../components/OrderSection/OrderSection";

const warehouseTableColumns = [
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
      <button onClick={() => console.log(record)}>
        <img src={editIcon} alt="edit icon" />
      </button>
    ),
  },
];

export default function Order() {
  const { id } = useParams();
  const { distributor, search } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDistributorCredentials(id));
  }, [id, dispatch]);

  return (
    <div className={styles.container}>
      <PageHeading buttonText="Назад" heading="Оформление заявки">
        <CustomSearch
          className={styles.searchInput}
          onChange={(value) => dispatch(orderActions.setSearch(value))}
        />
      </PageHeading>
      <main className={styles.main}>
        <OrderSection>
          <DistributorInfo info={distributor} variant="small" />
          <ADTable
            size="small"
            dataSource={products}
            rowKey="_id"
            columns={warehouseTableColumns}
            height="70vh"
          />
          <div className={styles.controls}>
            <TotalIndicator className={styles.total} value={99999} />
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
            dataSource={products}
            rowKey="_id"
            columns={warehouseTableColumns}
            height="70vh"
          />
        </OrderSection>
      </main>
    </div>
  );
}
