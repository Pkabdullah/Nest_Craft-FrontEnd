import { faqsdata } from "@/app/data";
import React from "react";

const FAQs = () => {
  return (
    <div className="bg-[#FFF5EE]">
      <section className="text-gray-600 lg:py-20 min-h-screen">
        <div className="container flex flex-col justify-center p-4 mx-auto md:p-8 text-[#3a1910]">
          <h2 className="mb-12 text-4xl font-bold text-center sm:text-3xl">
            FAQs
          </h2>
          <div className="flex flex-col divide-y sm:px-8 lg:px-12 xl:px-32 divide-gray-400">
            {faqsdata.map((faq) => (
              <details
                key={faq.id}
                className="transition-all duration-1000 ease-in-out overflow-hidden"
              >
                <summary className="py-2 outline-none cursor-pointer lg:text-sm text-md lg:font-semibold font-bold text-[#3a1910]">
                  {faq.summary}
                </summary>
                <div className="px-4 pb-4 transition-all duration-1000 ease-in-out">
                  <p className="text-sm">{faq.paragraph}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQs;
