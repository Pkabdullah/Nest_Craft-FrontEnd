"use client";
import FAQs from "@/components/FAQs";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { addToCart } from "../Features/cartslice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { removeFromfavorite } from "../Features/favoriteslice";
import { LiaHeartBrokenSolid } from "react-icons/lia";

const WishList = () => {
  const WishList = useSelector((state) => state.favorite.favoriteItem);
  console.log("wish list data", WishList);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        id: product.id,
        productName: product.productName,
        price: product.price,
        image: product.image,
      })
    );
  };
  const handleRemoveFavorite = (productId) => {
    dispatch(removeFromfavorite(productId));
  };

  return (
    <div>
      <div>
        <h1 className="max-sm:text-4xl font-bold max-sm:p-8 text-4xl p-24 max-sm:mt-14">
          {" "}
          WishList
        </h1>
        <h1 className="text-2xl font-semibold  max-sm:mb-6 max-sm:p-8  px-24">
          My wishlist
        </h1>
        <div className="grid grid-cols-2 gap-10 md:gap-6 lg:hidden max-sm:mt-10 max-sm:ml-10">
          {WishList.length===0 &&
          <div className="flex justify-center items-center mb-20">
         <LiaHeartBrokenSolid className="text-7xl text-red-600"/>
         </div>
          
          }
          {
          WishList.map((item, a) => (
            <div
              key={a}
              className="group w-[172px] p-2 rounded-lg shadow-md border border-gray-200 -ml-8"
            >
              {/* Image */}
              <div className="relative border-b border-transparent  group-hover:border-[#906642] transition duration-300 ease-in-out w-[160px] h-[160px] ">
                <Image
                  src={"/" + item.image}
                  alt="your favorite item here"
                  width={138}
                  height={131}
                  className="object-cover w-full h-full rounded-t-lg"
                />

                <div
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
                  onClick={() => handleRemoveFavorite(item.id)}
                >
                  <MdOutlineDeleteOutline />
                </div>
              </div>

              <div className="flex flex-col items-start mt-2 w-[160px] h-[90px] bg-white">
                <h3 className="text-xs font-medium text-gray-800 line-clamp-2">
                  {item.productName}
                </h3>
                <p className="text-red-600 font-semibold text-md mt-1">
                  Rs {item.price}
                </p>
              </div>

              <div className="flex justify-center  ">
                <Button
                  className="w-36 text-sm bg-[#3a1910] text-white font-semibold rounded-md py-1 hover:bg-[#906642] transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(item);
                    toast.success(
                      `${item.productName} ${""}was added to shoppping cart`,
                      {
                        hideProgressBar: true,
                        icon: ({ theme, type }) => (
                          <img
                            src="/shopping-cart2.png"
                            className="text-white"
                          />
                        ),
                        style: {
                          backgroundColor: "green",
                          color: "#f7fafc",
                        },
                        className: "w-[370px]",
                        position: "top-center",
                      }
                    );
                  }}
                >
                  Add To Cart
                </Button>
              </div>
            </div>
          ))}
        </div>

        <FAQs />
      </div>
      <ToastContainer />
    </div>
  );
};

export default WishList;
