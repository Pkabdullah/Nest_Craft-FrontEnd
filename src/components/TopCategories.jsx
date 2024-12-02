"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import LoadingAnimation from "./ui/LoadingAnimation";
import { IoChevronForward } from "react-icons/io5";
import { Button } from "./ui/button";
import { CiHeart } from "react-icons/ci";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { FaEye, FaHeart } from "react-icons/fa";
import ProductView from "./ProductView";
import { useDispatch } from "react-redux";
import { setselectedProduct, setviewProduct } from "@/app/Features/slice";
import { useRouter } from "next/navigation";
import { addToCart } from "@/app/Features/cartslice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addTofavorite } from "@/app/Features/favoriteslice";

const TopCategories = () => {
  const [topcategory, setTopcategory] = useState([]);
  const [category, setCategory] = useState("Sofa Set");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  let [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal(product) {
    setIsOpen(true);
    dispatch(setviewProduct([product]));
  }

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        id: product.id,
        productName: product.Title || product.productName,
        price: product.Price || product.productPrice,
        image: product.image.name,
      })
    );
  };
  const handleAddToFavorite = (product) => {
    dispatch(
      addTofavorite({
        id: product.id,
        productName: product.Title || product.productName,
        price: product.Price || product.productPrice,
        image: product.image.name,
      })
    );
  };

  useEffect(() => {
    async function GetMainBanner() {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/top-categories?filters[category][$eq]=${category}&populate=*`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
            },
          }
        );
        const data = await response.json();
        setTopcategory(data.data);
        console.log("top categories data ", data.data);
      } catch (error) {
        console.error("Error fetching promotion data:", error);
      } finally {
        setLoading(false);
      }
    }
    console.log("Fetching data for category:", category);
    GetMainBanner();
  }, [category]);

  function handleSelectedProduct(product) {
    dispatch(setselectedProduct([product]));
    const productName = product.Title;
    router.push(`/product-details/${productName}`);
  }
  return (
    <div className="p-10 bg-white">
      {/* Title */}
      <div className="lg:ml-32 text-[#906642] ml-4">
        <h1 className="lg:text-3xl text-[25px] font-semibold">
          Top Categories
        </h1>
      </div>

      {/* Navigation */}
      <nav>
        <ul className=" overflow-auto mt-4 py-2 flex justify-between lg:justify-end gap-8 lg:-mt-7 lg:mr-32 lg:text-sm text-[14px] font-medium text-gray-400">
          <li>
            <button
              onClick={() => setCategory("Sofa Set")}
              className={`transition-colors duration-500 whitespace-nowrap px-4 py-2  ${
                category === "Sofa Set"
                  ? "text-[#906642]   "
                  : "hover:text-[#906642]"
              }`}
            >
              Sofa Set
            </button>
          </li>
          <li>
            <button
              onClick={() => setCategory("Bed")}
              className={`transition-colors duration-500 whitespace-nowrap px-4 py-2  ${
                category === "Bed"
                  ? "text-[#906642]   "
                  : "hover:text-[#906642]"
              }`}
            >
              Bed
            </button>
          </li>
          <li>
            <button
              onClick={() => setCategory("Dressing Table")}
              className={`transition-colors duration-500 whitespace-nowrap px-4 py-2  ${
                category === "Dressing Table"
                  ? "text-[#906642]   "
                  : "hover:text-[#906642]"
              }`}
            >
              Dressing Table
            </button>
          </li>
          <li>
            <button
              onClick={() => setCategory("Bed Set")}
              className={`transition-colors duration-500 whitespace-nowrap px-4 py-2  ${
                category === "Bed Set"
                  ? "text-[#906642]   "
                  : "hover:text-[#906642]"
              }`}
            >
              Bed Set
            </button>
          </li>
          <li>
            <button
              onClick={() => setCategory("Dinning Table")}
              className={`transition-colors duration-500 whitespace-nowrap px-4 py-2  ${
                category === " Dinning Table"
                  ? "text-[#906642]   "
                  : "hover:text-[#906642]"
              }`}
            >
              Dinning Table
            </button>
          </li>
        </ul>
      </nav>

      {/* Loader */}
      {loading && <LoadingAnimation />}

      {/* No Products */}
      {!loading && topcategory.length === 0 && <p>No Products Found</p>}

      {!loading && topcategory.length > 0 && (
      
        <div className="lg:mt-10 relative lg:ml-32">
          <div className="hidden  lg:grid lg:grid-cols-4 lg:gap-y-8 lg:pr-24">
            {topcategory.map((item, a) => (
              <div key={a} className="group ">
                {/* Image */}
                <div
                  className="border border-transparent w-[250px] h-[250px] group-hover:border-[#906642] hover:border-b-0 transition duration-300 ease-in-out relative "
                  onClick={() => handleSelectedProduct(item)}
                >
                  <Image
                    src={"/" + item.image?.name}
                    alt={item.Title}
                    width={550}
                    height={250}
                    className="object-cover w-full h-full"
                  />

                  {/* Hover Buttons */}
                  <div className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Button 1: Category */}
                    <button
                      className="bg-white text-[#906642] p-2 rounded-full shadow-md hover:bg-[#906642] hover:text-white transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(item);
                        toast.success(
                          `${item.Title} ${""}was added to shoppping cart`,
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
                            className: "w-[690px]  ",
                            position: "top-center",
                          }
                        );
                      }}
                    >
                      <MdOutlineShoppingCartCheckout />
                    </button>
                    {/* Button 2: View */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(item);
                      }}
                      className="bg-white text-[#906642] p-2 rounded-full shadow-md hover:bg-[#906642] hover:text-white transition-colors"
                    >
                      <FaEye />
                    </button>
                    {/* Button 3: Like */}
                    <button
                      className="bg-white text-[#906642] p-2 rounded-full shadow-md hover:bg-[#906642] hover:text-white transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToFavorite(item);
                        toast.success("product added")
                      }}
                    >
                      <FaHeart />
                    </button>
                  </div>
                </div>
                {/* Title Description */}
                <div className="border border-transparent bg-white w-[250px] h-[93px] border-t-0 flex flex-col justify-center group-hover:border-[#906642]">
                  <h3 className="text-sm ml-2">{item.Title}</h3>
                  <p className="text-red-600 font-semibold text-[14px] ml-2 mt-2">
                    Rs {item.Price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Grid layout for small screens */}
          <div className="grid grid-cols-2 gap-20 md:gap-6 lg:hidden max-sm:mt-10">
            {topcategory.map((item, a) => (
              <div
                key={a}
                className="group w-[172px] p-2 rounded-lg shadow-md border border-gray-200 -ml-8 bg-white"
              >
                {/* Image */}
                <div className="relative border-b border-transparent  group-hover:border-[#906642] transition duration-300 ease-in-out w-[160px] h-[160px] "
                   onClick={() => handleSelectedProduct(item)}
                
                >
                  <Image
                    src={"/" + item.image?.name}
                    alt={item.Title}
                    width={138}
                    height={131}
                    className="object-cover w-full h-full rounded-t-lg"
                  />

                  <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
                   onClick={(e) => {
                    e.stopPropagation();
                    handleAddToFavorite(item);
                    toast.success("product added")
                  }}
                  >
                    <CiHeart />
                  </div>
                </div>

                <div className="flex flex-col items-start mt-2 w-[160px] h-[90px] bg-white">
                  <h3 className="text-xs font-medium text-gray-800 line-clamp-2">
                    {item.Title}
                  </h3>
                  <p className="text-red-600 font-semibold text-md mt-1">
                    Rs {item.Price}
                  </p>
                </div>

                <div className="flex justify-center  ">
                  <Button
                    className="w-36 text-sm bg-[#3a1910] text-white font-semibold rounded-md py-1 hover:bg-[#906642] transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(item);
                      toast.success(
                        `${item.Title} ${""}was added to shoppping cart`,
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
                          className: "w-[390px]",
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

          <ProductView isOpen={isOpen} closeModal={closeModal} />
        </div>
      )}

      <div className="mt-10 flex justify-center items-center text-sm text-gray-500 gap-2">
        <h2 className="transition-colors duration-500 hover:text-[#906642]">
          Shop all this category
        </h2>
        <IoChevronForward />
      </div>
      <ToastContainer />
    </div>
  );
};

export default TopCategories;
