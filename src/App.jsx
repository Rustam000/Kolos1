import { useSelector } from "react-redux";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Layout from "./components/Layout/Layout";
import Warehouse from "./pages/Warehouse/Warehouse";

const publicRoutes = (
  <>
    <Route path="/login" element={<Login />} />
    <Route path="*" element={<Navigate to="/login" />} />
  </>
);

const privateRoutes = (
  <>
    <Route path="/" element={<Layout />}>
      <Route index element={<Navigate to="/warehouse" />} />
      <Route path="/warehouse" element={<Warehouse />} />
      <Route path="/distributors" element={<p>distributors</p>} />
    </Route>
    <Route path="*" element={<Navigate to="/warehouse" />} />
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
