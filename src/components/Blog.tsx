// Blog.tsx
"use client";
import React, { useState } from "react";
import { comment, eye, search } from "@/assets/Images/imageassets";
import {
  BOOK_PORTER,
  PORTER_BLOG,
  Porter_Home,
  Trending_post,
  Trending_post_data,
  blog_social_media,
  post_data,
  slides,
  footer_data,
  searchtitle,
  Input_data,
  PostData,
} from "@/constant/blog";
import Carousel from "./Carousel";
import Image from "next/image";
import Link from "next/link";

export default function Blog() {
  const [modal, setmodal] = useState(false);
  const [search12, setsearch] = useState("");
  const [filter_data, setfilter_data] = useState<PostData[]>([]);
  const slides_data = slides;
  const searchmodal = () => {
    setmodal(!modal);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setsearch(searchTerm);
    console.log(searchTerm);

    // const filteredData=[]
    // if (searchTerm.length === 0) {
    //   setfilter_data([]); // Clear the filter_data state if the search term is empty
    //   console.log(filter_data);
    // } else {
    //   const filteredData = post_data.filter((item) =>
    //     item.title.toLowerCase().includes(searchTerm) || item.desc.toLowerCase().includes(searchTerm)

    //   );
    //   setfilter_data(filteredData); // Update the filter_data state with the filtered results
    //   console.log(filter_data);
    // }
    const filteredData =
      searchTerm.length === 0
        ? []
        : post_data.filter(
            (item) =>
              item.title.toLowerCase().includes(searchTerm) ||
              item.desc.toLowerCase().includes(searchTerm)
          );

    setfilter_data(filteredData);
  };

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center ">
        <div className="w-11/12 flex justify-between items-center mt-10 p-6 border-y-[1px] sticky top-0 z-10 bg-white ">
          <div className="flex gap-2 justify-center items-center w-[196px]">
            {blog_social_media.map((item) => (
              <div key={item.name}>
                <Image
                  src={item.img}
                  alt={item.name}
                  className="h-[20px] w-[20px]"
                />
              </div>
            ))}
          </div>
          <div className="text-[32px] font-normal w-auto tracking-wider">
            {PORTER_BLOG}
          </div>
          <div className="w-[196px] h-[32px] flex justify-center items-center">
            <div className="cursor-pointer">
              <Image src={search} alt="search button" onClick={searchmodal} />
            </div>
          </div>
        </div>
        <div className="w-11/12 flex justify-center items-center p-6 border-t-[1px] border-b-[1px] gap-4 sticky top-20 z-10 bg-white">
          <Link href="/">
            <div className="text-base font-bold ">{Porter_Home}</div>
          </Link>
          <Link href="/two-wheelers">
            <div className="text-base font-bold ">{BOOK_PORTER}</div>
          </Link>
        </div>

        <div className="w-11/12 h-[500px] flex my-8 ">
          <Carousel slides_data={slides_data} />
        </div>
        <div>
          {modal && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 relative flex justify-center items-center ">
                <div className="flex flex-col justify-center w-full">
                  <div className="mb-4 w-full text-center text-[10px] font-light">
                    {searchtitle}
                  </div>
                  <div className="w-full text-center flex justify-center mb-4">
                    <div className="w-[580px] h-[84px] flex justify-center items-center ">
                      <div className="text-center w-full h-full">
                        <input
                          className="w-full h-full placeholder-black text-6xl font-light placeholder:pl-24 p-4 placeholder:tracking-normal outline-none"
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
                  <div className="w-full flex justify-center">
                    {filter_data.length === 0 ? (
                      <></>
                    ) : (
                      <>
                        <div className="bg-white flex flex-col gap-4 w-3/4 justify-between">
                          {filter_data.map((item) => (
                            <>
                              <div className="flex gap-4 shadow-md shadow-gray-400 p-4">
                                <div className="p-2">
                                  <Image
                                    src={item.img}
                                    alt="image"
                                    className="w-16 h-16"
                                  ></Image>
                                </div>
                                <div className="flex flex-col gap-2">
                                  <div className="text-base font-bold">
                                    {item.title}
                                  </div>
                                  <div className="text-sm font-light">
                                    {item.date}
                                  </div>
                                  <div className="text-sm font-light">
                                    <div className="flex text-black font-semibold text-sx gap-2 w-full justify-start items-start">
                                      <div className="flex gap-1 items-center">
                                        <div>
                                          <Image
                                            src={eye}
                                            alt="eye"
                                            className=" h-3 w-3"
                                          ></Image>
                                        </div>
                                        <div className="text-xs">
                                          {item.view >= 1000 ? (
                                            <>
                                              {(item.view / 1000).toFixed(1)}
                                              {"K"}
                                            </>
                                          ) : (
                                            <>{item.view}</>
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
                                          {item.comment}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="absolute top-3 right-5">
                    <button
                      className="text-3xl font-bold"
                      onClick={searchmodal}
                    >
                      X
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="w-full flex justify-center items-center mt-3">
          <div className="text-base">{Trending_post}</div>
        </div>
        <div className="w-11/12 mt-8 ">
          <div className="flex gap-6 justify-center">
            {Trending_post_data.map((item, index) => (
              <>
                <div
                  className="flex flex-col justify-center items-center gap-10"
                  key={index}
                >
                  <div>
                    <Image
                      src={item.img}
                      alt={item.desc}
                      className="w-[268px] h-[200px]"
                    ></Image>
                  </div>
                  <div className="text-center p-2">{item.desc}</div>
                </div>
              </>
            ))}
          </div>
        </div>
        <div className="w-11/12 mt-10 border-t-2">
          <div className="flex flex-col w-full gap-4 p-10 mt-4">
            {post_data.map((item, index) => (
              <>
                <div className="w-full flex gap-4" key={index}>
                  <div className="w-[560px] h-auto relative overflow-hidden">
                    <Image
                      src={item.img}
                      alt={item.desc}
                      className="transition-transform duration-300 transform hover:scale-110  "
                    ></Image>
                  </div>

                  <div className="w-1/2">
                    <div className="flex flex-col gap-4 px-4 pb-4">
                      <div className="text-2xl font-normal">{item.title}</div>
                      <div className="text-[10px] font-bold">{item.date}</div>
                      <div className="text-lg">
                        {item.desc}
                        <span className="tracking-wider text-lg"> {"..."}</span>
                      </div>
                      <div>
                        <div className="flex text-black font-semibold text-sx gap-2 w-full justify-start items-start">
                          <div className="flex gap-1 items-center">
                            <div>
                              <Image
                                src={eye}
                                alt="eye"
                                className=" h-3 w-3"
                              ></Image>
                            </div>
                            <div className="text-xs">
                              {item.view >= 1000 ? (
                                <>
                                  {(item.view / 1000).toFixed(1)}
                                  {"K"}
                                </>
                              ) : (
                                <>{item.view}</>
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
                            <div className="text-xs">{item.comment}</div>
                          </div>
                        </div>
                      </div>
                      <Link href={`${item.title}`}>
                        <div className="text-xs font-bold bg-[#2967ff] p-2.5 text-white rounded-md tracking-widest w-1/4 text-center border-[#2967ff] border-2  hover:bg-white hover:text-[#2967ff] hover:border-[#2967ff] hover:border-2 transition-all duration-100">
                          View Post
                        </div>
                      </Link>
                      <div className="flex justify-start gap-3">
                        <div className="text-[10px] mt-2 font-bold tracking-widest">
                          SHARE
                        </div>
                        <div className="text-md  text-gray-300">{"->"}</div>
                        <div className="flex gap-2 mt-1">
                          {blog_social_media.map((item) => (
                            <div key={item.name}>
                              <Image
                                src={item.img}
                                alt={item.name}
                                className="h-[20px] w-[20px]"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
        <div className="w-full bg-gray-200 flex flex-col ">
          <div className="flex justify-between items-center px-[120px] pt-[60px] ">
            <div className="text-[28px] font-bold">{PORTER_BLOG}</div>
            <div className="flex gap-16 p-4">
              {footer_data.map((item, index) => (
                <div key={index}>
                  <Link
                    href={item.link}
                    className="text-base font-bold tracking-wider text-[#0A0A0A] hover:text-[#2967ff] transition-all duration-100"
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-[0px] px-[120px] mt-2 text-[19.2px] text-[#5A5A5A] pb-10">
            India’s Largest Marketplace for Intracity Logistics
          </div>
        </div>
      </div>
    </>
  );
}
