"use client";
import Image from "next/image";
import React, { useState } from "react";
import { truck_page_indi, QR } from "@/assets/Images/imageassets";
import {
  RENT_MINI_TRUCKS_IN_AHMEDABAD,
  // CITIES,
  POPULAR_OUTSTATIONS_FROM_AHMEDABAD_ALL_DATA,
  POPULAR_OUTSTATIONS_FROM_AHMEDABAD,
  // THINK_lOGISTICS_THINK_PORTER,
  // GET_ORDERS,
  // SCAN_TO_DOWNLOAD,
  IMAGES_CAPTION,
  CHOOSE_FROM_OUR_SERVICES,
  POPULAR_CATEGORIES,
  POPULAR_CATEGORIES_DATA,
  EXPLORE_TRUCK_RENTAL,
  RENT_MINI_TRUCK,
  ENTERPRISE_STRING,
  DELIVERY_PARTNER_STRING,
  IN_CASE_YOU_HAVE_MORE_QUESTION,
  //   CITIES_TRUCK,
  KNOW_MORE,
} from "@/constant/constant";
import {
  BIKE_MAIN_PAGE_DATA,
  BIKE_KNOW_MORE,
  //   LIGHT_VEHICLE_DATA,
  BIKE_DATA,
  RENT_BIKE_IN_AHMEDABAD,
  BIKE_DESC_STRING,
  BIKE_DESC_STRING_VALUE,
  AREAS_WE_SERVE_IN,
  CITIES,
  AREAS_WE_SERVE_IN_DATA,
  THINK_lOGISTICS_THINK_PORTER,
  GET_ORDERS,
  SCAN_TO_DOWNLOAD,
  FAQ_STRING,
} from "@/constant/twoWheeler";
import { FaCity, FaWeightHanging } from "react-icons/fa";
import Link from "next/link";
function TwoWheel() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //  const[(truckval, setTruckval)] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // const smallTruckRef = useRef<HTMLDivElement | null>(null);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleAccordion = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const scrollToSmallTruck = (sectionId: string) => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <div className="w-full bg-gray-100 h-auto">
        <div className="w-full relative ">
          <div className="md:w-full md:h-96 h-96">
            <Image
              src={truck_page_indi}
              alt="Bike main page"
              // layout="fill"
              // width={250}
              // height={250}
              // objectFit="cover"
              className="w-full h-full"
            />
          </div>
          <div className="flex inset-0  flex-col gap-4 w-full justify-center text-center absolute top-8 max-tablet:top-2 max-middle:top-14 max-s:top-10">
            <div className="text-white font-semibold text-4xl md:text-3xl sm:text-2xl">
              {BIKE_MAIN_PAGE_DATA[0].title}
            </div>
            <div className="w-full text-white font-medium text-xl flex justify-center max-tablet:text-lg max-middle:text-md">
              <div className="w-1/2 max-middle:w-full max-middle:p-2 max-middle:text-sm">
                {BIKE_MAIN_PAGE_DATA[0].desc}
              </div>
            </div>
            <div className="w-full text-white font-medium text-md underline flex justify-center items-center">
              <div
                className="cursor-pointer font-semibold"
                onClick={(event: React.MouseEvent<HTMLDivElement>) =>
                  scrollToSmallTruck("small-bikes")
                }
              >
                {BIKE_KNOW_MORE}
              </div>
            </div>
            <div className="w-full flex justify-center items-center">
              <div
                className="w-48 bg-orange-100 border-2 border-orange-500 flex justify-center items-center p-2 rounded-lg transition-all hover:scale-90"
                onClick={showModal}
              >
                <button className="text-l font-bold text-orange-500">
                  Please Select Your city
                </button>
              </div>
              {isModalOpen && (
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
                  <div className="bg-white p-4 rounded-lg max-w-md">
                    <div className="font-bold text-xl mb-4">
                      Choose Your City
                    </div>
                    <div className="flex flex-wrap gap-4 justify-center items-center">
                      {CITIES.map((item: any) => (
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
        {/* two wheeler information */}
        <div className="w-full mb-4 mt-2">
          <div
            className="w-full flex justify-center items-center"
            // ref={smallTruckRef}
            id="small-bikes"
          >
            <div className="w-auto font-semibold text-2xl m-1 text-center py-8">
              {RENT_BIKE_IN_AHMEDABAD}
            </div>
          </div>

          <div className="w-full flex justify-center">
            <div className="w-full md:w-1/2 bg-white flex justify-between items-center border-2 max-sm:w-[80%] ">
              {BIKE_DATA.map((item) => (
                <div
                  key={item.name}
                  className="bg-white w-full flex flex-row gap-5 justify-center items-center border-[1px] border-gray-400 max-sm:flex-col"
                >
                  <div className="w-1/2 px-8 max-sm:w-[80%] max-sm:h-[80%] max-sm:mt-4">
                    <Image
                      src={item.img}
                      alt="mini_truck"
                      className="w-9/12 max-sm:w-[100%] max-sm:h-[100%]"
                    />
                  </div>
                  <div className="w-1/2 flex flex-col max-sm:items-center py-8  max-sm:w-[80%] max-sm:h-[80%] max-sm:px-2">
                    <div className="font-semibold text-black text-xl ">
                      {item.name}
                    </div>
                    <div className="bg-[#EEF2FF] text-black flex p-1 rounded-lg w-20">
                      <FaWeightHanging className="text-sm mt-1 mr-1.5" />{" "}
                      {item.weight}
                    </div>
                    <div className="font-semibold text-md ">
                      {item.prefix}{" "}
                      <span className="text-black text-md font-bold">
                        {item.price}
                      </span>
                    </div>
                    <div className="font-normal text-black text-md">
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* bike services */}
        <div className="w-full mt-2 ">
          <div className="w-full flex justify-center items-center ">
            <div className="w-auto font-semibold text-2xl m-1 text-center py-8 max-sm:text-xl max-sm:m-1">
              {BIKE_DESC_STRING}
            </div>
          </div>

          <div className="w-full flex justify-center">
            <div className="grid grid-cols-2 gap-2 place-items-center w-[60%] max-sm:grid-cols-1 max-sm:w-[80%]">
              {BIKE_DESC_STRING_VALUE.map((item) => (
                <div
                  key={item.id}
                  className=" w-[100%] h-[100%] justify-center items-center boredr-[1px] border-gray-400 p-4 rounded-lg bg-white"
                >
                  <div className="">
                    <div className="font-bold w-[100%]">{item.title}</div>
                    <div className="text-md w-[80%]">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* area we serve */}

        <div className="w-full flex justify-center items-center my-10">
          <div className="flex gap-4 justify-center items-center flex-wrap w-full">
            <div className="w-full flex justify-center items-center">
              <div className="w-auto font-semibold text-2xl ">
                {AREAS_WE_SERVE_IN}
              </div>
            </div>
            <div className="w-[80%] flex gap-4 justify-center items-center flex-wrap">
              {AREAS_WE_SERVE_IN_DATA.map((item, index) => (
                <>
                  <div className="text-sm font-light ">
                    <li key={index} className="text-orange-300">
                      <span className="text-black">{item}</span>
                    </li>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>

        {/* think we logistic */}
        <div className="w-full flex justify-center items-center my-4">
          <div className="flex flex-col gap-2 justify-center items-center w-1/2 rounded-lg bg-gradient-to-r from-indigo-300 to-indigo-400 p-4 max-middle:w-3/5">
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

        {/* other services */}
        <div className="h-48 flex  max-md:h-auto text-black my-4">
          <div className="flex flex-wrap justify-center w-full items-center gap-20 p-10">
            {IMAGES_CAPTION.map((item, index) => (
              <>
                {item.caption === "Two Wheelers" ? (
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

        {/* choose from over services */}
        <div className="w-full flex justify-center items-center ">
          <div className="w-10/12 flex flex-col gap-2 justify-start items-start">
            <div className="font-bold text-2xl">{CHOOSE_FROM_OUR_SERVICES}</div>
            <div className="font-semibold text-lg">{POPULAR_CATEGORIES}</div>
            <div className="flex items-start justify-start w-full">
              <div className="flex flex-wrap gap-4">
                {POPULAR_CATEGORIES_DATA.map((item, index) => (
                  <>
                    <div className="text-sm font-light ">
                      <li className="text-orange-300" key={index}>
                        <span className="text-black">{item}</span>
                      </li>
                    </div>
                  </>
                ))}
              </div>
            </div>
            <div className="font-semibold text-lg">{EXPLORE_TRUCK_RENTAL}</div>
            <div className="flex flex-wrap text-sm font-light gap-4">
              {CITIES.map((item, index) => (
                <>
                  <li key={index} className="text-orange-300">
                    <span className="text-black">
                      {RENT_MINI_TRUCK} {item.name}
                    </span>
                  </li>
                </>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ section */}
        <div className="w-full mt-8 mb-0">
          <div className="w-auto p-4 flex flex-col justify-center items-center gap-4">
            <div className="text-lg font-bold">
              {FAQ_STRING.DELIVERY_PARTNER_FAQ_TITLE}
            </div>
            <div className="text-gray-600 text-xl font-medium text-center">
              {IN_CASE_YOU_HAVE_MORE_QUESTION}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 justify-center items-center pb-8">
          {FAQ_STRING.DELIVERY_PARTNER_FAQ_QUESTIONS.map((item, index) => (
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

export default TwoWheel;
