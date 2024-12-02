import React from "react";
import { Input } from "./input";
import { IoSearchOutline } from "react-icons/io5";
import Dropdown from "./DropDown";
import { categories } from "@/app/data";

const SearchBar = () => {
  return (
    <div className="hidden lg:flex lg:ml-12">
      <Dropdown options={categories} />
      <div className="flex">
        <Input
          type="text"
          className="w-[400px] h-8 border-gray-200 text-black  text-lg "
          placeholder="Find some class of woodwork"
        />
        <div className="px-2 py-1 bg-[#3a1910]">
          <IoSearchOutline className="text-white text-xl" />
        
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
