"use client";
import React from "react";
import { ABOUT_US } from "../constant/constant";
import Image from "next/image";
import { companyBanners } from "../assets/Images/imageassets";

function AboutUs() {
  return (
    <>
      <div className="w-full">
        <div className="w-full mx-auto lg:mx-0 lg:flex-auto lg:py-32 lg:text-left bg-gray-900 text-white">
          <div className="w-full h-1/2 flex justify-center items-center">
            <h1 className="text-3xl text-center font-bold tracking-tight text-white sm:text-4xl">
              {ABOUT_US.TITLE}
            </h1>
          </div>
        </div>
        {/* about us paragraph */}
        <div className="mx-auto w-5/6 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8 middle:grid-cols-2">
          <div className="flex flex-col justify-center middle:text-base middle:p-6 ">
            <div>{ABOUT_US.DESC1}</div>
            <br />
            <div>{ABOUT_US.DESC1_2}</div>
          </div>
          <div className="flex justify-center items-center middle:text-base middle:p-6">
            <Image
              src={ABOUT_US.IMAGES1}
              className="rounded-xl "
              alt="india map"
              height={350}
              width={350}
            ></Image>
          </div>
        </div>
        <div className="mx-auto w-5/6 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8 middle:grid-cols-2 ">
          <div className="flex justify-center items-center order-2 lg:order-1 middle:text-base middle:p-6 ">
            <Image
              src={ABOUT_US.IMAGES2}
              className="rounded-xl"
              alt="india map"
              height={350}
              width={350}
            ></Image>
          </div>
          <div className="flex flex-col justify-center order-1 lg:order-2 middle:text-base middle:p-6">
            <div>{ABOUT_US.DESC2}</div>
            <div>{ABOUT_US.DESC2_1}</div>
          </div>
        </div>

        {/* count screen */}

        <div className="bg-black w-full h-auto lg:h-56 middle:h-44  flex justify-center items-center mb-4">
          <div className="w-full text-white grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="text-center">
              <h1 className="text-3xl font-semibold sm:text-xl">
                {ABOUT_US.YEARFOUND.count}
              </h1>
              <p className="text-xl sm:text-l">{ABOUT_US.YEARFOUND.title}</p>
            </div>

            <div className="text-center">
              <h1 className="text-3xl font-semibold sm:text-xl">
                {ABOUT_US.CUSTOMER.count}
              </h1>
              <p className="text-xl sm:text-l">{ABOUT_US.CUSTOMER.title}</p>
            </div>

            <div className="text-center">
              <h1 className="text-3xl font-semibold sm:text-xl">
                {ABOUT_US.STRONG_TEAM.count}
              </h1>
              <p className="text-xl sm:text-l">{ABOUT_US.STRONG_TEAM.title}</p>
            </div>
          </div>
        </div>

        {/* banner image */}
        <div className="w-full h-auto ss:w-auto lg:h-1/2 m-4 flex justify-center items-center">
          <Image
            src={companyBanners}
            className="rounded-xl"
            alt="india map"
          ></Image>
        </div>

        {/* join us */}

        <div>
          <div className="w-full mx-auto lg:mx-0 lg:flex-auto lg:py-32 lg:text-left bg-gray-900 text-white h-auto lg:h-96 middle:h-64 middle:mx-0 middle:flex-auto middle:py-12">
            <div className="w-full flex flex-col justify-center items-center">
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {ABOUT_US.JOIN_US}
              </h1>
              <br />
              <p className="text-xl text-center">{ABOUT_US.JOIN_US_DESC}</p>
              <div className="flex justify-center w-full p-8 gap-6">
                <div className="bg-cyan-500 rounded-xl w-full lg:w-auto h-12 flex justify-center items-center">
                  <a
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                    className="text-white text-center font-semibold text-md lg:text-lg sm:text-sm p-4"
                  >
                    {ABOUT_US.JOIN_US_BUTTON}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
