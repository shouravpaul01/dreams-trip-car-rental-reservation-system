import { Outlet } from "react-router-dom";
import Container from "../ui/Container";

const MainLayout = () => {
  return (
    <div>
      <Container>
        <Outlet />
      </Container>
    </div>
  );
};

export default MainLayout;
