"use client";
import Image from "next/image";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { removeFromCart, updateQuantity } from "../Features/cartslice";
import { clearCart, setCart } from "../Features/cartslice";
const CheckOut = () => {
  const checkout = useSelector((state) => state.cart.cartItems);
  const { data: session, status } = useSession();
  console.log("session in chekout", session);

  //   const [checkItem, setcheckItem] = useState([]);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [selectPayment, SetselectPayment] = useState();

  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [zipcode, setZipcode] = useState("");

  const [checkItem, setcheckItem] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();

  const totalOriginalPrice = checkout.reduce(
    (acc, item) => acc + item.price * item.quantity,
    //(accumualtor,currentvalue)
    0
  );
  const DeliveryFee = 4500;
  const totalPrice = totalOriginalPrice + DeliveryFee;

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ productId, quantity: newQuantity }));
    }
  };

  const handlePayment = async () => {
    try {
      if (selectPayment === "card") {
        const getStripePromise = loadStripe(
          process.env.NEXT_PUBLIC_STRIPE_API_TOKEN
        );

        const response = await fetch(
          "http://localhost:3000/api/checkout-session/",
          {
            method: "POST",
            cache: "no-cache",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(checkout),
          }
        );

        const data = await response.json();

        if (data.session) {
          await (
            await getStripePromise
          ).redirectToCheckout({
            sessionId: data.session.id,
          });

          setTimeout(() => {
            dispatch(clearCart());
          }, 5000);
        }
      } else if (selectPayment === "cod") {
        dispatch(clearCart());
      }
    } catch (error) {
      toast.error("Failed to handle payment");
      console.error("Error handling payment:", error);
    }
  };

  const handleOrder = async () => {
    if (!session?.user?.id) {
      toast.error("Please log in to place order");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/orderdetails", {
        method: "POST",
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        setTimeout(() => {
          toast.success("ORDER PLACE successfully");

          router.replace("/");
          dispatch(clearCart());
        }, 2000);
      } else {
        throw new Error("Failed to place order");
      }

      console.log("order response", response);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const customerDetails = {
    // fullname: fullname,
    fullname: session?.user?.name,
    email: session?.user?.email,
    address: address,
    city: city,
    province: province,
    country: country,
    zipcode: zipcode,
  };

  const orderData = {
    userId: session?.user?.id,
    customerDetails,
    items: checkout.map((item) => ({
      productId: item.id,
      imageUrl: item.image,
      price: item.price,
      productName: item.productName,
      qunatity: item.quantity,
    })),

    total: totalPrice,
    paymentMethod: selectPayment,
  };
  console.log("Order details", orderData);

  return (
    <div className="bg-[#FFF5EE]">
      <div>
        <h1 className="lg:text-4xl text-3xl lg:px-32 lg:py-10 py-20 px-7 font-semibold">
          Checkout
        </h1>
        <div className="">
          <p className="max-sm:font-bold text-sm px-7 -mt-10  lg:px-32 lg:py-4 ">
            Returning Customer?
          </p>
          <Link href="/login" className="text-xs px-7  lg:px-32 ">
            Click here to login
          </Link>
        </div>
      </div>
      <div className="flex flex-col-reverse lg:flex-row lg:px-20 ">
        <div className="w-full lg:w-1/2 p-6">
          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2">
              <h2 className="text-2xl mb-4">Billing Details</h2>
              <div className="md:col-span-2">
                <label htmlFor="full_name">First name</label>
                <input
                  type="text"
                  name="full_name"
                  id="full_name"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  onChange={(e) => setFullName(e.target.value)}
                  // value={fullname}
                  value={session?.user?.name}
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="email">Email Address</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  placeholder="nestcraft@.pk"
                  onChange={(e) => setEmail(e.target.value)}
                  // value={email}
                  value={session?.user?.email}
                />
              </div>
              <div className="md:col-span-2 lg:col-span-1">
                <label htmlFor="address">Address/Street</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  placeholder="Apartment, suite, etc. (optional)"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                />
              </div>
              <div className="md:col-span-1">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                />
              </div>
              <div className="md:col-span-1">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  name="country"
                  id="country"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  placeholder="Pakistan"
                  onChange={(e) => setCountry(e.target.value)}
                  value={country}
                />
              </div>
              <div className="md:col-span-1">
                <label htmlFor="state">Province</label>
                <input
                  type="text"
                  name="province"
                  id="province"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  placeholder="Sindh"
                  onChange={(e) => setProvince(e.target.value)}
                  value={province}
                />
              </div>
              <div className="md:col-span-1">
                <label htmlFor="zipcode">Zipcode</label>
                <input
                  type="text"
                  name="zipcode"
                  id="zipcode"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  placeholder="12345"
                  onChange={(e) => setZipcode(e.target.value)}
                  value={zipcode}
                />
              </div>

              <p className="mt-8 text-lg font-medium">Payment Methods</p>
              <form className="mt-5 grid gap-6">
                <select
                  onChange={(e) => SetselectPayment(e.target.value)}
                  value={selectPayment}
                >
                  <option value="">Select Payment Method</option>
                  <option value="card">Card</option>
                  <option value="cod">Cash on Delivery</option>
                </select>
              </form>

              <div className="md:col-span-2 text-right">
                <button
                  onClick={() => {
                    handlePayment();
                    handleOrder();
                  }}
                  className="w-full mt-4 bg-[#3a1910] text-white font-medium py-2 rounded-lg"
                >
                  {selectPayment === "cod" ? "Place Order" : "Proceed To Pay"}
                </button>
              </div>

              <div className="flex items-center justify-center mt-4">
                <span className="text-sm font-normal text-gray-500">or</span>
                <Link href="/">
                  <h1 className="text-gray-500 ml-1 text-sm font-medium">
                    {" "}
                    Continue Shopping
                  </h1>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Left side - Order Summary */}
        <div className="w-full lg:w-1/2 p-6">
          <div className="lg:hidden mb-4">
            <button
              className="bg-gray-100 w-full p-4 text-left text-lg font-medium rounded-lg"
              onClick={() => setIsSummaryOpen(!isSummaryOpen)}
            >
              {isSummaryOpen ? "Hide Order Summary" : "Show Order Summary"} (Rs.
              {totalPrice})
            </button>
          </div>

          <div
            className={`${
              isSummaryOpen ? "block" : "hidden"
            } lg:block bg-white rounded shadow-lg p-4 px-4 md:p-8 `}
          >
            <h2 className="text-xl font-medium">Your Order</h2>

            <div className="mt-8 space-y-6">
              {checkout.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center rounded-lg bg-white"
                >
                  <Image
                    className="m-2  rounded-md border object-contain lg:w-20 lg:h-14 max-sm:w-20 max-sm:h-14"
                    src={"/" + item.image}
                    alt={item.productName}
                    width={350}
                    height={150}
                  />

                  <div className="flex flex-col ml-4">
                    <span className="text-sm text-gray-500 border border-transparent lg:w-56 lg:h-12">
                      {item.productName || item.Title}
                    </span>
                    <span className="text-sm font-semibold">
                      Rs. {item.price}
                    </span>

                    <li className="flex items-center lg:hidden mt-4 ">
                      <button
                        type="button"
                        className="inline-flex h-2 w-2 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none"
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <svg
                          className="h-2 w-2 text-gray-900"
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
                        className="w-10 h-4 shrink-0 border-0 bg-white text-center text-sm font-medium text-gray-900 focus:outline-none"
                        value={item.quantity}
                        readOnly
                      />
                      <button
                        type="button"
                        className="inline-flex h-2 w-2 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none"
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity + 1)
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
                    </li>
                  </div>

                  <li className="lg:flex lg:items-center max-sm:hidden ">
                    <button
                      type="button"
                      className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none"
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity - 1)
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
                        handleUpdateQuantity(item.id, item.quantity + 1)
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
                  </li>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <dl className="flex justify-between">
                <dt className="text-base font-normal text-gray-500">
                  Original Price
                </dt>
                <dd className="text-base font-medium text-gray-900">
                  Rs. {totalOriginalPrice}
                </dd>
              </dl>

              <dl className="flex justify-between">
                <dt className="text-base font-normal text-gray-500">
                  Delivery Fees
                </dt>
                <dd className="text-base font-medium text-gray-900">
                  Rs. {DeliveryFee}
                </dd>
              </dl>

              <dl className="flex justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-bold text-gray-900">Total</dt>
                <dd className="text-base font-medium text-red-600">
                  Rs. {totalPrice}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};

export default CheckOut;
