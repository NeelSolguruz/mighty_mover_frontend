"use client";
import React from "react";
import { ABOUT_US } from "../constant/constant";
import Image from "next/image";
import { companyBanners } from "../assets/Images/imageassets";

function AboutUs() {
  return (
    <>
      <div className="w-full">
        <div className="w-full mx-auto text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left bg-gray-900 text-white">
          <div className="w-full  h-1/2 ">
            <h1 className="text-3xl text-center w-full font-bold tracking-tight text-white sm:text-4xl">
              {ABOUT_US.TITLE}
            </h1>
          </div>
        </div>
        {/* about us paragraph */}
        <div className="mx-auto w-5/6 py-28 flex justify-between gap-2 ">
          <div className="w-6/12 flex flex-col p-5 gap-10">
            <div>{ABOUT_US.DESC1}</div>
            <div>{ABOUT_US.DESC1_2}</div>
          </div>
          <div className="w-5/12">
            <Image
              src={ABOUT_US.IMAGES1}
              className="rounded-xl sm:w-[57rem]"
              alt="india map"
              height={200}
              width={200}
            ></Image>
          </div>
        </div>
        <div className="mx-auto w-5/6 py-28 flex justify-between gap-2 ">
          <div className="w-5/12">
            <Image
              src={ABOUT_US.IMAGES2}
              className="rounded-xl sm:w-[57rem]"
              alt="india map"
              height={200}
              width={200}
            ></Image>
          </div>
          <div className="w-6/12 flex flex-col p-5 gap-10">
            <div>{ABOUT_US.DESC2}</div>
            <div>{ABOUT_US.DESC2_1}</div>
          </div>
        </div>

        {/* count screen */}

        <div className="bg-black w-full h-56 grid place-items-center mb-4">
          <div className="w-full  text-white flex justify-center gap-36 my-20 max-lg:gap-20 max-sm:flex-col max-sm:gap-10">
            <div>
              <div>
                <h1 className="text-3xl font-semibold text-center">
                  {ABOUT_US.YEARFOUND.count}
                </h1>
              </div>
              <div>
                <p className="text-xl text-center">
                  {ABOUT_US.YEARFOUND.title}
                </p>
              </div>
            </div>

            <div>
              <div>
                <h1 className="text-3xl font-semibold text-center">
                  {ABOUT_US.CUSTOMER.count}
                </h1>
              </div>
              <div>
                <p className="text-xl text-center">{ABOUT_US.CUSTOMER.title}</p>
              </div>
            </div>

            <div>
              <div>
                <h1 className="text-3xl font-semibold text-center">
                  {ABOUT_US.CUSTOMER.count}
                </h1>
              </div>
              <div>
                <p className="text-xl text-center">{ABOUT_US.CUSTOMER.title}</p>
              </div>
            </div>
          </div>
        </div>

        {/* banner image */}
        <div className="w-fit    h-1/2 m-4">
          <Image
            src={companyBanners}
            className="rounded-xl "
            alt="india map"
            // height={200}
            // width={200}
          ></Image>
        </div>

        {/* join us */}

        <div>
          <div className="w-full mx-auto text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left bg-gray-900 text-white h-96 ">
            <div className="w-full ">
              <h1 className="text-3xl text-center w-full font-bold tracking-tight text-white sm:text-4xl">
                {ABOUT_US.JOIN_US}
              </h1>
              <br />
              <p className="text-xl text-center">{ABOUT_US.JOIN_US_DESC}</p>
              <div className="flex justify-center w-full p-8 flex-wrap gap-6">
                <div className="flex flex-col justify-center items-center gap-2 bg-cyan-500 rounded-xl w-32 h-12">
                  <a
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                    className="text-white text-center font-semibold text-md max-lg:text-lg max-sm:text-sm w-10/12 max-sm:p-4"
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
