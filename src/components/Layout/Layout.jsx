import { Link, Outlet, useNavigate } from "react-router-dom";
import styles from "./Layout.module.css";
import Header from "../Header/Header";
import CustomButton from "../UI/CustomButton/CustomButton";

export default function Layout() {
  const navigate = useNavigate();
  return (
    <div className={styles.Layout}>
      <TemporaryDevNavbar />
      <Header>
        <CustomButton
          variant="secondary"
          width="narrow"
          onClick={() => navigate("/warehouse")}
        >
          Склад
        </CustomButton>
        <CustomButton width="narrow" onClick={() => navigate("/distributors")}>
          Дистрибьюторы
        </CustomButton>
      </Header>
      <Outlet />
    </div>
  );
}

function TemporaryDevNavbar() {
  return (
    <nav
      className="TEMPORARY_DEV_NAVBAR"
      style={{
        /* position: "fixed",
        bottom: 0,
        left: 0,
        right: 0, */
        padding: "1rem",
        backgroundColor: "orange",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          justifyContent: "space-around",
          marginBottom: "1rem",
        }}
      >
        <Link to="/warehouse">Cклад</Link>
        <Link to="/distributors">Перечень дистрибьюторов</Link>
        <Link to="/distributor">Карточка дистрибьютора</Link>
        <Link to="/create-distributor">Создание дистрибьютора</Link>
        {/* <Link to="/edit-distributor">Редактирование дистрибьютора</Link> */}
        <Link to="/create-product">Создание товара</Link>
        {/* <Link to="/edit-product">Редактирование товара</Link> */}
        <Link to="/order">Отпуск товара</Link>
        {/* <Link to="/return">Возврат товара</Link> */}
        <Link to="/archive">Архив</Link>
      </div>
      <h2 style={{ textAlign: "center" }}>
        {"Временная навигационная панель"}
      </h2>
    </nav>
  );
}
