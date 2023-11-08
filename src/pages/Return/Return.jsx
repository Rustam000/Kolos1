import styles from "./Return.module.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import editIcon from "../../assets/icons/Vector.svg";
import PageHeading from "../../components/PageHeading/PageHeading";
import CustomSearch from "../../components/UI/CustomSearch/CustomSearch";
import { products } from "../../assets/beer_data";
import ADTable from "../../components/ADTable/ADTable";
import DistributorInfo from "../../components/DistributorInfo/DistributorInfo";
import CustomButton from "../../components/UI/CustomButton/CustomButton";
import TotalIndicator from "../../components/UI/TotalIndicator/TotalIndicator";
import OrderSection from "../../components/OrderSection/OrderSection";
import OrderContainer from "../../components/OrderContainer/OrderContainer";
import { getDistributorById, returnActions } from "../../redux/returnSlice";

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
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

export default function Return() {
  const { id } = useParams();
  const { distributor, search } = useSelector((state) => state.return);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDistributorById(id));
  }, [id, dispatch]);

  return (
    <div className="fullWidthContainer">
      <PageHeading buttonText="Назад" heading="Оформление возврата">
        <CustomSearch
          className={styles.searchInput}
          onChange={(value) => dispatch(returnActions.setSearch(value))}
        />
      </PageHeading>
      {/* ///////////////////////////////////////////////////////// */}
      <OrderContainer>
        <OrderSection>
          <ADTable
            size="small"
            dataSource={products}
            rowKey="_id"
            columns={warehouseTableColumns}
            height="70vh"
          />
          <div className={styles.controls}>
            <CustomButton
              className={styles.returnButton}
              width="narrow"
              variant="secondary"
            >
              Распечатать
            </CustomButton>
            <CustomButton
              className={styles.returnButton}
              width="narrow"
              variant="primary"
            >
              Сохранить
            </CustomButton>
          </div>
        </OrderSection>
        {/* /////////////////////////////////////////////////////// */}
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
          </div>
        </OrderSection>
      </OrderContainer>
    </div>
  );
}
