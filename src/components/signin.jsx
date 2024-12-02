"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function SignIn({ toggleForm }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (event) => {
    event.preventDefault();
    console.log("Sign In:", email, password);

  };

  return (
    <motion.form
      key="login-form"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="mt-8"
      onSubmit={handleSignIn}
    >
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-gray-500"
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
          className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-gray-500"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>

      <motion.button
        type="submit"
        className="w-full bg-[#3a1910] text-white p-3 rounded-xl font-semibold shadow-md hover:bg-[#906642] transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Sign in
      </motion.button>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?
          <button
            onClick={toggleForm}
            className="ml-2 text-[#906642] hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </motion.form>
  );
}
