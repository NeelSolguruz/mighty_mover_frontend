// Blog.tsx
"use client";
import React, { useState } from "react";
import { comment, cross, eye, search } from "@/assets/Images/imageassets";
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
       
        <div className="w-11/12 h-auto flex my-8 ">
          <Carousel slides_data={slides_data} />
        </div>
        <div className="w-full flex justify-center items-center mt-3">
          <div className="text-base">{Trending_post}</div>
        </div>
        <div className="w-11/12 mt-8 ">
          <div className="flex gap-6 justify-center max-[800px]:grid-cols-2 max-[800px]:grid-rows-2 max-[800px]:grid max-[800px]:gap-2 max-[376px]:grid max-[376px]:grid-cols-1 ">
            {Trending_post_data.map((item, index) => (
              <>
                <div
                  className="flex flex-col justify-center items-center gap-2"
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
        <div className="w-11/12 mt-10 border-t-2 max-[1081px]:p-2 max-[978px]:w-full max-[978px]:p-[10px]">
          <div className="flex flex-col w-full gap-4 p-10 mt-4 max-[1195px]:p-3">
            {post_data.map((item, index) => (
              <>
                <div className="w-full flex gap-4 bg-white shadow-lg shadow-gray-400 justify-center items-center p-4 max-[905px]:px-2 max-[905px]:py-0 max-[724px]:flex-col " key={index}>
                  <div className="w-[560px] h-full relative overflow-hidden max-[724px]:pt-12 max-[622px]:pt-12 flex justify-center max-[622px]:w-[450px] max-[517px]:w-[350px] max-[419px]:w-[300px] max-[376px]:pt-4 max-[364px]:w-[250px]">
                    <Image
                      src={item.img}
                      alt={item.desc}
                      className="transition-transform duration-300 transform hover:scale-110 h-full w-full max-[622px]:w-[450px] max-[622px]:h-[250px] max-[517px]:w-[350px] max-[517px]:h-[150px] max-[419px]:w-full max-[419px]:h-[150px]"
                    ></Image>
                  </div>

                  <div className="w-1/2 h-full py-4 max-[724px]:w-full max-[724px]:px-10 max-[376px]:px-0">
                    <div className="flex flex-col gap-4 px-4 pb-4 max-[1177px]:py-0 max-[889px]:my-4 w-full">
                      <div className="text-2xl font-normal max-[1092px]:text-xl max-[885px]:text-lg">{item.title}</div>
                      <div className="text-[10px] font-bold">{item.date}</div>
                      <div className="text-lg max-[1092px]:text-sm max-[885px]:text-xs">
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
                      <Link href={`/blog/${item.id}`}>
                        <div className="text-xs font-bold bg-[#2967ff] p-2.5 text-white rounded-md tracking-widest w-1/4 text-center border-[#2967ff] border-2  hover:bg-white hover:text-[#2967ff] hover:border-[#2967ff] hover:border-2 transition-all duration-100 max-[987px]:w-[30%] max-[875px]:w-[40%] max-[400px]:w-[50%]">
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
      </div>
    </>
  );
}
