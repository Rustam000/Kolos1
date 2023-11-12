import { useDispatch } from "react-redux";
import ADTable from "../../../components/ADTable/ADTable";
import DistributorInfo from "../../../components/DistributorInfo/DistributorInfo";
import OrderButton from "../../../components/UI/OrderButton/OrderButton";
import TotalIndicator from "../../../components/UI/TotalIndicator/TotalIndicator";
import { transactionActions } from "../../../redux/transactionSlice";

export default function ReturnSource({
  parentStyles,
  data,
  distributor,
  hoverRowId,
  sourceTotalCost,
}) {
  const dispatch = useDispatch();

  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////

  const columns = [
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
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////

  return (
    <>
      <DistributorInfo info={distributor} variant="small" />
      <ADTable
        size="small"
        dataSource={data}
        rowKey="id"
        columns={columns}
        height="50vh"
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
    </>
  );
}
