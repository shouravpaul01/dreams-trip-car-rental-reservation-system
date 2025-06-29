import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import NotFound from "../pages/not-found/NotFound";
import HomePage from "../pages/main/home/HomePage";
import CarListingPage from "../pages/main/car-listing/CarListingPage";

import CarDetails from "../pages/main/car-details/CarDetails";
import AboutUsPage from "../pages/main/about-us/AboutUsPage";
import PrivateRoute from "./PrivateRoute";
import { userRole } from "../constant";
import DashboardPage from "../pages/main/user-dasboard/DashboardPage";
import PaymentCencel from "../pages/payment/PaymentCencel";
import AdminDashboardLayout from "../components/layout/AdminDashboardLayout";
import UserPage from "../pages/admin/user/UserPage";
import { CarTypePage } from "../pages/admin/car-type/CarTypePage";
import PricePage from "../pages/admin/price/PricePage";
import { CarPage } from "../pages/admin/car/CarPage";

import ProfilePage from "../pages/admin/profile/ProfilePage";
import BookingPage from "../pages/main/booking/BookingPage";
import { AdminBookingPage } from "../pages/admin/booking/BookingPage";

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
        element:<PrivateRoute roles={[userRole.user,userRole.admin]}><BookingPage/></PrivateRoute>
      },
      {
        path: "/about",
        element: <AboutUsPage />,
      },
      {
        path: "/dashboard",
        element: <PrivateRoute roles={[userRole.user,userRole.admin]}><DashboardPage /></PrivateRoute>,
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
        path: "/payment-cencel",
        element: <PaymentCencel />,
      },
    ],
  },
  {
    path: "/admin/dashboard",
    element: <PrivateRoute roles={[userRole.admin]}><AdminDashboardLayout /></PrivateRoute>,
    errorElement:<NotFound/>,
    children: [
     
      {
        path: "/admin/dashboard",
        element: <DashboardPage />,
      },
     {
        path: "/admin/dashboard/manage-users",
        element: <UserPage />,
      },
      {
        path: "/admin/dashboard/profile",
        element: <ProfilePage />,
      },
     {
        path: "/admin/dashboard/manage-Types",
        element: <CarTypePage />,
      },
     {
        path: "/admin/dashboard/manage-prices",
        element: <PricePage />,
      },
      {
        path: "/admin/dashboard/manage-cars",
        element: <CarPage />,
      },
       {
        path: "/admin/dashboard/manage-bookings",
        element: <AdminBookingPage />,
      },
    ],
  },
]);
