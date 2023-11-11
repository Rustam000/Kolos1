import styles from "./Return.module.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import {
  orderHistoryColumns,
  orderHistoryColumnsNice,
} from "./orderHistoryColumns";
import {
  returnDraftColumns,
  returnDraftColumnsNice,
} from "./returnDraftColumns";

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

export default function Return() {
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

  const returnDraftTotalQuantity = returnDraft.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  useEffect(() => {
    dispatch(updateOrderHistory());
  }, [returnDraftTotalQuantity]);

  useEffect(() => {
    dispatch(getDistributorById(id));
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(getOrderById({ id, search }));
  }, [id, search, dispatch]);

  ///////////////////////////////////////////////////////////////////////////////

  const orderHistoryCols = orderHistoryColumns((_, record) => (
    //-------------------add to return draft
    <OrderButton
      variant="add"
      onClick={() => {
        dispatch(addItemToDraft(record));
      }}
    />
  ));

  //////////////////////////////////////////////////////////////////////

  const returnDraftCols = returnDraftColumns(
    (_, record) => (
      //-------------------remove from return draft
      <OrderButton
        variant="remove"
        onClick={() => {
          dispatch(removeItemFromDraft(record));
        }}
      />
    ),
    (_, record) => (
      <QuantityController
        value={record.quantity}
        maxValue={record.maxQuantity}
        onChange={(value) => dispatch(setQuantity({ id: record.id, value }))}
      />
    ),
  );

  ///////////////////////////////////////////////////////////////////////////////
  /* const orderHistoryCols = orderHistoryColumnsNice({
    dispatch,
    addItemToDraft,
  });
  const returnDraftCols = returnDraftColumnsNice({
    dispatch,
    setQuantity,
    removeItemFromDraft,
  }); */
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
            columns={returnDraftCols}
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
            columns={orderHistoryCols}
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
