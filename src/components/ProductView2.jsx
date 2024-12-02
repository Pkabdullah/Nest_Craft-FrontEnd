"use client";
import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { useState } from "react";

const ProductView2 = ({ isOpen, closeModal }) => {
  const viewProduct = useSelector((state) => state.view.viewProduct);
  console.log("view redux data", viewProduct);
  const ViewProductCategorily = useSelector(
    (state) => state.view.ViewProductCategory
  );
  console.log("categorily", ViewProductCategorily);

  const [qunatity, setquantity] = useState(1);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10 hidden lg:block"
        onClose={closeModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/45 " />
        </Transition.Child>

        <div className="fixed inset-0 overflow-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-[1037px] h-[340px] overflow-hidden transform  bg-[#FFF5EE] p-6 text-left align-middle shadow-xl transition-all">
                <div className="mt-2">
                  {ViewProductCategorily.map((item, i) => (
                    <section
                      key={i} // Add a unique key for each item
                      className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased"
                    >
                      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
                        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                          <div className="-mt-20 -ml-5">
                            <div>
                              <img
                                className="w-[430px] h-[318px] "
                                src={"/" + item.image.name}
                                alt="Product Image"
                              />
                            </div>
                          </div>

                          <div className=" sm:mt-8 lg:mt-0 ">
                            <h1 className="font-semibold text-gray-900 sm:text-[18px]  sm:-mt-20 sm:-ml-14 whitespace-nowrap ">
                              {item.productName}
                            </h1>

                            <div className="flex items-center gap-2  sm:mt-0">
                              <div className="flex items-center gap-1 mt-4 sm:-ml-14">
                                <svg
                                  className="w-4 h-4 text-yellow-300"
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
                                  className="w-4 h-4 text-yellow-300"
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
                                  className="w-4 h-4 text-yellow-300"
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
                                  className="w-4 h-4 text-yellow-300"
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
                                  className="w-4 h-4 text-yellow-300"
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
                              <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400 mt-4">
                                (1.0)
                              </p>
                              <a
                                href="#"
                                className="text-sm font-medium leading-none text-gray-600 mt-4"
                              >
                                (0 customer reviews)
                              </a>
                            </div>

                            <div className="mt-4 sm:items-center sm:gap-4 sm:flex sm:-ml-14">
                              <p className="text-2xl  text-red-600 sm:text-xl ">
                                Rs{item.productPrice}
                              </p>
                            </div>
                            <p className="text-[#906642] font-semibold text-sm whitespace-nowrap sm:-ml-14 mt-3">
                              Make a 40% advance payment and pay the remaining
                              amount in{" "}
                              <span className="font-extrabold">
                                Cash on Delivery
                              </span>
                            </p>
                            <p className="text-red-600 font-bold  text-sm whitespace-nowrap sm:-ml-14 mt-3">
                              Standard delivery within 25 days
                            </p>
                          </div>
                        </div>
                      </div>
                    </section>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ProductView2;
