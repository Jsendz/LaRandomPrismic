"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface SpinningVectorProps {
  imageSrc: string; // Ensure imageSrc is a string (not an object)
  altText?: string;
}

export default function SpinningVector({ imageSrc, altText = "Spinning Image" }: SpinningVectorProps) {
  return (
    <motion.div
      className="relative w-16 h-16 flex items-center justify-center"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
    >
      {/* Outer Spinning Border */}
      <div className="absolute w-full h-full rounded-full border-4 border-lime-500 border-t-transparent border-r-transparent border-b-transparent"></div>

      {/* Center Image */}
      <Image src={imageSrc} alt={altText} width={40} height={40} className="rounded-full object-cover" />
    </motion.div>
  );
}
