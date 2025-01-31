import TopHeader from "./TopHeader";
import { CiLocationOn } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import BottomHeader from "./BottomHeader";
import { Button, Dropdown, Menu } from "antd";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../../redux/Hook/Hook";
import { logout, useCurrentToken, useCurrentUser } from "../../redux/Feature/auth/authSlice";
import { IoChevronDownCircleOutline } from "react-icons/io5";
const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(useCurrentUser);
  const token = useAppSelector(useCurrentToken);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("You are successfully logged out.")
    navigate("/")
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="dashboard">
        <a
          onClick={() =>
           navigate(
           token && user?.role === "admin" ? "/admin/home" : "/"
            )
          }
        >
          {   token && user?.role === "admin" ? "Dashboard" : "Order History"}
        </a>
      </Menu.Item>
      <Menu.Item key="logout">
        <a  onClick={handleLogout}>Sign Out</a>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <div className="bg-secondary py-2 px-4 lg:px-10 mb-3">
        <div className="text-white max-w-[1400px] mx-auto flex  flex-col lg:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-1">
            {/* <CiLocationOn className="font-bold text-base md:text-xl" /> */}
            <span className="text-[12px] md:text-base text-center ">All Wearing & Promotional Products, Fast & Free Shipping, and All-Inclusive Pricing</span>
          </div>

          { token  ?
           (            
              <Dropdown overlay={userMenu} trigger={["click"]}>
                <Button
                  variant="text"
                  className="flex  items-center gap-1 rounded-full py-2 pr-2 pl-2 lg:ml-auto text-white"
                >
                  {user?.name }
                  <IoChevronDownCircleOutline
                    strokeWidth={2.5}
                    className="h-4 w-4 transition-transform"
                  />
                </Button>
              </Dropdown>)
               :
         (
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
         )
          }
        </div>

      </div>

      <div className="w-[95%] lg:px-7 lg:max-w-[1400px] mx-auto">
        {/* <TopHeader></TopHeader> */}
        <BottomHeader></BottomHeader>
      </div>
      <hr className="border-[1px] mt-3" /> 
    </>

  );
};

export default Header;
