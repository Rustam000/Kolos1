import { useSelector } from "react-redux";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Layout from "./components/Layout/Layout";
import Warehouse from "./pages/Warehouse/Warehouse";
import DistributorProfile from "./pages/DistributorProfile/DistributorProfile";
import Distributors from "./pages/Distributors/Distributors";
import EditDistributor from "./pages/EditDistributor/EditDistributor";
import EditProduct from "./pages/EditProduct/EditProduct";
import Order from "./pages/Order/Order";
import Return from "./pages/Return/Return";
import Archive from "./pages/Archive/Archive";
import Logout from "./pages/Logout/Logout";

const publicRoutes = (
  <>
    <Route path="/login" element={<Login />} />
    {/* Логин */}
    <Route path="*" element={<Navigate to="/login" />} />
  </>
);

const privateRoutes = (
  <>
    <Route path="/" element={<Layout />}>
      <Route index element={<Navigate to="/warehouse" />} />
      {/* Cклад */}
      <Route path="/warehouse" element={<Warehouse />} />
      {/* Перечень дистрибьюторов */}
      <Route path="/distributors" element={<Distributors />} />
      {/* Карточка дистрибьютора */}
      <Route path="/distributor">
        <Route index element={<DistributorProfile />} />
        <Route path="/distributor/create" element={<EditDistributor />} />
        <Route path="/distributor/edit/:id" element={<EditDistributor />} />
      </Route>
      {/* <Route path="/create-distributor" element={<EditDistributor />} />
      <Route path="/edit-distributor/:id" element={<EditDistributor />} /> */}
      {/* Создание товара */}
      <Route path="/create-product" element={<EditProduct />} />
      {/* Редактирование товара */}
      <Route path="/edit-product/:id" element={<EditProduct />} />
      {/* Отпуск товара*/}
      <Route path="/order" element={<Order />} />
      {/* Возврат товара*/}
      <Route path="/return" element={<Return />} />
      {/* Архив*/}
      <Route path="/archive">
        <Route index element={<Navigate to="warehouse" replace />} />
        <Route path="/archive/warehouse" element={<Archive />} />
        <Route path="/archive/distributors" element={<Archive />} />
      </Route>
    </Route>
    {/* Логин */}
    <Route path="/login" element={<Navigate to="/warehouse" />} />
    <Route path="/logout" element={<Logout />} />
    {/* <Route path="*" element={<Navigate to="/warehouse" />} /> */}
    <Route path="*" element={<h1 style={{ textAlign: "center" }}>404</h1>} />
  </>
);

export default function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <Routes>{user ? privateRoutes : publicRoutes}</Routes>
    </>
  );
}
