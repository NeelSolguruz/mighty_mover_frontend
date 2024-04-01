"use client";
import React, { useState } from "react";
import Link from "next/link";
// import { Button, Modal } from "antd";
import Image from "next/image";
import { truck_page_indi, QR } from "@/assets/Images/imageassets";
import {
  TRUCK_MAIN_PAGE_DATA,
  LIGHT_VEHICLE_DATA,
  HEAVY_VEHICLE_DATA,
  RENT_MINI_TRUCKS_IN_AHMEDABAD,
  CITIES,
  POPULAR_OUTSTATIONS_FROM_AHMEDABAD_ALL_DATA,
  POPULAR_OUTSTATIONS_FROM_AHMEDABAD,
  AREAS_WE_SERVE_IN,
  AREAS_WE_SERVE_IN_DATA,
  THINK_lOGISTICS_THINK_PORTER,
  GET_ORDERS,
  SCAN_TO_DOWNLOAD,
  IMAGES_CAPTION,
  CHOOSE_FROM_OUR_SERVICES,
  POPULAR_CATEGORIES,
  POPULAR_CATEGORIES_DATA,
  EXPLORE_TRUCK_RENTAL,
  RENT_MINI_TRUCK,
  ENTERPRISE_STRING,
  DELIVERY_PARTNER_STRING,
  IN_CASE_YOU_HAVE_MORE_QUESTION,
} from "@/constant/constant";
import { KNOW_MORE } from "@/constant/constant";
import { FaCity } from "react-icons/fa";
// import { Segmented } from "antd";
import { FaWeightHanging } from "react-icons/fa";
import { Poppins } from "next/font/google";
export default function Truck() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [truckval, setTruckval] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // const smallTruckRef = useRef(null);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  // const scrollToSmallTruck = () => {
  //   if (smallTruckRef.current) {
  //     smallTruckRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // };
  const scrollToSmallTruck = (sectionId: string) => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const toggleAccordion = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      <div className="flex flex-col gap-10 w-full h-auto bg-gray-100 ">
        {/* there is city select model */}
        <div className="w-full relative">
          <Image src={truck_page_indi} alt="truck main page" className="h-96" />
          <div className="flex flex-col gap-4 w-full justify-center text-center absolute top-8 max-tablet:top-2 max-middle:top-14 max-s:top-10">
            <div className="text-white font-semibold text-4xl max-tablet:text-3xl max-s:text-2xl">
              {TRUCK_MAIN_PAGE_DATA[0].title}
            </div>
            <div className="w-full text-white font-medium text-xl flex justify-center max-tablet:text-lg max-middle:text-md">
              <div className="w-1/2 max-middle:w-full max-middle:p-2 max-middle:text-sm">
                {TRUCK_MAIN_PAGE_DATA[0].desc}
              </div>
            </div>
            <div className="w-full text-white font-medium text-md underline flex justify-center items-center">
              <div
                onClick={(event: React.MouseEvent<HTMLDivElement>) =>
                  scrollToSmallTruck("small-truck")
                }
                className="cursor-pointer"
              >
                {KNOW_MORE}
              </div>
            </div>
            <div className="w-full flex justify-center items-center">
              <div
                className="w-20 bg-orange-100 border-2 border-orange-500 flex justify-center items-center p-2 rounded-lg transition-all hover:scale-90"
                onClick={showModal}
              >
                <FaCity className="text-4xl text-orange-500" />
              </div>
              {isModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                  <div className="bg-white p-4 rounded-lg">
                    <div
                      style={{
                        textAlign: "center",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        color: "#333",
                      }}
                    >
                      Choose Your City
                    </div>
                    <div className="flex flex-wrap gap-4 justify-center items-center">
                      {CITIES.map((item) => (
                        <Link href={`/trucks/${item.name}`} key={item.name}>
                          <div className="flex flex-col gap-2" key={item.name}>
                            <div className="w-20 h-20 relative">
                              <Image
                                src={item.img}
                                alt={item.name}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-lg"
                              />
                            </div>
                            <div className="w-full text-center">
                              {item.name}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-4 text-center">
                      <button
                        onClick={closeModal}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className="w-full flex justify-center items-center"
          // ref={smallTruckRef}
          id="small-truck"
        >
          <div className="w-auto font-semibold text-2xl m-1 text-center">
            {RENT_MINI_TRUCKS_IN_AHMEDABAD}
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="w-auto">
            <div className="flex justify-between w-full max-w-xs mx-auto">
              <button
                className={`px-2 py-2 rounded-tl-lg w-1/2 h-12 text-sm ${
                  truckval ? "bg-gray-300 " : "bg-blue-500 text-white"
                }`}
                onClick={() => setTruckval(false)}
              >
                Light (below 750kg)
              </button>
              <button
                className={`px-2 py-2 rounded-tr-lg w-1/2 h-12  text-sm ${
                  truckval ? "bg-blue-500 text-white" : "bg-gray-300"
                }`}
                onClick={() => setTruckval(true)}
              >
                Heavy (above 750kg)
              </button>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="w-auto">
            {truckval ? (
              <>
                <div className="flex flex-wrap justify-center items-center gap-4">
                  {LIGHT_VEHICLE_DATA.map((item) => (
                    <>
                      <div className="bg-white h-auto w-auto p-8 flex flex-col gap-2  justify-center items-center border-[1px] border-gray-400">
                        <div>
                          <Image
                            src={item.img}
                            alt="mini_truck"
                            className="w-full"
                          ></Image>
                        </div>
                        <div className="w-auto bg-[#EEF2FF] text-black flex p-1 rounded-lg">
                          <FaWeightHanging className="text-sm mt-1 mr-1.5" />{" "}
                          {item.weight}
                        </div>
                        <div className="font-semibold text-black text-xl">
                          {item.name}
                        </div>
                        <div>
                          {item.prefix}{" "}
                          <span className="text-black text-md font-bold">
                            {item.price}
                          </span>
                        </div>
                        <div></div>
                      </div>
                    </>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-wrap justify-center items-center gap-4">
                  {HEAVY_VEHICLE_DATA.map((item) => (
                    <>
                      <div className="bg-white h-auto w-auto p-8 flex flex-col gap-2  justify-center items-center border-[1px] border-gray-400">
                        <div>
                          <Image
                            src={item.img}
                            alt="mini_truck"
                            className="w-full"
                          ></Image>
                        </div>
                        <div className="w-auto bg-[#EEF2FF] text-black flex p-1 rounded-lg">
                          <FaWeightHanging className="text-sm mt-1 mr-1.5" />{" "}
                          {item.weight}
                        </div>
                        <div className="font-semibold text-black text-xl">
                          {item.name}
                        </div>
                        <div>
                          {item.prefix}{" "}
                          <span className="text-black text-md font-bold">
                            {item.price}
                          </span>
                        </div>
                        <div></div>
                      </div>
                    </>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="w-10/12 font-semibold text-2xl text-center">
            {POPULAR_OUTSTATIONS_FROM_AHMEDABAD}
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="flex flex-wrap w-3/4 p-4 gap-4 justify-center items-center bg-[#EEF2FF] rounded-lg ">
            {POPULAR_OUTSTATIONS_FROM_AHMEDABAD_ALL_DATA.map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 bg-white w-[220px] h-[70px] rounded-lg border-[1px] border-gray-400 p-2 max-smalltab:text-center max-smalltab:w-full"
              >
                <div>
                  To {item.name}{" "}
                  <span className="font-bold">
                    {"("}
                    {item.km}
                    {")"}Km
                  </span>
                </div>

                <div>
                  fare from <span className="font-bold">Rs {item.fare}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full flex justify-center items-center">
          <div className="flex gap-4 justify-center items-center flex-wrap w-full">
            <div className="w-full flex justify-center items-center">
              <div className="w-auto font-semibold text-2xl ">
                {AREAS_WE_SERVE_IN}
              </div>
            </div>
            {AREAS_WE_SERVE_IN_DATA.map((item, index) => (
              <>
                <div className="text-sm font-light">
                  <li key={index}>{item}</li>
                </div>
              </>
            ))}
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="flex flex-col gap-2 justify-center items-center w-1/2 rounded-lg bg-gradient-to-r from-indigo-100 to-indigo-200 p-4 max-middle:w-3/5">
            <div className="font-semibold text-2xl text-center max-middle:text-xl">
              {THINK_lOGISTICS_THINK_PORTER}
            </div>
            <div className="font-light text-md text-center">{GET_ORDERS}</div>
            <div>
              <Image src={QR} alt="qr" className="w-20 h-20"></Image>
            </div>
            <div className="font-light text-sm text-center">
              {SCAN_TO_DOWNLOAD}
            </div>
          </div>
        </div>
        <div className="h-48 flex  max-md:h-auto text-black">
          <div className="flex flex-wrap justify-center w-full items-center gap-20 p-10">
            {IMAGES_CAPTION.map((item, index) => (
              <>
                {item.caption === "Trucks" ? (
                  <></>
                ) : (
                  <Link href={item.url} key={index}>
                    <div
                      key={index}
                      className="text-center transition-all hover:scale-105 font-semibold"
                    >
                      <Image
                        src={item.image}
                        alt="image"
                        width={120}
                        className="bg-indigo-100 shadow-2xl rounded-3xl"
                      />
                      <figcaption className="mt-2">{item.caption}</figcaption>
                    </div>
                  </Link>
                )}
              </>
            ))}
          </div>
        </div>
        <div className="w-full flex justify-center items-center ">
          <div className="w-10/12 flex flex-col gap-2 justify-start items-start">
            <div className="font-bold text-2xl">{CHOOSE_FROM_OUR_SERVICES}</div>
            <div className="font-semibold text-lg">{POPULAR_CATEGORIES}</div>
            <div className="flex items-start justify-start w-full">
              <div className="flex flex-wrap gap-4">
                {POPULAR_CATEGORIES_DATA.map((item, index) => (
                  <>
                    <div className="text-sm font-light">
                      <li key={index}>{item}</li>
                    </div>
                  </>
                ))}
              </div>
            </div>
            <div className="font-semibold text-lg">{EXPLORE_TRUCK_RENTAL}</div>
            <div className="flex flex-wrap text-sm font-light gap-4">
              {CITIES.map((item, index) => (
                <>
                  <li key={index}>
                    {RENT_MINI_TRUCK} {item.name}
                  </li>
                </>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="w-auto p-4 flex flex-col justify-center items-center gap-4">
            <div className="text-lg font-bold">{ENTERPRISE_STRING.FAQ}</div>
            <div className="text-gray-600 text-xl font-medium text-center">
              {IN_CASE_YOU_HAVE_MORE_QUESTION}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 justify-center items-center mb-8">
          {ENTERPRISE_STRING.ENTERPRISE_FAQ.map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 p-4 w-3/4 rounded-lg shadow-md shadow-gray-400 transition duration-300 hover:scale-105"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="flex justify-between w-full"
              >
                <span className="text-gray-600 text-md font-semibold">
                  {item.QUESTION}
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
                  <span className="text-sm text-black">{item.ANSWER}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
