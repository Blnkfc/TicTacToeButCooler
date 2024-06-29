"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
    initial={{ 
      width: "100%",
      opacity: 0,
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    }}
    animate={{ 
      opacity: 1,
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
     }}
    exit={{
      clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)"
    }}
    transition={{ duration: 0.45 }}
    >
      {children}
    </motion.div>
  );
}
