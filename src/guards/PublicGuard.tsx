import { Navigate, Outlet, useLocation } from "react-router-dom";
import { PATH } from "../constants/paths";
import { getToken } from "../utils/auth";

const PublicGuard = () => {
  const location = useLocation();

  return !getToken() ? <Outlet /> : <Navigate to={PATH.HOME} replace state={{ from: location }} />;
};

export default PublicGuard;
