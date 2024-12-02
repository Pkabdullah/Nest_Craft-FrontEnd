"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LoadingAnimation from "./ui/LoadingAnimation";
import { FaEye, FaHeart } from "react-icons/fa";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { Button } from "./ui/button";
import { CiHeart } from "react-icons/ci";
import ProductView from "./ProductView";
import { useDispatch } from "react-redux";
import { setselectedProduct, setviewProduct } from "@/app/Features/slice";
import { useRouter } from "next/navigation";
import { addToCart } from "@/app/Features/cartslice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addTofavorite } from "@/app/Features/favoriteslice";
const Promotion = () => {
  const [promotion, setPromotion] = useState([]);
  const [category, setCategory] = useState("Best Seller");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

 
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }
 const dispatch = useDispatch();
  function openModal(product) {
    setIsOpen(true);
    dispatch(setviewProduct([product]));
  }

  function handleSelectedProduct(product) {
    dispatch(setselectedProduct([product]));
    const productName = product.Title;
    router.push(`/product-details/${productName}`);
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

  const settings = {
    dots: true,
    infinite: promotion.length > 1,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 4,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
  };

  useEffect(() => {
    async function GetMainBanner() {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/promotions?filters[category][$eq]=${category}&populate=*`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
            },
          }
        );
        const data = await response.json();
        setPromotion(data.data);
        dispatch(setviewProduct(data.data));
        console.log("promotion data for", category, data.data);
      } catch (error) {
        console.error("Error fetching promotion data:", error);
      } finally {
        setLoading(false);
      }
    }
    console.log("Fetching data for category:", category);
    GetMainBanner();
  }, [category]);

  return (
    <div className="p-10">
      <div className="lg:ml-32 text-[#906642] ml-4">
        <h1 className="lg:text-3xl text-[25px] font-semibold">
          Elevate Your Space
        </h1>
      </div>

      <nav>
        <ul className="overflow-auto mt-4 py-2 flex justify-between lg:justify-end gap-5 lg:-mt-7 lg:mr-32 lg:text-sm text-[14px] font-medium text-gray-400">
          {["Best Seller", "On Sale", "New Arrival", "Top Rated"].map((cat) => (
            <li key={cat}>
              <button
                onClick={() => setCategory(cat)}
                className={`transition-colors duration-500 whitespace-nowrap px-4 py-2 ${
                  category === cat ? "text-[#906642]" : "hover:text-[#906642]"
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {loading && <LoadingAnimation />}

      {!loading && promotion.length === 0 && <p>No Products Found</p>}

      {!loading && promotion.length > 0 && (
        <div className="mt-10 relative lg:ml-32 lg:pr-24">
          <div className="hidden lg:block">
            <Slider {...settings}>
              {promotion.map((item, a) => (
                <div key={a} className="group">
                  <div
                    className="border border-transparent w-[250px] h-[250px] group-hover:border-[#906642] hover:border-b-0 transition duration-300 ease-in-out relative"
                    onClick={() => handleSelectedProduct(item)}
                  >
                    {/* <Link href={`/product-details/${item.Title}`}> */}

                    <Image
                      src={"/" + item.image?.name || "/placeholder-image.jpg"}
                      alt={item.Title}
                      width={550}
                      height={250}
                      className="object-cover w-full h-full"
                    />
                    {/* </Link> */}
                    <div className="hidden absolute inset-0 lg:flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal(item);
                        }}
                        className="bg-white text-[#906642] p-2 rounded-full shadow-md hover:bg-[#906642] hover:text-white transition-colors"
                      >
                        <FaEye />
                      </button>
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
                  <div className="border border-transparent bg-white w-[250px] h-[93px] border-t-0 flex flex-col justify-center group-hover:border-[#906642] transition duration-300 ease-in-out">
                    <h3 className="text-sm ml-2">{item.Title}</h3>
                    <p className="text-red-600 font-semibold lg:text-[14px] text-xs ml-2 mt-2">
                      Rs {item.Price}
                    </p>
                  </div>
                </div>
              ))}
            </Slider>
            <ProductView isOpen={isOpen} closeModal={closeModal} />
          </div>

          <div className="grid grid-cols-2 gap-20 md:gap-6 lg:hidden  max-sm:-mt-3">
            {promotion.map((item, a) => (
              <div
                key={a}
                className="group w-[174px] p-2 rounded-lg shadow-md border border-gray-300 -ml-8 bg-white"
              >
                <div className="relative border-b border-transparent group-hover:border-[#906642] transition duration-300 ease-in-out w-[160px] h-[160px] "
                   onClick={() => handleSelectedProduct(item)}
                >
                  <Image
                    src={"/" + item.image?.name}
                    alt={item.Title}
                    width={160}
                    height={131}
                    className="object-cover w-full h-full rounded-t-lg"
                  />

                  <div
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow "
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToFavorite(item);
                      toast.success("product added")
                    }}
                  >
                    <CiHeart />
                  </div>
                </div>
                <div className="flex flex-col items-start mt-2 bg-white w-[160px] h-[90px]">
                  <h3 className="text-xs font-medium text-gray-800 line-clamp-2">
                    {item.Title}
                  </h3>
                  <p className="text-red-600 font-semibold text-md mt-1">
                    Rs {item.Price}-

                  </p>
                </div>
                <div className=" flex justify-center items-center ">
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
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Promotion;

// "use client";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import LoadingAnimation from "./ui/LoadingAnimation";
// import { FaEye, FaHeart } from "react-icons/fa";
// import { MdOutlineShoppingCartCheckout } from "react-icons/md";
// import { Button } from "./ui/button";
// import { CiHeart } from "react-icons/ci";
// import ProductView from "./ProductView";
// import { useDispatch } from "react-redux";
// import { setselectedProduct, setviewProduct } from "@/app/Features/slice";
// import Link from "next/link";

// const Promotion = () => {
//   const [promotion, setPromotion] = useState([]);
//   const [category, setCategory] = useState("Best Seller");
//   const [loading, setLoading] = useState(true);

//   const dispatch = useDispatch();
//   let [isOpen, setIsOpen] = useState(false);

//   function closeModal() {
//     setIsOpen(false);
//   }

//   function openModal(product) {
//     setIsOpen(true);
//     dispatch(setviewProduct([product]));
//   }
//   function handleSelectedProduct(product) {
//     dispatch(setselectedProduct([product]));
//   }
//   const settings = {
//     dots: true,
//     infinite: promotion.length > 1,
//     speed: 800,
//     slidesToShow: 4,
//     slidesToScroll: 4,
//     cssEase: "ease-in-out",
//     pauseOnHover: false,
//     pauseOnFocus: true,
//   };

//   useEffect(() => {
//     async function GetMainBanner() {
//       setLoading(true);
//       try {
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/api/promotions?filters[category][$eq]=${category}&populate=*`,
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
//             },
//           }
//         );
//         const data = await response.json();
//         setPromotion(data.data);
//         dispatch(setviewProduct(promotion));
//         console.log("promotion data for", category, data.data);
//       } catch (error) {
//         console.error("Error fetching promotion data:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     console.log("Fetching data for category:", category);
//     GetMainBanner();
//   }, [category]);

//   return (
//     <div className="p-10">
//       {/* Title */}
//       <div className="lg:ml-32 text-[#906642] ml-4">
//         <h1 className="lg:text-3xl text-[25px] font-semibold">
//           Elevate Your Space
//         </h1>
//       </div>

//       {/* Navigation */}
//       <nav className="">
//         <ul className=" overflow-auto mt-4 py-2 flex justify-between lg:justify-end  gap-5 lg:-mt-7 lg:mr-32 lg:text-sm text-[14px] font-medium text-gray-400">
//           {/* Buttons for Category Selection */}
//           <button
//             onClick={() => setCategory("Best Seller")}
//             className={`transition-colors duration-500 whitespace-nowrap px-4 py-2  ${
//               category === "Best Seller"
//                 ? "text-[#906642]   "
//                 : "hover:text-[#906642]"
//             }`}
//           >
//             Best Seller
//           </button>
//           <button
//             onClick={() => setCategory("On Sale")}
//             className={`transition-colors duration-500 whitespace-nowrap px-4 py-2 rounded-md ${
//               category === "On Sale"
//                 ? "text-[#906642] "
//                 : "hover:text-[#906642]"
//             }`}
//           >
//             On Sale
//           </button>
//           <button
//             onClick={() => setCategory("New Arrival")}
//             className={`transition-colors duration-500 whitespace-nowrap px-4 py-2 rounded-md ${
//               category === "New Arrival"
//                 ? "text-[#906642] "
//                 : "hover:text-[#906642]"
//             }`}
//           >
//             New Arrival
//           </button>
//           <button
//             onClick={() => setCategory("Top Rated")}
//             className={`transition-colors duration-500 whitespace-nowrap px-4 py-2 rounded-md ${
//               category === "Top Rated"
//                 ? "text-[#906642] "
//                 : "hover:text-[#906642]"
//             }`}
//           >
//             Top Rated
//           </button>
//         </ul>
//       </nav>

//       {/* Loader */}
//       {loading && <LoadingAnimation />}

//       {!loading && promotion.length === 0 && <p>No Products Found</p>}

//       {/* Promotions Slider */}
//       {!loading && promotion.length > 0 && (
//         <div className="mt-10 relative lg:ml-32 lg:pr-24 ">
//           {/* Slider for large screens */}
//           <div className="hidden lg:block">
//             <Slider {...settings}>
//               {promotion.map((item, a) => (
//                 <div key={a} className="group">
//                   {/* Image */}
//                   <div
//                     className="border border-transparent w-[250px] h-[250px] group-hover:border-[#906642] hover:border-b-0 transition duration-300 ease-in-out relative"
//                     onClick={() => handleSelectedProduct(item)}
//                   >
//                     <Link href={`product-details/${item.Title}`}>
//                       <Image
//                         src={"/" + item.image?.name}
//                         alt={item.Title}
//                         width={550}
//                         height={250}
//                         className="object-cover w-full h-full"
//                       />
//                     </Link>
//                     <div className="hidden absolute inset-0 lg:flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                       <button className="bg-white text-[#906642] p-2 rounded-full shadow-md hover:bg-[#906642] hover:text-white transition-colors">
//                         <MdOutlineShoppingCartCheckout />
//                       </button>

//                       <button
//                         onClick={() => openModal(item)}
//                         className="bg-white text-[#906642] p-2 rounded-full shadow-md hover:bg-[#906642] hover:text-white transition-colors"
//                       >
//                         <FaEye />
//                       </button>

//                       <button className="bg-white text-[#906642] p-2 rounded-full shadow-md hover:bg-[#906642] hover:text-white transition-colors">
//                         <FaHeart />
//                       </button>
//                     </div>
//                   </div>

//                   {/* Title Description */}
//                   <div className="border border-transparent bg-white w-[250px] h-[93px] border-t-0 flex flex-col justify-center group-hover:border-[#906642] transition duration-300 ease-in-out">
//                     <h3 className="text-sm ml-2">{item.Title}</h3>
//                     <p className="text-red-600 font-semibold lg:text-[14px] text-xs ml-2 mt-2">
//                       Rs {item.Price}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </Slider>
//             <ProductView isOpen={isOpen} closeModal={closeModal} />
//           </div>

//           {/* Grid layout for small screens */}
//           <div className="grid grid-cols-2 gap-24 md:gap-6 lg:hidden ">
//             {promotion.map((item, a) => (
//               <div
//                 key={a}
//                 className="group w-[138px] p-2 rounded-lg shadow-md border border-gray-200 -ml-8"
//               >
//                 {/* Image */}
//                 <div className="relative border-b border-transparent group-hover:border-[#906642] transition duration-300 ease-in-out w-[138px] h-[131px] ">
//                   <Image
//                     src={"/" + item.image?.name}
//                     alt={item.Title}
//                     width={138}
//                     height={131}
//                     className="object-cover w-full h-full rounded-t-lg"
//                   />

//                   <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow">
//                     <CiHeart />
//                   </div>
//                 </div>

//                 <div className="flex flex-col items-start mt-2 h-[93px]">
//                   <h3 className="text-xs font-medium text-gray-800 line-clamp-2">
//                     {item.Title}
//                   </h3>
//                   <p className="text-red-600 font-semibold text-md mt-1">
//                     Rs {item.Price}
//                   </p>
//                 </div>

//                 <div className="mt-2 w-full">
//                   <Button className="w-full text-xs bg-[#3a1910] text-white font-semibold rounded-md py-1 hover:bg-[#906642] transition">
//                     Add to Cart
//                   </Button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Promotion;
