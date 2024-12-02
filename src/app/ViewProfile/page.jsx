"use client";
import Loader from "@/components/ui/Loader";
import { useSession } from "next-auth/react";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setOrder } from "../Features/slice";
import OrderDetails from "@/components/ui/OrderView";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
const ViewProfile = () => {
  const { data: session, status } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState();

  const [openDropdownId, setOpenDropdownId] = useState(null);

  const toggleDropdown = (id) => {
    setOpenDropdownId((prevId) => (prevId === id ? null : id));
  };
  const [orders, setOrders] = useState([]);
  console.log("orderid here", orders);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      if (!session?.user?.id) {
        toast.error("User session is not available");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3000/api/orderdetails?userId=${session.user.id}`,
          {
            method: "GET",
          }
        );
        if (!response.ok) throw new Error("Failed to fetch order details");

        const data = await response.json();
        setOrders(data.orderdone);
        dispatch(setOrder(data.orderdone));

        setLoading(false);
      } catch (error) {
        toast.error("Error fetching order data");
        console.error("Error fetching order data:", error);
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchOrder();
    }
  }, [session?.user?.id, status, dispatch]);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  if (loading) {
    return <Loader title={"Order is being processed"} />;
  }

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/orderdetails?userId=${session.user.id}&orderId=${orderId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const updatedOrders = orders.filter((order) => order._id !== orderId);
      setOrders(updatedOrders);
      dispatch(setOrder(updatedOrders));

      toast.success("Order canceled successfully");
    } catch (error) {
      toast.error("Failed to cancel the order");
      console.error("Error canceling order:", error);
    }
  };
  return (
    <div>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-8">
        <div className="mx-auto max-w-screen-lg px-4 2xl:px-0">
          <nav className="mb-4 flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <Link
                  href="/"
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                >
                  <svg
                    className="me-2 h-4 w-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
                    />
                  </svg>
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="mx-1 h-4 w-4 text-gray-400 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m9 5 7 7-7 7"
                    />
                  </svg>
                  <Link
                    href="/"
                    className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white md:ms-2"
                  >
                    My account
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg
                    className="mx-1 h-4 w-4 text-gray-400 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m9 5 7 7-7 7"
                    />
                  </svg>
                  <span className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400 md:ms-2">
                    Account
                  </span>
                </div>
              </li>
            </ol>
          </nav>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl md:mb-6">
            General overview
          </h2>
          <div className="grid grid-cols-2 gap-6 border-b border-t border-gray-200 py-4 dark:border-gray-700 md:py-8 lg:grid-cols-4 xl:gap-16">
            <div>
              <svg
                className="mb-2 h-8 w-8 text-gray-400 dark:text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                />
              </svg>
              <h3 className="mb-2 text-gray-500 dark:text-gray-400">
                Orders made
              </h3>
              <span className="flex items-center text-2xl font-bold text-gray-900 dark:text-white">
                {orders.length}
                <span className="ms-2 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                  <svg
                    className="-ms-1 me-1 h-4 w-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6v13m0-13 4 4m-4-4-4 4"
                    ></path>
                  </svg>
                  99.3%
                </span>
              </span>
              <p className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:text-base">
                <svg
                  className="me-1.5 h-4 w-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </p>
            </div>
            <div>
              <svg
                className="mb-2 h-8 w-8 text-gray-400 dark:text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-width="2"
                  d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z"
                />
              </svg>
              <h3 className="mb-2 text-gray-500 dark:text-gray-400">
                Reviews added
              </h3>
              <span className="flex items-center text-2xl font-bold text-gray-900 dark:text-white">
                0
                <span className="ms-2 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                  <svg
                    className="-ms-1 me-1 h-4 w-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6v13m0-13 4 4m-4-4-4 4"
                    ></path>
                  </svg>
                  000.0%
                </span>
              </span>
              <p className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:text-base">
                <svg
                  className="me-1.5 h-4 w-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </p>
            </div>
            <div>
              <svg
                className="mb-2 h-8 w-8 text-gray-400 dark:text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                />
              </svg>
              <h3 className="mb-2 text-gray-500 dark:text-gray-400">
                Favorite products added
              </h3>
              <span className="flex items-center text-2xl font-bold text-gray-900 dark:text-white">
                0
                <span className="ms-2 inline-flex items-center rounded bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
                  <svg
                    className="-ms-1 me-1 h-4 w-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6v13m0-13 4 4m-4-4-4 4"
                    ></path>
                  </svg>
                  000%
                </span>
              </span>
              <p className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:text-base">
                <svg
                  className="me-1.5 h-4 w-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </p>
            </div>
            <div>
              <svg
                className="mb-2 h-8 w-8 text-gray-400 dark:text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 9h13a5 5 0 0 1 0 10H7M3 9l4-4M3 9l4 4"
                />
              </svg>
              <h3 className="mb-2 text-gray-500 dark:text-gray-400">
                Product returns
              </h3>
              <span className="flex items-center text-2xl font-bold text-gray-900 dark:text-white">
                0
                <span className="ms-2 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                  <svg
                    className="-ms-1 me-1 h-4 w-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6v13m0-13 4 4m-4-4-4 4"
                    ></path>
                  </svg>
                  100%
                </span>
              </span>
              <p className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:text-base">
                <svg
                  className="me-1.5 h-4 w-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </p>
            </div>
          </div>
          <div className="py-4 md:py-8">
            <div className="mb-4 grid gap-4 sm:grid-cols-2 sm:gap-8 lg:gap-16">
              <div className="space-y-4">
                <div className="flex space-x-4">
                  {/* {session ? (
                    <img
                      src={session.user.image}
                      className="h-16 w-16 rounded-lg"
                      alt="Profile"
                    />
                  ) : (
                    <img
                      src="/userprofile.png"
                      className="h-16 w-16 rounded-lg"
                      alt="Profile"
                    />
                  )} */}
                  {session ? (
                    session.user.image ? (
                      <img
                        src={session.user.image}
                        className="h-16 w-16 rounded-lg"
                        alt="Profile"
                      />
                    ) : (
                      <img
                        src="/userprofile.png"
                        className="h-16 w-16 rounded-lg"
                        alt="Default Profile"
                      />
                    )
                  ) : (
                    <span className="text-gray-500">No Profile Available</span>
                  )}

                  <div>
                    <span className="mb-2 inline-block rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      {" "}
                    </span>
                    <h2 className="flex items-center text-xl font-bold leading-none text-gray-900 dark:text-white sm:text-2xl">
                      {session?.user?.name}
                    </h2>
                  </div>
                </div>
                <dl className="">
                  <dt className="font-semibold text-gray-900 dark:text-white">
                    Email Address
                  </dt>
                  <dd className="text-gray-500 dark:text-gray-400">
                    {session?.user?.email}
                  </dd>
                </dl>
              </div>
              <div className="space-y-4">
                <dl>
                  <dt className="font-semibold text-gray-900 dark:text-white">
                    Phone Number
                  </dt>
                  <dd className="text-gray-500 dark:text-gray-400">
                    +92 1234 567 890 / +92 987 654 321
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:p-8">
            <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Latest orders
            </h3>
            {orders.length === 0 ? (
              <div className="flex justify-center mt-16">
                <Image
                  src="/noorder.png"
                  width={200}
                  height={100}
                  alt="No orders"
                />
              </div>
            ) : (
              <div>
                {orders.map((order) => (
                  <div className="flex flex-wrap items-center gap-y-4 border-b border-gray-200 pb-4 dark:border-gray-700 md:pb-5">
                    <dl className="w-1/2 sm:w-48">
                      <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                        Order ID:
                      </dt>
                      <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white truncate">
                        <a href="#" className="">
                          #{order._id}
                        </a>
                      </dd>
                    </dl>

                    <dl className="w-1/2 sm:w-1/4 md:flex-1 lg:w-auto truncate">
                      <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                        Date:
                      </dt>
                      <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white truncate">
                        {order.createdAt}
                      </dd>
                    </dl>

                    <dl className="w-1/2 sm:w-1/5 md:flex-1 lg:w-auto">
                      <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                        Price:
                      </dt>
                      <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                        Rs.{order.total}
                      </dd>
                    </dl>

                    <dl className="w-1/2 sm:w-1/4 sm:flex-1 lg:w-auto">
                      <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                        Status:
                      </dt>
                      <dd className="me-2 mt-1.5 inline-flex shrink-0 items-center rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                        <svg
                          className="me-1 h-3 w-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                          ></path>
                        </svg>
                        {order.orderStatus}
                      </dd>
                    </dl>

                    <div className="w-full sm:flex sm:w-32 sm:items-center sm:justify-end sm:gap-4 relative">
                      <button
                        id="actionsMenuDropdownModal10"
                        onClick={() => toggleDropdown(order._id)}
                        data-dropdown-toggle="dropdownOrderModal10"
                        type="button"
                        className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 md:w-auto"
                      >
                        Actions
                        <svg
                          className="-me-0.5 ms-1.5 h-4 w-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m19 9-7 7-7-7"
                          ></path>
                        </svg>
                      </button>

                      {openDropdownId === order._id && (
                        <div
                          id={`dropdownOrderModal-${order._id}`}
                          className="absolute top-full right-0 z-10 w-40 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700"
                        >
                          <ul
                            className="p-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400"
                            aria-labelledby="actionsMenuDropdown10"
                          >
                            <li>
                              <Button
                                onClick={() => {
                                  handleViewDetails(order);
                                }}
                                className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                <svg
                                  className="me-1.5 h-4 w-4 text-gray-400 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke="currentColor"
                                    stroke-width="2"
                                    d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                                  ></path>
                                  <path
                                    stroke="currentColor"
                                    stroke-width="2"
                                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                  ></path>
                                </svg>
                                Order details
                              </Button>
                            </li>
                            <li>
                              <Button
                                onClick={() => handleCancelOrder(order._id)}
                                data-modal-target="deleteOrderModal"
                                data-modal-toggle="deleteOrderModal"
                                className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                <svg
                                  className="me-1.5 h-4 w-4"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                                  ></path>
                                </svg>
                                Cancel order
                              </Button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {selectedOrder && (
        <OrderDetails
          isOpen={isModalOpen}
          closeModal={closeModal}
          selectedOrder={selectedOrder}
          orders={orders}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default ViewProfile;
