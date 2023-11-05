import styles from "./DistributorProfile.module.css";
import ADTable from "../../components/ADTable/ADTable";
import { products } from "../../components/CustomTable/beer_data";
import CustomButton from "../../components/UI/CustomButton/CustomButton";
import { useNavigate, useParams } from "react-router-dom";
import PageHeading from "../../components/PageHeading/PageHeading";
import { getDistributorById } from "../../redux/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import DistributorInfo from "../../components/DistributorInfo/DistributorInfo";
import CustomSelect from "../../components/UI/CustomSelect/CustomSelect";

const tableColumns = [
  {
    title: "№",
    dataIndex: "rowIndex",
    key: "rowIndex",
    align: "center",
    width: 50,
    render: (text, record, index) => <span key={index}>{index + 1}</span>,
  },
  {
    title: "Наименование",
    dataIndex: "name",
    key: "name",
    align: "left",
    width: 215,
  },
  {
    title: "Уникальный код",
    dataIndex: "num_id",
    key: "num_id",
    align: "left",
    width: 190,
  },
  {
    title: "Ед. изм.",
    dataIndex: "unit",
    key: "unit",
    align: "left",
    width: 130,
  },
  {
    title: "Кол-во",
    dataIndex: "quantity",
    key: "quantity",
    align: "left",
    width: 130,
  },
  {
    title: "Цена",
    dataIndex: "price",
    key: "price",
    align: "left",
    width: 130,
  },
  {
    title: "Сумма",
    dataIndex: "sum",
    key: "sum",
    align: "left",
    width: 135,
  },
  {
    title: "Дата",
    dataIndex: "dataDeletionOne",
    key: "dataDeletionOne",
    align: "left",
    width: 135,
  },
];

export default function DistributorProfile() {
  const { distributorInfo, isLoading, error } = useSelector(
    (state) => state.profile,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDistributorById(id));
  }, []);

  return (
    <div className={styles.DistributorProfile}>
      <div className="container">
        <PageHeading
          heading="Карточка дистрибьютора"
          buttonText="Назад"
          backLink="/distributors"
        />
        <main className={styles.mainSection}>
          <div className={styles.infoBlock}>
            <DistributorInfo info={distributorInfo} />
            <div className={styles.actions}>
              <CustomButton
                variant="secondary"
                onClick={() => navigate(`../return/${id}`)}
              >
                Возврат
              </CustomButton>
              <CustomButton
                variant="secondary"
                onClick={() => navigate(`../order/${id}`)}
              >
                Продать
              </CustomButton>
            </div>
          </div>

          <form className={styles.filterbar}>
            <CustomSelect
              options={[{ label: "---", value: "---" }]}
              className={styles.select}
            />
            <CustomSelect
              options={[
                { label: "История продаж", value: "order" },
                { label: "История возврата", value: "return" },
              ]}
              className={styles.select}
            />
            <label
              className={`${styles.dateLabel} ${styles.startDateLabel}`}
              htmlFor="startDate"
            >
              От
            </label>
            <input type="date" id="startDate" />
            <label className={styles.dateLabel} htmlFor="endDate">
              До
            </label>
            <input type="date" id="endDate" />
          </form>
          <ADTable
            dataSource={products}
            rowKey="_id"
            columns={tableColumns}
            height="55vh"
          />
        </main>
      </div>
    </div>
  );
}
