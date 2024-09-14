import { ReactNode } from "react";
import { useAppSelector } from "../redux/hook";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children,roles }: { children: ReactNode,roles:string[] }) => {
  const { user } = useAppSelector((state) => state.auth);
  const location = useLocation()
   const checkRole = roles?.includes(user?.role!)

   if (user && checkRole) {
    return children
 }
 return <Navigate to={'/signin'} state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;
