import { useDispatch } from "react-redux";
import ADTable from "../../../components/ADTable/ADTable";
import DistributorInfo from "../../../components/DistributorInfo/DistributorInfo";
import CustomButton from "../../../components/UI/CustomButton/CustomButton";
import OrderButton from "../../../components/UI/OrderButton/OrderButton";
import TotalIndicator from "../../../components/UI/TotalIndicator/TotalIndicator";
import { transactionActions } from "../../../redux/transactionSlice";
import QuantityController from "../../../components/UI/QuantityController/QuantityController";
import TransactionSection from "../../../components/TransactionSection/TransactionSection";

export default function Order({
  parentStyles,
  sourceData,
  targetData,
  targetTotalCost,
  distributor,
  orderNumber,
  hoverRowId,
}) {
  const dispatch = useDispatch();

  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////

  const sourceColumns = [
    {
      title: "№",
      dataIndex: "rowIndex",
      align: "center",
      width: 60,
      ellipsis: true,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Наименование",
      dataIndex: "name",
      align: "left",
      ellipsis: true,
    },
    {
      title: "Уникальный код",
      dataIndex: "identification_number",
      align: "left",
      width: 130,
      ellipsis: true,
    },
    {
      title: "Ед. Изм.",
      dataIndex: "unit",
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
      align: "left",
      width: "11%",
    },
    {
      title: "Отпустить",
      align: "center",
      width: 85,
      render: (_, record) => (
        //-------------------add to target
        <OrderButton
          variant="add"
          onClick={() => {
            dispatch(transactionActions.addItemToTarget(record));
          }}
        />
      ),
    },
  ];

  ////////////////////////////////////////////////////////////////

  const targetColumns = [
    {
      title: "№",
      dataIndex: "rowIndex",
      align: "center",
      width: 40,
      ellipsis: true,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Наименование",
      dataIndex: "name",
      align: "left",
      ellipsis: true,
    },
    {
      title: "Уникальный код",
      dataIndex: "identification_number",
      align: "left",
      ellipsis: true,
      width: 120,
    },
    {
      title: "Ед.",
      dataIndex: "unit",
      align: "left",
      width: 50,
    },
    {
      title: "Кол-во",
      dataIndex: "quantity",
      align: "left",
      width: 90,
      render: (_, record) => (
        <QuantityController
          value={record.quantity}
          maxValue={record.maxQuantity}
          onChange={(value) =>
            dispatch(transactionActions.setQuantity({ id: record.id, value }))
          }
        />
      ),
    },
    {
      title: "Цена",
      dataIndex: "price",
      align: "left",
      width: 50,
    },
    {
      title: "Сумма",
      dataIndex: "sum",
      align: "left",
      width: 60,
      render: (text, record) => record.quantity * record.price,
    },
    {
      title: "Дата",
      dataIndex: "order_date",
      align: "left",
      width: "10%",
      ellipsis: true,
      render: (text, record) => new Date(text).toLocaleDateString("rus"),
    },
    {
      title: "Отм.",
      dataIndex: "cancel",
      align: "center",
      width: 45,
      render: (_, record) => (
        //-------------------remove from return draft
        <OrderButton
          variant="remove"
          onClick={() => {
            dispatch(transactionActions.removeItemFromTarget(record));
          }}
        />
      ),
    },
  ];

  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////

  return (
    <>
      {/* -------------------------SOURCE------------------------- */}
      <TransactionSection>
        <div className={parentStyles.infoWrapper}>
          <DistributorInfo info={distributor} variant="small" />
          <label className={parentStyles.formInput}>
            <input
              type="text"
              name="orderNumber"
              value={orderNumber}
              onChange={(e) =>
                dispatch(transactionActions.setOrderNumber(e.target.value))
              }
              placeholder="Номер накладного"
            />
          </label>
        </div>
        <ADTable
          size="small"
          dataSource={targetData}
          rowKey="id"
          columns={targetColumns}
          height="40vh"
          onRow={(record) => {
            return {
              onMouseEnter: () => {
                dispatch(transactionActions.setHoverRowId(record.id));
              },
              onMouseLeave: () => {
                dispatch(transactionActions.setHoverRowId(""));
              },
            };
          }}
        />
        <div className={parentStyles.controls}>
          <TotalIndicator
            className={parentStyles.orderTotal}
            value={targetTotalCost}
          />
          <CustomButton
            className={parentStyles.orderButton}
            width="narrow"
            variant="secondary"
          >
            Распечатать
          </CustomButton>
          <CustomButton
            className={parentStyles.orderButton}
            width="narrow"
            variant="primary"
          >
            Сохранить
          </CustomButton>
        </div>
      </TransactionSection>
      {/* -------------------------TARGET------------------------- */}
      <TransactionSection>
        <h3 className={parentStyles.sectionHeading}>Товар со склада</h3>
        <ADTable
          size="small"
          dataSource={sourceData}
          rowKey="id"
          columns={sourceColumns}
          height="50vh"
          rowClassName={(record) =>
            record.id === hoverRowId ? parentStyles.highlightedRow : ""
          }
        />
      </TransactionSection>
    </>
  );
}
