import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { PATH_AUTH } from "../constants/paths";
import { getToken } from "../utils/helpers";

interface Props {
  children: ReactNode;
}

const AuthenticatedGuard = ({ children }: Props) => {
  const location = useLocation();

  return getToken() ? (
    <>{children}</>
  ) : (
    <Navigate to={PATH_AUTH.LOGIN} replace state={{ from: location }} />
  );
};

export default AuthenticatedGuard;
