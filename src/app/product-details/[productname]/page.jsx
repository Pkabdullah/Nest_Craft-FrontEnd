"use client";
import { details_icons } from "@/app/data";
import RelatedProducts from "@/components/RelatedProducts";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/app/Features/cartslice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetailPage = ({ params }) => {
  const viewDetails = useSelector((state) => state.view.selectedProduct);
  const dispatch = useDispatch(); // Redux dispatch
  const { productname } = params;
  const [quantity, setQuantity] = useState(1);

  // Handle Add to Cart action
  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        id: product.id,
        productName: product.productName || product.Title,
        price: product.Price || product.productPrice,
        image: product.image.name,
        quantity,
      })
    );
  };

  return (
    <div>
      <section className="py-20 bg-[#FFF5EE] md:py-16 dark:bg-gray-900 antialiased">
        {viewDetails.map((item, i) => (
          <div key={i} className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
              <div className=" lg:ml-28 ">
                <img
                  className="w-screen"
                  src={"/" + item.image.name}
                  alt="details"
                />
              </div>

              <div className="mt-6 sm:mt-8 lg:mt-0">
                <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                  {item.Title}|{item.productName}
                </h1>

                <div className="flex items-center gap-2 mt-4 sm:mt-0">
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4 text-gray-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-gray-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-gray-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-gray-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-gray-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                    (0)
                  </p>
                  <a
                    href="#"
                    className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
                  >
                    0 Reviews
                  </a>
                </div>

                <p className="text-2xl font-semibold  text-red-600 sm:text-xl dark:text-white">
                  Rs.{item.Price} {item.productPrice}
                </p>
                <p className="mb-6 mt-4 text-[#906642] font-semibold text-sm">
                  {" "}
                  Make a 40% advance payment and pay the remaining amount in{" "}
                  <span className="font-extrabold">Cash on Delivery</span>
                </p>

                <p className="text-red-600 font-bold -mt-4 text-sm whitespace-nowrap">
                  Standard delivery within 25 days
                </p>
                <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                  <div className="flex items-center gap-3 border border-gray-300 w-[100px] max-sm:hidden  ">
                    <Button
                      onClick={() => setQuantity(quantity - 1)}
                      className="bg-gray-200 w-1 "
                      disabled={quantity === 1}
                    >
                      -
                    </Button>
                    <h1>{quantity}</h1>
                    <Button
                      onClick={() => setQuantity(quantity + 1)}
                      className="bg-gray-200 w-1 "
                    >
                      +
                    </Button>
                  </div>
                  <div className="flex gap-4 lg:ml-4">
                    <Button
                      onClick={() => {
                        handleAddToCart(item);

                        toast.success(
                          `${
                            item.productName || item.Title
                          } ${""}was added to shoppping cart`,
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
                            className: "w-[690px] max-sm:w-[370px]  ",
                            position: "top-center",
                          }
                        );
                      }}
                      className="flex items-center justify-center py-2.5 px-5 text-xs  bg-[#3a1910] text-white hover:bg-[#3a1910]"
                    >
                      ADD TO CART
                    </Button>

                    <Button className="flex items-center justify-center py-2.5 px-5 text-xs  bg-[#906642] text-white hover:bg-[#906642]">
                      BUY NOW
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* other images */}
            <div className=" lg:ml-28 lg:mt-2">
              <div className="border border-gray-900 w-24 h-24">
                {/* <Image src={"/"+item.image2.name} width={40} height={40} alt="detail image"/>
                <Image src={"/"+item.image3}width={40} height={40} alt="detail image"/> */}
{/* <img
                  className="w-auto"
                  src={"/" + item.image3.name}
                  alt="details"
                /> */}
              </div>
            </div>



            <div className="px-28 mt-10 text-gray-600 text-md max-sm:hidden">
              <Button className="text-black bg-gray-300 mb-4">
                Description
              </Button>
              <p>{item.Description1}</p>
              <p>{item.Description2}</p>
              <p>{item.Description3}</p>
              <p>{item.Description4}</p>
              <p>{item.Description5}</p>
            </div>
          </div>
        ))}
      </section>
      <RelatedProducts />
      <ToastContainer />
    </div>
  );
};

export default ProductDetailPage;

// "use client";
// import { details_icons } from "@/app/data";
// import RelatedProducts from "@/components/RelatedProducts";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useState } from "react";
// import { useSelector } from "react-redux";

// const ProductDetailPage = ({ params }) => {
//   const viewDetails = useSelector((state) => state.view.selectedProduct);
//   console.log("viewDetails data", viewDetails);
//   const { productname } = params;
//   const [qunatity, setquantity] = useState(1);

//   return (
//     <div>

//       <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
//         {viewDetails.map((item, i) => (
//           <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
//             <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
//               <div className=" lg:ml-28 ">
//                 <img
//                   className="w-full"
//                   src={"/" + item.image.name}
//                   alt="details"
//                 />
//               </div>

//               <div className="mt-6 sm:mt-8 lg:mt-0">
//                 <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
//                   {item.Title}|{item.productName}
//                 </h1>
//                 <div className="flex items-center gap-2 mt-4 sm:mt-0">
//                   <div className="flex items-center gap-1">
//                     <svg
//                       className="w-4 h-4 text-gray-300"
//                       aria-hidden="true"
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="24"
//                       height="24"
//                       fill="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
//                     </svg>
//                     <svg
//                       className="w-4 h-4 text-gray-300"
//                       aria-hidden="true"
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="24"
//                       height="24"
//                       fill="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
//                     </svg>
//                     <svg
//                       className="w-4 h-4 text-gray-300"
//                       aria-hidden="true"
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="24"
//                       height="24"
//                       fill="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
//                     </svg>
//                     <svg
//                       className="w-4 h-4 text-gray-300"
//                       aria-hidden="true"
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="24"
//                       height="24"
//                       fill="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
//                     </svg>
//                     <svg
//                       className="w-4 h-4 text-gray-300"
//                       aria-hidden="true"
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="24"
//                       height="24"
//                       fill="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
//                     </svg>
//                   </div>
//                   <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
//                     (0)
//                   </p>
//                   <a
//                     href="#"
//                     className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
//                   >
//                     0 Reviews
//                   </a>
//                 </div>
//                 <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
//                   <p className="text-2xl font-semibold  text-red-600 sm:text-xl dark:text-white">
//                     Rs.{item.Price} {item.productPrice}
//                   </p>
//                 </div>
//                 <p className="mb-6 mt-4 text-[#906642] font-semibold text-sm">
//                   Make a 40% advance payment and pay the remaining amount in{" "}
//                   <span className="font-extrabold">Cash on Delivery</span>
//                 </p>

//                 <p className="text-red-600 font-bold -mt-4 text-sm whitespace-nowrap">
//                   Standard delivery within 25 days
//                 </p>

//                 <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
//                   <div className="flex items-center gap-3 border border-gray-300 w-[100px] max-sm:hidden  ">
//                     <Button
//                       onClick={() => setquantity(qunatity - 1)}
//                       className="bg-gray-200 w-1 "
//                     >
//                       -
//                     </Button>
//                     <h1>{qunatity}</h1>
//                     <Button
//                       onClick={() => setquantity(qunatity + 1)}
//                       className="bg-gray-200 w-1 "
//                     >
//                       +
//                     </Button>
//                   </div>
//                   <div className="flex gap-4 lg:ml-4">
//                   <Button className="flex items-center justify-center py-2.5 px-5 text-xs  bg-[#3a1910] text-white hover:bg-[#3a1910]">
//                     ADD TO CART
//                   </Button>

//                   <Button className="flex items-center justify-center py-2.5 px-5 text-xs  bg-[#906642] text-white hover:bg-[#906642]">
//                     BUY NOW
//                   </Button></div>
//                 </div>
//                 <div className="mt-8 space-y-2">
//                   {i === 0 && (
//                     <p className="text-gray-500 text-sm">{item.SKU}</p>
//                   )}
//                   {i === 0 && (
//                     <p className="text-gray-500 text-sm">
//                       Categories{item.Categories}
//                     </p>
//                   )}
//                   {i === 0 && (
//                     <p className="text-gray-500 whitespace-nowrap text-sm">
//                       Tags{item.Tags}
//                     </p>
//                   )}
//                 </div>
//                 <div className="max-sm:hidden">
//                   {details_icons.map((item, i) => (
//                     <div className="flex gap-4 mt-12" key={i}>
//                       {item.Detail_Icon.map((icon, index) => (
//                         <Link href="" key={index}>
//                           <Image
//                             src={icon}
//                             alt="navicons"
//                             width={20}
//                             height={13}
//                           />
//                         </Link>
//                       ))}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             <div className="px-28 mt-10 text-gray-600 text-md max-sm:hidden">
//               <Button className="text-black bg-gray-300 mb-4">
//                 Description
//               </Button>
//               <p>{item.Description1}</p>
//               <p>{item.Description2}</p>
//               <p>{item.Description3}</p>
//               <p>{item.Description4}</p>
//               <p>{item.Description5}</p>
//             </div>
//           </div>
//         ))}
//       </section>
//       <RelatedProducts />
//     </div>
//   );
// };

// export default ProductDetailPage;
