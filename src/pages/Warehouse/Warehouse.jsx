import styles from "./Warehouse.module.css";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/UI/CustomButton/CustomButton";
import editIcon from "../../assets/icons/mode_edit.svg";
import TableButton from "../../components/UI/TableButton/TableButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchWarehouseItems,
  fetchWarehouseOptions,
  warehouseActions,
} from "../../redux/warehouseSlice";
import ADTable from "../../components/ADTable/ADTable";
import CustomSelect from "../../components/UI/CustomSelect/CustomSelect";
import CustomSearch from "../../components/UI/CustomSearch/CustomSearch";

export default function Warehouse() {
  const { setCategory, setCondition, setSearch } = warehouseActions;
  const { items, isLoading, error, options, search, category, state } =
    useSelector((state) => state.warehouse);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWarehouseItems({ search, category, state }));
  }, [search, category, state]);

  useEffect(() => {
    dispatch(fetchWarehouseOptions());
  }, []);

  const tableColumns = [
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
        <TableButton
          onClick={() =>
            navigate(`/warehouse/edit/${record.id}`, { state: record })
          }
        >
          <img src={editIcon} alt="edit icon" />
        </TableButton>
      ),
    },
  ];

  return (
    <div className={styles.Warehouse}>
      <div className="container">
        <form className={styles.filterbar}>
          <CustomSearch
            options={options.search}
            value={search}
            onChange={(event) => dispatch(setSearch(event.target.value))}
            onSearch={console.log}
          />
          <CustomSelect
            className={styles.categorySelect}
            name="category"
            value={category}
            onChange={(value) => dispatch(setCategory(value))}
            options={options.category}
          />
          <CustomSelect
            className={styles.conditionSelect}
            name="state"
            value={state}
            onChange={(value) => dispatch(setCondition(value))}
            options={[
              { value: "Valid", label: "Норма" },
              { value: "Invalid", label: "Брак" },
            ]}
          />
          <CustomButton
            type="button"
            variant="secondary"
            onClick={() => navigate("/warehouse/archive")}
          >
            Архив
          </CustomButton>
          <CustomButton
            type="button"
            variant="primary"
            onClick={() => navigate("/warehouse/create")}
          >
            Создать
          </CustomButton>
        </form>
        <ADTable
          headerBg={state === "Invalid" ? "#ffc2c2" : undefined}
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
