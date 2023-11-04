import styles from "./Archive.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import PageHeading from "../../components/PageHeading/PageHeading";
import CustomButton from "../../components/UI/CustomButton/CustomButton";
import { products } from "../../assets/beer_data";
import { distributors } from "../../assets/distributor_data";
import TableButton from "../../components/UI/TableButton/TableButton";
import restoreIcon from "../../assets/icons/restore.svg";
import ADTable from "../../components/ADTable/ADTable";
import TotalIndicator from "../../components/UI/TotalIndicator/TotalIndicator";
import { useDispatch, useSelector } from "react-redux";
import { archiveActions, fetchArchiveItems } from "../../redux/archiveSlice";
import { useEffect } from "react";

const distributorColumns = [
  {
    title: "№",
    dataIndex: "rowIndex",
    key: "rowIndex",
    align: "center",
    width: 55,
    render: (text, record, index) => index + 1,
  },
  {
    title: "ФИО",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Регион",
    dataIndex: "region",
    key: "region",
  },
  {
    title: "Контактный номер (1)",
    dataIndex: "phoneNumberOne",
    key: "phoneNumberOne",
    width: 190,
  },
  {
    title: "Контактный номер (2)",
    dataIndex: "phoneNumberTwo",
    key: "phoneNumberTwo",
    width: 190,
  },
  {
    title: "Дата удаления",
    dataIndex: "dataDeletion",
    key: "dataDeletion",
    align: "left",
    width: 110,
  },
  {
    title: "Восстановить",
    key: "restore",
    width: 145,
    align: "center",
    render: (_, record) => (
      <TableButton onClick={() => null}>
        <img src={restoreIcon} alt="restore" />
      </TableButton>
    ),
  },
];

const productColumns = [
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
    width: "15%",
  },
  {
    title: "Уникальный код",
    dataIndex: "num_id",
    key: "num_id",
    align: "left",
    width: "15%",
  },
  {
    title: "Ед. изм.",
    dataIndex: "unit",
    key: "unit",
    align: "left",
  },
  {
    title: "Кол-во",
    dataIndex: "quantity",
    key: "quantity",
    align: "left",
  },
  {
    title: "Цена",
    dataIndex: "price",
    key: "price",
    align: "left",
  },
  {
    title: "Сумма",
    dataIndex: "sum",
    key: "sum",
    align: "left",
    width: 100,
    render: (_, record) => record.price * record.quantity,
  },
  {
    title: "Дата удаления",
    dataIndex: "dataDeletionOne",
    key: "dataDeletionOne",
    align: "left",
    width: 115,
  },
  {
    title: "Статус возврата",
    dataIndex: "returnStatus",
    key: "returnStatus",
    align: "left",
    width: 100,
  },
  {
    title: "Восстановить",
    key: "action",
    align: "center",
    width: 145,
    render: (_, record) => (
      <TableButton onClick={() => null}>
        <img src={restoreIcon} alt="restore" />
      </TableButton>
    ),
  },
];

export default function Archive() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isWarehouse = location.pathname.includes("warehouse");
  const { items, isLoading, error } = useSelector((state) => state.archive);

  const total = products?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const displayColumns = isWarehouse ? productColumns : distributorColumns;
  const displayData = isWarehouse ? products : distributors;

  useEffect(() => {
    const target = isWarehouse ? "products" : "distributors";
    dispatch(fetchArchiveItems(target));
    return () => dispatch(archiveActions.clearData());
  }, [isWarehouse]);

  return (
    <div className={styles.Archive}>
      <div className="container">
        <PageHeading heading="Архив" buttonText="Назад" backLink="/warehouse">
          <div className={styles.controlContainer}>
            <div className={styles.controlContainer}>
              {isWarehouse && (
                <TotalIndicator className={styles.total} value={total} />
              )}
              <CustomButton
                variant={isWarehouse ? "primary" : "secondary"}
                onClick={() => navigate("/warehouse/archive")}
              >
                Товары
              </CustomButton>
              <CustomButton
                variant={!isWarehouse ? "primary" : "secondary"}
                onClick={() => navigate("/distributors/archive")}
              >
                Дистрибьюторы
              </CustomButton>
            </div>
          </div>
        </PageHeading>
        <ADTable
          dataSource={items}
          columns={displayColumns}
          rowKey="id"
          height="65vh"
        />
      </div>
    </div>
  );
}
