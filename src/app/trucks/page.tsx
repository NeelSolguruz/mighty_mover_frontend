"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button, Modal } from "antd";
import Image from "next/image";
import { truck_page_indi,QR } from "@/app/assets/Images/imageassets";
import {
  TRUCK_MAIN_PAGE_DATA,
  LIGHT_VEHICLE_DATA,
  HEAVY_VEHICLE_DATA,
  RENT_MINI_TRUCKS_IN_AHMEDABAD,
  CITIES_TRUCK,
  POPULAR_OUTSTATIONS_FROM_AHMEDABAD_ALL_DATA,
  POPULAR_OUTSTATIONS_FROM_AHMEDABAD,
  AREAS_WE_SERVE_IN,
  AREAS_WE_SERVE_IN_DATA,
  THINK_lOGISTICS_THINK_PORTER,
  GET_ORDERS,
  SCAN_TO_DOWNLOAD
} from "../constant/constant";
import { KNOW_MORE } from "../constant/constant";
import { FaCity } from "react-icons/fa";
import { Segmented } from "antd";
import { FaWeightHanging } from "react-icons/fa";

export default function page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [truckval, settruckval] = useState(true);
  const showModal = () => {
    setIsModalOpen(true);
  };
  return (
    <>
      <div className="flex flex-col gap-10 w-full h-auto bg-gray-50">
        <div className="w-full relative">
          <Image
            src={truck_page_indi}
            alt="truck main page"
            className="h-96"
          ></Image>
          <div className="flex flex-col gap-4 w-full justify-center text-center  absolute top-8 ">
            <div className="text-white font-semibold text-4xl">
              {TRUCK_MAIN_PAGE_DATA[0].title}
            </div>
            <div className="w-full text-white font-medium text-xl flex justify-center">
              <div className="w-1/2 ">{TRUCK_MAIN_PAGE_DATA[0].desc}</div>
            </div>
            <div className="w-full text-white font-medium text-md underline flex justify-center items-center">
              {KNOW_MORE}
            </div>
            <div className="w-full flex justify-center items-center">
              <div
                className="w-20 bg-orange-100 border-2 border-orange-500 flex justify-center items-center p-2 rounded-lg transition-all hover:scale-90"
                onClick={showModal}
              >
                <FaCity className="text-4xl text-orange-500" />
                <Modal
                  title={
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
                  }
                  open={isModalOpen}
                  footer={null}
                  width={1000}
                >
                  <div className="flex flex-wrap gap-4 justify-center items-center">
                    {CITIES_TRUCK.map((item) => (
                      <Link href={`/trucks/${item.name}`} key={item.name}>
                        <div className="flex flex-col gap-2" key={item.name}>
                          <div className="w-20 h-20 ">
                            <Image
                              src={item.img}
                              alt={item.name}
                              className="w-full h-full object-cover rounded-lg"
                            ></Image>
                          </div>
                          <div className="w-full text-center">{item.name}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </Modal>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="w-auto font-semibold text-2xl ">
            {RENT_MINI_TRUCKS_IN_AHMEDABAD}
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="w-auto">
            <Segmented<string>
              options={["Light (below 750kg)", "Heavy (above 750kg)"]}
              className="text-black "
              onChange={(value) => {
                settruckval(!truckval);
              }}
            />
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
          <div className="w-auto font-semibold text-2xl ">
            {POPULAR_OUTSTATIONS_FROM_AHMEDABAD}
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="flex flex-wrap w-3/4 p-4 gap-4 justify-center items-center bg-[#EEF2FF] rounded-lg">
            {POPULAR_OUTSTATIONS_FROM_AHMEDABAD_ALL_DATA.map((item) => (
              <>
                <div className="flex flex-col gap-2 bg-white w-one-third rounded-lg border-[1px] border-gray-400 p-2">
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
              </>
            ))}
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="w-auto font-semibold text-2xl ">
            {AREAS_WE_SERVE_IN}
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="flex gap-4 justify-center items-center flex-wrap w-full">
            {AREAS_WE_SERVE_IN_DATA.map((item, index) => (
              <>
                <div className="text-md">
                  <li key={index}>{item}</li>
                </div>
              </>
            ))}
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="flex flex-col gap-2 justify-center items-center w-3/5 bg-gradient-to-r from-orange-100 to-orange-300 p-4">
              <div className="font-semibold text-2xl">{THINK_lOGISTICS_THINK_PORTER}</div>
              <div className="font-light text-md">{GET_ORDERS}</div>
              <div><Image src={QR} alt="qr" className="w-20 h-20"></Image></div>
              <div className="font-light text-sm">{SCAN_TO_DOWNLOAD}</div>

          </div>
        </div>
      </div>
    </>
  );
}
