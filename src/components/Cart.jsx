"use client";
import Link from "next/link";
import React, { useState } from "react";
import { PiShoppingCartLight } from "react-icons/pi";
import { GrFormClose } from "react-icons/gr";
import { Button } from "./ui/button";
import { FaArrowRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart, updateQuantity } from "@/app/Features/cartslice";
import Image from "next/image";
import { useSession } from "next-auth/react";

const Cart = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const { data: session, status } = useSession();

  const dispatch = useDispatch();
  // Handle cart icon click
  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };
  const handleCheckout = () => {
    if (!session) {
      setErrorMessage("Please log in first."); // Set error message if not logged in
    } else {
      // Redirect to checkout page if logged in
      window.location.href = "/Checkout"; // You can also use Router.push("/Checkout") if you prefer
    }
  }

  const cartData = useSelector((state) => state.cart.cartItems);
  console.log("cart data", cartData);

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ productId, quantity: newQuantity }));
    }
  };


  const subtotal = cartData.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="right-0">
      <div className="lg:flex lg:ml-auto lg:mr-44">
        <button
          onClick={handleCartClick}
          className="relative inline-flex items-center"
        >
          <PiShoppingCartLight className="text-2xl font-thin lg:text-2xl" />
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white lg:bg-[#3a1910] bg-red-600 rounded-full -mr-2 -mt-2">
            {cartData.length}
          </span>
        </button>
      </div>

      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black opacity-70 z-40"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {isCartOpen && (
        <div
          className={`fixed top-0 right-0 h-full w-[80%] lg:w-[30%] bg-[#FFF5EE] z-50 transition-transform duration-700 transform ${
            isCartOpen ? "translate-x-0" : "translate-x-full"
          } overflow-y-auto`}
        >
          <button
            className="absolute top-4 right-4 text-2xl"
            onClick={() => setIsCartOpen(false)}
          >
            <GrFormClose />
          </button>

          <div className="p-4">
            <h2 className="text-md font-semibold">SHOPPING CART</h2>

            {/* Cart Items */}
            <section className="bg-[#FFF5EE] py-8 antialiased md:py-16">
              {cartData.length === 0 ? (
                <div className="flex justify-center">
                  {" "}
                  <Image
                    src="/emtycart.png"
                    alt="empty cart"
                    width={150}
                    height={100}
                    className="max-sm:w-[50px]"
                  />
                </div>
              ) : (
                cartData.map((item, i) => (
                  <div key={i} className="mx-auto max-w-screen-xl ">
                    <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                      <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                        <div className="">
                          <div className="rounded-lg bg-white p-4 shadow-sm md:p-6 ">
                            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                              <img
                                className="h-16 w-16 "
                                src={"/" + item.image}
                                alt="cart item image"
                              />

                              <div className="text-sm ">
                                {item.Title || item.productName}
                              </div>

                              <div className="">
                                <div className="flex items-center">
                                  <button
                                    type="button"
                                    className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none"
                                    onClick={() =>
                                      handleUpdateQuantity(
                                        item.id,
                                        item.quantity - 1
                                      )
                                    }
                                  >
                                    <svg
                                      className="h-2.5 w-2.5 text-gray-900"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 18 2"
                                    >
                                      <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M1 1h16"
                                      />
                                    </svg>
                                  </button>
                                  <input
                                    type="text"
                                    className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none"
                                    value={item.quantity}
                                    readOnly
                                  />
                                  <button
                                    type="button"
                                    className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none"
                                    onClick={() =>
                                      handleUpdateQuantity(
                                        item.id,
                                        item.quantity + 1
                                      )
                                    }
                                  >
                                    <svg
                                      className="h-2.5 w-2.5 text-gray-900"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 18 18"
                                    >
                                      <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 1v16M1 9h16"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="flex  justify-end items-center gap-4">
                              <button
                                type="button"
                                className="inline-flex items-center text-xl font-medium text-gray-600 hover:underline"
                                onClick={() => handleRemoveItem(item.id)}
                              >
                                <RiDeleteBin6Line />
                              </button>
                            </div>
                            <div className="text-end md:order-4 md:w-32 mt-4">
                              <p className="text-base font-normal text-red-600">
                                Rs.{item.price}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </section>
            <h1 className="text-gray-400">
              SubTotal:{" "}
              <span className="text-red-600 font-semibold">Rs.{subtotal}</span>
            </h1>
            {/* Continue Shopping Button */}
            {cartData.length === 0 ? (
              <div className="flex justify-center">
                <div className="mt-6 flex flex-col justify-center items-center gap-2">
                  <Button className=" lg:px-20 px-10 text-[14px] bg-[#FFF5EE] text-black font-semibold rounded-md py-1 hover:bg-[#906642] hover:text-white">
                    Continue Shopping <FaArrowRight />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex justify-center sticky">
                <div className="mt-6 flex flex-col justify-center items-center gap-2 ">
                  {/* <Button
                    className="lg:px-32 px-10 text-[14px] bg-[#3a1910] text-white font-semibold rounded-md py-1 hover:bg-[#906642]"
                    onClick={() => setIsCartOpen(false)}
                  >
                    <Link href="/Checkout"> CHECKOUT</Link>
                    <FaArrowRight />
                  </Button> */}
                  <button
                    onClick={handleCheckout} // Handle checkout click
                    className="flex w-full items-center justify-center rounded-lg bg-[#3a1910] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#906642] focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Proceed to Checkout
                  </button>

                  {errorMessage && ( // Display error message if it exists
                    <p className="text-red-600 text-center">{errorMessage}</p>
                  )}
                  <Link href={"/viewcart"}>
                    <Button
                      className="bg-gray-300 lg:px-32 px-10"
                      onClick={() => setIsCartOpen(false)}
                    >
                      View Cart
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

// "use client";
// import Link from "next/link";
// import React, { useState } from "react";
// import { PiShoppingCartLight } from "react-icons/pi";
// import { GrFormClose } from "react-icons/gr";
// import { Button } from "./ui/button";
// import { FaArrowRight } from "react-icons/fa6";
// import { useSelector } from "react-redux";

// const Cart = () => {
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   // Handle cart icon click
//   const handleCartClick = () => {
//     setIsCartOpen(!isCartOpen);
//   };
//   const cartData = useSelector((state) => state.cart.cartItems);
//   console.log("cart data here", cartData);
//   return (
//     <div className="right-0">
//       {/* Cart Icon in the navbar (visible on all screens) */}
//       <div className="lg:flex lg:ml-auto lg:mr-44">
//         <button
//           onClick={handleCartClick}
//           className="relative inline-flex items-center"
//         >
//           <PiShoppingCartLight className="text-2xl font-thin lg:text-2xl" />
//           <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white lg:bg-[#3a1910]  bg-red-600 rounded-full -mr-2 -mt-2">
//            {cartData.length}
//           </span>
//         </button>
//       </div>

//       {/* Background overlay - Only visible when the cart is open */}
//       {isCartOpen && (
//         <div
//           className="fixed inset-0 bg-black opacity-70 z-40"
//           onClick={() => setIsCartOpen(false)}
//         />
//       )}

//       {/* Cart Drawer (visible on all screen sizes) */}
//       {isCartOpen && (
//         <div
//           className={`fixed top-0 right-0 h-full w-[80%] lg:w-[30%] bg-white z-50 transition-transform duration-700 transform ${
//             isCartOpen ? "translate-x-0" : "translate-x-full"
//           }`}
//         >
//           <button
//             className="absolute top-4 right-4 text-2xl"
//             onClick={() => setIsCartOpen(false)}
//           >
//             <GrFormClose />
//           </button>

//           <div className="p-4">
//             <h2 className="text-md font-semibold">SHOPPING CART</h2>
//             {/* Cart Items */}

//             <section className="bg-white py-8 antialiased md:py-16 overflow-auto">
//               {cartData.map((item,i)=>(
//                  <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
//                 <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
//                   <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
//                     <div className="space-y-6">
//                       <div
//                         className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm
//                        md:p-6"
//                       >
//                         <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
//                           <a href="#" className="shrink-0 md:order-1">
//                             <img
//                               className="h-20 w-20 dark:hidden"
//                               src={"/" +item.image}
//                               alt="cart data image"
//                             />

//                           </a>

//                           <label for="counter-input" className="sr-only">
//                            {item.qunatity}
//                           </label>
//                           <div className="flex items-center justify-between md:order-3 md:justify-end">
//                             <div className="flex items-center">
//                               <button
//                                 type="button"
//                                 id="decrement-button"
//                                 data-input-counter-decrement="counter-input"
//                                 className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
//                               >
//                                 <svg
//                                   className="h-2.5 w-2.5 text-gray-900 dark:text-white"
//                                   aria-hidden="true"
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   fill="none"
//                                   viewBox="0 0 18 2"
//                                 >
//                                   <path
//                                     stroke="currentColor"
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M1 1h16"
//                                   />
//                                 </svg>
//                               </button>
//                               <input
//                                 type="text"
//                                 id="counter-input"
//                                 data-input-counter
//                                 className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
//                                 placeholder=""
//                                 value="2"
//                                 required
//                               />
//                               <button
//                                 type="button"
//                                 id="increment-button"
//                                 data-input-counter-increment="counter-input"
//                                 className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
//                               >
//                                 <svg
//                                   className="h-2.5 w-2.5 text-gray-900 dark:text-white"
//                                   aria-hidden="true"
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   fill="none"
//                                   viewBox="0 0 18 18"
//                                 >
//                                   <path
//                                     stroke="currentColor"
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M9 1v16M1 9h16"
//                                   />
//                                 </svg>
//                               </button>
//                             </div>
//                             <div className="text-end md:order-4 md:w-32">
//                               <p className="text-base font-bold text-red-600 dark:text-white">
//                               Rs.{item.price}
//                               </p>
//                             </div>
//                           </div>

//                           <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
//                             <a
//                               href="#"
//                               className="text-base font-medium text-gray-900 hover:underline dark:text-white"
//                             >
//                           {item.Title}{item.productName}
//                             </a>

//                             <div className="flex items-center gap-4">
//                               <button
//                                 type="button"
//                                 className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
//                               >
//                                 <svg
//                                   className="me-1.5 h-5 w-5"
//                                   aria-hidden="true"
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   width="24"
//                                   height="24"
//                                   fill="none"
//                                   viewBox="0 0 24 24"
//                                 >
//                                   <path
//                                     stroke="currentColor"
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M6 18 17.94 6M18 18 6.06 6"
//                                   />
//                                 </svg>
//                                 Remove
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               ))}

//             </section>

//             <div className="mt-6 flex flex-col justify-center items-center gap-2">
//               <Button className="w-[60%] text-[14px] bg-[#3a1910] text-white font-semibold rounded-md py-1 hover:bg-[#906642]">
//                 Continue Shopping <FaArrowRight />
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;
