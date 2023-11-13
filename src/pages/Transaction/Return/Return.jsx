import { useDispatch } from "react-redux";
import ADTable from "../../../components/ADTable/ADTable";
import DistributorInfo from "../../../components/DistributorInfo/DistributorInfo";
import OrderButton from "../../../components/UI/OrderButton/OrderButton";
import TotalIndicator from "../../../components/UI/TotalIndicator/TotalIndicator";
import { transactionActions } from "../../../redux/transactionSlice";
import QuantityController from "../../../components/UI/QuantityController/QuantityController";
import CustomButton from "../../../components/UI/CustomButton/CustomButton";
import TransactionSection from "../../../components/TransactionSection/TransactionSection";
import renderSum from "../../../utils/renderSum";
import renderDate from "../../../utils/renderDate";
import renderIndex from "../../../utils/renderIndex";

export default function Return({
  parentStyles,
  sourceData,
  targetData,
  distributor,
  hoverRowId,
  sourceTotalCost,
  targetTotalCost,
}) {
  const dispatch = useDispatch();

  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////

  const sourceColumns = [
    {
      title: "№",
      dataIndex: "rowIndex",
      key: "rowIndex",
      align: "center",
      width: 40,
      ellipsis: true,
      render: renderIndex,
    },
    {
      title: "Наименование",
      dataIndex: "name",
      key: "name",
      align: "left",
      ellipsis: true,
    },
    {
      title: "Код",
      dataIndex: "identification_number",
      key: "identification_number",
      align: "left",
      width: 90,
      ellipsis: true,
    },
    {
      title: "Ед.",
      dataIndex: "unit",
      key: "unit",
      align: "left",
      width: 40,
      ellipsis: true,
    },
    {
      title: "Кол-во",
      dataIndex: "quantity",
      key: "quantity",
      align: "left",
      width: 60,
    },
    {
      title: "Цена",
      dataIndex: "price",
      key: "price",
      align: "left",
      width: 50,
    },
    {
      title: "Сумма",
      dataIndex: "sum",
      align: "left",
      width: 60,
      render: renderSum,
    },
    {
      title: "Дата",
      dataIndex: "order_date",
      align: "left",
      width: "10%",
      ellipsis: true,
      render: renderDate,
    },
    {
      title: "Возв.",
      key: "action",
      align: "center",
      width: 50,
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
      key: "rowIndex",
      align: "center",
      width: 40,
      ellipsis: true,
      render: renderIndex,
    },
    {
      title: "Наименование",
      dataIndex: "name",
      key: "name",
      align: "left",
      ellipsis: true,
    },
    {
      title: "Код",
      dataIndex: "identification_number",
      key: "identification_number",
      align: "left",
      width: 90,
      ellipsis: true,
    },
    {
      title: "Ед.",
      dataIndex: "unit",
      key: "unit",
      align: "left",
      width: 40,
      ellipsis: true,
    },
    {
      title: "Кол-во",
      dataIndex: "quantity",
      key: "quantity",
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
      key: "price",
      align: "left",
      width: 50,
    },
    {
      title: "Сумма",
      align: "left",
      width: 60,
      render: renderSum,
    },
    {
      title: "Дата",
      dataIndex: "order_date",
      align: "left",
      width: "10%",
      ellipsis: true,
      render: renderDate,
    },
    {
      title: "Статус",
      dataIndex: "state",
      align: "left",
      width: 60,
    },
    {
      title: "Отм.",
      key: "action",
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
      {/* -------------------------TARGET------------------------- */}
      <TransactionSection>
        <ADTable
          size="small"
          dataSource={targetData}
          rowKey="id"
          columns={targetColumns}
          height="55vh"
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
          <TotalIndicator
            className={parentStyles.total}
            value={targetTotalCost}
          />
        </div>
      </TransactionSection>
      {/* -------------------------SOURCE------------------------- */}
      <TransactionSection>
        <DistributorInfo info={distributor} variant="small" />
        <ADTable
          size="small"
          dataSource={sourceData}
          rowKey="id"
          columns={sourceColumns}
          height="45vh"
          rowClassName={(record) =>
            record.id === hoverRowId ? parentStyles.highlightedRow : ""
          }
        />
        <div className={parentStyles.controls}>
          <TotalIndicator
            className={parentStyles.total}
            value={sourceTotalCost}
          />
        </div>
      </TransactionSection>
    </>
  );
}
