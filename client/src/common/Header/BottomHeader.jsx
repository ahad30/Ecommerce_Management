import {
  Navbar,
  Typography,
  IconButton,
  Collapse,
  MobileNav,
} from "@material-tailwind/react";
import React from "react";
import { NavLink } from "react-router-dom";

const BottomHeader = () => {
  const [openNav, setOpenNav] = React.useState(false);
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="flex   flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-8">
      <Typography
        as="li"
        color="blue-gray"
        className={`p-1 text-sm`}
      >
        <NavLink
          style={({ isActive, isTransitioning }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "red" : "black",
              viewTransitionName: isTransitioning ? "slide" : "",
            };
          }}
          to="/"
          className="flex items-center text-[#150B2BB3]"
        >
          Home
        </NavLink>
      </Typography>
      <Typography
        as="li"
   
        color="blue-gray"
        className={`px-2 text-sm`}
      >
        <NavLink
          style={({ isActive, isTransitioning }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "red" : "black",
              viewTransitionName: isTransitioning ? "slide" : "",
            };
          }}
          to="/allArt&Craft"
          className="flex items-center text-[#150B2BB3]"
        >
          Shop
        </NavLink>
      </Typography>

      <Typography
       
        as="li"
        color="blue-gray"
        className={`px-2 text-sm`}
      >
        <NavLink
          style={({ isActive, isTransitioning }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "red" : "black",
              viewTransitionName: isTransitioning ? "slide" : "",
            };
          }}
          to="/myList"
          className="flex items-center text-[#150B2BB3]"
        >
          About
        </NavLink>
      </Typography>

      <Typography
       
        as="li"
        color="blue-gray"
        className={`px-2 text-sm`}
      >
        <NavLink
          style={({ isActive, isTransitioning }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "red" : "black",
              viewTransitionName: isTransitioning ? "slide" : "",
            };
          }}
          to="/myList"
          className="flex items-center text-[#150B2BB3]"
        >
          Contact
        </NavLink>
      </Typography>


    </ul>
  );

  return (
    <div className="max-h-[768px]">
      <Navbar
        className="sticky top-0 py-1 shadow-none rounded-none
      bg-white-[0px] border-none px-0"
     
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 ">
            <div className="mr-2 hidden lg:block">{navList}</div>
          </div>

          <div className="flex items-center gap-2">
            <IconButton
          
              variant="text"
              className=" h-6 w-6 text-black hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
            <div></div>
          </div>
        </div>
        <MobileNav open={openNav} className={`flex justify-start`}>
          {navList}
        </MobileNav>
      </Navbar>
    </div>
  );
};

export default BottomHeader;
