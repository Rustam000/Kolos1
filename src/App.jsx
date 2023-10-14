import { useSelector } from "react-redux";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Layout from "./components/Layout/Layout";
import Warehouse from "./pages/Warehouse/Warehouse";
import DistributorProfile from "./pages/DistributorProfile/DistributorProfile";

const guestRoutes = (
  <>
    <Route path="/login" element={<Login />} />
    <Route path="*" element={<Navigate to="/login" />} />
  </>
);

const authorizedRoutes = (
  <>
    <Route path="/" element={<Layout />}>
      <Route index element={<Navigate to="/warehouse" />} />
      <Route path="/warehouse" element={<Warehouse />} />
      <Route path="/distributors" element={<p>distributors</p>} />
      <Route path="/distributor" element={<DistributorProfile />} />
    </Route>
    {/* <Route path="*" element={<Navigate to="/warehouse" />} /> */}
    <Route path="*" element={<Navigate to="/distributor" />} />
  </>
);

export default function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <Routes>{user ? authorizedRoutes : guestRoutes}</Routes>
    </>
  );
}
