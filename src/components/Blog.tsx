"use client";
import { facebook, search } from "@/assets/Images/imageassets";
import {
  BOOK_PORTER,
  PORTER_BLOG,
  Porter_Home,
  blog_social_media,
} from "@/constant/blog";
import Image from "next/image";
import React from "react";
import { useState } from "react";
export default function Blog() {
 
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-11/12 flex justify-between items-center mt-10 p-6 border-y-2">
          <div className="flex gap-2 justify-center items-center w-[196px]">
            {blog_social_media.map((item) => (
              <>
                <div key={item.name}>
                  <Image
                    src={item.img}
                    alt={item.name}
                    className="h-[20px] w-[20px]"
                  />
                </div>
              </>
            ))}
          </div>
          <div className="text-[32px] font-normal w-auto">{PORTER_BLOG}</div>
          <div className="w-[196px] h-[32px] flex justify-center items-center">
            <div>
              <Image src={search} alt="search button "></Image>
            </div>
          </div>
        </div>
        <div className="w-11/12 flex justify-center items-center p-6 border-t-[1px] border-b-[2px] gap-4">
          <div className="text-base font-bold ">{Porter_Home}</div>
          <div className="text-base font-bold ">{BOOK_PORTER}</div>
        </div>
        
      </div>
    </>
  );
}
