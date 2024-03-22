"use client"
import backgroud_image from "../assets/images/back_image.jpg"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { 
  IMAGES_CAPTION,STATS,
  REVIEWS,
  HOME_PAGE_STRING,
  FAQ,
  SLIDER
 } from "../constant/constant"
import india_map from "../assets/images/india_map.jpg"

export default function Home() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      <div className="bg-black">
        {/* STARTING IMAGE*/}
        <div>
          <div>
            <Image
              src={backgroud_image}
              alt="background image"
            />
          </div>
        </div>




        {/* Button Panel  */}
        <div className="h-48 flex  max-md:h-auto bg-white text-black">
          <div className="flex flex-wrap justify-center w-full items-center gap-20 p-10">
            {IMAGES_CAPTION.map((item, index) => (
              <Link href={item.url} key={index}>
                <div key={index} className="text-center transition-all hover:scale-105 font-semibold">
                  <Image
                    src={item.image}
                    alt="image"
                    width={120}
                    className="bg-indigo-100 shadow-2xl rounded-3xl"
                  />
                  <figcaption>{item.caption}</figcaption>
                </div>
              </Link>
            ))}
          </div>
        </div>



            
        {/* Slider */}

        <div className="bg-white pt-10">
            <div className="w-full flex justify-center">
                <h1 className="text-gray-600 text-2xl 
                max-lg:text-xl,
                max:md:text-lg,
                max-sm:text-base
                ">-----OUR SERVICES-----</h1>
            </div>
          <div className="container overflow-auto flex [scroll-snap-type:x_mandatory] w-[90%] mx-[auto] my-[0] px-[15px] py-[0]">
              {SLIDER.map((item,index)=>(
                <div key={index} className="card bg-gradient-to-r [box-shadow:0_8px_32px_0_rgba(31,_38,_135,_0.37)] backdrop-filter backdrop-blur-[7px] rounded-[10px] p-8 m-4 w-full h-60" 
                style={{backgroundColor:item.color}}>
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
            <h1 className="text-4xl text-white text-center font-semibold w-3/4 p-16
            max-lg:text-4xl max-lg:w-full
            max-sm:text-2xl max-sm:w-full
            ">{HOME_PAGE_STRING.thanks}</h1>
          </div>
          <div className="w-full flex justify-center">
            <p className="text-white text-center border-2 p-6 rounded-xl font-semibold text-xl
            max-lg:text-lg
            max-sm:text-sm w-10/12 max-sm:p-4
            ">{HOME_PAGE_STRING.celebrate}</p>
          </div>
        </div>


        {/* statistics  */}
        <div className="bg-black">
          <div className="w-full text-white flex justify-center gap-36 my-20
          max-lg:gap-20
          max-sm:flex-col max-sm:gap-10
          ">
            {STATS.map((item, index) => (
              <div key={index}>
                <div>
                <h1 className="text-3xl font-semibold text-center
                
                ">{item.num}</h1>
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
          <div className="flex flex-col items-center">
            <Image src={india_map} alt="india map" height={450}></Image>
            <figcaption className="text-slate-400  text-center w-3/4 font-bold p-14
            max-lg:text-sm max-lg:w-full 
            max-sm:text-[12px] max-sm:w-full
            ">{HOME_PAGE_STRING.serving}</figcaption>
          </div>
        </div>


        {/* Reviews */}
        <div className="flex flex-col w-full items-center bg-black text-white">
          <div>
            <h3 className="text-gray-400 max-md:text-xs
            max-sm:text-[11px]
            ">-----SOME WORDS FROM OUR HAPPY CUSTOMERS-----</h3>
          </div>
          <div>
            <div className="grid grid-cols-4 w-full gap-2 mt-2 overflow-clip
            max-lg:grid-cols-2 p-4  
            max-sm:grid-cols-1">
              {REVIEWS.map((item, index) => (
                <div key={index}>
                  <div className="p-4 min-h-72 rounded-xl hover:bg-gradient-to-br from-slate-900 to-gray-800
                  hover:scale-105 transition-all">
                    <div className="flex">
                      <Image
                        src={item.img}
                        alt="profile pic"
                        width={80}
                        className="rounded-full"
                      />
                      <div className="ml-1 mt-1">
                        <p className="text-lg font-semibold max-md:text-base">{item.name}</p>
                        <p className="text-sm">{item.type},{item.rating}<span className="text-yellow-500">&#9733;</span></p>
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
          <div className="text-4xl font-semibold">{FAQ.title}</div>
          <div className="text-2xl">{FAQ.title_desc}</div>
        </div>

        <div className="flex flex-col gap-2 justify-center items-center bg-white mb-5">
          {FAQ.questions.map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 p-4 w-3/4 rounded-lg shadow-md shadow-gray-400 transition duration-300 hover:scale-105"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="flex justify-between w-full"
              >
                <span className="text-gray-600 text-md font-semibold">
                  {item.question}
                </span>
                <svg
                  className={`fill-amber-500 shrink-0 ml-8 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
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
                className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${
                  openIndex === index
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
  )
}