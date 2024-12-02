import { Collection } from "@/app/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Collections = () => {
  
  return (
    <div className="flex justify-center">
      <div className="p-5 md:p-10 lg:p-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 gap-x-10 mt-8">
        {Collection.map(({ id, name, icon,link }) => (
          <Link href={link}>
          <div
            key={id}
            className="border border-gray-200 hover:border-[#3a1910] w-full h-[141px] flex flex-col justify-center items-center text-center p-4 transition duration-200 ease-in-out"
         
          >
            <Image
              src={icon}
              width={70}
              height={70}
              className="object-contain mb-2"
            />
            <span className="text-md text-[#3a1910] font-semibold">{name}</span>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Collections;
