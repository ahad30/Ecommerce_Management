import { useEffect, useState } from "react";
import DashboardTitle from "../../components/DashboardTitle/DashboardTitle";
import AllProduct from "./AllProduct/AllProduct";
import BannerSlider from "./BannerSlider/BannerSlider";
import InfoCardDetails from "./InfoCardDetails/InfoCardDetails";
import NewsSletter from "./NewsSletter/NewsSletter";
import ProductBanner from "./ProductBanner/ProductBanner";
import NewProduct from "./NewProduct/NewProduct";
// import { useKeenSlider } from "keen-slider/react";
// import "keen-slider/keen-slider.min.css";

const Home = () => {
  // const [sliderRef1] = useKeenSlider({
  //   loop: true,
  //   slides: { perView: 1, spacing: 10 },
  // });

  // const [sliderRef2] = useKeenSlider({
  //   loop: true,
  //   slides: { perView: 1, spacing: 15 },
  // });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div className="">
    <DashboardTitle windowTitle={"Home"}/>
      {/* <div className="grid lg:grid-cols-[2fr_5fr]"> */}
         {/* <HomeLeftSidebar /> */}
        <div className="mt-5">
          <div className="w-full h-full md:h-[80%]">      
            <BannerSlider />
          </div>
          <div className="mt-[-64px] md:mt-[-65px]">
            <ProductBanner />
          </div>
        </div>
      {/* </div> */}
      <div className="mt-6">
        <InfoCardDetails/>
      </div>
      {/* <Category/> */}
   
      <NewProduct/>
      <AllProduct/>
      {/* <TopBrands></TopBrands> */}
    
       <NewsSletter/>

       {/* <div>

      <div ref={sliderRef1} className="keen-slider">
        <div className="keen-slider__slide">Slide 1</div>
        <div className="keen-slider__slide">Slide 2</div>
        <div className="keen-slider__slide">Slide 3</div>
      </div>

      <div ref={sliderRef2} className="keen-slider mt-10">
        <div className="keen-slider__slide">Slide A</div>
        <div className="keen-slider__slide">Slide B</div>
        <div className="keen-slider__slide">Slide C</div>
      </div>
    </div> */}
    </div>
  );
};

export default Home;
