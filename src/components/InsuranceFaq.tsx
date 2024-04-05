"use client";
import {  INSURANCE_FAQS_STRING } from "@/constant/InsuranceFaq";
import { DELIVERY_PARTNER_STRING } from "@/constant/constant";
import React, { useState } from "react";

function InsuranceFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  return (
    <>
      <div>
        <div className="bg-black w-full h-52 flex justify-center">
          <h1 className="text-white text-3xl font-bold mt-10">
            {INSURANCE_FAQS_STRING.title}
          </h1>
        </div>
        <div className="flex justify-center">
          {/* multiple paragraph section */}
          <div className="mt-[-4%] mb-[2%] max-lg:mt-[-10%] max-sm:mt-[-20%] bg-white w-11/12 shadow-lg rounded-lg p-10 flex flex-col gap-4">
            <div className="w-full h-auto mb-8 ">
              <div className="text-2xl font-semibold text-center p-10">
                {INSURANCE_FAQS_STRING.INSURANCE_FAQS_TITLE}
              </div>

              <div className="flex flex-col gap-2 justify-center items-center">
                {INSURANCE_FAQS_STRING.INSURANCE_FAQS_QUESTIONS.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-2 p-4 w-full md:w-3/4 rounded-lg  "
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
                            fill="#2967FF"
                            className="transform origin-center transition duration-200 ease-out"
                          />
                          <rect
                            y="7"
                            width="16"
                            height="2"
                            rx="1"
                            fill="#2967FF"
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
                          <span className="text-sm text-black">
                            {item.ANSWER}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InsuranceFaq;
