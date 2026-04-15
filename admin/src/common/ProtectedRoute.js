import { Navigate, Outlet } from "react-router-dom";
import Path from "./Path";

export default function ProtectedRoute({ isAuth }) {
    return isAuth ? <Outlet /> : <Navigate to={Path.LOGIN} />;
}
