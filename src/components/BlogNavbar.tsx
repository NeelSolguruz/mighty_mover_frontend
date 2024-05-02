"use client";
import React, { useEffect, useState } from "react";
import {
  comment,
  cross,
  eye,
  hamburger,
  search,
} from "@/assets/Images/imageassets";
import {
  BOOK_PORTER,
  PORTER_BLOG,
  Porter_Home,
  Trending_post,
  Trending_post_data,
  blog_social_media,
  slides,
  footer_data,
  searchtitle,
  Input_data,
  PostData,
} from "@/constant/blog";
import Carousel from "./Carousel";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useAnimationControls,
  useScroll,
  useSpring,
} from "framer-motion";
import { search_api } from "@/http/staticTokenService";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export default function BlogNavbar() {
  const [modal, setmodal] = useState(false);
  const [search12, setsearch] = useState("");
  const [filter_data, setfilter_data] = useState<PostData[]>([]);
  const [sidebar, setsidebar] = useState(false);
  const slides_data = slides;
  const containerVariants = {
    close: {
      x: "-300px",
      transition: {
        type: "spring",
        damping: 20,
        duration: 1,
      },
    },
    open: {
      x: "0px",
      transition: {
        type: "spring",
        damping: 20,
        duration: 1,
      },
    },
  };
  const containerControls = useAnimationControls();
  useEffect(() => {
    if (sidebar) {
      containerControls.start("open");
    } else {
      containerControls.start("close");
    }
  }, [sidebar]);

  const searchmodal = () => {
    setmodal(!modal);
    setsidebar(false);
    setsearch("");
    setfilter_data([]);
  };
  const handlesidebar = () => {
    if (sidebar) {
      containerControls.start("close");
      setTimeout(() => {
        setsidebar(!sidebar);
      }, 1000);
    } else setsidebar(!sidebar);
  };
  const { scrollYProgress } = useScroll();
  const message_error = (error: any) => {
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
  };
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setsearch(searchTerm);
    console.log(searchTerm);
    try {
      const response = await search_api({ title: search12 });
      setfilter_data(response.data.data);
    } catch (error) {
      message_error(error);
    }
  };
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center relative">
        <>
          <motion.div
            variants={containerVariants}
            initial="close"
            animate={containerControls}
            className="w-[300px] bg-white opacity-95 h-lvh absolute top-0 left-0 overflow-y-auto z-[100000000]"
          >
            <div className="flex flex-col w-full">
              <div className="mt-6 ">
                <div className="flex justify-between ">
                  <div className="flex w-full justify-center mb-6 py-2 text-xl pl-6">
                    {"Social Links"}
                  </div>
                  <div>
                    <button
                      className="text-3xl font-bold pr-4 py-2"
                      onClick={handlesidebar}
                    >
                      <Image src={cross} alt="cross"></Image>
                    </button>
                  </div>
                </div>
                {blog_social_media.map((item) => (
                  <>
                    <div className="flex gap-4 w-full p-4 justify-center items-end hover:shadow-md hover:shadow-gray-200 transition-all duration-300 hover:scale-100 hover:text-[18px]">
                      <div
                        key={item.name}
                        className="w-[20%] flex justify-center"
                      >
                        <Image
                          src={item.img}
                          alt={item.name}
                          className="h-[20px] w-[20px]"
                        />
                      </div>
                      <div className="w-full flex justify-start">
                        {item.name}
                      </div>
                    </div>
                  </>
                ))}
                <div className="pl-3">
                  <div className="w-full justify-start flex text-xl font-normal p-4 hover:shadow-md hover:shadow-gray-200 transition-all duration-300 hover:scale-100 hover:text-[22px]">
                    <div
                      className="cursor-pointer flex gap-4 "
                      onClick={searchmodal}
                    >
                      <div>
                        <Image src={search} alt="search button" />
                      </div>
                      <div className="pl-2 text-base">Search</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="w-full flex-col justify-center items-center gap-4">
                    <Link href="/">
                      <div className="w-full justify-center flex text-xl font-normal p-4 hover:shadow-md hover:shadow-gray-200 transition-all duration-300 hover:scale-100 hover:text-[22px]">
                        <div>{Porter_Home}</div>
                      </div>
                    </Link>
                    <Link href="/two-wheelers">
                      <div className="w-full justify-center flex text-xl font-normal p-4 hover:shadow-md hover:shadow-gray-200 transition-all duration-300 hover:scale-100 hover:text-[22px]">
                        {BOOK_PORTER}
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
        <>
          <motion.div
            initial={{ translateY: -40, opacity: 0 }}
            whileInView={{ translateY: 0, opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="w-11/12 flex justify-between items-center  p-6 border-y-[1px] sticky top-0 z-10 bg-white opacity-90 max-[1081px]:w-full"
          >
            <div
              className="hidden max-tablet:block w-[196px] pl-4"
              onClick={handlesidebar}
            >
              <Image src={hamburger} alt="hamburger"></Image>
            </div>
            <div className="flex gap-2 justify-center items-center w-[196px]  max-tablet:hidden">
              {blog_social_media.map((item) => (
                <div key={item.name} className="cursor-pointer">
                  <Image
                    src={item.img}
                    alt={item.name}
                    className="h-[20px] w-[20px]"
                  />
                </div>
              ))}
            </div>
            <Link href={`/blog`}>
              <div className="text-[32px] font-normal w-full text-center tracking-wider">
                {PORTER_BLOG}
              </div>
            </Link>
            <div className="w-[196px] h-[32px] flex justify-center items-center max-tablet:invisible">
              <div className="cursor-pointer">
                <Image src={search} alt="search button" onClick={searchmodal} />
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="w-11/12 flex justify-center items-center py-0.5 border-t-[1px] border-b-[1px] gap-4 sticky top-20 z-10 bg-white opacity-95 transition-all duration-300 max-[1081px]:w-full max-tablet:hidden"
          >
            <Link href="/">
              <div className="text-base font-bold ">{Porter_Home}</div>
            </Link>
            <Link href="/two-wheelers">
              <div className="text-base font-bold ">{BOOK_PORTER}</div>
            </Link>
          </motion.div>
        </>

        <div>
          {modal && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[1000000000000] flex justify-center items-center "
            >
              <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 relative flex justify-center items-center ">
                <div className="flex flex-col justify-center w-full">
                  <div className="mb-4 w-full text-center text-[10px] font-light">
                    {searchtitle}
                  </div>
                  <div className="w-full text-center flex justify-center mb-4">
                    <div className="w-[580px] h-[84px] flex justify-center items-center ">
                      <div className="text-center w-full h-full">
                        <input
                          className="w-full h-full placeholder-black text-6xl font-light placeholder:flex placeholder:w-full placeholder:justify-center p-4 placeholder:tracking-normal outline-none placeholder:text-center"
                          type="search"
                          placeholder="Enter Keyword"
                          required
                          value={search12}
                          onChange={handleChange}
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 w-full text-center text-[14px] text-[#DEE2E6] font-light">
                    {Input_data}
                  </div>
                  <div className="w-full flex justify-center  ">
                    {filter_data.length === 0 ? (
                      <></>
                    ) : (
                      <>
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          className="bg-white flex flex-col gap-4 w-3/4 justify-between overflow-y-scroll h-[200px]"
                        >
                          {filter_data.map((item) => (
                            <>
                              <Link
                                href={`/blog/${item.id}`}
                                onClick={searchmodal}
                              >
                                <div className="flex gap-4 shadow-md shadow-gray-400 w-full">
                                  <div className="py-4 pl-4 ">
                                    <Image
                                      src={item.document}
                                      height={100}
                                      width={100}
                                      alt="image"
                                      className="w-20 h-20"
                                    ></Image>
                                  </div>
                                  <div className="flex flex-col gap-2 py-4 ">
                                    <div className="text-base font-bold">
                                      {item.title}
                                    </div>
                                    <div className="text-sm font-light">
                                      {item.created_at.substring(0, 10)}
                                    </div>
                                    <div className="text-sm font-light">
                                      <div className="flex text-black font-semibold text-sx gap-2 w-full justify-start items-start ">
                                        <div className="flex gap-1 items-center">
                                          <div>
                                            <Image
                                              src={eye}
                                              alt="eye"
                                              className=" h-3 w-3"
                                            ></Image>
                                          </div>
                                          <div className="text-xs">
                                            {item.views >= 1000 ? (
                                              <>
                                                {(item.views / 1000).toFixed(1)}
                                                {"K"}
                                              </>
                                            ) : (
                                              <>{item.views}</>
                                            )}
                                          </div>
                                        </div>
                                        <div className="flex gap-1 items-center">
                                          <div>
                                            <Image
                                              src={comment}
                                              alt="eye"
                                              className="text-white h-3 w-3"
                                            ></Image>
                                          </div>
                                          <div className="text-xs">
                                            {item.comments}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            </>
                          ))}
                        </motion.div>
                      </>
                    )}
                  </div>
                  <div className="absolute top-5 right-5">
                    <button
                      className="text-3xl font-bold"
                      onClick={searchmodal}
                    >
                      <Image src={cross} alt="cross"></Image>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
