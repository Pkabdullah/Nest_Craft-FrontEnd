import { footerData, nav_icons } from "@/app/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
const Footer1 = () => {
  return (
    <div className=" bg-[#FFF5EE] ">
      <footer className="text-gray-600 body-font lg:ml-36">
        <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <span className="lg:ml-3  text-[#58514b] font-semibold lg:text-sm text=xl flex justify-start">
              CONTACT INFO
            </span>
            <div className="flex flex-row items-start mt-2 gap-2 *: ">
              <CiLocationOn className="text-gray-500" />
              <p className="mt-1 lg:text-xs text-md text-gray-500">
                Abc Pull, XYZ Bank, KHI
              </p>
            </div>
            <div className="flex flex-row items-start mt-2  gap-2">
              <IoCallOutline className="text-gray-500" />
              <p className="mt-1 text-xs text-gray-500">(+92 1234 5678)</p>
            </div>
            <div className="flex flex-row items-start mt-2  gap-2">
              <IoMailOutline className="text-gray-500" />
              <p className="mt-1 text-xs text-gray-500">
                support@nestcraft.com
              </p>
            </div>
            <div className="mt-4">
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
            <Image src={"/fbr.webp"} width={150} height={150} />
          </div>

          <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left ">
            {footerData.map((item,i) => (
              <div key={i} className="lg:w-1/4 md:w-1/2 w-full px-4">
                <h2 className="title-font font-medium text-[#906642] tracking-widest text-sm mb-3">
                  {item.Main}
                </h2>
                <nav className="list-none mb-10 space-y-2">
                  {item.List.map((listItem, index) => (
                    <li key={index}>
                      <a className="text-gray-500 hover:text-red-600 text-sm">
                        {listItem}
                      </a>
                    </li>
                  ))}
                </nav>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#FFF5EE] ">
          <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p className="text-gray-600 lg:text-sm text-md text-center sm:text-left whitespace-nowrap">
              <span className="text-gray-400">©Copyright 2024</span>{" "}
              nestcraft.com <br /> @M Abdullah
            </p>

            <span className=" flex justify-end sm:ml-auto sm:mt-0 mt-2  sm:justify-start  ">
              <Image src="/pay.png" alt="payment" width={120} height={110}  />
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer1;
