import styles from "./Distributors.module.css";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../../components/UI/CustomButton/CustomButton";
import TableButton from "../../components/UI/TableButton/TableButton";
import editIcon from "../../assets/icons/mode_edit.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchDistributors } from "../../redux/distributorsSlice";
import ADTable from "../../components/ADTable/ADTable";

export default function Distributors() {
  const { distributors, isLoading, error } = useSelector(
    (state) => state.distributors,
  );
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
      width: 55,
      render: (text, record, index) => index + 1,
    },
    {
      title: "ФИО",
      dataIndex: "name",
      key: "name",
      align: "left",
      render: (_, record) => (
        <Link
          className={styles.distributorLink}
          to={`/distributors/distributor/profile/${record.id}`}
        >
          {record.name + " (cсылка на профиль)"}
        </Link>
      ),
    },
    {
      title: "Регион",
      dataIndex: "region",
      key: "region",
      align: "left",
    },
    {
      title: "Ред.",
      key: "action",
      align: "center",
      width: 78,
      render: (_, record) => (
        <TableButton
          onClick={() =>
            navigate(`/distributors/distributor/edit/${record.id}`, {
              state: record,
            })
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
            onClick={() => navigate("/distributors/distributor/create")}
          >
            Создать
          </CustomButton>
        </div>

        <ADTable
          loading={isLoading}
          dataSource={distributors}
          rowKey="id"
          columns={tableColumns}
          height="70vh"
        />
      </div>
    </div>
  );
}
