import TopHeader from "./TopHeader";
import { CiLocationOn } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { Link } from "react-router-dom";
import BottomHeader from "./BottomHeader";
const Header = () => {
  return (
    <>
      <div className="bg-secondary py-2 px-4 lg:px-10">
        <div className="text-white max-w-[1100px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-1">
            <CiLocationOn className="font-bold text-base md:text-xl" />
            <span className="text-[12px] md:text-base">Track Order</span>
          </div>
          <div className="text-white flex justify-start items-center gap-2">
            <CiUser className="font-bold text-base md:text-xl" />
            <div className="flex gap-1 text-[12px] md:text-base">
              <Link to="/login">
                Login
              </Link> /
              <Link to="/register">
                Register
              </Link>

            </div>
          </div>
        </div>

      </div>

      <div className="w-[90%] lg:px-7 lg:max-w-7xl mx-auto">
        <TopHeader></TopHeader>
        <BottomHeader></BottomHeader>
      </div>
      <hr className="border-[1px] mt-3" /> 

    </>

  );
};

export default Header;
