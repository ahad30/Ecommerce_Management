"use client";
import React from 'react';
import { Card } from '@material-tailwind/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoIosArrowForward } from "react-icons/io";

const BreadCrumb = () => {
  const pathName = usePathname();
  let currentLinks = "";
  const crumb = pathName
    .split("/")
    .filter((c) => c !== "")
    .map((item, index) => {
      currentLinks += `/${item}`;
      const linkPath = 
      item === "Dashboard" 
        ? "/Dashboard/AdminHome" 
        : item === "UserBusiness" 
        ? "/UserDashboard/UserBusiness" 
        : item === "UserDashboard" 
        ? "/UserDashboard/UserHome" 
        : currentLinks;
    

      const displayName = item === "Dashboard" ? "Dashboard" : item;
      const isLast = index === pathName.split("/").filter(c => c !== "").length - 1;

      return (
        <div key={linkPath}>
          <Link href={linkPath} legacyBehavior>
            <a
              className={`text-base flex items-center gap-x-2 ${
                isLast ? "text-cyan-700 font-semibold" : ""
              }`}
            >
              <span>{displayName}</span>
              {!isLast && <IoIosArrowForward />}
            </a>
          </Link>
        </div>
      );
    });

  return (
    <Card className='p-2 hidden lg:block mb-5'>
      <div className="flex w-fit my-3 rounded-full flex-wrap gap-x-2">
        {crumb}
      </div>
    </Card>
  );
}

export default BreadCrumb;
