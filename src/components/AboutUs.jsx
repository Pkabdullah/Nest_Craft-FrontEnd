"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const AboutUs = () => {
  const [about, setAbout] = useState({});

  useEffect(() => {
    async function GetAbout() {
      try {
        const response = await fetch(`http://localhost:1337/api/about-us`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
          },
        });
        const data = await response.json();
        setAbout(data.data);
        console.log("about data", data.data);
      } catch (error) {
        console.error("Error fetching about data:", error);
      }
    }
    GetAbout();
  }, []);

  return (
    <div className="mt-20 overflow-hidden">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[#3a1910]">{about?.MainText}</h1>
      </div>

      <div className="lg:flex lg:justify-center lg:items-center flex flex-wrap pr-6 px-3 ">
        <div className="text-justify lg:text-sm font-normal mt-4 border-2 border-transparent w-[1000px] lg:h-56 space-y-5">
          <p>{about?.p1}</p>
          <p>{about?.p2}</p>
          <p>{about?.p3}</p>
          <p>{about?.p4}</p>
        </div>
      </div>
      {/* Image with text overlay */}
      <div className="relative flex justify-center items-center lg:mt-10 px-4 py-16  ">
        <img
          src="/ddd.png"
          alt="bottom"
          className="lg:w-[1000px] lg:h-[140px] w-[380px] h-[300px]"
        />
        {/* Overlay text */}

        <div className="absolute lg:left-64  lg:mb-4 mb-20 max-sm:p-8">
          <h2 className="text-white text-2xl lg:text-2xl font-semibold text-center  mb-2">
            DON'T <span className="text-[#ff9c00]">MISS</span> THE CHANCE TO GET{" "}
            <span className="text-[#3a1910]">30% OFF</span>
          </h2>
          <p className="text-white text-xs lg:text-sm mt-2 text-center">
            Get the latest products and news updates daily in the fastest way.
          </p>
        </div>
        <div className="absolute lg:right-64 flex gap-4 lg:mb-4 max-sm:mt-44  ">
          <Input
            placeholder="Enter your Email"
            className="max-sm:w-[150px] lg:w-[340px] bg-white border-none"
          />
          <Button className="bg-[#3a1910] text-white font-semibold  rounded-md hover:bg-[#906642]  animate-slideUp delay-300 outline outline-2 outline-white">
            SUBSCRIBE
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

{
  /* <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center px-4">
          <h2 className="text-white text-xl lg:text-2xl font-semibold leading-tight lg:leading-relaxed">
            DON'T <span className="text-[#ff9c00]">MISS</span> THE CHANCE TO GET{" "}
            <span className="text-[#3a1910]">30% OFF</span>
          </h2>
          <p className="text-white text-xs lg:text-sm mt-2">
            Get the latest products and news updates daily in the fastest way.
          </p>
          <div className="flex flex-col lg:flex-row justify-center gap-4 mt-4 lg:mt-6">
            <Input
              placeholder="Enter your Email"
              className="w-full lg:w-[300px] bg-white border-none"
            />
            <Button className="bg-[#3a1910] text-white font-semibold rounded-md hover:bg-[#906642] animate-slideUp delay-300 outline outline-2 outline-white">
              SUBSCRIBE
            </Button>
          </div>
        </div> */
}
