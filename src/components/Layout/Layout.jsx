import { Link, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import Header from "../Header/Header";

export default function Layout() {
  return (
    <div className={styles.Layout}>
      <Header>
        <button>Склад</button>
        <button>Дистрибьюторы</button>
      </Header>
      <Outlet />
      <TemporaryDevNavbar />
    </div>
  );
}

function TemporaryDevNavbar() {
  return (
    <nav
      className="TEMPORARY_DEV_NAVBAR"
      style={{
        position: "fixed",
        bottom: 0,
        padding: "1rem",
        backgroundColor: "orange",
      }}
    >
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <Link to="/warehouse">Cклад</Link>
        <Link to="/distributors">Перечень дистрибьюторов</Link>
        <Link to="/distributor">Карточка дистрибьютора</Link>
        <Link to="/create-distributor">Создание дистрибьютора</Link>
        <Link to="/edit-distributor">Редактирование дистрибьютора</Link>
        <Link to="/create-product">Создание товара</Link>
        <Link to="/edit-product">Редактирование товара</Link>
        <Link to="/order">Отпуск товар</Link>
        <Link to="/return">Возврат товар</Link>
      </div>
      <h2 style={{ textAlign: "center" }}>{"Это временный элемент!"}</h2>
    </nav>
  );
}
