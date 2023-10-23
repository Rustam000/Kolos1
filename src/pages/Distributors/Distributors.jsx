import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/UI/CustomButton/CustomButton";
import styles from "./Distributors.module.css";
import { Table } from "antd";
import TableButton from "../../components/UI/TableButton/TableButton";
import editIcon from "../../assets/icons/mode_edit.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchDistributors } from "../../redux/distributorsSlice";

export default function Distributors() {
  const { distributors } = useSelector((state) => state.distributors);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDistributors());
  }, []);

  const tableColumns = [
    {
      title: "№",
      dataIndex: "rowIndex",
      key: "rowIndex",
      align: "center",
      width: 50,
      render: (text, record, index) => index + 1, // автоматическое нумерование
    },
    {
      title: "ФИО",
      dataIndex: "name",
      key: "name",
      align: "left",
      width: 350,
    },
    {
      title: "Регион",
      dataIndex: "region",
      key: "region",
      align: "left",
      width: 325,
    },
    {
      title: "Ред.",
      key: "action",
      align: "center",
      width: 78,
      render: (_, record) => (
        <TableButton
          onClick={() =>
            navigate(`/distributor/edit/${record._id}`, { state: record })
          }
        >
          <img src={editIcon} alt="edit icon" />
        </TableButton>
      ),
    },
  ];

  return (
    <div className={styles.Distributors}>
      <div className="container">
        <div className={styles.filterbar}>
          <CustomButton
            variant="primary"
            onClick={() => navigate("/distributor/create")}
          >
            Создать
          </CustomButton>
        </div>

        <Table
          bordered
          dataSource={distributors}
          rowKey="_id"
          columns={tableColumns}
          pagination={false}
          scroll={{ y: "70vh", scrollToFirstRowOnChange: true }}
        />
      </div>
    </div>
  );
}
