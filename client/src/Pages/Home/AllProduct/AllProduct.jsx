import { useEffect, useState } from "react";
import { Rating, Star } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Button } from "@material-tailwind/react";
import img1 from "../../../assets/Product/product-01.png";
import img2 from "../../../assets/Product/product-02.png";
import img3 from "../../../assets/Product/product-03.webp";
import img4 from "../../../assets/Product/product-04.webp";
import img5 from "../../../assets/Product/product-05.webp";
import img6 from "../../../assets/Product/product-06.webp";
import img7 from "../../../assets/Product/product-07.webp";
import img8 from "../../../assets/Product/product-08.webp";
import img9 from "../../../assets/Product/product-09.webp";
import img10 from "../../../assets/Product/product-10.webp";
import img11 from "../../../assets/Product/product-11.webp";
import img12 from "../../../assets/Product/product-11.webp";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import SectionTitle from "../SectionTitle/SectionTitle";
import { useGetProductsQuery } from "../../../redux/Feature/Admin/product/productApi";
import ProductsSkeleton from "../../../components/Skeleton/ProductsSkeleton";



const AllProduct = () => {
  const { data, error, isLoading } = useGetProductsQuery();
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowSkeleton(false);
      }, 3000); // 2 seconds delay

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (isLoading || showSkeleton) {
    return <ProductsSkeleton />;
  }

  return (
    <div className="mt-16 mb-16">
      <SectionTitle title="Recommended For you" subTitle="Empowering everyone to express themselves through clothes." />

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data?.products?.slice(0,8).map((item, index) => (
          <div className="border border-gray-200 rounded-lg" key={index}>
            <div className="group h-[250px] relative block bg-black">
              <img
                alt={item?.name}
                src={item?.imageUrl || "https://placehold.co/300x250"}
                className="absolute inset-0 h-[250px] w-full object-cover transition-opacity group-hover:opacity-50"
              />

              <div className="relative">
                <div className="flex justify-between p-4 sm:p-6 lg:p-2">
                  <div>
                    {item?.topSale === true && (
                      <p className="text-sm font-medium uppercase rounded-md px-3 py-1 inline-block bg-primary text-white">
                        {item?.topSale && "Top Sale"}
                      </p>
                    )}
                    {item?.newArrival === true && (
                      <p className="text-sm font-medium uppercase rounded-md px-3 py-1 inline-block bg-primary text-white">
                        {item?.newArrival && "Newest"}
                      </p>
                    )}
                  </div>
                  <div className="bg-green-300 text-white rounded-full p-1 cursor-pointer">
                    <MdOutlineRemoveRedEye size={28} />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-2">
              <div className="mt-5 sm:mt-8 lg:mt-5 text-base font-medium">
                <h2>{item?.name}</h2>
              </div>
              <div className="mt-2 text-base font-medium text-primary">
                <h2>${item?.price}</h2>
              </div>
            </div>
             <Link to={`/product/${item?.id}`}>
            <div className="flex justify-center mt-10 mb-5">
             <button
                className="bg-primary w-full font-Poppins font-medium py-2 px-1 rounded-t-none rounded-b-lg -mb-5 text-white"
              >
                View Details
              </button>
            </div>
             </Link>
          </div>
        ))}
      </div>
        <Link to={`/shop`}>
      <div className="flex justify-center mx-auto w-[200px] mt-10 mb-5">
          <Button className="bg-[#3498DB] w-full font-Poppins font-medium py-2 px-1">
            See More
          </Button>
      </div>
        </Link>
    </div>
  );
};

export default AllProduct;