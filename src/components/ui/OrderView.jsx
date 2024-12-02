"use client";
import { useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";

const OrderDetails = ({ isOpen, closeModal, selectedOrder, orders }) => {
  if (!selectedOrder) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
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
              <Dialog.Panel className="relative w-full max-w-lg mx-auto max-h-[90vh] overflow-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5 mt-20">
                <button
                  onClick={closeModal}
                  className="absolute top-2 right-2 w-fit p-2 bg-blue-100 rounded-full hover:bg-white"
                >
                  <Image
                    src="/cross.png"
                    alt="close"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                </button>

                {/* Display selected order details */}
                <div className="flex-1 flex flex-col gap-3">
                  <h2 className="font-semibold text-xl md:text-2xl">
                    Order Details
                  </h2>

                  {selectedOrder.items.map((item,index) => (
                    <div key={index}>
                      <div
                        key={item._id}
                        className="flex flex-col md:flex-row gap-4"
                      >
                        <Image
                          src={"/" + item.imageUrl}
                          alt={item.productName}
                          width={80}
                          height={80}
                          className="object-contain rounded-lg"
                        />
                        <div className="flex flex-col">
                          <h3 className="text-lg font-medium">
                            {item.productName}
                          </h3>
                          <p className="text-gray-600">
                            Price: Rs.{item.price}
                          </p>
                          <p>x{item.qunatity}</p>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="border-b-2 border-black my-4"></div>

                  <div>
                    <h4 className="font-medium text-lg">Order Summary:</h4>
                    <p>
                      <strong>Payment Method:</strong>{" "}
                      {selectedOrder.paymentMethod}
                    </p>
                    <p>
                      <strong>Payment Status:</strong>{" "}
                      {selectedOrder.paymentStatus}
                    </p>
                    <p>
                      <strong>Order Status:</strong> {selectedOrder.orderStatus}
                    </p>
                    <p>
                      <strong>Order Date:</strong>{" "}
                      {new Date(selectedOrder.createdAt).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Delivery Date:</strong>{" "}
                      {new Date(
                        selectedOrder.deliveryDate
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default OrderDetails;