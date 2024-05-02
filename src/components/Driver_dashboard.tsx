"use client";
import { smile, squint } from "@/assets/Images/imageassets";
import { tableData } from "@/constant/driverOrderData";
import { useJsApiLoader } from "@react-google-maps/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import CountUp from "react-countup";
import ProductTableRow from "./DriverMapTableRow";
import DriverDocument from "./DriverDocument";

export default function Driver_dashboard() {
  const [Revenue, setRevenue] = useState(12345);
  const [Order, setOrder] = useState(123);
  const [goal, setgoal] = useState(1000);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [infoWindowPosition, setInfoWindowPosition] = useState(null);
  const [infoWindowText, setInfoWindowText] = useState("");
  const [showMap, setShowMap] = useState(false);
  const router = useRouter();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAVZWRn7jpEjdxVeIDNo5s6Tz3xJNB_PVE",
    libraries: ["places"],
  });
  return (
    <div className="w-full bg-gray-100 flex flex-col ">
      <div className="flex w-full h-full gap-2 p-4">
        <div className="grid grid-rows-3 gap-2 w-[30%]">
          <div className="rounded-lg shadow-lg shadow-gray-400 bg-[#2967ff] flex flex-col items-center ">
            <div className="text-2xl font-bold w-11/12 text-start text-white px-1 pt-2 flex flex-col">
              Revenue
            </div>
            <div className="text-sm font-semibold w-11/12 text-start text-white px-1.5">
              Current Month
            </div>

            <div className=" w-full h-full flex items-center justify-center pb-6">
              <div className="text-white text-6xl font-bold">
                {/* <CountUp end={Revenue} duration={1} /> */}
                {Revenue >= 10000 ? (
                  <>
                    {Revenue >= 100000 ? (
                      <>{(Revenue / 100000).toFixed(2)}L</>
                    ) : (
                      <>{(Revenue / 1000).toFixed(2)}K</>
                    )}
                  </>
                ) : (
                  <>{Revenue}</>
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-rows-2 grid-cols-2 gap-2 w-full ">
            <div className="rounded-lg shadow-lg items-center justify-center shadow-gray-400 bg-[#2967ff] flex flex-col px-2 h-auto">
              <div className="text-md font-semibold w-full text-start  text-white italic">
                In Progress
              </div>
              <div className="text-white flex justify-center items-center text-3xl font-bold px-2 pb-2">
                <CountUp end={Order} duration={1} />
              </div>
            </div>
            <div className="rounded-lg shadow-lg items-center justify-center shadow-gray-400 bg-[#2967ff] flex flex-col px-2 h-auto">
              <div className="text-md font-semibold w-full text-start  text-white italic">
                Delivered
              </div>
              <div className="text-white flex justify-center items-center text-3xl font-bold px-2 pb-2">
                <CountUp end={Order} duration={1} />
              </div>
            </div>
            <div className="rounded-lg shadow-lg items-center justify-center shadow-gray-400 bg-[#2967ff] flex flex-col px-2 h-auto">
              <div className="text-md font-semibold w-full text-start  text-white italic">
                Accepted
              </div>
              <div className="text-white flex justify-center items-center text-3xl font-bold px-2 pb-2">
                <CountUp end={Order} duration={1} />
              </div>
            </div>
            <div className="rounded-lg shadow-lg items-center justify-center shadow-gray-400 bg-[#2967ff] flex flex-col px-2 h-auto">
              <div className="text-md font-semibold w-full text-start  text-white italic">
                Rejected
              </div>
              <div className="text-white flex justify-center items-center text-3xl font-bold px-2 pb-2">
                <CountUp end={Order} duration={1} />
              </div>
            </div>
          </div>
          <div className="rounded-lg shadow-lg shadow-gray-400 bg-[#2967ff] flex flex-col gap-2 items-center">
            <div className="w-11/12 text-start text-2xl font-bold px-1 pt-1.5 text-white  ">
              Your Goal
            </div>
            <div className="w-11/12 text-center text-4xl font-bold  text-white  flex gap-4 justify-center items-center">
              <div>
                <CountUp end={Order} duration={1} />/
                <CountUp end={goal} duration={1} />
              </div>
              <div>
                <Image src={smile} alt="squint" className="h-8 w-8"></Image>
              </div>
            </div>
            <div className="w-11/12 ">
              <button className="w-full rounded-lg bg-white font-bold text-[#2967ff] text-2xl p-1 hover:scale-[1.03] transition-all duration-300">
                Set a New Goal
              </button>
            </div>
          </div>
        </div>
        {/* oderlist of driver */}
        <div className="rounded-lg shadow-lg shadow-gray-400 bg-white w-full overflow-x-auto">
          <div className="w-full">
            <ProductTableRow />
          </div>
        </div>
      </div>
      {/* leaderBoard */}
      <div className="flex gap-2 px-4 pb-4 w-full">
        <div className="w-1/3 rounded-lg shadow-lg shadow-gray-400 bg-white ">
          LeaderBoard
        </div>
        <div className="flex flex-col gap-2 rounded-lg shadow-lg shadow-gray-400 bg-white w-full">
          <DriverDocument />
        </div>
      </div>
      <div className="flex gap-2 px-4 pb-4 w-full justify-center items-center">
        <button
          className="w-1/4 bg-black h-[50px] my-3 flex items-center justify-center cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#2967ff] before:to-[#2967ff] before:transition-all    before:duration-500 before:ease-in-out before:z-[-1]  hover:before:left-0 text-[#fff] font-bold text-xl"
          onClick={() => {
            router.push("/driver-orderList");
          }}
        >
          Dhandha Chalu Kare!
        </button>
      </div>
    </div>
  );
}
