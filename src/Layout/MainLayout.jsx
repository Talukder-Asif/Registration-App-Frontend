import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./footer";

const MainLayout = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
