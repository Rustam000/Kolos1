import { useDispatch } from "react-redux";
import ADTable from "../../../components/ADTable/ADTable";
import DistributorInfo from "../../../components/DistributorInfo/DistributorInfo";
import OrderButton from "../../../components/UI/OrderButton/OrderButton";
import TotalIndicator from "../../../components/UI/TotalIndicator/TotalIndicator";
import { transactionActions } from "../../../redux/transactionSlice";
import OrderSection from "../../../components/OrderSection/OrderSection";
import QuantityController from "../../../components/UI/QuantityController/QuantityController";
import CustomButton from "../../../components/UI/CustomButton/CustomButton";

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
      width: "11%",
    },
    {
      title: "Сумма",
      align: "left",
      width: "11%",
      render: (text, record) => record.quantity * record.price,
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
      <OrderSection>
        <ADTable
          size="small"
          dataSource={targetData}
          rowKey="id"
          columns={targetColumns}
          height="60vh"
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
      </OrderSection>
      {/* -------------------------SOURCE------------------------- */}
      <OrderSection>
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
      </OrderSection>
    </>
  );
}
