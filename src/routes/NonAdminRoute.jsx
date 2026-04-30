import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { isAdminUser } from "../utils/auth";

const NonAdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated && isAdminUser(user)) {
    return <Navigate to="/admin" replace />;
  }

  return children || <Outlet />;
};

export default NonAdminRoute;
