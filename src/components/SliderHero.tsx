"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  link: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "",
    subtitle: "",
    image: "/images/banner1.png",
    link: "/shop",
  },
  {
    id: 2,
    title: "",
    subtitle: "",
    image: "/images/banner2.png",
    link: "/shop",
  },
  {
    id: 3,
    title: "",
    subtitle: "",
    image: "/images/banner3.png",
    link: "/shop",
  },
  {
    id: 4,
    title: "",
    subtitle: "",
    image: "/images/banner4.png",
    link: "/shop",
  },
  {
    id: 5,
    title: "",
    subtitle: "",
    image: "/images/banner5.png",
    link: "/shop",
  },

];

export default function HeroSlider() {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative h-[40vh] w-full md:h-[77vh] overflow-hidden rounded-2xl">
      <AnimatePresence initial={false}>
        <motion.div
          key={slides[index].id}
          className="absolute inset-0"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Background Image (responsive) */}
          <Image
            src={slides[index].image}
            alt={slides[index].title}
            fill
            priority={index === 0}
            quality={85}
            className="object-cover"
            sizes="70vw" // ensures correct responsive image sizes
          />

          {/* Overlay */}
          <div className="absolute inset-0  flex flex-col items-center justify-center text-center text-white px-4 md:px-8">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3">
              {slides[index].title}
            </h1>
            <p className="text-sm sm:text-lg md:text-2xl max-w-2xl">
              {slides[index].subtitle}
            </p>
          </div>

          {/* Shop Now button (responsive) */}
          <div className="absolute py-2 px-0 bottom-[2.5rem] md:bottom-[4rem] left-1/2 -translate-x-1/2">
            <Link
              href={slides[index].link}
              className="inline-flex items-center px-[.5rem] py-2 sm:px-6 sm:py-3 bg-orange-600 rounded-2xl shadow-lg hover:bg-orange-500 text-sm sm:text-base md:text-lg"
            >
              Shop Now <ArrowRight className="ml-2 size-5" />
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full transition ${
              i === index ? "bg-white" : "bg-gray-400/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
