import { Testo } from "@/app/data";
import Image from "next/image";
import React from "react";

const Testonomials = () => {
  return (
    <div className="grid grid-cols-2 gap-5 mt-16 sm:grid-cols-2 md:grid-cols-2 lg:flex lg:justify-center lg:space-x-5 ml-5">
      {Testo.map((item, i) => (
        <div
          key={i}
          className="flex flex-col justify-center items-center text-center border border-gray-200 p-4 lg:w-auto lg:h-[131px] w-[120px]  transition-transform transform hover:scale-105"
        >
          <Image
            src={item.icon}
            width={40}
            height={40}
            className="mb-2"
            alt={item.mainText}
          />
          <h1 className="font-semibold lg:text-lg text-[13px] whitespace-nowrap">
            {item.mainText}
          </h1>
          <p className="hidden md:block text-sm text-gray-500">
            {item.primaryText}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Testonomials;

// import { Testo } from "@/app/data";
// import Image from "next/image";
// import React from "react";

// const Testonomials = () => {
//   return (
//     <div className="flex justify-center space-x-5  mt-20" >
//       {Testo.map((item, i) => (
//         <div key={i} className="flex flex-col justify-center items-center text-center border border-gray-200 w-[255px] h-[131px] ">
//           <Image src={item.icon}width={40} height={40} className="" />
//           <h1 className="font-semibold  text-">{item.mainText}</h1>
//           <p className="text-sm text-gray-500">{item.primaryText}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Testonomials;
