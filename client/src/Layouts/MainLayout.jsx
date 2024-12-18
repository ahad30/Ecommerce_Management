import { Outlet } from "react-router-dom";
import Header from "../common/Header/Header";
import Footer from "../common/Footer/Footer";

const MainLayout = () => {
  return (
    <div>
      <Header />
      <div className="h-screen">
      <Outlet/>
      </div>
      <Footer/>
    </div>
  );
};

export default MainLayout;
