import styles from "./Return.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import addIcon from "../../assets/icons/add.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import PageHeading from "../../components/PageHeading/PageHeading";
import CustomSearch from "../../components/UI/CustomSearch/CustomSearch";
import ADTable from "../../components/ADTable/ADTable";
import DistributorInfo from "../../components/DistributorInfo/DistributorInfo";
import CustomButton from "../../components/UI/CustomButton/CustomButton";
import TotalIndicator from "../../components/UI/TotalIndicator/TotalIndicator";
import OrderSection from "../../components/OrderSection/OrderSection";
import OrderContainer from "../../components/OrderContainer/OrderContainer";
import {
  getDistributorById,
  getOrderById,
  returnActions,
} from "../../redux/returnSlice";
import QuantityController from "../../components/UI/QuantityController/QuantityController";
import OrderButton from "../../components/UI/OrderButton/OrderButton";

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

export default function Return() {
  // const [orderHistory, setOrderHistory] = useState([]);
  // const [returnDraft, setReturnDraft] = useState([]);
  const { id } = useParams();
  const { distributor, search, orderHistory, returnDraft } = useSelector(
    (state) => state.return,
  );
  const {
    updateOrderHistory,
    addItemToDraft,
    removeItemFromDraft,
    setQuantity,
  } = returnActions;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDistributorById(id));
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(getOrderById({ id, search }));
  }, [id, search, dispatch]);

  ///////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////
  const orderHistoryColumns = [
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
      title: "",
      key: "action",
      align: "center",
      width: 50,
      render: (_, record) => (
        //-------------------add to return draft
        <OrderButton
          variant="add"
          onClick={() => {
            dispatch(addItemToDraft(record));
          }}
        />
      ),
    },
  ];
  //////////////////////////////////////////////////////////////////////
  const returnDraftColumns = [
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
      render: (_, record) => (
        <QuantityController
          value={record.quantity}
          maxValue={record.maxQuantity}
          onChange={(value) => dispatch(setQuantity({ id: record.id, value }))}
        />
      ),
    },
    {
      title: "Цена",
      dataIndex: "price",
      key: "price",
      align: "left",
      width: "11%",
    },
    {
      title: "",
      key: "action",
      align: "center",
      width: 50,
      render: (_, record) => (
        //-------------------remove from return draft
        <OrderButton
          variant="remove"
          onClick={() => {
            dispatch(removeItemFromDraft(record));
          }}
        />
      ),
    },
  ];
  ///////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////

  return (
    <div className="fullWidthContainer">
      <PageHeading buttonText="Назад" heading="Возврат товара">
        <CustomSearch
          onChange={(value) => dispatch(returnActions.setSearch(value))}
        />
      </PageHeading>
      {/* ///////////////////////----RETURN----//////////////////////// */}
      <OrderContainer>
        <OrderSection>
          <ADTable
            size="small"
            dataSource={returnDraft}
            rowKey="id"
            columns={returnDraftColumns}
            height="50vh"
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
        {/* ///////////////////////-----HISTORY-----//////////////////// */}
        <OrderSection>
          <DistributorInfo info={distributor} variant="small" />
          <ADTable
            size="small"
            dataSource={orderHistory}
            rowKey="id"
            columns={orderHistoryColumns}
            height="50vh"
          />
          <div className={styles.controls}>
            <TotalIndicator className={styles.total} value={99999} />
          </div>
        </OrderSection>
      </OrderContainer>
    </div>
  );
}
