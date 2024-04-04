"use client";
import React, { useState } from "react";
import { Trending_post_data, post_data } from "@/constant/blog";
import Link from "next/link";
import Image from "next/image";
import {
  Like,
  app_store,
  comment,
  eye,
  google_play,
} from "@/assets/Images/imageassets";
export default function IndiviualBlog({ id }: any) {
  const prev_next = post_data;

  const individualPageData = post_data.filter((item) => {
    return item.id == id.indiblog;
  });
  console.log(id.indiblog);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-10/12 flex justify-space between gap-4 mt-4 text-[11px] font-normal ">
        <div>{individualPageData[0].date}</div>
        <div className="flex gap-1 items-center">
          <div>
            <Image src={eye} alt="eye" className="h-3 w-3"></Image>
          </div>
          <div>
            {individualPageData[0].view >= 1000 ? (
              <>
                {(individualPageData[0].view / 1000).toFixed(1)}
                {"K"} {"Views"}
              </>
            ) : (
              <>
                {individualPageData[0].view} {"Views"}
              </>
            )}
          </div>
        </div>
        <div className="flex gap-1 items-center">
          <div>
            <Image src={comment} alt="comment" className="h-3 w-3"></Image>
          </div>
          <div>
            {individualPageData[0].comment} {"Comments"}
          </div>
        </div>
        <div className="flex gap-1 items-center">
          <div>
            <Image src={Like} alt="like" className="w-3 h-3"></Image>
          </div>
          <div>
            {individualPageData[0].like} {"Likes"}
          </div>
        </div>
        <div className="flex gap-2">
          <div>{"~ Posted By"}</div>
          <div className="font-bold">{individualPageData[0].name}</div>
        </div>
      </div>
      <div className="w-10/12 flex justify-start mt-2.5">
        <Image
          src={individualPageData[0].img}
          alt="indi image"
          className="w-[1160px] h-[606px]"
        ></Image>
      </div>
      <div className="w-10/12 flex justify-center items-center mt-10 gap-4">
        <div>
          <Image
            src={google_play}
            alt="googleplay"
            className="w-[200px] h-[65px]"
          ></Image>
        </div>
        <div>
          <Image
            src={app_store}
            alt="app store"
            className="w-[200px] h-[65px]"
          ></Image>
        </div>
      </div>
      <div className="w-10/12 flex justify-center items-center px-24 mt-[32px] italic text-center text-[19px] text-[#313131]">
        {individualPageData[0].desc}
      </div>
      <div className="w-10/12 flex justify-start items-center px-24 mt-[32px] text-start text-[19px] text-[#313131] p-10">
        {individualPageData[0].wholedata}
      </div>
      <div className="w-10/12 flex">
        {/* {id.indiblog == 1 ? (
          <div className="flex gap-4">
            <div className="flex flex-col justify-center items-center">
            <Link href={`/blog/${id.indiblog - 1 + 1}`}>
              
              <div>
                <Image
                  src={prev_next[id.indiblog - 1 + 1]?.img}
                  alt="img"
                ></Image>
              </div>
              </Link>
              <div className="text-sm font-bold text-center">
                {prev_next[id.indiblog - 1 + 1]?.title}
                
              </div>
              <div className="text-[10px] font-normal mt-3">{prev_next[id.indiblog - 1 + 1]?.name}</div>
            </div>
            <div className="flex flex-col justify-center items-center">
            <Link href={`/blog/${id.indiblog - 1 + 2}`}>

              <div>
                <Image
                  src={prev_next[id.indiblog - 1 + 2]?.img}
                  alt="img"
                ></Image>
              </div>
              </Link>
              <div className="text-sm font-bold text-center">
                {prev_next[id.indiblog - 1 + 2]?.title}
                
              </div>
              <div className="text-[10px] font-normal mt-3">{prev_next[id.indiblog - 1 + 2]?.name}</div>
            </div>
          </div>
        ) : id.indiblog == prev_next.length ? (
          <>
              <div className="flex gap-4">
            <div className="flex flex-col justify-center items-center">
            <Link href={`/blog/${id.indiblog - 1 - 1}`}>
              
              <div>
                <Image
                  src={prev_next[id.indiblog - 1 - 1]?.img}
                  alt="img"
                ></Image>
              </div>
              </Link>
              <div className="text-sm font-bold text-center">
                {prev_next[id.indiblog - 1 - 1]?.title}
              
              </div>
              <div className="text-[10px] font-normal mt-3">{prev_next[id.indiblog - 1 - 1]?.name}</div>
            </div>
            <div className="flex flex-col justify-center items-center">
            <Link href={`/blog/${id.indiblog - 1 -2}`}>

              <div>
                <Image
                  src={prev_next[id.indiblog - 1 - 2]?.img}
                  alt="img"
                ></Image>
              </div>
              </Link>
              <div className="text-sm font-bold text-center">
                {prev_next[id.indiblog - 1 - 2]?.title}
              </div>
              <div className="text-[10px] font-normal mt-3">{prev_next[id.indiblog - 1 - 2]?.name}</div>
            </div>
          </div>
          </>
        ) : (
          <>
             <div className="flex gap-4 p-4">
            <div className="flex flex-col justify-center items-center">
              <Link href={`/blog/${id.indiblog - 1 + 1}`}>
              <div>
                
                <Image
                  src={prev_next[id.indiblog - 1 + 1]?.img}
                  alt="img"
                ></Image>
              </div>
              </Link>
              <div className="text-sm font-bold text-center">
                {prev_next[id.indiblog - 1 - 1]?.title}
              </div>
              <div className="text-[10px] font-normal mt-3">{prev_next[id.indiblog - 1 - 1]?.name}</div>
            </div>
            <div className="flex flex-col justify-center items-center">
            <Link href={`/blog/${id.indiblog - 1 + 1}`}>
              <div>
                <Image
                  src={prev_next[id.indiblog - 1 + 1]?.img}
                  alt="img"
                ></Image>
              </div>
              </Link>
              <div className="text-sm font-bold text-center">
                {prev_next[id.indiblog - 1 + 1]?.title}
              </div>
              <div className="text-[10px] font-normal mt-3">{"~ "}{prev_next[id.indiblog - 1 + 1]?.name}</div>
            </div>
          </div>
          </>
        )} */}
      </div>
      <div className="w-10/12 flex gap-4 justify-center items-center">
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
  );
}
