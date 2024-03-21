"use client";
import Image from "next/image";
import { ENTERPRISE_STRING } from "../constant/constant";
// import enterprise from "../assets/Images/enterprise.jpg";
import { enterprise } from "../assets/Images/imageassets";
import Logo from "../assets/Images/Enterprise_logo_1.jpg";
import industry_1 from "../assets/Images/industries_1.webp";
import truck from "../assets/Images/Truck.svg"
// import { BiSolidPhoneCall } from "react-icons/bi";
import { useState } from "react";
import faq from "../assets/Images/faq.svg"
interface FAQItem {
  QUESTION: string;
  ANSWER: string;
}

interface FAQAccordionProps {
  ENTERPRISE_FAQ: FAQItem[];
}
export default function page() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  return (
    <div>
      <div className="w-full flex flex-col gap-10">
        <div>
          <Image
            src={enterprise}
            className="w-full"
            alt="Picture of the enterprise"
          />
        </div>

        <div className="flex w-full justify-center p-10 flex-wrap gap-10">
          <div className="text-4xl font-semibold">
            {ENTERPRISE_STRING.WHY_USE_PORTER}
          </div>
        </div>

        <div className="flex flex-wrap justify-between">
          <div className="w-1/2 flex gap-10 ml-24">
            {ENTERPRISE_STRING.WHY_USE_PORTER_LOGO.map((item, index) => (
              <>
                <div className="flex flex-col justify-center gap-8 items-center p-2 w-2/5 ">
                  <div>
                    <Image
                      src={Logo}
                      alt="Logo"
                      className="w-42 h-42 rounded-full shadow-gray-400 shadow-md transition-all hover:scale-105"
                    ></Image>
                  </div>
                  <div className="text-xl font-semibold w-auto">
                    {ENTERPRISE_STRING.WHY_USE_PORTER_LOGO[index].DATA}
                  </div>
                  <div className="flex text-sm font-light text-center">
                    {ENTERPRISE_STRING.WHY_USE_PORTER_LOGO[index].DESC}
                  </div>
                </div>
              </>
            ))}
          </div>
          <div className="mr-14 w-4/12 p-10 rounded-3xl shadow-gray-400 shadow-md">
            <form>
              <div className="flex flex-col gap-6">
                <div className="flex justify-center text-4xl font-semibold text-blue-950">
                  {ENTERPRISE_STRING.FOR_ENTERPRISE}
                </div>

                {ENTERPRISE_STRING.FORM_DATA.map((item, index) => (
                  <>
                    {index === 0 || index === 4 ? (
                      <div>
                        {index === 0 ? (
                          <select className="p-2 w-full border-b rounded border-r-2 border-gray-300 font-semibold">
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
                          <select className="p-2 w-full  border-b rounded border-r-2 border-gray-300 font-semibold">
                            {ENTERPRISE_STRING.FORM_MONTHLY_TRIPS.map(
                              (item, index) => (
                                <>
                                  <option key={index} value={item}>
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
                          type="text"
                          className="w-full border-b rounded border-r-2 border-gray-300 py-1 focus:border-b-2 focus:border-amber-800 transition-colors focus:outline-none peer "
                        />
                        <label
                          htmlFor={item}
                          className="absolute pl-2 left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all font-semibold"
                        >
                          {item}
                        </label>
                      </div>
                    )}
                  </>
                ))}
                <div>
                  <button className="w-full bg-amber-500 p-2 rounded text-blue-950 text-lg font-semibold hover:scale-105 transition-all transition-300">
                    {ENTERPRISE_STRING.REQUEST_CALLBACK}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className=" flex flex-col bg-black text-white justify-center items-center p-16 gap-24">
          <div className="text-6xl font-semibold">
            {ENTERPRISE_STRING.OUR_GROWING_NETWORK}
          </div>
          <div className="font-semibold flex gap-24">
            {ENTERPRISE_STRING.ACHIEVEMENTS.map((item) => (
              <>
                <div className="flex flex-col justify-center items-center gap-4 text-center">
                  <div className="text-4xl font-semibold text-center">
                    {item.DATA}
                  </div>
                  <div className="text-lg font-semibold text-zinc-600">
                    {item.DESC}
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center items-center p-10 gap-2 text-zinc-600">
          <div className="font-semibold text-3xl">
            {ENTERPRISE_STRING.WE_ARE_TRANSFORMING_CITIES}
          </div>
          <div className="text-sm text-center font-medium p-10">
            {ENTERPRISE_STRING.CITIES_DESC}
          </div>
          <div className="flex justify-center w-full p-8 flex-wrap gap-6">
            {ENTERPRISE_STRING.POPULAR_CITIES.map((item) => (
              <>
                <div className="flex flex-col justify-center items-center gap-2">
                  <Image
                    src={item.images}
                    alt="cities"
                    className="w-28 h-28 rounded-xl shadow-gray-400 shadow-md transition-all transition-500 hover:scale-90"
                  ></Image>
                  <div className="font-semibold text-lg">{item.CITY}</div>
                </div>
              </>
            ))}
          </div>
        </div>

        <div className="flex flex-col bg-black text-white justify-center items-center p-16 gap-24">
          <div className="text-4xl font-semibold ">
            {ENTERPRISE_STRING.SOME_WORDS_FROM_OUR_HAPPY_CUSTOMERS}
          </div>
          <div className="flex gap-8 items-center">
            {ENTERPRISE_STRING.CUSTOMERS_DETAILS.map((item) => (
              <>
                <div className="flex flex-col items-left  gap-4 p-2 w-1/3 bg-white text-black text-left h-80 rounded-lg shadow-white shadow-md  transition-all hover:scale-105">
                  <div className="text-3xl font-semibold">
                    {item.DESIGNATION}
                  </div>
                  <div className="text-base font-semibold text-zinc-600">
                    {item.FIRM}
                  </div>
                  <div className="text-base font-medium">{item.REVIEW}</div>
                </div>
              </>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center items-center p-10">
          <div className="font-semibold text-3xl">
            {ENTERPRISE_STRING.INDUSTRIES_WE_SERVE}
          </div>
          <div className="text-md text-center font-medium p-16">
            {ENTERPRISE_STRING.INDUSTRIES_DATA}
          </div>
          <div className="w-full flex justify-center items-center gap-20">
            <div>
              <Image
                src={industry_1}
                alt="industires"
                className="w-auto h-auto"
              ></Image>
            </div>
            <div className="flex flex-col gap-2">
              {ENTERPRISE_STRING.ALL_DATA_INDUSTIRES.map((item) => (
                <>
                  <div className="bg-amber-400 p-4 font-semibold text-blue-800 transition duration-300 skew-x-12 skew-y-4 shadow-gray-400 shadow-md hover:scale-105">
                    {item}
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>

        <div className="flex w-full justify-center p-10 flex-wrap gap-10">
          <div className="text-4xl font-semibold">
            {ENTERPRISE_STRING.FOR_ANY_MORE_QUERY}
          </div>
        </div>

        <div className="w-full flex justify-center items-center">
          <div className="flex border-2 shadow-md shadow-gray-400 p-10 justify-center items-center w-3/4 gap-8">
            <div>
              <Image
                src={truck}
                alt="truck"
                className="scale-120"
              ></Image>
            </div>
            <div className="flex flex-col text-sm text-gray-600 gap-4 p-4">
              <div className="font-medium">
                {ENTERPRISE_STRING.FOR_MORE_QUERY_DATA}
              </div>

              <div className="flex font-bold gap-1">
                <span className="text-amber-500 mt-0.5">
                  {/* <BiSolidPhoneCall /> */}
                </span>
                <span className="text-amber-500">
                  {ENTERPRISE_STRING.FOR_ANY_MORE_NUMBER}
                </span>
              </div>

              <div>
                <button className="border-0 mt-1 w-auto h-12 p-2  bg-amber-500 font-semibold text-xl text-blue-800 shadow-md trasition duration-300 rounded-lg shadow-gray-400 hover:scale-105">
                  {ENTERPRISE_STRING.REQUEST_CALLBACK}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full justify-center p-10 flex-wrap gap-10">
          <div className="text-4xl font-semibold">{ENTERPRISE_STRING.FAQ}</div>
        </div>

        <div className="flex flex-col gap-2 justify-center items-center">
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

        <div className="w-full bg-amber-100">
            <div className="w-full flex flex-wrap justify-center items-center gap-8 p-10">
                <div>

    <Image src={faq} alt="faq"></Image>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="text-2xl font-bold text-blue-800">{ENTERPRISE_STRING.Still_have_questions_about_our_Enterprise_Services}</div>
                    <div>
                        <button className="bg-amber-500 p-2 w-auto h-10 rounded-md font-semibold text-blue-900 transition duration-300 hover:scale-105">{ENTERPRISE_STRING.READ_FAQ}</button>
                    </div>
                    
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}
