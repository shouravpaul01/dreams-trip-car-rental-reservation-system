import { ReactNode } from "react";
import { useAppSelector } from "../redux/hook";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children,roles }: { children: ReactNode,roles:string[] }) => {
  const { user,token } = useAppSelector((state) => state.auth);
  const location = useLocation()
   const checkRole = roles?.includes(user?.role!)
if (!token) {
  return <Navigate to={'/signin'}  replace/>
}
   if (user && checkRole) {
    return children
 }
 return <Navigate to={'/signin'} state={{ from: location }} replace/>
};

export default PrivateRoute;
