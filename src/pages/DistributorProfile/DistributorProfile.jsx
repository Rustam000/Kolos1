import ADTable from "../../components/ADTable/ADTable";
import styles from "./DistributorProfile.module.css";
import { products } from "../../components/CustomTable/beer_data";
import CustomButton from "../../components/UI/CustomButton/CustomButton";
import { useNavigate, useParams } from "react-router-dom";
import PageHeading from "../../components/PageHeading/PageHeading";
import { fetchDistributorInfo } from "../../redux/distributorProfileSlice";
import {useDispatch, useSelector } from 'react-redux' 
import { useEffect } from "react";
  

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
  const dispatch = useDispatch()

  const distributor = useSelector((state) => state.distributor.distributorInfo)
 
  const navigate = useNavigate();
  const { id } = useParams();
  const total = products?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

 const fetchDistributor = () => {
   const result = fetchDistributorInfo(2)
   return result
 }

  useEffect(() => {
    dispatch(fetchDistributor(2));
  }, []);


console.log(distributor.distributorInfo)
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
            <img
              className={styles.photo}
              src="/distributor.png"
              alt="фото дистрибьютора"
              width={150}
            />
            <div className={styles.infoRows}>
              <div className={styles.info1}>
                <p className="infoRow">
                  <span className={styles.infoRowLabel}>ФИО:</span>{distributor?.name}
                </p>
                <p className="infoRow">
                  <span className={styles.infoRowLabel}>Регион:</span>{distributor?.region}
                </p>
                <p className="infoRow">
                  <span className={styles.infoRowLabel}>ИНН:</span>
                  22708198700000
                </p>
              </div>
              <div className={styles.info2}>
                <p className="infoRow">
                  <span className={styles.infoRowLabel}>Контактный номер:</span>
                  {distributor?.contact1}
                </p>
                <div className={styles.namberTwo}>
                  <p className="infoRow">
                    <span className={styles.infoRowLabel}>
                      Контактный номер:
                    </span>
                    {distributor?.contact2}
                  </p>
                </div>
              </div>
            </div>
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
            <select name="" id="">
              <option value="all">Все товары</option>
            </select>
            <select name="" id="">
              <option value="all">История продаж</option>
            </select>
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
