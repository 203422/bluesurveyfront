import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
    const [isAuth, setAuth] = useState(false);

    return isAuth ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;