"use client";

import { motion } from "framer-motion";

const VerifiedAnimation = ({title}) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="verified-animation flex flex-col items-center justify-center h-full mt-52"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="green"
        width="48px"
        height="48px"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1.34 14.66l-3.75-3.75 1.41-1.41 2.34 2.34 5.59-5.59 1.41 1.41-7 7z" />
      </svg>
     
      <p className="text-green-500 mt-4">{title}</p>
    
    </motion.div>
  );
};

export default VerifiedAnimation;