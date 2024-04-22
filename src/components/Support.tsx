"use client";
import Link from "next/link";

import { SUPPORT_STRING } from "@/constant/constant";
import { FcCustomerSupport } from "react-icons/fc";
import { CgLoadbar } from "react-icons/cg";
import { contact_us, contact_use_bg, cross } from "@/assets/Images/imageassets";
import Image from "next/image";
import { useState } from "react";
import { contact_us_api } from "@/http/staticTokenService";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import {motion} from "framer-motion"
export default function Support() {
  const [email, setEmail] = useState("");
  const [subject, setsubject] = useState("");
  const [msg, setmsg] = useState("");
  const [modal, setmodal] = useState(false);

  const openmodal = () => {
    setmodal(!modal);
  };
  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await contact_us_api({
        subject: subject,
        email: email,
        description: msg,
      });
      openmodal();
      toast.success(response.data.message);
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

  return (
    <>
      <div className="bg-black py-10 h-auto">
        {/* title */}
        <div
          className="
                    flex flex-col items-center my-10
                    "
        >
          <div>
            <h1
              className="text-4xl text-white font-bold
                            max-lg:text-2xl
                            max-sm:text-2xl
                            "
            >
              {SUPPORT_STRING.main_title}
            </h1>
          </div>
          <div className="p-4">
            <h3
              className="text-xl text-white font-bold
                            max-lg:text-lg
                            max-sm:text-base
                            "
            >
              {SUPPORT_STRING.main_desc}
            </h3>
          </div>
        </div>

        {/* section1 */}
        <div className="flex justify-center ">
          <div
            className="w-11/12 grid grid-cols-2
                        max-md:grid-cols-1
                        rounded-xl
                        bg-white
                        "
          >
            {SUPPORT_STRING.SECTION_ONE.map((item, index) => (
              <div
                className="flex p-10
                            border-2
                            rounded-xl
                            gap-4
                            "
                key={index}
              >
                <div>
                  <FcCustomerSupport
                    className="size-20
                                    max-lg:size-14
                                    max-sm:size-10
                                    "
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div
                    className="text-lg font-bold
                                max-lg:text-base
                                "
                  >
                    {item.title}
                  </div>
                  <div
                    className="text-gray-500 font-semibold text-sm
                                max-lg:text-xs
                                "
                  >
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="my-20 ">
          <div className="flex flex-col items-center">
            <div
              className="text-white text-4xl font-bold
                    max-sm:text-3xl
                    "
            >
              {SUPPORT_STRING.office_heading}
            </div>
            <div
              className="text-white text-4xl
                    max-sm:text-3xl
                    "
            >
              <CgLoadbar />
            </div>
          </div>
          <div className="flex flex-col items-center mt-10">
            <div className="text-white text-2xl font-bold">
              {SUPPORT_STRING.head_office_heading}
            </div>
            <div className="text-white text-2xl">
              <CgLoadbar />
            </div>
            <div
              className="flex flex-col items-center text-white w-3/12 gap-4
                    max-sm:w-9/12
                    "
            >
              <h2
                className="text-2xl font-bold mt-5
                        max-sm:text-xl
                        "
              >
                {SUPPORT_STRING.head_office.city}
              </h2>
              <p
                className="text-center font-semibold
                        max-sm:text-sm
                        "
              >
                {SUPPORT_STRING.head_office.add}
              </p>
              <Link
                href={SUPPORT_STRING.head_office.url}
                className="w-fit
                                max-sm:text-sm
                                font-semibold
                                text-gray-400
                                hover:italic
                                "
              >
                {SUPPORT_STRING.head_office.url_text}
              </Link>
            </div>
          </div>

          <div
            className="flex flex-col items-center text-white
                        mt-10
                        "
          >
            <div className="text-2xl font-bold">
              <h1>{SUPPORT_STRING.regional_office_heading}</h1>
            </div>
            <div className="text-2xl">
              <CgLoadbar />
            </div>
          </div>

          <div className="flex justify-center">
            <div
              className="grid grid-cols-2 w-10/12
                max-sm:grid-cols-1
                "
            >
              {SUPPORT_STRING.SECTION_TWO.map((item, index) => (
                <div key={index} className="flex justify-center">
                  <div
                    className="text-white
                                flex flex-col
                                gap-5
                                p-4
                                w-7/12
                                max-lg:w-9/12
                                max-sm:gap-3
                                max-sm:w-full
                                "
                    key={index}
                  >
                    <h2
                      className="text-2xl font-bold
                                    max-lg:text-2xl
                                    max-sm:text-xl
                                    "
                    >
                      {item.city}
                    </h2>
                    <p
                      className="font-semibold
                                    max-lg:text-base
                                    max-sm:text-sm
                                    "
                    >
                      {item.add}
                    </p>
                    <Link
                      href={item.url}
                      className="text-gray-400 
                                    font-semibold
                                    hover:italic
                                    max-lg:text-sm
                                    max-sm:text-xs
                                    "
                    >
                      {item.url_text}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {modal && (
            <div
           
             className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[1000000000000] flex justify-center items-center ">
              <motion.div 
               initial={{ translateY: 40, opacity: 0 }}
               whileInView={{ translateY: -10, opacity: 1 }}
               transition={{ duration: 0.5 }}
              className="absolute w-full flex justify-center items-center ">
                <div className="w-[40%] p-4 bg-white flex flex-col gap-2 rounded-lg">
                  <div className="flex w-full justify-between items-center p-4">
                    <div>
                      <h1 className="text-center text-black text-3xl font-bold col-span-6">
                        Contact Us
                      </h1>
                    </div>
                    <div onClick={openmodal} className="cursor-pointer">
                      <Image src={cross} alt="cross"></Image>
                    </div>
                  </div>

                  <form
                    className="w-full p-4 bg-white flex flex-col gap-2 rounded-lg"
                    onSubmit={handlesubmit}
                  >
                    <div>
                      <input
                        type="email"
                        className="bg-slate-100 text-slate-600 w-full placeholder:text-slate-600 placeholder:opacity-50 border border-slate-200 col-span-6 resize-none outline-none rounded-lg p-2 duration-300 focus:border-slate-600"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                      ></input>
                    </div>
                    <div>
                      <input
                        type="text"
                        className="bg-slate-100 text-slate-600 w-full placeholder:text-slate-600 placeholder:opacity-50 border border-slate-200 col-span-6 resize-none outline-none rounded-lg p-2 duration-300 focus:border-slate-600"
                        placeholder="Subject"
                        onChange={(e) => setsubject(e.target.value)}
                      ></input>
                    </div>
                    <textarea
                      placeholder="Your feedback..."
                      onChange={(e) => setmsg(e.target.value)}
                      className="bg-slate-100 text-slate-600 h-28 placeholder:text-slate-600 placeholder:opacity-50 border border-slate-200 col-span-6 resize-none outline-none rounded-lg p-2 duration-300 focus:border-slate-600"
                    ></textarea>

                    <span className="col-span-2"></span>
                    <button
                      className="bg-black stroke-white border w-auto border-slate-200 col-span-2 flex justify-center rounded-lg p-2 duration-300 hover:border-slate-600 hover:text-black hover:scale-95"
                      type="submit"
                    >
                      <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        height="30px"
                        width="30px"
                        stroke="#ffffff"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linejoin="round"
                          stroke-linecap="round"
                          stroke-width="1.5"
                          d="M7.39999 6.32003L15.89 3.49003C19.7 2.22003 21.77 4.30003 20.51 8.11003L17.68 16.6C15.78 22.31 12.66 22.31 10.76 16.6L9.91999 14.08L7.39999 13.24C1.68999 11.34 1.68999 8.23003 7.39999 6.32003Z"
                        ></path>
                        <path
                          stroke-linejoin="round"
                          stroke-linecap="round"
                          stroke-width="1.5"
                          d="M10.11 13.6501L13.69 10.0601"
                        ></path>
                      </svg>
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          )}
          <div className="w-full flex justify-center items-center h-[60px] ">
            <div className=" border-[1.5px] border-white p-1 hover:scale-105 transition-all duration-300 rounded-l-xl rounded-t-xl ">
              <button
                className="w-[150px] bg-white h-[50px] hover:scale-100 text-xl font-bold  flex items-center justify-center  cursor-pointer transition-all duration-500  text-[#000000] rounded-l-lg rounded-t-lg"
                onClick={openmodal}
              >
                FeedBack
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
