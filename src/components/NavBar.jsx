"use client";
import { nav_icons } from "@/app/data";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SearchBar from "./ui/SearchBar";
import { PiShoppingCartLight } from "react-icons/pi";
import { PiClockCounterClockwiseLight } from "react-icons/pi";
import { LuChevronDown, LuChevronRight } from "react-icons/lu";
import DropDownn from "./ui/DropDownn";
import MainBanner from "./Banners/MainBanner";
import Collections from "./Collections";
import Promotion from "./Promotion";
import TopCategories from "./TopCategories";
import Testonomials from "./Testonomials";
import AboutUs from "./AboutUs";
import FAQs from "./FAQs";
import { CiSearch } from "react-icons/ci";
import { HiMenuAlt1 } from "react-icons/hi";
import { GrFormClose } from "react-icons/gr";
import { Button } from "./ui/button";
import BottomNavi from "./ui/BottomNavi";
import Cart from "./Cart";
import { IoMdHeartEmpty } from "react-icons/io";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import LoginDropDown from "./ui/LoginDropDown";
// import RecentlyView from "./RecentlyView";

const NavBar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const [showMenuLinks, setShowMenuLinks] = useState(true);
  const { data: session, status } = useSession();
  console.log("datataaaff ", session);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640) {
        setNavbarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMenuClick = () => {
    setShowMenuLinks(true);
  };

  const handleAccountClick = () => {
    setShowMenuLinks(false);
  };

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const closeNavbar = () => {
    setNavbarOpen(false);
  };
  return (
    <div className="right-0 ">
      <div className="border-b border-gray-200 w-full lg:h-[80px] ">
        {/* Top nav */}
        <div className=" hidden p-12 ml-10 lg:flex gap-2">
          <Image
            src="/telephone.png"
            alt="tel-icon"
            width={17}
            height={18}
            className="object-contain"
          />
          <p className="lg:text-sm">(+92) 0301-1234 5678</p>
          <div>
            {nav_icons.map((item, i) => (
              <div className="hidden lg:flex lg:gap-6 ml-2" key={i}>
                {item.Nav_icon_List.map((icon, index) => (
                  <Link href="" key={index}>
                    <Image src={icon} alt="navicons" width={13} height={13} />
                  </Link>
                ))}
              </div>
            ))}
          </div>

          <div className="hidden lg:flex lg:items-center lg:gap-4 ml-auto">
            {session?.user ? (
              <>
                <LoginDropDown />
              </>
            ) : (
              <div className="hidden lg:ml-auto text-[15px] lg:flex gap-2">
                <Image
                  src="/profile.png"
                  width={15}
                  height={15}
                  alt="profile"
                  className="object-contain"
                />
                <Link href="/signin">Login Or Register</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-sm:fixed lg:sticky top-0 z-10 bg-white w-full lg:h-[100px] h-[65px] flex items-center justify-between p-4">
        <div
          className="lg:hidden text-2xl cursor-pointer mr-4"
          onClick={() => setNavbarOpen(!navbarOpen)}
        >
          <HiMenuAlt1 />
        </div>

        {/* <div className="lg:ml-32 ml-4 -mt-2">
          <img
            src={"/f-logo.png"}
            alt="main logo"
            className="ml-2 lg:w-[140px] lg:h-[80px] w-[120px]"
          />
          
        </div>

        <div className="hidden lg:grid grid-cols-1">
          <h1 className="text-3xl font-bold">
            <span className="text-[#3a1910]">Nest</span>
            <span className="text-[#906642]">Craft</span>
          </h1>
          <p className="text-[#906642] text-sm">A class of wood work</p>
        </div> */}
        <div className="lg:ml-32 ml-4 -mt-2 flex items-center">
          <img
            src={"/f-logo.png"}
            alt="main logo"
            className="lg:w-[140px] lg:h-[80px] w-[120px] ml-2"
          />

          <div className="hidden lg:block ml-2">
            <h1 className="text-3xl font-bold">
              <span className="text-[#3a1910]">Nest</span>
              <span className="text-[#906642]">Craft</span>
            </h1>
            <p className="text-[#906642] text-sm">A class of wood work</p>
          </div>
        </div>

        <SearchBar />

        <div className="lg:hidden text-2xl -mt-2 ">
          <CiSearch />
        </div>
        <Cart />
      </div>
      {navbarOpen && (
        <div className="absolute inset-0 bg-black opacity-70 z-40"></div>
      )}
      {/* Mobile navbar */}
      <div
        className={`fixed top-0 left-0 h-full w-[89%] bg-white z-50 transition-transform duration-300 transform ${
          navbarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-2 pl-5 right-4 text-2xl "
          onClick={() => setNavbarOpen(false)}
        >
          <GrFormClose />
        </button>
        <div className="pl-2 mt-1">
          {/* Buttons to toggle between Menu and Account links */}
          <div className="flex justify-start gap-1 ">
            <Button
              className="w-52 gap-2 bg-gray-200"
              onClick={handleMenuClick}
            >
              <HiMenuAlt1 />
              Menu
            </Button>
            <Button
              className="w-52 gap-2 bg-gray-200"
              onClick={handleAccountClick}
            >
              <Image
                src="/profile.png"
                width={15}
                height={15}
                alt="profile"
                className="object-contain"
              />
              Account
            </Button>
          </div>

          {showMenuLinks ? (
            <DropDownn closeNavbar={closeNavbar} />
          ) : (
            <ul className="mt-6 ">
              {/* <li>
                <Link
                  href="/signin"
                  className=" py-2 flex items-center gap-2"
                  onClick={() => setNavbarOpen(false)}
                >
                  <Image
                    src="/profile.png"
                    width={20}
                    height={15}
                    alt="profile"
                    className="object-contain "
                  />
                  Login Or Register
                </Link>
              </li> */}
              <li>
                {session?.user ? (
                  <>
                    <LoginDropDown />
                  </>
                ) : (
                  <Link
                    href="/signin"
                    className=" py-2 flex items-center gap-2"
                    onClick={() => setNavbarOpen(false)}
                  >
                    <Image
                      src="/profile.png"
                      width={15}
                      height={15}
                      alt="profile"
                      className="object-contain"
                    />
                    Login Or Register
                  </Link>
                )}
              </li>
              <li>
                <Link
                  href="/WishList"
                  className=" py-2 flex items-center  gap-2"
                  onClick={() => setNavbarOpen(false)}
                >
                  <IoMdHeartEmpty />
                  Wish List
                </Link>
              </li>
              <li>
                <Link
                  href="/orders"
                  className="flex items-center py-2 gap-2"
                  onClick={() => setNavbarOpen(false)}
                >
                  {" "}
                  <Image
                    src="/order-tracking.png"
                    width={20}
                    height={15}
                    alt="profile"
                    className="object-contain"
                  />
                  Order Tracking
                </Link>
              </li>
            </ul>
          )}

          <div className="fixed bottom-0 left-0 w-full bg-white p-4 flex justify-evenly border-t border-gray-300">
            {nav_icons.map((item, i) => (
              <div className="flex gap-10 " key={i}>
                {item.Nav_icon_List.map((icon, index) => (
                  <Link href="" key={index}>
                    <Image src={icon} alt="navicons" width={18} height={18} />
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hidden lg:block">
        <DropDownn />
      </div>
      <div>
        <div className="bg-[#3a1910] w-full h-8 mt-4 lg:flex justify-end items-center text-white font-semibold hidden">
          <div className="flex items-center mr-28">
            <PiClockCounterClockwiseLight className="ml-4" />
            {/* <button onClick={openModal} className="text-sm mr-1">
              Recently Viewed
            </button> */}
            <LuChevronDown />
          </div>
        </div>
        {/* <RecentlyView isOpen={isOpen} closeModal={closeModal} /> */}
      </div>
      {/* <MainBanner />
      <Collections />
      <Promotion />
      <TopCategories />
      <Testonomials />
      <AboutUs />
      <FAQs />
      <div className="lg:hidden  ">
      <BottomNavi/> */}
      {/* </div>  */}
    </div>
  );
};

export default NavBar;
