import ADTable from "../../components/ADTable/ADTable";  // Импорт ADTable вместо CustomTable
import { products } from "../../components/CustomTable/beer_data";
import CustomButton from "../../components/UI/CustomButton/CustomButton";
import styles from "./DistributorProfile.module.css";
import angleBracketLeftIcon from "../../assets/icons/fi-sr-angle-small-left.svg";
import editIcon from "../../assets/icons/edit.svg";
import { useNavigate, useParams } from "react-router-dom";
import PageHeading from "../../components/PageHeading/PageHeading";



const tableColumns = [
  {
    title: "№",
    dataIndex: "rowIndex",
    key: "rowIndex",
    align: "center",
    width: 50,
    render: (text, record, index) => <span key={index}>{index + 1}</span>, // Добавьте ключ здесь
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
    }
];

export default function DistributorProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const total = products?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  return (
    <div className={styles.DistributorProfile}>
      <div className='container'>
      <PageHeading heading="Карточка дистрибьютора" buttonText="Назад" backLink="/distributors" />
        
        
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
          <span className={styles.infoRowLabel}>ФИО:</span>Калытбекова Айжана Амирова
        </p>
        <p className="infoRow">
          <span className={styles.infoRowLabel}>Регион:</span>Чуй
        </p>
        <p className="infoRow">
          <span className={styles.infoRowLabel}>ИНН:</span>22708198700000
        </p>
      </div>
      <div className={styles.info2}>
        <p className="infoRow">
          <span className={styles.infoRowLabel}>Контактный номер:</span>
          +996 550 366 000
        </p>
        <div className={styles.namberTwo}>
        <p className="infoRow">
          <span className={styles.infoRowLabel}>Контактный номер:</span>
          +996 550 366 001
        </p>
        </div>
      </div>
      </div>
      <div className={styles.actions}>
        <div className={styles.button}>
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
    </div>
  
          <form className={styles.filterbar}>
            <div className={styles.dateContainer}>
            <select name="" id="">
              <option value="all">Все товары</option>
            </select>
            <select name="" id="">
              <option value="all">История продаж</option>
            </select>
            </div>
              <label className={styles.filterbarDate}>
                <div className={styles.devSpam}>
                <span>От</span>
                </div>
                <input type="date" />
              </label>
              <label className={styles.filterbarDate}>
                <input type="date" />
              </label>
            
          </form>
          <ADTable dataSource={products} 
          rowKey="_id"
          columns={tableColumns} 
          height="55vh"/>  
          <div className={styles.nav}>
            
          </div>
        </main>
      </div>
    </div>
  );
}