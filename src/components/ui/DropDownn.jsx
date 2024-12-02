import React from "react";
import Link from "next/link";
import { menuItems } from "@/app/data";

const DropDownNav = ({ closeNavbar }) => {
  return (
    <nav className="lg:w-full max-sm:mt-10 mr-8  lg:flex lg:justify-center lg:mt-8 ">
      <ul className="lg:flex lg:justify-center lg:space-x-16 max-sm:space-y-6 lg:text-[15px]  hover:text-[#3a1910]grid grid-cols-1">
        <li>
          <Link href="/" onClick={closeNavbar}>
            Home
          </Link>
        </li>

        {menuItems.map((menu, index) => (
          <li key={index} className="relative group">
            <a className="cursor-pointer">{menu.label}</a>

            <div className="absolute lg:-left-10 invisible opacity-0 group-hover:visible group-hover:opacity-100 group-hover:translate-y-2 transition-all duration-500 ease-in-out bg-white shadow-lg rounded-md z-10 w-56 text-sm">
              <ul className="py-2">
                {menu.subOptions.map((subOption, subIndex) => (
                  <li key={subIndex}>
                    <Link
                      href={subOption.link}
                      className="block px-4 py-2 text-gray-400 hover:text-[#3a1910] hover:underline"
                      onClick={closeNavbar}
                    >
                      {" "}
                      <hr className="bg-red-800" />
                      {subOption.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}

        <li>
          <Link href="/contact-us">Contact Us</Link>
        </li>
      </ul>
    </nav>
  );
};

export default DropDownNav;
