"use client";
import { PiClockCounterClockwiseLight } from "react-icons/pi";
import { LuChevronDown, LuChevronRight } from "react-icons/lu";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { setviewProduct } from "@/app/Features/slice";
import RecentlyView from "../RecentlyView";
import { useSession } from "next-auth/react";
const MainBanner = () => {
  const [mainBanner, setMainBanner] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fade, setFade] = useState(false);

  // let [isOpen, setIsOpen] = useState(false);

  // function closeModal() {
  //   setIsOpen(false);
  // }

  // function openModal() {
  //   setIsOpen(true);
  // }

  useEffect(() => {
    async function GetMainBanner() {
      try {
        const response = await fetch(
          `http://localhost:1337/api/main-banners?populate=*`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
            },
          }
        );
        const data = await response.json();
        setMainBanner(data.data);
        console.log("MAIN Banner data", data.data);
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    }
    GetMainBanner();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    cssEase: "linear",
    pauseOnHover: false,
    pauseOnFocus: true,
    beforeChange: (current, next) => {
      setFade(true); // Start fade effect
      setCurrentSlide(next);
    },
    afterChange: () => {
      setTimeout(() => {
        setFade(false);
      }, 300);
    },
  };

  return (
    <div className="overflow-hidden">
     

      <Slider {...settings}>
        {mainBanner.map((item, i) =>
          item.image.map((img, a) => (
            <div key={a} className="relative max-sm:mt-16">
              {/* Image with responsive height */}
              <img
                src={"/" + img.name}
                alt={item.Title}
                className="w-full h-[52vh] md:h-[50vh] lg:h-[555px] object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-40"></div>

              <div
                className={`absolute inset-0 bg-black ${
                  fade ? "opacity-75" : "opacity-0"
                } transition-opacity duration-300`}
              ></div>

              {/* Text with animation */}
              <div
                className={`absolute inset-0 flex flex-col items-center justify-center text-center text-[#FFF5EE] px-4 -mt-20 transition-opacity duration-300 ${
                  fade ? "opacity-0" : "opacity-100"
                }`}
              >
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 animate-slideDown -mt-8 ">
                  {currentSlide === i ? (
                    <span>
                      High-quality furniture <br /> store in Pakistan
                    </span>
                  ) : (
                    <span>
                      Find Furniture of your <br />
                      <span className="text-[#906642]">Dream</span> in 2024
                    </span>
                  )}
                </h1>
                <p className="text-[10px] md:text-sm mb-12 animate-slideDown delay-300">
                  {currentSlide === i ? (
                    "LIVING ROOM, BEDROOM, Sofa Sets, Office Furniture "
                  ) : (
                    <span className="">Interior Design: When Minimalism Collides</span>
                  )}
                </p>

                <a
                  href="#"
                  className="flex items-center gap-2 px-3 py-2 -mt-6 lg:px-8 lg:py-3 text-xs bg-[#3a1910] text-white font-semibold rounded-md hover:bg-[#906642] animate-slideUp delay-300 outline outline-2 outline-white"
                >
                  {currentSlide === i ? "SHOP NOW" : "DISCOVER"}{" "}
                  <LuChevronRight />
                </a>
              </div>
            </div>
          ))
        )}
      </Slider>

      <style jsx>{`
        .animate-slideDown {
          animation: slideDown 1s forwards;
        }

        .animate-slideUp {
          animation: slideUp 1s forwards;
        }

        @keyframes slideDown {
          0% {
            transform: translateY(-50px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideUp {
          0% {
            transform: translateY(50px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default MainBanner;
