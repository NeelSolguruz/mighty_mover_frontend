"use client";
import React, { useState } from "react";
import Image from "next/image";
import { QR, truck_page_indi } from "@/assets/Images/imageassets";
import {
    CITIES,
    ENTERPRISE_STRING,
    GET_ORDERS,
    IMAGES_CAPTION,
    KNOW_MORE,
    LOCATIONS,
    REVIEWS,
    SCAN_TO_DOWNLOAD,
    THINK_lOGISTICS_THINK_PORTER,
    TRUCK_MAIN_PAGE_DATA,
} from "@/constant/constant";
import {
    hassle_free_online_services_in_ahmedabad,
    courier_data,
    question,
    answer,
    courier_image_desc,
    Other_Services_to_Choose_From,
    House_Shifting_Services_Near_You_in_Ahmedabad,
    Serviceable_Areas,
    Serviceable_Areas_data,
    Packers_Movers_title,
    Now_in_more_cities,
    Best_Packers_and_Movers_in_Ahmedabad_data,
    Best_Packers_and_Movers_in_Ahmedabad,
    Best_Packers_and_Movers_in_Ahmedabad_data1,
    Standout_features,
    Standout_features_data,
    Book_Porter_and_Movers_Goodbye,
    FAQ_TITLE,
    FAQ_DATA,
} from "@/constant/allIndiaParcel";
import { FaCity } from "react-icons/fa";

import Link from "next/link";
export default function AllIndiaParcel() {
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
            <div className="w-full flex flex-col gap-8 ">
                <div className="w-full relative">
                    <Image src={truck_page_indi} alt="truck main page" className="h-96" />
                    <div className="flex flex-col gap-4 w-full justify-center items-center text-center absolute top-8 max-tablet:top-2 max-middle:top-14 max-s:top-10">
                        <div className="text-white font-semibold text-4xl max-tablet:text-3xl max-s:text-2xl w-3/4 ">
                            {hassle_free_online_services_in_ahmedabad}
                        </div>
                        <div className="w-full text-white font-medium text-xl flex justify-center max-tablet:text-lg max-middle:text-md">
                            <div className="w-1/2 max-middle:w-full max-middle:p-2 max-middle:text-sm">
                                {courier_data}
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
                                className="w-48 bg-[#2967FF] border-2 border-[#2967FF] flex justify-center items-center p-2 rounded-lg transition-all hover:scale-90"
                                onClick={showModal}
                            >
                                <button className="text-l font-bold text-white">
                                    Please Select Your city
                                </button>
                            </div>
                            {isModalOpen && (
                                <div className="absolute top-10 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center max-s:top-[120px]">
                                    <div className="bg-white p-4 rounded-lg w-11/12 h-auto">
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
                                        <div className="flex flex-wrap gap-4 justify-center items-center max-s:grid max-s:grid-rows-5 max-s:grid-cols-4">
                                            {CITIES.map((item) => (
                                                <Link href={`/trucks/${item.name}`} key={item.name}>
                                                    <div
                                                        className="flex flex-col gap-2 justify-center items-center"
                                                        key={item.name}
                                                    >
                                                        <div className="w-20 h-20 relative max-s:w-16 max-s:h-16">
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
                <div className="w-full flex flex-col justify-center items-center p-2 gap-3">
                    <div className="text-2xl text-[#2D2F34] font-bold max-[769px]:text-center">
                        {question}
                    </div>
                    <div className="text-lg text-[#2D2F34]  max-[769px]:text-center">
                        {answer}
                    </div>
                </div>
                <div className="w-full ">
                    <div className="w-full flex justify-center items-center p-4 pt-[20px] gap-20 max-[769px]:gap-10 max-[633px]:gap-4 max-[597px]:flex-col">
                        {courier_image_desc.map((item) => (
                            <>
                                <div className="flex flex-col justify-center items-center w-[300px] gap-2 ">
                                    <div>
                                        <Image src={item.img} alt={item.title} width={110} className=""></Image>
                                    </div>
                                    <div className="text-base font-bold">{item.title}</div>
                                    <div className="w-full text-base text-center">
                                        {item.desc}
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
                <div className="w-full flex justify-center items-center">
                    <div className="flex flex-col gap-2 justify-center items-center w-4/5 rounded-lg bg-gradient-to-r from-indigo-100 to-indigo-200 p-4 max-middle:w-3/5 max-[321px]:w-11/12">
                        {/* to-indigo-200 */}
                        <div className="font-semibold text-2xl text-center max-middle:text-xl">
                            {THINK_lOGISTICS_THINK_PORTER}
                        </div>
                        <div className="font-normal text-md text-center">{GET_ORDERS}</div>
                        <div>
                            <Image src={QR} alt="qr" className="w-[100px] h-[100px]"></Image>
                        </div>
                        <div className="font-normal text-base text-center">
                            {SCAN_TO_DOWNLOAD}
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-center items-center mt-10">
                    <div className="text-2xl font-semibold">
                        {Other_Services_to_Choose_From}
                    </div>
                </div>
                <div className="w-full">
                    <div className="flex flex-wrap justify-center w-full items-center gap-8  max-[462px]:gap-4">
                        {IMAGES_CAPTION.map((item, index) => (
                            <>
                                {item.caption === "All India Parcel" ? (
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
                                                className="bg-indigo-100 rounded-lg p-6 max-[552px]:p-2 max-[552px]:w-32 max-[552px]:h-28 max-[462px]:w-24 max-[462px]:h-24 max-[345px]:h-20 max-[345px]:w-20"
                                            />
                                            <figcaption className="mt-2 text-base max-[345px]:text-sm">
                                                {item.caption}
                                            </figcaption>
                                        </div>
                                    </Link>
                                )}
                            </>
                        ))}
                    </div>
                </div>
                <div className="w-full flex justify-start px-[200px] flex-col mt-10 max-[1170px]:px-[90px] max-[881px]:px-[50px] max-[370px]:px-[20px]">
                    <div className="text-2xl text-[#2D2F34] font-bold w-full">
                        {House_Shifting_Services_Near_You_in_Ahmedabad}
                    </div>
                    <div className="text-base font-semibold text-[#2D2F34] w-full mt-4">
                        {Serviceable_Areas}
                    </div>
                    <div className="w-full flex-wrap flex gap-2 mt-2">
                        {Serviceable_Areas_data.map((item, index) => (
                            <>
                                <li key={index} className="text-blue-200">
                                    <span className="text-[#2D2F34] font-normal text-base max-[365px]:text-sm">
                                        {Packers_Movers_title} In {item}
                                    </span>
                                </li>
                            </>
                        ))}
                    </div>
                    <div className="w-full text-base text-[#2D2F34] font-bold mt-4">
                        {Now_in_more_cities}
                    </div>
                    <div className="flex gap-2 flex-wrap mt-2">
                        {LOCATIONS.map((item, index) => (
                            <>
                                <li key={index} className="text-blue-200">
                                    <span className="text-[#2D2F34] font-normal text-base">
                                        {Packers_Movers_title} In {item}
                                    </span>
                                </li>
                            </>
                        ))}
                    </div>
                    <div className="mt-10 text-2xl font-bold">
                        {Best_Packers_and_Movers_in_Ahmedabad}
                    </div>
                    <div className="text-sm font-normal flex flex-col gap-4 mt-3">
                        <div>{Best_Packers_and_Movers_in_Ahmedabad_data}</div>
                        <div>{Best_Packers_and_Movers_in_Ahmedabad_data1}</div>
                    </div>
                    <div className="w-full text-2xl font-bold mt-10">
                        {Standout_features}
                    </div>
                    <div className="w-full text-base flex flex-col gap-2 mt-3">
                        {Standout_features_data.map((item) => (
                            <>
                                <div>
                                    <span className="font-bold">{item.title} </span>
                                    <span className="font-normal"> {item.data}</span>
                                </div>
                            </>
                        ))}
                        <div>{Book_Porter_and_Movers_Goodbye}</div>
                    </div>
                </div>
                <div className="w-full flex justify-center items-center mt-10 p-2">
                    <div className="w-3/4 text-center text-2xl font-bold max-[1170px]:w-full">
                        {FAQ_TITLE}
                    </div>
                </div>
                <div className="w-full flex justify-center items-center">
                    <div className="w-3/5 text-center text-base font-normal text-[#333333A3] max-[1170px]:w-3/4">
                        {FAQ_DATA}
                    </div>
                </div>
                <div className="w-full px-[200px] max-[1170px]:px-[60px] max-[881px]:px-0">
                    <div className="flex flex-col gap-2 justify-center items-center mb-10">
                        {ENTERPRISE_STRING.ENTERPRISE_FAQ.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col gap-2 p-4 w-3/4 rounded-lg border-b-[1px] border-gray-400  "
                            >
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className="flex justify-between w-full"
                                >
                                    <span className="text-gray-600 text-md font-semibold text-start">
                                        {item.QUESTION}
                                    </span>
                                    <svg
                                        className={`fill-blue-500 shrink-0 ml-8 transition-transform duration-200 ${openIndex === index ? "rotate-180" : ""
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
                                        <span className="text-sm text-black">{item.ANSWER}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

