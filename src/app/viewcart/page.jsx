"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity } from "../Features/cartslice";
import { RiDeleteBin6Line } from "react-icons/ri";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import { useState } from "react";
const page = () => {
  const viewcartData = useSelector((state) => state.cart.cartItems);
  console.log("view cart data", viewcartData);
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ productId, quantity: newQuantity }));
    }
  };
  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };
  const subtotal = viewcartData.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const handleCheckout = () => {
    if (!session) {
      setErrorMessage("Please log in first."); // Set error message if not logged in
    } else {
      // Redirect to checkout page if logged in
      window.location.href = "/Checkout"; // You can also use Router.push("/Checkout") if you prefer
    }
  };
  return (
    <div>
      <section className="bg-[#FFF5EE] py-8 antialiased dark:bg-gray-900 md:py-16">
        <h2 className="text-2xl font-semibold text-gray-900  sm:text-4xl px-36">
          Cart
        </h2>
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="">
                <div className="border border-gray-200 w-[760px] h-[40px] ml-28 bg-white max-sm:hidden">
                  <ul className="flex justify-between px-8  text-sm mt-2">
                    <li>Product</li>
                    <li className="ml-44">Price</li>
                    <li>Quantity</li>
                  </ul>
                </div>
                <div className="mb-40">
                  {viewcartData.map((item, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-gray-200 bg-[#FFF5EE] p-4 shadow-sm   md:p-6 lg:w-[760px] lg:h-[100px] lg:ml-28 py-10"
                    >
                      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        <a href="#" className="shrink-0 md:order-1">
                          <img
                            className="h-16 w-16"
                            src={"/" + item.image}
                            alt="cart item image"
                          />
                        </a>

                        <div className="w-full md:order-2">
                          <ul className="flex justify-between items-center">
                            <span className="border border-transparent w-60 h-12">
                              <li className="text-sm font-thin  text-gray-900  line">
                                {item.Title || item.productName}
                              </li>
                            </span>
                            <li className="text-sm font-normal text-red-600">
                              Rs.{item.price}
                            </li>

                            <li className="flex items-center">
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
                                  className="h-3 w-3 text-gray-900"
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
                                className="w-14 h-4 shrink-0 border-0 bg-white text-center text-sm font-medium text-gray-900 focus:outline-none"
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
                                  className="h-3 w-3 text-gray-900"
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
                              <div className="flex items-center ">
                                <button
                                  type="button"
                                  className="inline-flex items-center text-xl font-medium text-gray-600 hover:underline "
                                  onClick={() => handleRemoveItem(item.id)}
                                >
                                  <RiDeleteBin6Line />
                                </button>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full ">
              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm  sm:p-6">
                <p className="text-xl font-semibold text-gray-900 ">
                  Cart Totals
                </p>

                <div className="">
                  <div className="">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Subtotal
                      </dt>
                      <dd className="text-base  text-gray-900 ">
                        Rs.{subtotal}
                      </dd>
                    </dl>
                  </div>
                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 ">
                    <dt className="text-base font-thin  text-gray-900 ">Tax</dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">
                      0
                    </dd>
                  </dl>
                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 ">
                    <dt className="text-base font-thin text-gray-900 dark:text-white">
                      Total
                    </dt>
                    <dd className="text-base font-bold text-gray-900 ">
                      Rs.{subtotal}
                    </dd>
                  </dl>
                </div>

                <button
                  onClick={handleCheckout} // Handle checkout click
                  className="flex w-full items-center justify-center rounded-lg bg-[#3a1910] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#906642] focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Proceed to Checkout
                </button>

                {errorMessage && ( // Display error message if it exists
                  <p className="text-red-600 text-center">{errorMessage}</p>
                )}
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    {" "}
                    or{" "}
                  </span>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 "
                  >
                    Continue Shopping
                    <svg
                      className="h-5 w-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 12H5m14 0-4 4m4-4-4-4"
                      />
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm  dark:bg-gray-800 sm:p-6">
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="voucher"
                      className="mb-2 block text-sm font-medium text-gray-900 "
                    >
                      {" "}
                      Do you have a voucher or gift card?{" "}
                    </label>
                    <input
                      type="text"
                      id="voucher"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700  dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder=""
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center rounded-lg bg-[#3a1910] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#906642] focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Apply Code
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default page;
