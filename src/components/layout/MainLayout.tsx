import { Outlet } from "react-router-dom";
import Header from "../ui/Header";
import Footer from "../ui/Footer";

const MainLayout = () => {
  return (
    <div className="bg-slate-100">
      <Header/>
      
        <Outlet />
      <Footer/>
    </div>
  );
};

export default MainLayout;
