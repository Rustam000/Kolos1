import styles from "./DistributorProfile.module.css";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchItems,
  getDistributorById,
  profileActions,
} from "../../redux/profileSlice";
import PageHeading from "../../components/PageHeading/PageHeading";
import DistributorInfo from "../../components/DistributorInfo/DistributorInfo";
import CustomButton from "../../components/UI/CustomButton/CustomButton";
import ADTable from "../../components/ADTable/ADTable";
import CustomSelect from "../../components/UI/CustomSelect/CustomSelect";
import renderSum from "../../utils/renderSum";
import renderDate from "../../utils/renderDate";
import renderIndex from "../../utils/renderIndex";

export default function DistributorProfile() {
  const {
    data,
    distributorInfo,
    isReturns,
    startDate,
    endDate,
    category,
    isLoading,
    error,
  } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { setCategory, setSales, setStartDate, setEndDate } = profileActions;

  const queryParams = {
    category,
    start_date: startDate,
    end_date: endDate,
  };

  useEffect(() => {
    dispatch(getDistributorById(id));
  }, []);

  useEffect(() => {
    dispatch(
      fetchItems({
        id,
        queryParams,
        target: isReturns ? "returns" : "orders",
      }),
    );
  }, [
    queryParams.category,
    queryParams.start_date,
    queryParams.end_date,
    dispatch,
    isReturns,
  ]);

  const tableColumns = [
    {
      title: "№",
      dataIndex: "rowIndex",
      align: "center",
      width: 50,
      render: renderIndex,
    },
    {
      title: "Наименование",
      dataIndex: "name",
      align: "left",
      ellipsis: true,
    },
    {
      title: "Уникальный код",
      dataIndex: "identification_number",
      align: "left",
      width: "18%",
    },
    {
      title: "Ед. изм.",
      dataIndex: "unit",
      align: "left",
      width: "11%",
    },
    {
      title: "Кол-во",
      dataIndex: "quantity",
      align: "left",
      width: "11%",
    },
    {
      title: "Цена",
      dataIndex: "price",
      align: "left",
      width: "11%",
    },
    {
      title: "Сумма",
      dataIndex: "sum",
      align: "left",
      width: "11%",
      render: renderSum,
    },
    {
      title: "Дата",
      dataIndex: isReturns ? "return_date" : "order_date",
      align: "left",
      width: "11%",
      ellipsis: true,
      render: renderDate,
    },
  ];

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
              <Link to={`../order/${id}`}>
                <CustomButton variant="secondary" width="width140">
                  Отпускать
                </CustomButton>
              </Link>
              <Link to={`../return/${id}`}>
                <CustomButton variant="secondary" width="width140">
                  Возврат
                </CustomButton>
              </Link>
            </div>
          </div>

          <form className={styles.filterbar}>
            <CustomSelect
              onChange={(value) => dispatch(setCategory(value))}
              options={[
                { label: "Все товары", value: "" },
                { label: "Алкогольное", value: "alcohol" },
                { label: "Безалкогольное", value: "notAlcohol" },
              ]}
              className={styles.select}
            />
            <CustomSelect
              onChange={(value) => {
                dispatch(setSales(value));
              }}
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
            <input
              type="date"
              value={startDate}
              onChange={(e) => dispatch(setStartDate(e.target.value))}
              id="startDate"
            />
            <label className={styles.dateLabel} htmlFor="endDate">
              До
            </label>
            <input
              type="date"
              value={endDate}
              id="endDate"
              onChange={(e) => dispatch(setEndDate(e.target.value))}
            />
          </form>
          <ADTable
            headerBg={isReturns ? "#ffc2c2" : undefined}
            loading={isLoading}
            dataSource={data}
            rowKey="id"
            columns={tableColumns}
            height="55vh"
          />
        </main>
      </div>
    </div>
  );
}
