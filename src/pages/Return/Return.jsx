import styles from "./Return.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import addIcon from "../../assets/icons/add.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import upIcon from "../../assets/icons/bxs_up-arrow.svg";
import downIcon from "../../assets/icons/bxs_down-arrow.svg";
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
  const { setOrderHistory, addItemToDraft } = returnActions;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDistributorById(id));
    dispatch(getOrderById({ id, search }));
  }, [id, dispatch, setOrderHistory]);

  console.log({ orderHistory });
  console.log({ returnDraft });

  function handleAdd(record) {
    console.log(record);
    dispatch(addItemToDraft(record));
  }
  function handleRemove(record) {
    //
  }

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
      title: "+",
      key: "action",
      align: "center",
      width: 30,
      render: (_, record) => (
        //-------------------add to return draft
        <button
          onClick={() => {
            handleAdd(record);
            /* setReturnDraft((prev) => {
              if (prev.includes((item) => item.id === record.id)) {
                return prev.map((item) =>
                  item.id === record.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item,
                );
              } else {
                return [
                  { ...record, maxQuantity: record.quantity, quantity: 1 },
                  ...prev,
                ];
              }
            }); */
          }}
        >
          <img src={addIcon} alt="edit icon" />
        </button>
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
        //-------------------remove from return draft
        <button
          onClick={() => {
            handleRemove(record);
            /* setReturnDraft((prev) =>
              prev.filter((item) => item.id !== record.id),
            ); */
          }}
        >
          <img src={deleteIcon} alt="edit icon" />
        </button>
      ),
    },
  ];
  ///////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////

  return (
    <div className="fullWidthContainer">
      <PageHeading buttonText="Назад" heading="Оформление возврата">
        <CustomSearch
          className={styles.searchInput}
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
