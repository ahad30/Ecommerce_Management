import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/Hook/Hook";
import { setIsHomeCategorySidebarOpen } from "../../redux/Modal/ModalSlice";
import { MdClose } from "react-icons/md";
import LeftSidebar from "./LeftSidebar/LeftSidebar";
import { CiFilter, CiGrid2H, CiGrid31, CiGrid42 } from "react-icons/ci";
import { Rating, Star } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Button } from "@material-tailwind/react";
import img1 from "../../assets/Product/product-01.png";
import img2 from "../../assets/Product/product-02.png";
import img3 from "../../assets/Product/product-03.webp";
import img4 from "../../assets/Product/product-04.webp";
import img5 from "../../assets/Product/product-05.webp";
import img6 from "../../assets/Product/product-06.webp";
import img7 from "../../assets/Product/product-07.webp";
import img8 from "../../assets/Product/product-08.webp";
import img9 from "../../assets/Product/product-09.webp";
import img10 from "../../assets/Product/product-10.webp";
import img11 from "../../assets/Product/product-11.webp";
import img12 from "../../assets/Product/product-11.webp";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import {
  FaAngleLeft,
  FaAngleRight,
  FaGripLinesVertical,
  FaListAlt,
} from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

const productCard = [
  {
    id: 1,
    img: img1,
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

const Shop = () => {
  const dispatch = useAppDispatch();
  const { isHomeCategorySidebarOpen } = useAppSelector((state) => state.modal);

  const customStyles = {
    itemShapes: Star,
    activeFillColor: "#F6BC3E",
    inactiveFillColor: "#BBF7D0",
  };
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
       {/* searchBar */}
       <div className="relative w-[100%] md:w-[50%] mx-auto mb-10 flex py-[6px]">
        <div className="w-full">
          <label htmlFor="Search" className="sr-only">
            Search
          </label>
          <form className="" action="">
            <input
              type="text"
              id="Search"
              name="search"
              placeholder="Search Products..."
              className="w-full px-2 md:px-4 outline-none py-[2px] md:py-2 border-gray-300 rounded-sm border-[0.5px] pe-10 shadow-sm sm:text-sm"
            />
          </form>

          <div className="absolute -end-2 bg-secondary px-2 md:px-4 top-[6px] bottom-0 flex justify-center items-center rounded-sm h-[29px] md:h-[37px]">
            <IoSearch className="cursor-pointer text-lg text-white"></IoSearch>
          </div>
        </div>
      </div>
      <div className="lg:hidden text-black mb-2 flex justify-center">
        <button
          onClick={() => dispatch(setIsHomeCategorySidebarOpen())}
          className="text-2xl py-1 transition duration-500 ease-in-out transform hover:scale-70"
          title={isHomeCategorySidebarOpen ? "Close Menu" : "Open Menu"}
        >
          <span className="cursor-pointer">
            {isHomeCategorySidebarOpen ? (
              <div className="bg-black px-7 text-white rounded-full py-1">
                <MdClose className="inline-block w-6 h-6" />
                <span className="text-base">Filters & Sort</span>
              </div>
            ) : (
              <div className="bg-black px-7 text-white rounded-full py-1">
                <CiFilter className="inline-block w-6 h-6" />
                <span className="text-base">Filters & Sort</span>
              </div>
            )}
          </span>
        </button>
      </div>
   
      <div className="flex flex-col lg:flex-row gap-8">
        <LeftSidebar />
        <div className="flex-1">
          <div className="flex flex-col lg:flex-row lg:justify-between justify-center items-center mb-4 space-y-7 lg:space-y-0">
            <select className="border p-2 rounded outline-none">
              <option value="">Default sorting</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
              <option value="popular">Most Popular</option>
            </select>

            <div className="items-center gap-3 hidden lg:flex">
              <div className="cursor-pointer p-2 border rounded hover:bg-gray-100">
                <CiGrid42 size={20} />
              </div>
              <div className="cursor-pointer p-2 border rounded hover:bg-gray-100">
                <FaListAlt size={20} />
              </div>
            </div>
          </div>
          <div className="mt-16  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {productCard.map((item, index) => (
              <div className="border border-gray-200 rounded-lg" key={index}>
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

                    {/* <div className="text-center translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100 mt-[155px] duration-700">
                  <button
                    className="bg-secondary text-white w-full font-Poppins font-medium py-2"
                  >
                   <p className="flex items-center justify-center">
                   <CiShoppingCart className="me-2" size={30}/>
                   Add to Cart
                   </p>
                  </button>
                </div> */}
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
                    rounded-t-none rounded-b-lg -mb-5 text-white
                    "
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;
