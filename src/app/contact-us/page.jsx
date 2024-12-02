"use client"
import FAQs from "@/components/FAQs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactUs = () => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Message, setMessage] = useState("");

  const router = useRouter();

  async function handleContactSubmit() {
    try {
      const response = await fetch(`/api/contactus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Name, Email, Phone, Message }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to submit the form.");
      }

      // Reset form fields
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");

      router.refresh();
      toast.success("Form successfully submitted!");
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Submission failed! Please try again.");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    handleContactSubmit();
  };

  return (
    <div class="bg-[#FFF5EE] ">
      <section>
        <div class="container px-6 py-12 mx-auto">
          <div className="lg:p-16 py-10">
            <p class="font-medium text-[#3a1910] lg:text-4xl max-sm:text-5xl ">
              Contact us
            </p>
          </div>

          <div className="lg:p-24">
            <span class="inline-block  text-[#3a1910] rounded-full bg-blue-100/80 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>
            </span>

            <h2 class="mt-4 text-base font-medium text-gray-800 ">Phone</h2>
            <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Mon-Fri from 8am to 5pm.
            </p>
            <p class="mt-2 text-sm text-[#3a1910] dark:text-blue-400">
              (+92) 301 0983333 (+92) 308 2607537
            </p>
          </div>

          <div class="grid grid-cols-1 gap-12 max-sm:mt-10 lg:grid-cols-3 lg:p-24">
            <div class="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-1">
              <div>
                <span class="inline-block p-3 text-[#3a1910] rounded-full bg-blue-100/80 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </span>

                <h2 class="mt-4 text-base font-medium text-gray-800 ">Email</h2>
                <p class="mt-2 text-sm text-[#3a1910] dark:text-gray-400">
                  Our friendly team is here to help.
                </p>
                <p class="mt-2 text-sm text-[#3a1910] dark:text-blue-400">
                  support@nestcraft.com
                </p>
              </div>

              <div>
                <span class="inline-block p-3 text-[#3a1910] rounded-full bg-blue-100/80 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                </span>

                <h2 class="mt-4 text-base font-medium text-gray-800 ">
                  Store Location
                </h2>

                <p class="mt-2 text-sm text-[#3a1910] ">abc street xyz road</p>
              </div>
            </div>

            <div class="overflow-hidden rounded-lg lg:col-span-2 h-96 lg:h-auto">
              <iframe
                width="100%"
                height="100%"
                frameborder="0"
                title="map"
                marginheight="0"
                marginwidth="0"
                scrolling="no"
                src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=Islamabad%2C%20Pakistan&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <div className="lg:px-28 bg-[#FFF5EE]">
        <h1 class="mt-2 text-2xl font-semibold text-[#906642] md:text-3xl px-20 py-4">
          Get in touch
        </h1>
        <form
          className="border border-transparent lg:w-[1050px] mx-auto"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col lg:flex-row mb-6">
            <div className="relative mb-4 lg:mb-0 lg:w-1/3 pr-2">
              <input
                type="text"
                className="peer block w-full rounded border-2 bg-transparent py-1 px-3 outline-none transition duration-200"
                placeholder="Full Name"
                onChange={(e) => setName(e.target.value)}
                value={Name}
                required
              />
             
            </div>
            <div className="relative mb-4 lg:mb-0 lg:w-1/3 px-2">
              <input
                type="email"
                className="peer block w-full rounded border-2 bg-transparent py-1 px-3 outline-none transition duration-200"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
                value={Email}
                required
              />
             
            </div>
            <div className="relative lg:w-1/3 pl-2">
              <input
                type="tel"
                className="peer block w-full rounded border-2 bg-transparent py-1 px-3 outline-none transition duration-200"
                placeholder="Phone Number"
                onChange={(e) => setPhone(e.target.value)}
                value={Phone}
                required
              />
             
            </div>
          </div>
          <div className="relative mb-6">
            <textarea
              className="peer block w-full rounded border-2 bg-transparent py-1 px-3 outline-none transition duration-200"
              rows="3"
              placeholder="Your message"
              onChange={(e) => setMessage(e.target.value)}
              value={Message}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            // className="bg-blue-500 text-white py-2 px-4 rounded"
             className="mb-6 w-32 rounded bg-[#3a1910] text-white py-2 px-4 text-xs font-medium uppercase leading-normal lg:mb-0"
          >
            Submit
          </button>
        </form>
      </div>
      <FAQs />
      <ToastContainer/>
    </div>
  );
};

export default ContactUs;
