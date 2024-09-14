import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import NotFound from "../pages/not-found/NotFound";
import DashboardLayout from "../pages/admin/dashboard/DashboardLayout";
import CarType from "../pages/admin/car-type/CarType";
import Car from "../pages/admin/car/Car";
import HomePage from "../pages/main/home/HomePage";
import CarListingPage from "../pages/main/car-listing/CarListingPage";
import BookingPage from "../pages/main/booking/BookingPage";
import CarDetails from "../pages/main/car-details/CarDetails";
import AboutUsPage from "../pages/main/about-us/AboutUsPage";
import PrivateRoute from "./PrivateRoute";
import { userRole } from "../constant";

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
        path:"/car-listings",
        element:<CarListingPage/>
      },
      {
        path:"/car-listings/:id",
        element:<CarDetails/>
      },
      {
        path:"/booking/:id",
        element:<BookingPage/>
      },
      {
        path: "/about",
        element: <AboutUsPage />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      
    ],
  },
  {
    path: "admin-dashboard",
    element: <PrivateRoute roles={[userRole.admin]}><MainLayout /></PrivateRoute>,
    errorElement:<NotFound/>,
    children: [
     
      {
        path: "/admin-dashboard",
        element: <DashboardLayout />,
      },
      {
        path: "/admin-dashboard/car-types",
        element: <CarType />,
      },
      // {
      //   path: "/car",
      //   element: <Car />,
      // },
      
    ],
  },
]);
