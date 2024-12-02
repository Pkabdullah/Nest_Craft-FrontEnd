"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import VerifiedAnimation from "@/components/ui/VerifiedAnimation";
export default function SignUpPage() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registered, setisRegisterd] = useState(false);
  const router = useRouter();
  const handleForm = async (e) => {
    e.preventDefault();
    console.log(fullname, email, password);

    try {
      const userresponse = await fetch(
        `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/api/userexist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!userresponse.ok) {
        throw new Error("Error checking user existence");
      }

      const { userexist } = await userresponse.json();
      if (userexist) {
        toast.error("User already exists");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/api/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fullname, email, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Error signing up user");
      }

      const data = await response.json();
      console.log("User sign-up data here", data);
      setisRegisterd(true);
      setTimeout(() => {
        router.replace("/signin");
      }, 900);
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again.");
    }
  };
  if (registered) {
    return <VerifiedAnimation title={"User Register Succesfully"} />;
  }
  return (
    <div className="relative min-h-screen flex items-center justify-center transition-all duration-500 ease-in-out">
      <div className="absolute inset-0 bg-[url('/patt.jpg')] bg-cover bg-center bg-no-repeat opacity-30 z-0"></div>

      <motion.div
        className="lg:bg-[#FFF5EE] max-sm:bg-transparent rounded-lg shadow-lg max-w-4xl w-full p-6 md:flex overflow-hidden transition-all duration-700 ease-in-out"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="hidden md:block md:w-1/2 p-8 bg-[#c1afa9] relative rounded-2xl"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          <div className="relative h-full flex items-center justify-center">
            <Image
              src="/chr1.png"
              alt="Furniture Delight"
              layout="fill"
              objectFit="cover"
              className="rounded-xl mt-10"
            />
            <div className="absolute top-0 left-0 p-6">
              <h2 className="text-4xl font-bold text-black">
                Unlock a{" "}
                <span className="text-[#65473E]"> World of Furniture</span>{" "}
                Delights!
              </h2>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="md:w-1/2 p-8"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-left">
            <h1 className="text-3xl font-bold text-gray-800">
              Create an account
            </h1>
            <p className="mt-2 text-gray-600">Please fill in your details</p>
          </div>

          <motion.form
            key="signup-form"
            onSubmit={handleForm} // Add onSubmit to handle form submission
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="full-name"
                name="full-name"
                type="text" // Change type to text
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-gray-500 max-sm:bg-[#FFF5EE]"
                placeholder="Full Name"
                onChange={(e) => setFullname(e.target.value)}
                value={fullname}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-gray-500 max-sm:bg-[#FFF5EE]"
                placeholder="nestcraft@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-gray-500 max-sm:bg-[#FFF5EE]"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div>
              <motion.button
                type="submit"
                className="w-full bg-[#3a1910] text-white p-3 rounded-xl font-semibold shadow-md hover:bg-[#906642] transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign up
              </motion.button>
            </div>
          </motion.form>

          <div className="mt-6 text-center">
            <span className="text-gray-600 text-sm">OR</span>
          </div>
          <div className="mt-4 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <Link href="/signin" className="text-[#3a1910] font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
      <ToastContainer />
    </div>
  );
}
