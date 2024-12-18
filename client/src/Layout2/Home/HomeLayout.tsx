import { Outlet } from "react-router-dom";

import Footer from "../../common/Footer/Footer";
import Header from "../../common/Header/Header";
import NewsSletter from "../../Pages/Home/NewsSletter/NewsSletter";

const HomeLayout = () => {
  
  return (
    <>
      <Header></Header>
      <div className="w-[90%] lg:max-w-[1250px] mx-auto ">
        <Outlet></Outlet>
      </div>
      <NewsSletter></NewsSletter>
      <Footer></Footer>
    </>
  );
};

export default HomeLayout;
