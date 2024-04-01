"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { truck_page_indi, QR } from "@/app/assets/Images/imageassets";
import {
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
  CITIES_TRUCK,
  // KNOW_MORE,
} from "../constant/constant";
import {
  BIKE_MAIN_PAGE_DATA,
  BIKE_KNOW_MORE,
  LIGHT_VEHICLE_DATA,
  BIKE_DATA,
  RENT_BIKE_IN_AHMEDABAD,
} from "../constant/twoWheeler";
import { FaCity, FaWeightHanging } from "react-icons/fa";
import Link from "next/link";
function twoWheeler() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //  const[(truckval, setTruckval)] = useState(true);
  //  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const smallTruckRef = useRef(null);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const scrollToSmallTruck = () => {
    if (smallTruckRef.current) {
      smallTruckRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  //  const toggleAccordion = (index: number) => {
  //    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  //  };

  return (
    <>
      <div className="w-full bg-gray-100">
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
                onClick={scrollToSmallTruck}
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
                      {CITIES_TRUCK.map((item: any) => (
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
            ref={smallTruckRef}
            id="small-truck"
          >
            <div className="w-auto font-semibold text-2xl m-1 text-center py-8">
              {RENT_BIKE_IN_AHMEDABAD}
            </div>
          </div>

          <div className="w-full flex justify-center">
            <div className="w-full md:w-1/2 bg-white flex justify-between items-center border-2">
              {BIKE_DATA.map((item) => (
                <div
                  key={item.name}
                  className="bg-white w-full flex flex-row gap-5 justify-center items-center border-[1px] border-gray-400"
                >
                  <div className="w-1/2 px-8">
                    <Image src={item.img} alt="mini_truck" className="w-9/12" />
                  </div>
                  <div className="w-1/2 flex flex-col py-8">
                    <div className="font-semibold text-black text-xl">
                      {item.name}
                    </div>
                    <div className="bg-[#EEF2FF] text-black flex p-1 rounded-lg w-24">
                      <FaWeightHanging className="text-sm mt-1 mr-1.5" />{" "}
                      {item.weight}
                    </div>
                    <div className="font-semibold text-md">
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
        <div className="w-full mb-4 mt-2"></div>
      </div>
    </>
  );
}

export default twoWheeler;
