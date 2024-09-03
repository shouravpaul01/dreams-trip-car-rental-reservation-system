import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import NotFound from "../pages/not-found/NotFound";
import DashboardLayout from "../pages/admin/dashboard/DashboardLayout";
import CarType from "../pages/admin/car-type/CarType";
import Car from "../pages/admin/car/Car";
import AboutUs from "../pages/main/about-us/AboutUs";
import HomePage from "../pages/main/home/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement:<NotFound/>,
    children: [
      {
        path:"/",
        element:<HomePage/>
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/admin-dashboard",
        element: <DashboardLayout />,
      },
      {
        path: "/admin-dashboard/car-types",
        element: <CarType />,
      },
      {
        path: "/car",
        element: <Car />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
    ],
  },
]);
