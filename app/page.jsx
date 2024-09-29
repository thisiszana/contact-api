"use client";

import { useState } from "react";
import { Inter } from "next/font/google"; // Import Google Font
import { motion } from "framer-motion"; // Import Framer Motion for animation
import Image from "next/image";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });

export default function Home() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 ${inter.className} bg-gray-100 text-gray-800`}
    >
      {/* Header */}
      <header className="text-center">
        <h1 className="text-5xl font-bold text-blue-600 tracking-tight">
          Contact API
        </h1>
      </header>

      {/* Content */}
      <main className="text-center">
        <p className="text-lg sm:text-xl">
          Developed by{" "}
          <span className="font-semibold text-purple-500">Zana</span> with{" "}
          {/* Animated Heart Emoji */}
          <motion.span
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            animate={{ scale: hovered ? 1.5 : 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="inline-block text-red-500 cursor-pointer"
          >
            ❤
          </motion.span>
        </p>
        <div className="m-4 flex flex-col items-center">
          <Link
            href="https://admin-dahboard-shop.vercel.app/"
            target="_blank"
            className="inline-block"
          >
            <Image
              src="/image/Screenshot (63).png"
              width={500}
              height={500}
              className="border-2 border-black rounded-md"
            />
          </Link>
          <Link
            href="https://github.com/thisiszana/admin-dahboard-shop"
            target="_blank"
            className="inline-block mt-4 text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out relative"
          >
            GitHub Repository
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-sm text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} Zana's API. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
