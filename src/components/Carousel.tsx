// Carousel.tsx
"use client";
import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { arrow_left, arrow_right } from "@/assets/Images/imageassets";
interface CarouselProps {
  slides_data: StaticImageData[];
}

export default function Carousel({ slides_data }: CarouselProps) {
  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides_data.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === slides_data.length - 1 ? 0 : curr + 1));

  return (
    <div className="overflow-hidden relative">
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides_data.map((item, index) => (
          <Image
            key={index}
            src={item}
            alt="carousel"
            className="w-full h-full border-2 border-white"
          />
        ))}
      </div>
      <div className="absolute inset-0 flex justify-between items-center p-4 ">
        <div>

        <button
          className="w-auto h-auto bg-white p-2 rounded-full hover:scale-90 transition-all duration-100 opacity-75"
          onClick={prev}
        >
          <Image src={arrow_left} alt="arrow-left" />
        </button>
        </div>
        <div>

        <button
          className="w-auto h-auto bg-white p-2 rounded-full hover:scale-90 transition-all duration-100 opacity-75"
          onClick={next}
        >
          <Image src={arrow_right} alt="arrow-right" />
        </button>
        </div>
      </div>
      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {slides_data.map((_, i) => (
            <div
              key={i}
              className={`
              transition-all w-3 h-3 bg-white rounded-full
              ${curr === i ? "p-2" : "bg-opacity-50"}
            `}
            />
          ))}
        </div>
      </div>
      <div className="absolute bottom-5 left-8  max-[321px]:left-4 max-[321px]:bottom-4">
            <div className="flex flex-col justify-center items-center gap-4 max-[462px]:gap-1">
            <div className="text-[10px] font-bold ">
                10 JAN 2020
            </div>
            <div className="text-xs font-bold bg-[#2967ff] p-2.5 text-white rounded-md tracking-widest w-full text-center border-[#2967ff] border-2  hover:bg-white hover:text-[#2967ff] hover:border-[#2967ff] hover:border-2 transition-all duration-100 max-[462px]:p-1 max-[321px]:text-[10px]">
                View Post
            </div>
            </div>
      </div>
    </div>
  );
}
