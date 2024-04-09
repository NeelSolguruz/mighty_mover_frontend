"use client";
import backgroud_image from "../assets/Images/home_back_image.png";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  IMAGES_CAPTION,
  STATS,
  REVIEWS,
  HOME_PAGE_STRING,
  FAQ,
  SLIDER,
  SLIDER_TITLE,
  REVIEWS_TITLE,
  BACKGROUND_TEXT
} from "../constant/constant";
import india_map from "../assets/Images/india_map.jpg";
import { MdLocalCafe } from "react-icons/md";

export default function Home() {

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

 

  return (
    <>
      <div>
        {/* STARTING IMAGE*/}
        <div className="relative">
          <div className="bg-black">
            <Image src={backgroud_image} alt="background image"
              className="opacity-75 w-full h-96 max-lg:h-auto"
            />
          </div>
          <div className="w-full flex justify-center">
            <div className="text-white absolute bottom-40 bg-transparent w-9/12 flex flex-col gap-4 max-lg:bottom-40 max-sm:bottom-14 max-sm:gap-0">
              <div>
                <h1 className="text-5xl max-md:text-2xl">{BACKGROUND_TEXT.question}</h1>
              </div>
              <div>
                <h1 className="text-6xl max-md:text-3xl font-bold">{BACKGROUND_TEXT.tagline}</h1>
              </div>
            </div>
          </div>
        </div>


        {/* Button Panel  */}
        <div className="flex justify-center">
          <div className="absolute h-56 flex justify-center bg-white top-[350px] shadow-md max-md:h-auto w-9/12 rounded-lg max-lg:static max-lg:shadow-none max-lg:mt-10 max-lg:bg-none">
            <div className="grid grid-cols-4 max-lg:w-full max-md:grid-cols-1 max-md:gap-5 w-9/12 items-center">
              {IMAGES_CAPTION.map((item, index) => (
                <Link href={item.url} key={index}>
                  <div className="text-center transition-all hover:scale-105 font-semibold flex flex-col gap-3 items-center">
                    <Image
                      src={item.image}
                      alt="image"
                      width={100}
                      className="bg-indigo-100 rounded-lg"
                    />
                    <figcaption className="max-lg:text-sm">{item.caption}</figcaption>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Slider */}
        <div className="relative bg-white pt-10 mt-32 mb-12 max-lg:static max-lg:mt-0">
          <div className="w-full flex justify-center">
            <h1
              className="text-gray-600 text-xl 
                max-lg:text-lg,
                max-md:text-base,
                "
            >
              {SLIDER_TITLE.title}
            </h1>
          </div>
          <div className="container overflow-auto flex [scroll-snap-type:x_mandatory] w-[90%] mx-[auto] my-[0] px-[15px] py-[0] scrollbar">
            {SLIDER.map((item, index) => (
              <div
                key={index}
                className="card bg-gradient-to-r  backdrop-filter backdrop-blur-[7px] rounded-[10px] p-8 m-4 w-full h-60"
                style={{background:item.color}}
              >
                <div>
                  <h3 className="title whitespace-nowrap mx-[auto] my-4 font-bold text-white w-60 text-2xl">
                    {item.title}
                  </h3>
                  <p className="text-white text-xl mt-5">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Thanking message */}
        <div className="bg-black">
          <div className="w-full flex justify-center">
            <h1
              className="text-4xl text-white text-center font-semibold w-3/4 p-16
            max-lg:text-4xl max-lg:w-full
            max-sm:text-2xl max-sm:w-full
            "
            >
              {HOME_PAGE_STRING.thanks}
            </h1>
          </div>
          <div className="w-full flex justify-center">
            <p
              className="text-[#fabc1c] bg-[#241a0c] text-center border-2 border-[#ae851b] p-6 rounded-xl font-semibold text-2xl
            max-lg:text-lg
            max-sm:text-sm w-10/12 max-sm:p-4
            "
            >
              {HOME_PAGE_STRING.celebrate}
            </p>
          </div>
        </div>

        {/* statistics  */}
        <div className="bg-black">
          <div
            className="w-full text-white flex justify-center gap-36 py-20
          max-lg:gap-20
          max-sm:flex-col max-sm:gap-10
          "
          >
            {STATS.map((item, index) => (
              <div key={index}>
                <div>
                  <h1
                    className="text-3xl font-semibold text-center
                
                "
                  >
                    {item.num}
                  </h1>
                </div>
                <div>
                  <p className="text-xl text-center">{item.val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* India Map */}
        <div className="bg-black">
          <div className="flex flex-col items-center p-1">
            <Image src={india_map} alt="india map" height={450}></Image>
            <figcaption
              className="text-slate-400  text-center w-3/4 font-bold p-14
            max-lg:text-sm max-lg:w-full 
            max-sm:text-[12px] max-sm:w-full
            "
            >
              {HOME_PAGE_STRING.serving}
            </figcaption>
          </div>
        </div>

        {/* Reviews */}
        <div className="flex flex-col w-full items-center bg-black text-white">
          <div>
            <h3
              className="text-gray-400 max-md:text-xs
            max-sm:text-[11px]
            "
            >
              {REVIEWS_TITLE.title}
            </h3>
          </div>
          <div>
            <div
              className="grid grid-cols-4 w-full gap-2 mt-2 overflow-clip
            max-lg:grid-cols-2 p-4  
            max-sm:grid-cols-1"
            >
              {REVIEWS.map((item, index) => (
                <div key={index}>
                  <div
                    className="p-4 min-h-72 rounded-xl hover:bg-gradient-to-br from-slate-900 to-gray-800
                  hover:scale-105 transition-all"
                  >
                    <div className="flex">
                      <Image
                        src={item.img}
                        alt="profile pic"
                        width={80}
                        className="rounded-full"
                      />
                      <div className="ml-1 mt-1">
                        <p className="text-lg font-semibold max-md:text-base">
                          {item.name}
                        </p>
                        <p className="text-sm">
                          {item.type},{item.rating}
                          <span className="text-yellow-500">&#9733;</span>
                        </p>
                        <p className="text-sm">{item.loc}</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p>{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="flex flex-col w-full items-center p-10 flex-wrap gap-10 bg-white text-black">
          <div className="text-4xl font-semibold text-center">{FAQ.title}</div>
          <div className="text-2xl text-center">{FAQ.title_desc}</div>
        </div>

        <div className="flex flex-col gap-4 justify-center items-center bg-white mb-10">
          {FAQ.questions.map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 p-4 w-3/4 rounded-lg shadow-sm shadow-gray-400 transition duration-300 hover:scale-105"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="flex justify-between w-full"
              >
                <span className="text-gray-600 text-md font-semibold">
                  {item.question}
                </span>
                <svg
                  className={`fill-amber-500 shrink-0 ml-8 transition-transform duration-200 ${openIndex === index ? "rotate-180" : ""
                    }`}
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    y="7"
                    width="16"
                    height="2"
                    rx="1"
                    className="transform origin-center transition duration-200 ease-out"
                  />
                  <rect
                    y="7"
                    width="16"
                    height="2"
                    rx="1"
                    className="transform origin-center rotate-90 transition duration-200 ease-out"
                  />
                </svg>
              </button>
              <div
                className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${openIndex === index
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
                  }`}
              >
                <div className="overflow-hidden">
                  <span className="text-sm text-black">{item.answer}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
