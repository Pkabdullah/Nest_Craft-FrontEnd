"use client";
import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useSelector } from "react-redux";
const RecentlyView = ({ isOpen, closeModal }) => {

  const recentlyViewProduct = useSelector((state) => state.view.viewProduct);


  if (!recentlyViewProduct || recentlyViewProduct.length === 0) {
    return null;
  }

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
              <Dialog.Panel className="w-[1037px] h-[160px] overflow-hidden transform bg-[#FFF5EE] p-6 text-left align-middle shadow-xl transition-all">
                <div className="mt-2 grid grid-cols-3 gap-4">
                  {recentlyViewProduct.map((item, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <img
                        className="w-[120px] h-[118px]"
                        src={"/" + item.image.name}
                        alt="Product Image"
                      />
                      <p>{item.title}</p> 
                      <p>${item.price}</p> 
                    </div>
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


// const RecentlyView = ({ isOpen, closeModal }) => {
//   const recentlyViewProduct = useSelector((state) => state.view.viewProduct);
//   console.log("Recently view data", recentlyViewProduct);

//   if (!recentlyViewProduct || recentlyViewProduct.length === 0) {
//     return null;
//   }
//   return (
//     <Transition appear show={isOpen} as={Fragment}>
//       <Dialog as="div" className="relative z-10" onClose={closeModal}>
//         <Transition.Child
//           as={Fragment}
//           enter="ease-out duration-300"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="ease-in duration-200"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-black/45 " />
//         </Transition.Child>

//         <div className="fixed inset-0 overflow-auto">
//           <div className="flex min-h-full items-center justify-center p-4 text-center">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 scale-95"
//               enterTo="opacity-100 scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-95"
//             >
//               <Dialog.Panel className="w-[1037px] h-[160px] overflow-hidden transform  bg-[#FFF5EE] p-6 text-left align-middle shadow-xl transition-all">
//                 <div className="mt-2">
//                   {recentlyViewProduct.map((item, i) => (
//                     <div className="-mt-2 ">
//                       <img
//                         className="w-[120px] h-[118px] "
//                         src={"/" + item.image.name}
//                         alt="Product Image"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </div>
//       </Dialog>
//     </Transition>
//   );
// };

export default RecentlyView;
