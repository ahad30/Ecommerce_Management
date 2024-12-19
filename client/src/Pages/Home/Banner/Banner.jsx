import { Carousel } from "antd";
import img1 from "../../../assets/banner/JRkXIMV6dmHE4HkMsHYnbFQDgwpn3lCWWDRwGiy4 1.png"
import img2 from "../../../assets/banner/Rectangle 4516.png"
import img3 from "../../../assets/banner/canva-black-and-white-simple-pro 1.png"
import React from "react";
const Banner = () => {
  // const contentStyle: React.CSSProperties = {
  //   height: "160px",
  //   color: "#fff",
  //   lineHeight: "160px",
  //   textAlign: "center",
  //   background: "#364d79",
  // };
  return (


  <div className="lg:px-2">
      <Carousel dots={false} autoplay>
      <div>
        <img src={img1} alt="" />
      </div>
      <div>
        <img src={img2} alt="" />
      </div>
      <div>
        <img src={img3} alt="" />
      </div>
   
    </Carousel>
  </div>

  );
};

export default Banner;
