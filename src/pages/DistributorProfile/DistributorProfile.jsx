import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReturnsHistory, fetchSalesHistory, getDistributorById, profileActions } from '../../redux/profileSlice';
import PageHeading from '../../components/PageHeading/PageHeading';
import DistributorInfo from '../../components/DistributorInfo/DistributorInfo';
import CustomButton from '../../components/UI/CustomButton/CustomButton';
import ADTable from '../../components/ADTable/ADTable';
import CustomSelect from '../../components/UI/CustomSelect/CustomSelect';
import styles from './DistributorProfile.module.css';
import { products } from '../../components/CustomTable/beer_data';


export default function DistributorProfile() {
  const { distributorInfo, salesHistory, historySales, category, returnsHistory, isLoading, error, state } = useSelector(
    (state) => state.profile,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { setCategory, setSales, setState } = profileActions

  const initialFilterState = {
    startDate: '',
    endDate: '',
    selectedType: '',
    selectedStatus: '',
  };

  // Использование одного объекта состояния для всех фильтров
  const [filters, setFilters] = useState(initialFilterState); 

  useEffect(() => {
    dispatch(getDistributorById(id));
  }, []);

  

  useEffect(() => {
    console.log(filters.startDate)
    if(historySales === 'return') {
      dispatch(fetchReturnsHistory({ distributorId: id, queryParams: { category, order_date: filters.startDate, return_date: filters.endDate } }));
      return
    } else if(historySales === 'order') {
      dispatch(fetchSalesHistory({ distributorId: id, queryParams: { category, order_date: filters.startDate, return_date: filters.endDate } }));
    }
   
  },[category, filters.startDate, filters.endDate, dispatch, historySales, fetchReturnsHistory, fetchSalesHistory])


  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

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
      dataIndex: "identification_number",
      key: "identification_number",
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
      dataIndex: state === 'Valid' ? 'order_date':'return_date',
      key: state === 'Valid' ? 'order_date':'return_date',
      align: "left",
      width: 135,
    },
  ];

  const data = historySales === 'order' ? salesHistory : returnsHistory

  const products = data.map(product =>  ({
    ...product,
    sum:Math.round(product.price * product.quantity)
  }))

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
            onChange={(value) => dispatch(setCategory(value))}
              options={[
                { label: "Все товары", value:'' },
                { label:"Алкогольное", value:"alcohol" },
                { label:"Безалкогольное", value:"notAlcohol" }
              ]}
              className={styles.select}
            />
            <CustomSelect
              onChange={(value) =>{ 
                dispatch(setSales(value))
                dispatch(setState(value === 'return' ? 'Invalid':'Valid'))
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
            <input type="date" value={filters.startDate} onChange={(e) => handleFilterChange('startDate',e.target.value)} id="startDate" />
            <label className={styles.dateLabel} htmlFor="endDate">
              До
            </label>
            <input type="date" value={filters.endDate} onChange={(e) => handleFilterChange('endDate',e.target.value)} id="endDate" />
          </form>
          <ADTable
            headerBg={state === "Invalid" ? "#ffc2c2" : undefined}
            loading={isLoading}       
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