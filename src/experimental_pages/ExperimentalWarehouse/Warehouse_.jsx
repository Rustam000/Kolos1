import styles from "./Warehouse.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import CustomButton from "../../components/UI/CustomButton/CustomButton";
import editIcon from "../../assets/icons/mode_edit.svg";
import TableButton from "../../components/UI/TableButton/TableButton";
import {
  fetchWarehouseItems,
  warehouseActions,
} from "../../redux/warehouseSlice";
import ADTable from "../../components/ADTable/ADTable";
import CustomSelect from "../../components/UI/CustomSelect/CustomSelect";
import CustomSearch from "../../components/UI/CustomSearch/CustomSearch";
import renderIndex from "../../utils/renderIndex";
import { PATHS } from "../../common/constants";

export default function Warehouse_() {
  const { setCategory, setCondition, setSearch } = warehouseActions;
  const { options } = useSelector((state) => state.options);
  const { items, isLoading, error, search, category, state } = useSelector(
    (state) => state.warehouse,
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWarehouseItems({ search, category, state }));
  }, [search, category, state]);

  useEffect(() => {
    return () => dispatch(warehouseActions.clearData());
  }, []);

  const tableColumns = [
    {
      title: "№",
      dataIndex: "rowIndex",
      key: "rowIndex",
      align: "center",
      width: 55,
      render: renderIndex,
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
      title: "Ред.",
      key: "action",
      align: "center",
      width: 78,
      render: (_, record) => (
        <Link to={`${PATHS.productsEdit}/${record.id}`}>
          <TableButton>
            <img src={editIcon} alt="edit icon" />
          </TableButton>
        </Link>
      ),
    },
  ];

  return (
    <div className={styles.Warehouse}>
      <div className="container">
        <h2 className={styles.heading}>Экспериментальная страница</h2>
        <ADTable
          headerBg={state === "defect" ? "#ffc2c2" : undefined}
          //headerBg={state === "Invalid" ? "#ffc2c2" : undefined}
          loading={isLoading}
          dataSource={items}
          rowKey="id"
          columns={tableColumns}
          height="70vh"
        />
      </div>
    </div>
  );
}
