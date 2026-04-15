import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./App.css";
import Path from "./common/Path";
import Layout from "./components/Layout";
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";
import ProductScreen from "./screens/ProductScreen";
import CategoryScreen from "./screens/CategoryScreen";
import MediaScreen from "./screens/MediaScreen";
import OrderScreen from "./screens/OrderScreen";
import UserScreen from "./screens/UserScreen";
import { useState } from "react";
import ProtectedRoute from "./common/ProtectedRoute";

function App() {
  const JWTSECODE = (arg) => {
    try {
      return jwtDecode(arg);
    } catch (error) {
      return null;
    }
  };

  const token = localStorage.getItem("token");
  const [Auth] = useState(token);
  const [UserInfo] = useState(token ? JWTSECODE(token) : null);

  const isAuth = () => {
    if (Auth && UserInfo?.role === 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path={Path.LOGIN} element={isAuth() ? <Navigate to={Path.DASHBOARD} /> : <LoginScreen />} />
        <Route element={<ProtectedRoute isAuth={isAuth()} />}>
          <Route path={Path.DASHBOARD} element={<Layout component={<DashboardScreen />} />} />
          <Route path={Path.PRODUCTS} element={<Layout component={<ProductScreen />} />} />
          <Route path={Path.CATEGORIES} element={<Layout component={<CategoryScreen />} />} />
          <Route path={Path.MEDIA} element={<Layout component={<MediaScreen />} />} />
          <Route path={Path.ORDERS} element={<Layout component={<OrderScreen />} />} />
          <Route path={Path.USERS} element={<Layout component={<UserScreen />} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
