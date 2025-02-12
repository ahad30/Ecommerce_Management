import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/Hook/Hook";
import { setIsHomeCategorySidebarOpen } from "../../redux/Modal/ModalSlice";
import { MdClose } from "react-icons/md";
import LeftSidebar from "./LeftSidebar/LeftSidebar";
import { CiFilter, CiGrid2H, CiGrid31, CiGrid42 } from "react-icons/ci";
import { Rating, Star } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Button } from "@material-tailwind/react";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaAngleLeft, FaAngleRight, FaGripLinesVertical, FaListAlt } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import ProductsSkeleton from "../../components/Skeleton/ProductsSkeleton";
import { useGetProductsBySearchQuery, useGetProductsQuery } from "../../redux/Feature/Admin/product/productApi";
import { Link } from "react-router-dom";
import { Pagination } from 'antd';

const Shop = () => {
  const dispatch = useAppDispatch();
  const { isHomeCategorySidebarOpen } = useAppSelector((state) => state.modal);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [priceMin, setPriceMin] = useState(1);
  const [priceMax, setPriceMax] = useState(100000000000000);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const { data, error, isLoading , isFetching } = useGetProductsBySearchQuery({
    search: searchQuery,
    page: currentPage,
    limit: limit,
    priceMin: priceMin,
    priceMax: priceMax,
  });

  
  useEffect(() => {
    if (isFetching) {
      setShowSkeleton(true); 
    } else {

      const timer = setTimeout(() => {
        setShowSkeleton(false); 
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isFetching]);


  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Handle pagination change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Extract pagination metadata from the API response
  const totalItems = data?.meta?.totalItems || 0;
  const totalPages = data?.meta?.totalPages || 1;
  const itemsPerPage = data?.meta?.itemsPerPage ;

    // Check if no products are found
    const noProductsFound = !isLoading && !showSkeleton && data?.products?.length === 0 && searchQuery.trim() !== "";


  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Search Bar */}
      <div className="relative w-[100%] md:w-[50%] mx-auto mb-10 flex py-[6px]">
        <div className="w-full">
          <label htmlFor="Search" className="sr-only">
            Search
          </label>
          <form className="" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              id="Search"
              name="search"
              placeholder="Search Products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-2 md:px-4 outline-none py-[2px] md:py-2 border-gray-300 rounded-sm border-[0.5px] pe-10 shadow-sm sm:text-sm"
            />
          </form>

          <div className="absolute -end-2 bg-secondary px-2 md:px-4 top-[6px] bottom-0 flex justify-center items-center rounded-sm h-[29px] md:h-[37px]">
            <IoSearch className="cursor-pointer text-lg text-white"></IoSearch>
          </div>
        </div>
      </div>

      {/* Filters & Sort Button (Mobile) */}
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

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar */}
        <LeftSidebar />

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex flex-col lg:flex-row lg:justify-between justify-center items-center mb-4 space-y-7 lg:space-y-0">
            {/* Sorting Dropdown */}
            <select className="border p-2 rounded outline-none">
              <option value="">Default sorting</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
              <option value="popular">Most Popular</option>
            </select>

            {/* Grid/List View Toggle (Desktop) */}
            <div className="items-center gap-3 hidden lg:flex">
              <div className="cursor-pointer p-2 border rounded hover:bg-gray-100">
                <CiGrid42 size={20} />
              </div>
              <div className="cursor-pointer p-2 border rounded hover:bg-gray-100">
                <FaListAlt size={20} />
              </div>
            </div>
          </div>
          {/* Show Skeleton While Loading */}
          {(isLoading || showSkeleton) && <ProductsSkeleton />}

         {/* Show "Product not found" message if no products match the search */}
         {noProductsFound && (
            <div className="text-center text-xl font-bold text-red-500 mt-10">
              No products found for "{searchQuery}"
            </div>
          )}


          {/* Product Cards */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Map Products Once Data is Loaded */}
            {!isLoading && !showSkeleton &&
              data?.products?.map((item, index) => (
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
                      <h2>From ${item.variants[0]?.price || 0}</h2>
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
        </div>
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-10">
        <Pagination
          current={currentPage}
          total={totalItems} // Use totalItems from the meta object
          pageSize={itemsPerPage} // Use itemsPerPage from the meta object
          onChange={handlePageChange}
        />
      </div>
    </section>
  );
};

export default Shop;