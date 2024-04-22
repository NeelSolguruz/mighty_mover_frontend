"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  arrow_left,
  arrow_right,
  copied,
  cross,
} from "@/assets/Images/imageassets";
import backgroud_image from "../assets/Images/home_back_image.png";
import axios, { AxiosError } from "axios";
import { get_coupon_indi } from "@/http/staticTokenService";
import { inflate } from "zlib";
import { motion } from "framer-motion";

export default function Coupon_carousel({ slides_data }: any) {
  const [curr, setCurr] = useState(0);
  const [modal, setmodal] = useState(false);
  const [copy, setcopy] = useState(false);
  const [indiviualdata, setindiviualdata] = useState({
    coupon_code: "",
    coupon_type: "",
    description: "",
    max_usage_count: "",
    expiry_date: "",
  });


  useEffect(() => {
    const interval = setInterval(() => {
      setCurr((prev) => (prev === slides_data.length - 1 ? 0 : prev + 1));
    }, 5000); 

    return () => clearInterval(interval);
  }, [slides_data.length]);

  const modalopen = () => {
    setcopy(false);

    setmodal(!modal);
  };

  const copyToClipboard = () => {
    setcopy(true);
    navigator.clipboard.writeText(indiviualdata.coupon_code);
  };

  const indidata = async (id: any) => {
    try {
      const response = await get_coupon_indi(id);
      console.log(response.data.data);
      modalopen();
      setindiviualdata(response.data.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{
          status: number;
          message: string;
        }>;
        if (axiosError.response) {
          console.log("Response Error", axiosError.response);
        } else if (axiosError.request) {
          console.log("Request Error", axiosError.request);
        } else {
          console.log("Error", axiosError.message);
        }
      }
    }
  };
  return (
    <div className="w-full flex flex-col">
      <div className="overflow-hidden relative w-full">
        <div className="flex justify-center items-center duration-500 w-full my-4 gap-10 relative">
          {[...slides_data, ...slides_data].map((item, index): any => (
            <div
              key={index}
              className="min-w-[350px] h-40 flex justify-between items-center bg-indigo-100 rounded-md  transition-transform duration-[5s] ease-in-out cursor-pointer"
              style={{ transform: `translateX(-${curr * 100}%)` }}
              onClick={() => indidata(item.id)}
            >
              <div className="w-[20px] h-[20px] absolute rounded-full left-[-10px] bg-white"></div>
              <div className="w-[20px] h-[20px] absolute rounded-full right-[-10px] bg-white "></div>

              <div className="flex flex-col px-4">
                <div className="bg-[#2967ff] rounded-lg text-white text-center text-[10px] w-[100px] font-bold">
                  {item.coupon_type}
                </div>
                <div className="text-lg font-bold">{item.coupon_code}</div>
                <div className="text-xs font-semibold text-gray-600">
                  {item.expiry_date}
                </div>
              </div>
              <div>
                <Image
                  src={backgroud_image}
                  alt="img"
                  className="rounded-r-md h-40 w-auto"
                ></Image>
              </div>
            </div>
          ))}
        </div>
        {/* <div className=" absolute inset-0 flex justify-between items-center p-4 z-[30]">
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
      </div> */}
        {/* <div className="absolute bottom-0 right-0 left-0">
            <div className="flex items-center justify-center gap-2">
            {slides_data.map((_, i) => (
                <div
                key={i}
                className={`
                transition-all w-3 h-3 bg-[#2967ff] rounded-full
                ${curr === i ? "p-2" : "bg-opacity-50"}
                `}
                />
            ))}
            </div>
        </div> */}
      </div>
      {modal && indiviualdata && (
        <motion.div
          initial={{ translateY: 40, opacity: 0 }}
          whileInView={{ translateY: -10, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-0 left-0 w-full h-lvh bg-black bg-opacity-50 z-[1000000000000] flex justify-center items-center"
        >
          <div className="w-3/5 bg-white h-[300px] flex flex-col rounded-lg">
            <div
              className="w-full flex justify-end items-start pt-4 px-4"
              onClick={modalopen}
            >
              <Image src={cross} alt="cross"></Image>
            </div>
            <div className="flex  justify-between items-center px-8 font-bold text-lg">
              <div className="border-2 border-dashed border-[#2967ff] p-2 bg-blue-100">
                {indiviualdata.coupon_code}
              </div>
              <div
                className="text-[#2967ff] text-light font-normal px-6 cursor-pointer"
                onClick={copyToClipboard}
              >
                {copy ? (
                  <>
                    <div className="flex gap-2">
                      <div>
                        <Image src={copied} alt="copied"></Image>
                      </div>
                      <div>{"Copied"}</div>
                    </div>
                  </>
                ) : (
                  <>{"Copy"}</>
                )}
              </div>
            </div>
            <div className="w-full flex justify-center items-center mt-8 mb-2">
              <div className="w-11/12 text-md font-semibold ">
                {indiviualdata.description}
              </div>
            </div>
            <div className="w-full flex justify-center items-center">
              <div className="px-6 border-dashed border-t border-gray-400 w-11/12 "></div>
            </div>
            <div className="w-full flex flex-col justify-start mt-2 mb-2">
              <div className="w-11/12 px-6 text-xl font-medium">
                {"Terms And Condition"}
              </div>
              <div className="text-gray-400 px-8 text-sm font-light mt-2">
                <li>
                  {"Eligible Vehicles:"} {indiviualdata.coupon_type}
                </li>
                <li>
                  {"Max Usage per User:"} {indiviualdata.max_usage_count}
                </li>
                <li>
                  {"Valid Till:"} {indiviualdata.expiry_date}
                </li>
              </div>
            </div>

            <div></div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
