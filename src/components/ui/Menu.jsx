import { menuItems } from '@/app/data';
import Link from 'next/link';
import React from 'react'

const Menu = () => {
  return (
  
        <nav className="w-full mt-20 ml-6">
          <ul className="flex flex-col space-y-6 lg:flex-row lg:space-x-16 lg:text-[15px] lg:font-medium hover:text-[#3a1910]">
            <li>
              <Link href="/">Home</Link>
            </li>
    
            {menuItems.map((menu, index) => (
              <li key={index} className="relative group ">
                <a className="cursor-pointer">{menu.label}</a>
    
                <div className="absolute left-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 group-hover:translate-y-2 transition-all duration-500 ease-in-out bg-[#fff5ee] shadow-lg rounded-md z-10 w-56 text-sm">
                  <ul className="py-2 space-y-2">
                    {menu.subOptions.map((subOption, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          href={subOption.href}
                          className="block px-4 py-2 text-gray-400 hover:text-[#3a1910] hover:underline"
                        >
                          {subOption.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
    
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
          </ul>
        </nav>
      );
    };
    
  
export default Menu