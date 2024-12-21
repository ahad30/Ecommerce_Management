import { useEffect } from "react";
import { Rating, Star } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Button } from "@material-tailwind/react";
import KeenSlider from "keen-slider";
import "keen-slider/keen-slider.min.css";
import img1 from "../../../assets/Product/product-01.png";
import img2 from "../../../assets/Product/product-02.png";
import img3 from "../../../assets/Product/product-03.webp";
import img4 from "../../../assets/Product/product-04.webp";
import img5 from "../../../assets/Product/product-05.webp";
import img6 from "../../../assets/Product/product-06.webp";
import img7 from "../../../assets/Product/product-07.webp";
import img8 from "../../../assets/Product/product-08.webp";
import img9 from "../../../assets/Product/product-09.png";
import img10 from "../../../assets/Product/product-10.png";
import img11 from "../../../assets/Product/product-11.png";
import img12 from "../../../assets/Product/product-12.png";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import HomeTitle from "../../../components/Home/HomeTitle";
import SectionTitle from "../SectionTitle/SectionTitle";

const productCard = [
  {
    id: 1,
    img: img5,
    title: "Men's Fashion",
    price: "100",
    discount: "Top Sale",
    rating: 2,
  },
  { id: 2, img: img2, title: "Women's Casual", price: "120", rating: 3.5 },
  {
    id: 3,
    img: img3,
    title: "Electronics",
    price: "80",
    discount: "Feature",
    rating: 5,
  },
  { id: 4, img: img4, title: "Kitchen ", price: "90", rating: 5 },
  {
    id: 5,
    img: img4,
    title: "Home Lamp",
    price: "110",
    discount: "New",
    rating: 3.5,
  },
  { id: 6, img: img6, title: "Fitness Watch", price: "95", rating: 5 },
  { id: 7, img: img7, title: "Travel Backpack", price: "150" },
  {
    id: 8,
    img: img8,
    title: "Men's Wallet",
    price: "70",
    discount: "Top Sale",
    rating: 5,
  },
  { id: 9, img: img9, title: "Women's Designer", price: "130", rating: 5 },
  {
    id: 10,
    img: img10,
    title: "Smartphone Case",
    price: "100",
    discount: "Feature",
    rating: 3.9,
  },
  { id: 11, img: img11, title: "Gaming Mouse", price: "85", rating: 4.8 },
  {
    id: 12,
    img: img12,
    title: "Portable Bluetooth",
    price: "110",
    discount: "New",
    rating: 4,
  },
];



const Product = () => {
  useEffect(() => {
    const keenSlider = new KeenSlider("#keen-slider", {
      loop: true,
      slides: {
        origin: "center",
        perView: 1,
        spacing: 16,
      },
      breakpoints: {
        "(min-width: 1024px)": {
          slides: {
            origin: "auto",
            perView: 4,
            spacing: 30,
          },
        },
        "(max-width: 600px)": {
          slides: {
            origin: "center",
            perView: 1,
            spacing: 0,
          },
        },
      },
    });

    const keenSliderPrevious = document.getElementById("keen-slider-previous");
    const keenSliderNext = document.getElementById("keen-slider-next");

    keenSliderPrevious?.addEventListener("click", () => keenSlider.prev());
    keenSliderNext?.addEventListener("click", () => keenSlider.next());

    // return () => {
    //   keenSlider.destroy();
    // };
  }, []);

  const customStyles = {
    itemShapes: Star,
    activeFillColor: '#F6BC3E',
    inactiveFillColor: '#BBF7D0',
  };

  return (
    <div className="mt-16 mb-16">
      <SectionTitle title="TOP NEW ARRIVALS" subTitle="Our Best-Selling and Most Popular Items" />
      <div className="mt-8 flex gap-4 lg:mt-5 justify-end">
        <button
          aria-label="Previous slide"
          id="keen-slider-previous"
          className="rounded-full border  p-3 text-black transition hover:bg-[#FD3D57] hover:text-white"
        >
          <FaAngleLeft></FaAngleLeft>
        </button>

        <button
          aria-label="Next slide"
          id="keen-slider-next"
          className="rounded-full border p-3 text-black transition hover:bg-[#FD3D57] hover:text-white"
        >
          <FaAngleRight></FaAngleRight>
        </button>
      </div>

      {/* product card */}

      <div id="keen-slider" className="mt-16 keen-slider cursor-grabbing">
        {productCard.map((item, index) => (
          <div className="keen-slider__slide border border-gray-200 rounded-lg" key={index}>
            <div className="group h-[250px] relative block bg-black">
              <img
                alt=""
                src={item?.img}
                className="absolute inset-0 h-[250px] w-full object-cover transition-opacity group-hover:opacity-50"
              />

              <div className="relative ">
                <div className="flex justify-between p-4 sm:p-6 lg:p-2">
                  <div>
                    {item?.discount && (
                      <p className="text-sm font-medium uppercase rounded-md px-3 py-1 inline-block bg-primary text-white">
                        {item?.discount}
                      </p>
                    )}
                  </div>
                  <div className="bg-green-300 text-white rounded-full p-1 cursor-pointer">
                    {/* <CiHeart size={30} /> */}
                    <MdOutlineRemoveRedEye size={28} />
                  </div>
                </div>

                <div className="text-center translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100 mt-[155px] duration-700">
                  <button
                    className="bg-secondary text-white w-full font-Poppins font-medium py-2"
                  >
                   <p className="flex items-center justify-center">
                   <CiShoppingCart className="me-2" size={30}/>
                   Add to Cart
                   </p>
                  </button>
                </div>
              </div>
            </div>
            <div className="p-2">
            <div className="mt-5 sm:mt-8 lg:mt-5 text-base font-medium">
              <h2>{item?.title}</h2>
            </div>
            <div className="mt-2 text-base font-medium text-primary">
              <h2>${item?.price}</h2>
            </div>        
              <Rating
                style={{ maxWidth: 140 }}
                value={item?.rating}
                itemStyles={customStyles}
                readOnly
              />

            
            </div>
            <div className="flex justify-center mt-10 mb-5">
              <button
                    className="bg-primary w-full font-Poppins font-medium py-2 px-1
                    rounded-t-none bottom-0 absolute text-white
                    "                  
                  >
                 View Details
              </button>
        </div>
          </div>
        ))}
      </div>
        <div className="flex justify-center mx-auto w-[200px] mt-10 mb-5">
        <Button
                    className="bg-[#3498DB] w-full font-Poppins font-medium py-2 px-1"
                  >
                 See More
                  </Button>
        </div>
    </div>
  );
};

export default Product;
