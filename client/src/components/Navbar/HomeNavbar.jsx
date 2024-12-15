"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  // Button,
  IconButton,
  // Menu,
  // MenuHandler,
  // MenuItem,
  // MenuList,
  Spinner,
  MobileNav,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { LanguageContext } from "@/context/LanguageContext";
import { useGetHeaderQuery } from "@/redux/Feature/Admin/HeaderApi/HeaderApi";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Button, Dropdown, Menu, Spin } from "antd";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import logo from "../../../public/MpUN8FGwxrTcxR5VTjINTuXxuf4HMKB4b2rxDACf.png"

export function HomeNavbar() {
  const { currentLanguage, setCurrentLanguage } = useContext(LanguageContext);
  const pathName = usePathname();
  const router = useRouter();
  const [openNav, setOpenNav] = useState(false);
  const [headerData, setHeaderData] = useState([]);
  const [userToken, setUserToken] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [adminInfo, setAdminInfo] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data } = useGetHeaderQuery();


  const closeMenu = () => setIsMenuOpen(false);


  useEffect(() => {
    const storedUserToken = Cookies.get("userToken") && localStorage.getItem("userToken");
    const storedAuthToken = Cookies.get("authToken") && localStorage.getItem("authToken")

    setUserToken(storedUserToken);
    setAuthToken(storedAuthToken);
    setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
    setAdminInfo(JSON.parse(localStorage.getItem("adminInfo")));
  }, []);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );

    if (data && data.data) {
      try {
        const formattedData = data.data.map((header) => ({
          navLinks: JSON.parse(header.navLinks),
        }));
        setHeaderData(formattedData);
      } catch (e) {
        console.error("Failed to format header data:", e);
      }
    }
  }, [data]);

  const allNavLinks = headerData.map((item) => item.navLinks).flat();

  const handleLogout = async () => {
    setLoading(true); // Start loading

    if (authToken) {
      localStorage.removeItem("adminInfo");
      localStorage.removeItem("authToken");
      Cookies.remove("authToken", { path: "/" });
    } else if (userToken) {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userToken");
      Cookies.remove("userToken", { path: "/" });
    }

    // Simulate a delay for the loading spinner
    setTimeout(() => {
      setLoading(false); // Stop loading after logout is complete
      router.push("/");
    }, 2000);
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="dashboard">
        <a
          onClick={() =>
            router.push(
              authToken ? "/Dashboard/AdminHome" : "/UserDashboard/UserHome"
            )
          }
        >
          Dashboard
        </a>
      </Menu.Item>
      <Menu.Item key="logout">
        <a href={"/"} onClick={handleLogout}>Sign Out</a>
      </Menu.Item>
    </Menu>
  );




  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {allNavLinks.map((link, index) => {
        let linkText = link.label;
        if (link?.label === "Administrative Login") {
          linkText =
            currentLanguage === "en"
              ? "Administrative Login"
              : "প্রশাসনিক লগইন";
        }
        if (link?.label === "Complainant Login") {
          linkText =
            currentLanguage === "en" ? "Complainant Login" : "অভিযোগকারী লগইন";
        }
        if (link?.label === "Complainant Register") {
          linkText =
            currentLanguage === "en"
              ? "Complainant Register"
              : "অভিযোগকারীর নিবন্ধন";
        }
        if (link?.label === "About us") {
          linkText = currentLanguage === "en" ? "About us" : "আমাদের সম্পর্কে";
        }

        if (
          (link.label === "Complainant Login" ||
            link.label === "Administrative Login" ||
            link.label === "Complainant Register") &&
          (authToken || userToken)
        ) {
          return null;
        }

        return (
          <Link href={link?.value} key={index} className="flex ms-5 lg:ms-0 items-center">
            <Typography
              as="li"
              variant="small"
              color="blue-gray"
              className={`px-3 py-2 border  border-gray-300 rounded-[5px] shadow-sm hover:bg-[#203990] hover:text-white transition-all duration-200 font-normal
              ${pathName === link.value ? "bg-[#203990] text-white" : ""}`}
            >
              {linkText}
            </Typography>
          </Link>
        );
      })}
    </ul>
  );

  return (
    <div className="lg:max-w-7xl lg:mx-auto">
     {loading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <Spin color="blue" size="lg" />
        </div>
      )}
      <Navbar className="!shadow-none !rounded-none">
        <div className="flex items-center justify-between text-blue-gray-900">
          {/* Logo and Title */}
          <div className="flex items-center text-blue-gray-900">
            <Link href={"/"}>
              <Image
                src={logo}
                alt="Logo"
                className="w-[100px] h-[70px] lg:w-[150px] lg:h-[100px]"
              />
            </Link>
            <Link href={"/"}>
              <Typography className="cursor-pointer font-semibold hidden lg:block lg:text-2xl">
                {currentLanguage === "en"
                  ? "Grievance Redress System"
                  : "অভিযোগ প্রতিকার ব্যবস্থা"}
              </Typography>
            </Link>
          </div>

          {/* Right Section */}
          <div className="lg:flex items-center gap-4">
            <div className="hidden lg:block">
            {navList}
            </div>

         

            {/* User Menu */}
            {(authToken || userToken) && (
              <Dropdown overlay={userMenu} trigger={["click"]}>
                <Button
                  variant="text"
                  color="blue-gray"
                  className="flex items-center gap-1 rounded-full py-2 pr-2 pl-0.5 lg:ml-auto"
                >
                  {authToken ? adminInfo?.adminFullName : userInfo?.userName}
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className="h-4 w-4 transition-transform"
                  />
                </Button>
              </Dropdown>
            )}

              
             <div className="hidden lg:block">
             <Button
              size="sm"
              variant="outlined"
              className="flex items-center gap-2"
              onClick={() =>
                setCurrentLanguage(currentLanguage === "en" ? "bn" : "en")
              }
            >
              {  currentLanguage === "bn" ?
              <Image
                 src= "/united-states.png"
                alt=""
                width={20}
                height={20}
              />
              :
              <Image
                src= "/bangladesh.png"

                alt=""
                width={20}
                height={20}
              />
      }
              {currentLanguage === "en" ? "BN" : "EN"}
            </Button>
             </div>
          </div>

       
          <IconButton
            variant="text"
            className="lg:hidden"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        
        </div>

        <MobileNav open={openNav}>
          <div className="w-full lg:hidden">
          {navList}
        
          <Button
              size="sm"
              variant="outlined"
              className="mx-5 flex items-center gap-2 mb-5"
              onClick={() =>
                setCurrentLanguage(currentLanguage === "en" ? "bn" : "en")
              }
            >
              {  currentLanguage === "bn" ?
              <Image
                 src= "/united-states.png"
                alt=""
                width={20}
                height={20}
              />
              :
              <Image
                src= "/bangladesh.png"

                alt=""
                width={20}
                height={20}
              />
      }
              {currentLanguage === "en" ? "BN" : "EN"}
            </Button>
   
          </div>
        </MobileNav>
      </Navbar>
    </div>
  );
}
