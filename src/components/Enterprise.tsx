"use client";
import Image from "next/image";
import { ENTERPRISE_STRING, REVIEWS } from "@/constant/constant";
import enterprise from "../assets/Images/enterprise.jpg";
import { enterpriselogo, trucks_porter } from "@/assets/Images/imageassets";
import Logo from "../assets/Images/Enterprise_logo_1.jpg";

import truck from "../assets/Images/Truck.svg";
import { BiSolidPhoneCall } from "react-icons/bi";
import { useState } from "react";
import faq from "../assets/Images/faq.svg";
import { FAQItem, FAQAccordionProps } from "@/constant/type/data.type";
import { enterprise_register } from "@/http/staticTokenService";

import axios, { AxiosError } from "axios";
import { isFulfilled } from "@reduxjs/toolkit";
import { toast } from "sonner";
import React from "react";

export default function Enterprise() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,

      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log(formData);
    setLoading(true);
    try {
      const enterprise_details = await enterprise_register(formData);
    toast.success(enterprise_details.data?.message);

      console.log(enterprise_details.data?.message);

      setLoading(false);
      resetForm()
      
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
    } finally {
      setLoading(false);
    }
  };
  const toggleAccordion = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const resetForm = () => {
    setFormData({});
  };
  return (
    <div className="w-full flex-col justify-center">
      <div className="w-full flex flex-col gap-10 ">
        <div>
          <Image
            src={enterpriselogo}
            className="w-full"
            alt="Picture of the enterprise"
          />
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <div></div>
        <div className="flex m-4">
          <div className="flex flex-col justify-between items-center  mr-[400px] max-[935px]:mr-0 gap-10">
            <div className="flex w-full justify-center p-10 flex-wrap gap-10 max-laptop:items-start">
              <div className="text-2xl font-semibold text-center max-[935px]:text-5xl max-tablet:text-4xl max-ms:text-2xl">
                {ENTERPRISE_STRING.WHY_USE_PORTER}
              </div>
            </div>
            <div className="w-full flex gap-2 max-[935px]:justify-center max-[935px]:gap-10 max-[591px]:flex-col">
              {ENTERPRISE_STRING.WHY_USE_PORTER_LOGO.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center gap-4 items-center w-[220px] h-[280px] max-breakpoint:w-[150px] max-breakpoint:h-auto max-[935px]:w-full "
                >
                  <div>
                    <Image
                      src={item.IMG}
                      alt="Logo"
                      className="w-32 h-32 "
                    ></Image>
                  </div>
                  <div className="text-base font-bold w-full text-center text-black">
                    {ENTERPRISE_STRING.WHY_USE_PORTER_LOGO[index].DATA}
                  </div>
                  <div className="text-sm font-normal w-full text-center text-gray-400">
                    {ENTERPRISE_STRING.WHY_USE_PORTER_LOGO[index].DESC}
                  </div>
                </div>
              ))}
            </div>
            <div className="w-[342px]  h-auto flex justify-center items-center absolute right-10 top-40 max-breakpoint:top-24 max-[935px]:static max-[935px]:w-full">
              <div className="w-full px-3 py-3 rounded-2xl shadow-gray-400 shadow-md bg-white">
                <div className="flex flex-col gap-6">
                  <div className="flex justify-center text-2xl font-semibold text-black text-center">
                    {ENTERPRISE_STRING.FOR_ENTERPRISE}
                  </div>

                  {ENTERPRISE_STRING.FORM_DATA.map((item, index) => (
                    <div key={index}>
                      {index === 0 || index === 4 ? (
                        <div>
                          {index === 0 ? (
                            <select
                              className="p-2 w-full  rounded border-[1px] border-gray-400  font-light text-black text-[10px]"
                              name={item}
                              onChange={handleChange}
                            >
                              {ENTERPRISE_STRING.FORM_CITIES.map(
                                (item, index) => (
                                  <>
                                    <option key={index} value={item}>
                                      {item}
                                    </option>
                                  </>
                                )
                              )}
                            </select>
                          ) : (
                            <select
                              className="p-2 w-full  rounded border-[1px] border-gray-400  font-light text-black text-[10px]"
                              name={item}
                              onChange={handleChange}
                            >
                              {ENTERPRISE_STRING.FORM_MONTHLY_TRIPS.map(
                                (item, index) => (
                                  <>
                                    <option key={index} value={Number(index)}>
                                      {item}
                                    </option>
                                  </>
                                )
                              )}
                            </select>
                          )}
                        </div>
                      ) : (
                        <div className="relative">
                          <input
                            id={item}
                            name={item}
                            onChange={handleChange}
                            placeholder={item}
                            value={formData[item] || ""}
                            type="text"
                            className="w-full border-b rounded border-[1px] border-gray-400 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer placeholder:p-2 placeholder:w-full  placeholder:font-light placeholder:text-black placeholder:text-[10px]"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                  <div>
                    <button
                      className="w-full bg-[#2967FF] p-2 rounded text-white text-sm font-bold"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      {ENTERPRISE_STRING.REQUEST_CALLBACK}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" flex flex-col bg-black text-white justify-center items-center p-6 gap-16">
        <div className="text-2xl font-semibold text-center max-[580px]:text-4xl max-[580px]:mt-4 max-s:text-2xl">
          {ENTERPRISE_STRING.OUR_GROWING_NETWORK}
        </div>
        <div className="font-semibold justify-between flex w-full pr-20 pl-20 max-breakpoint:px-10 max-[949px]:px-0 gap-6 max-ms:grid max-ms:grid-cols-2 max-ms:grid-rows-2 max-ms:items-center ">
          {ENTERPRISE_STRING.ACHIEVEMENTS.map((item, index) => (
            <div key={index}>
              <div className="flex flex-col gap-4 text-center ">
                <div className="text-5xl font-semibold text-center max-tablet:text-4xl max-[580px]:text-2xl max-[529px]:text-xl max-s:text-lg">
                  {item.DATA}
                </div>
                <div className="text-base font-semibold text-gray-500 w-auto max-[580px]:text-md max-[529px]:text-md max-s:text-sm">
                  {item.DESC}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-8  w-[1440px] px-[96px] py-[60px] max-[770px]:px-[10px] max-[770px]:py-[50px]">
          <div className="font-semibold text-2xl text-center text-[#333333]">
            {ENTERPRISE_STRING.WE_ARE_TRANSFORMING_CITIES}
          </div>
          <div className="text-sm text-center font-medium w-[80%] max-tablet:w-full px-4">
            {ENTERPRISE_STRING.CITIES_DESC}
          </div>
          <div className="flex justify-center w-full p-8 flex-wrap gap-6">
            {ENTERPRISE_STRING.POPULAR_CITIES.map((item, index) => (
              <div key={index}>
                <div className="flex flex-col justify-center items-center gap-2">
                  <Image
                    src={item.images}
                    alt="cities"
                    className="w-28 h-28 rounded-xl shadow-gray-400 shadow-md transition-all transition-500 hover:scale-90"
                  ></Image>
                  <div className="font-semibold text-lg">{item.CITY}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-black text-white justify-center items-center p-4 gap-6 ">
        <div className="text-2xl font-semibold text-center mt-10">
          {ENTERPRISE_STRING.SOME_WORDS_FROM_OUR_HAPPY_CUSTOMERS}
        </div>

        <div
          className="grid grid-cols-4 w-full gap-2 mt-2 overflow-clip
            max-lg:grid-cols-2 p-4  
            max-sm:grid-cols-1
            "
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
                <div className="mt-2 text-xl">
                  <p>{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-center items-center p-10 gap-10 w-full max-tablet:p-4">
        <div className="font-semibold text-2xl text-center pt-[100px]">
          {ENTERPRISE_STRING.INDUSTRIES_WE_SERVE}
        </div>
        <div className="text-sm text-center text-[#3A3A3A] w-3/5 max-tablet:w-full ">
          {ENTERPRISE_STRING.INDUSTRIES_DATA}
        </div>
        <div className="w-full flex justify-center items-center gap-20 max-[529px]:flex-col">
          <div className="flex justify-center">
            {/* <Image
              src={industry_1}
              alt="industires"
              className="w-11/12 h-11/12 max-[426px]:w-3/4 max-[426px]:h-3/4 "
            ></Image> */}
          </div>
          <div className="flex flex-col gap-2">
            {ENTERPRISE_STRING.ALL_DATA_INDUSTIRES.map((item, index) => (
              <div key={index}>
                <div className="text-base bg-[#8E8FF8] p-4 font-semibold text-white transition duration-300 skew-x-12 skew-y-4 shadow-gray-400 shadow-md hover:scale-105 max-[769px]:p-2 max-[769px]:text-sm max-[769px]:w-[230px] max-[529px]:w-[300px] max-[529px]:text-center max-[322px]:w-[250px]">
                  {item}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex w-full justify-center p-10 flex-wrap gap-10">
        <div className="text-2xl font-semibold text-center ">
          {ENTERPRISE_STRING.FOR_ANY_MORE_QUERY}
        </div>
      </div>

      <div className="w-full flex justify-center items-center">
        <div className="flex border-2 shadow-md shadow-gray-400 p-10 justify-center items-center w-3/4 gap-8 md:flex max-[430px]:p-1 max-tablet:flex-col">
          <div>
            <Image
              src={trucks_porter}
              alt="truck"
              className="scale-120"
            ></Image>
          </div>
          <div className="flex flex-col text-sm text-gray-600 gap-4 p-4 ">
            <div className="text-sm w-9/12 max-tablet:w-full">
              {ENTERPRISE_STRING.FOR_MORE_QUERY_DATA}
            </div>

            <div className="flex font-bold gap-1">
              <span className="text-[#2967FF] mt-0.5">
                <BiSolidPhoneCall />
              </span>
              <span className="text-[#2967FF]">
                {ENTERPRISE_STRING.FOR_ANY_MORE_NUMBER}
              </span>
            </div>

            <div>
              <button className="border-0 mt-1 w-auto p-2 bg-gradient-to-r from-blue-700 to-blue-800 font-semibold text-base text-white shadow-md trasition duration-300 rounded-sm shadow-gray-400 hover:scale-105 ss:h-auto">
                {ENTERPRISE_STRING.REQUEST_CALLBACK}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full justify-center p-10 flex-wrap gap-10 text-center mt-8">
        <div className="text-2xl font-semibold text-[#3A3A3A]">
          {ENTERPRISE_STRING.FAQ}
        </div>
      </div>

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

      <div className="w-full bg-[#f0ecfc]">
        <div className="w-full flex flex-wrap justify-center items-center gap-8 p-10">
          <div className="bg-white p-4 text-center rounded-full">
            <Image src={faq} alt="faq"></Image>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-2xl font-bold text-[#3A3A3A] text-center mb-4">
              {
                ENTERPRISE_STRING.Still_have_questions_about_our_Enterprise_Services
              }
            </div>
            <div className="w-full flex justify-start items-center max-[712px]:justify-center">
              <button className="bg-[#3A3A3A] p-3 w-auto rounded-sm font-semibold text-white text-sm">
                {ENTERPRISE_STRING.READ_FAQ}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}
