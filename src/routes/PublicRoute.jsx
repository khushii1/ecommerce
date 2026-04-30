import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { isAdminUser } from "../utils/auth";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={isAdminUser(user) ? "/admin" : "/"} replace />;
  }

  return children || <Outlet />;
};

export default PublicRoute;
