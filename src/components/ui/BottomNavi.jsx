"use client";
import React from "react";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { IoMdHeartEmpty } from "react-icons/io";
import { CiHome } from "react-icons/ci";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
const BottomNavi = () => {
  const WishList = useSelector((state) => state.favorite.favoriteItem);

  return (
    <div>
      <div className="fixed bottom-0 left-0  w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
        <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
          
            <button
              type="button"
              className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
            ><Link href={"/"}>
              <CiHome className="text-2xl text-gray-600" /></Link>
              <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                Home
              </span>
            </button>
          
         
            <button
              type="button"
              className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
            > <Link href={"/WishList"}>
              <IoMdHeartEmpty className="text-2xl text-gray-600" />  </Link>
              <span className="absolute top-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white lg:bg-[#3a1910] bg-red-600 rounded-full -mr-4 ">
                {WishList.length}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                WishList
              </span>
            </button>
        

          <button
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <HiOutlinePencilSquare className="text-2xl text-gray-600" />

            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Orders
            </span>
          </button>
          <button
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <Image
              src="/profile.png"
              width={20}
              height={15}
              alt="profile"
              className="object-contain"
            />
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Account
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomNavi;
