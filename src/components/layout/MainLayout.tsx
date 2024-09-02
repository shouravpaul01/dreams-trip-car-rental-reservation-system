import { Outlet } from "react-router-dom";
import Container from "../ui/Container";
import Header from "../ui/Header";

const MainLayout = () => {
  return (
    <div>
      <Header/>
      <Container>
        <Outlet />
      </Container>
    </div>
  );
};

export default MainLayout;
