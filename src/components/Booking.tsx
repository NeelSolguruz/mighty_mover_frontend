"use client";
import { BACKGROUND_TEXT, IMAGES_CAPTION } from "@/constant/constant";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import backgroud_image from "../assets/Images/home_back_image.png";
import Coupon_carousel from "./Coupon_carousel";
import { get_coupon_all } from "@/http/staticTokenService";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
export default function Booking() {
  const [coupon, setcoupondata] = useState([]);
  useEffect(() => {
    const fetch_coupon = async () => {
      try {
        const response = await get_coupon_all();
        setcoupondata(response.data.data);
        console.log(response.data.data)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<{
            status: number;
            message: string;
          }>;
          if (axiosError.response) {
            console.log("Response Error", axiosError.response);
            toast.error(axiosError.response.data.message);
          } else if (axiosError.request) {
            console.log("Request Error", axiosError.request);
          } else {
            console.log("Error", axiosError.message);
          }
        }
      }
    };
    fetch_coupon();
  }, []);
  return (
    <div>
      <div className="relative">
        <div className="bg-black">
          <Image
            src={backgroud_image}
            alt="background image"
            className="opacity-75 w-full h-96 max-lg:h-auto"
          />
        </div>
        <div className="w-full flex justify-center">
          <div className="text-white absolute bottom-40 bg-transparent w-9/12 flex flex-col gap-4 max-lg:bottom-40 max-sm:bottom-14 max-sm:gap-0">
            <div>
              <h1 className="text-5xl max-md:text-2xl">
                {BACKGROUND_TEXT.question}
              </h1>
            </div>
            <div>
              <h1 className="text-6xl max-md:text-3xl font-bold">
                {BACKGROUND_TEXT.tagline}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="absolute h-56 flex justify-center bg-white top-[300px] shadow-md max-md:h-auto w-9/12 rounded-lg max-lg:static max-lg:shadow-none max-lg:mt-10 max-lg:bg-none">
          <div className="grid grid-cols-4 max-lg:w-full max-md:grid-cols-2 max-md:gap-5 w-9/12 items-center">
            {IMAGES_CAPTION.map((item, index) => (
              <div
                className="text-center transition-all hover:scale-105 font-semibold flex flex-col gap-3 items-center"
                key={index}
              >
                <Image
                  src={item.image}
                  alt="image"
                  width={100}
                  className="bg-indigo-100 rounded-lg"
                />
                <figcaption className="max-lg:text-sm">
                  {item.caption}
                </figcaption>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center items-center mt-28">
        <div className="flex w-11/12 justify-center items-center">
        
            <Coupon_carousel slides_data={coupon} />
    
        </div>
      </div>
    </div>
  );
}
