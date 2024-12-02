"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerifiedAnimation from "@/components/ui/VerifiedAnimation";
import { signIn, useSession } from "next-auth/react";
export default function SignInPage() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  console.log("datataaaff", session);

  const handleForm = async (e) => {
    e.preventDefault();
    console.log(fullname, email, password);

    setIsSubmitting(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res.error) {
        toast.error("Invalid credentials");
        setIsSubmitting(false);
        return;
      }

      if (res.ok) {
        toast.success("Login successful");
        setTimeout(() => {
          router.replace("/");
        }, 1500);
      }
    } catch (error) {
      toast.error("Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (status === "authenticated") {
    return <VerifiedAnimation title={"User Verified"} />;
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center transition-all duration-500 ease-in-out">
      <div className="absolute inset-0 bg-[url('/patt.jpg')] bg-cover bg-center bg-no-repeat opacity-30 z-0"></div>

      <motion.div
        className={`lg:bg-[#FFF5EE] max-sm:bg-transparent rounded-lg shadow-lg max-w-4xl w-full p-6 md:flex overflow-hidden transition-all duration-700 ease-in-out`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Left Side (Form) */}
        <motion.div
          className="md:w-1/2 p-8"
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-left">
            <h1 className="text-3xl font-bold text-gray-800">Welcome back</h1>
            <p className="mt-2 text-gray-600">Please enter your details</p>
          </div>

          <motion.form
            key="login-form"
            onSubmit={handleForm} // Add onSubmit to handle form submission
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
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

            {/* Password Field */}
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

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#3a1910] text-white p-3 rounded-xl font-semibold shadow-md hover:bg-[#906642] transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign in
            </motion.button>
          </motion.form>

          <div className="mt-6 text-center">
            <span className="text-gray-600 text-sm">OR</span>
            <div className="mt-4">
              <button
                className="w-full flex items-center justify-center bg-white border border-gray-300 p-3 rounded-md shadow-sm hover:bg-gray-50"
                onClick={() => signIn("google", { callbackUrl: "/" })}
              >
                <Image
                  src="/google.png"
                  alt="Google"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                Sign in with Google
              </button>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <Link href="/signup" className="text-[#3a1910] font-semibold">
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Right Side (Image and Text) */}
        <motion.div
          className="hidden md:block md:w-1/2 p-8 bg-[#c1afa9] relative rounded-2xl"
          initial={{ x: 100, opacity: 0 }}
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
      </motion.div>
      <ToastContainer />
    </div>
  );
}
