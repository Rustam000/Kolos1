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
  const { items, isLoading, error, options, search, category, condition } =
    useSelector((state) => state.warehouse);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function dispatchCategory(category) {
    dispatch(warehouseActions.setCategory({ category }));
  }

  function dispatchCondition(condition) {
    dispatch(warehouseActions.setCondition({ condition }));
  }

  function dispatchSetSearch(search) {
    dispatch(warehouseActions.setSearch({ search }));
  }

  useEffect(() => {
    dispatch(fetchWarehouseItems({ search, category, condition }));
  }, [search, category, condition]);

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
            navigate(`/warehouse/product/edit/${record.id}`, { state: record })
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
            onChange={(event) => dispatchSetSearch(event.target.value)}
            onSearch={console.log}
          />
          <CustomSelect
            className={styles.categorySelect}
            name="category"
            dispatchNewValue={dispatchCategory}
            options={options.category}
          />
          <CustomSelect
            className={styles.conditionSelect}
            name="condition"
            dispatchNewValue={dispatchCondition}
            options={options.condition}
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
            onClick={() => navigate("/warehouse/product/create")}
          >
            Создать
          </CustomButton>
        </form>
        <ADTable
          headerBg={condition === "defect" ? "#ffc2c2" : undefined}
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
