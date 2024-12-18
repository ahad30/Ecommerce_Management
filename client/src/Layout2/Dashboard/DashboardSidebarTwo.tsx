/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from "react";

import { adminRoutes } from "../../Routes/Admin.Routes";
import { sidebarGenerator } from "../../utils/sidebarGenerator";
import { Link, useLocation } from "react-router-dom";
import { TRoutesData } from "../../types/sidebarAndRouesTypes";
import { PermissionContextProvider } from "../../contex/PermissionProvider";
import { TAllPermission } from "../../types/permission.types";

import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoIosArrowDropleftCircle } from "react-icons/io";

const DashboardSidebarTwo = ({
  className,
  setIsSidebarOpen,
}: {
  isSidebarOpen?: boolean;
  className?: string;
  setIsSidebarOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { loggedInUserPermissions } = useContext(PermissionContextProvider);

  const handleCheckPermissions = (item: TAllPermission) => {
    if (loggedInUserPermissions.length > 0) {
      if (item == "view dashboard") {
        return true;
      }
      const checkInLoggedInUserPermissions = loggedInUserPermissions.find(
        (per) => per == item
      );
      if (checkInLoggedInUserPermissions) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const [open, setOpen] = useState("");
  const handleOpen = (value: string) => {
    setOpen(open === value ? "" : value);
  };
  const sidebarData = sidebarGenerator(adminRoutes as TRoutesData[]);
  // console.log(sidebarData)

  const actualSideBar = sidebarData
    ?.map((item) => {
      if (item?.permissionName) {
        item = {
          ...item,
          permission: handleCheckPermissions(
            item.permissionName as TAllPermission
          ),
        };
      } else if (item?.children) {
        item.children =
          item.children
            .map((child) => {
              return {
                ...child,
                permission: handleCheckPermissions(
                  child.permissionName as TAllPermission
                ),
              };
            })
            .filter((i) => i?.permission === true) || [];
        item = { ...item, permission: item.children.length > 0 ? true : false };
      }
      return item;
    })
    .filter((per) => per?.permission !== false);
  const location = useLocation();
  useEffect(() => {
    if (localStorage.getItem("dropDown")) {
      const dropDown = JSON.parse(localStorage.getItem("dropDown") as string);
      if (dropDown.collapse) {
        setOpen(dropDown.collapse);
      }
    }
  }, []);
  return (
    <div
      className={`w-[250px] z-10  bg-[#162447] duration-300 ${className} h-screen thin-scrollbar overflow-y-scroll text-[13px] text-[#E0E0E0]  `}
    >
      <div className="pt-12">
        <div className="flex justify-end">
          {setIsSidebarOpen && (
            <button
              onClick={() => setIsSidebarOpen((prev) => !prev)}
              className="lg:hidden mb-3"
            >
              <IoIosArrowDropleftCircle size={35}></IoIosArrowDropleftCircle>
            </button>
          )}
        </div>
        {actualSideBar.map((item) => {
          if (item.children) {
            return (
              <div key={item.key}>
                {/* dropdown header */}
                <div
                  onClick={() => handleOpen(item.key)}
                  className="px-4 cursor-pointer py-3 flex items-center justify-between mr-4 mb-1"
                >
                  {/* text */}
                  <div className="flex items-center gap-x-2">
                    <span>{item.icon}</span>
                    <p className="">{item.label}</p>
                  </div>
                  {/* icon */}
                  <p>
                    {open === item.key ? (
                      <MdOutlineKeyboardArrowDown
                        size={20}
                      ></MdOutlineKeyboardArrowDown>
                    ) : (
                      <MdOutlineKeyboardArrowRight
                        size={20}
                        className=""
                      ></MdOutlineKeyboardArrowRight>
                    )}
                  </p>
                </div>
                {/* dropDown menu */}
                <div
                  className={`overflow-hidden transition-max-height ${
                    open === item?.key
                      ? "max-h-96 opacity-100 opening"
                      : "max-h-0 opacity-0 closing"
                  }`}
                >
                  {item.children?.map((subItem) => (
                    <Link key={subItem.key} to={subItem.key} className="">
                      <div
                        onClick={() => {
                          localStorage.setItem(
                            "dropDown",
                            JSON.stringify({
                              location: location.pathname,
                              collapse: item.key,
                            })
                          );
                        }}
                        className={`pl-7 py-2 mr-4 mb-1 hover:pl-7 hover:py-2 hover:mr-4 hover:mb-1 hover:bg-[#323F5D] hover:rounded-r-full hover:ml-2 duration-500 ${
                          location.pathname === `/admin/${subItem.key}`
                            ? "bg-[#323F5D] rounded-r-full"
                            : ""
                        }`}
                      >
                        <p className="">- {subItem.label}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          } else if (item.permissionName) {
            return (
              <Link to={item.key}>
                <div
                  onClick={() => {
                    setOpen("");
                    localStorage.removeItem("dropDown");
                  }}
                  className={`px-4 py-3 hover:px-4 hover:py-3 hover:rounded-r-full hover:bg-[#323F5D] hover:mr-4 hover:mb-1  mr-4 mb-1 ${
                    location.pathname === item.key
                      ? "bg-[#323F5D] rounded-r-full"
                      : ""
                  }`}
                >
                  <div className="flex  items-center gap-x-2">
                    <span>{item.icon}</span>
                    <p className="">{item.label}</p>
                  </div>
                </div>
              </Link>
            );
          }
        })}
      </div>
    </div>
  );
};

export default DashboardSidebarTwo;
