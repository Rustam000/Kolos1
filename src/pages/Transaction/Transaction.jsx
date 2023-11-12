import styles from "./Transaction.module.css";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
  getOrdersById,
  transactionActions,
} from "../../redux/transactionSlice";
import QuantityController from "../../components/UI/QuantityController/QuantityController";
import OrderButton from "../../components/UI/OrderButton/OrderButton";
import { sourceColumns } from "./sourceColumns";
import { targetColumns } from "./targetColumns";

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

export default function Transaction() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const isReturn = pathname.match("return");
  const navigate = useNavigate();
  if (!id) {
    navigate("/404");
    //TODO: if distributor credentials failed to load > nav to 404
  }
  const { distributor, search, source, target, hoverRowId } = useSelector(
    (state) => state.transaction,
  );
  const {
    updateSource,
    addItemToTarget,
    removeItemFromTarget,
    setQuantity,
    setHoverRowId,
    setSearch,
  } = transactionActions;
  const dispatch = useDispatch();

  const targetTotalQuantity = target.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  const sourceTotalCost = source.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const targetTotalCost = target.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  useEffect(() => {
    dispatch(updateSource());
  }, [targetTotalQuantity]);

  useEffect(() => {
    dispatch(getDistributorById(id));
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(getOrdersById({ id, search }));
  }, [id, search, dispatch]);

  ///////////////////////////////////////////////////////////////////////////////

  const sourceCols = sourceColumns((_, record) => (
    //-------------------add to return draft
    <OrderButton
      variant="add"
      onClick={() => {
        dispatch(addItemToTarget(record));
      }}
    />
  ));

  //////////////////////////////////////////////////////////////////////

  const targetCols = targetColumns(
    (_, record) => (
      //-------------------remove from return draft
      <OrderButton
        variant="remove"
        onClick={() => {
          dispatch(removeItemFromTarget(record));
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
      <PageHeading
        buttonText="Назад"
        backLink={`/distributor/profile/${id}`}
        heading={isReturn ? "Возврат товара" : "Оформление заявки"}
      >
        <CustomSearch onChange={(value) => dispatch(setSearch(value))} />
      </PageHeading>
      {/* ///////////////////////----TARGET----//////////////////////// */}
      <OrderContainer>
        <OrderSection>
          <ADTable
            size="small"
            dataSource={target}
            rowKey="id"
            columns={targetCols}
            height="60vh"
            onRow={(record) => {
              return {
                onMouseEnter: () => {
                  dispatch(setHoverRowId(record.id));
                },
                onMouseLeave: () => {
                  dispatch(setHoverRowId(""));
                },
              };
            }}
          />
          <div className={styles.controls}>
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
            <TotalIndicator className={styles.total} value={targetTotalCost} />
          </div>
        </OrderSection>
        {/* ///////////////////////-----SOURCE-----//////////////////// */}
        <OrderSection>
          <DistributorInfo info={distributor} variant="small" />
          <ADTable
            size="small"
            dataSource={source}
            rowKey="id"
            columns={sourceCols}
            height="50vh"
            rowClassName={(record) =>
              record.id === hoverRowId ? styles.highlightedRow : ""
            }
          />
          <div className={styles.controls}>
            <TotalIndicator className={styles.total} value={sourceTotalCost} />
          </div>
        </OrderSection>
      </OrderContainer>
    </div>
  );
}
