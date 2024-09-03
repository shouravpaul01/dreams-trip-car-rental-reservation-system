import { Outlet } from "react-router-dom";
import Container from "../ui/Container";
import Header from "../ui/Header";

const MainLayout = () => {
  return (
    <div className="relative">
      <Header/>
      
        <Outlet />
      
    </div>
  );
};

export default MainLayout;
