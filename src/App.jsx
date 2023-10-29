import "./App.css";
import { useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Layout from "./components/Layout/Layout";
import Warehouse from "./pages/Warehouse/Warehouse";
import DistributorProfile from "./pages/DistributorProfile/DistributorProfile";
import Distributors from "./pages/Distributors/Distributors";
import EditDistributor from "./pages/EditDistributor/EditDistributor";
import EditProduct from "./pages/EditProduct/EditProduct";
import Order from "./pages/Order/Order";
import Archive from "./pages/Archive/Archive";
import Logout from "./pages/Logout/Logout";

const publicRoutes = (
  <>
    <Route path="/login" element={<Login />} />
    <Route path="*" element={<Navigate to="/login" />} />
  </>
);

const privateRoutes = (
  <>
    <Route path="/" element={<Layout />}>
      <Route index element={<Navigate to="/warehouse" replace />} />
      <Route path="warehouse" element={<Outlet />}>
        <Route index element={<Warehouse />} />
        <Route path="archive" element={<Archive />} />
        <Route path="product" element={<Outlet />}>
          <Route index element={<Navigate to="create" replace />} />
          <Route path="create" element={<EditProduct />} />
          <Route path="edit/:id" element={<EditProduct />} />
        </Route>
      </Route>
      <Route path="distributors" element={<Outlet />}>
        <Route index element={<Distributors />} />
        <Route path="distributor" element={<Outlet />}>
          <Route index element={<Navigate to="/distributors" replace />} />
          <Route path="profile/:id" element={<DistributorProfile />} />
          <Route path="edit/:id" element={<EditDistributor />} />
          <Route path="order/:id" element={<Order />} />
          <Route path="return/:id" element={<Order />} />
          <Route path="create" element={<EditDistributor />} />
        </Route>
        <Route path="archive" element={<Archive />} />
      </Route>
    </Route>
    <Route path="/login" element={<Navigate to="/warehouse" />} />
    <Route path="/logout" element={<Logout />} />
    <Route path="*" element={<h2 style={{ textAlign: "center" }}>404</h2>} />
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
