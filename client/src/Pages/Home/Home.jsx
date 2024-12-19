
import BannerSlider from "./BannerSlider/BannerSlider";
import Category from "./Category/Category";
import HomeLeftSidebar from "./HomeLeftSidebar/HomeLeftSidebar";
import InfoCardDetails from "./InfoCardDetails/InfoCardDetails";
import ProductBanner from "./ProductBanner/ProductBanner";
import TopBrands from "./TopBrands/TopBrands";

const Home = () => {
  return (
    <div className="">
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

      <Category/>
      <TopBrands></TopBrands>
       {/* <Product></Product> */}
      {/* <BusinessSummary></BusinessSummary>  */}
    </div>
  );
};

export default Home;
