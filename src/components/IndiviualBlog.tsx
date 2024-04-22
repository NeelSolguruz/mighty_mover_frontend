"use client";
import React, { useState, useEffect } from "react";
import {
  Trending_post,
  Trending_post_data,
  all_comments,
  comment_comment,
  post_data,
  some_few_blog,
} from "@/constant/blog";
import { useAnimationControls } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Like,
  app_store,
  arrow_left,
  arrow_right,
  comment,
  cross,
  eye,
  google_play,
  trending_post,
} from "@/assets/Images/imageassets";
import { motion } from "framer-motion";
export default function IndiviualBlog({ id }: any) {
  const [prevnextid, setprevnextid] = useState(-1);
  const [sidecomment, setsidecomment] = useState(false);
  const index = post_data.findIndex(
    (item) => Number(item.id) === Number(id.indiblog)
  );
  console.log(index);
  const prev_next = post_data;

  const individualPageData = post_data.filter((item) => {
    return item.id == id.indiblog;
  });
  console.log(id.indiblog);
  const containerVariants = {
    close: {
      x: "400px",
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
    if (sidecomment) {
      containerControls.start("open");
    } else {
      containerControls.start("close");
    }
  }, [sidecomment]);

  const handlecomment = () => {
     
    setsidecomment(!sidecomment);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-10/12 flex justify-space between gap-4 mt-4 text-[11px] font-normal flex-wrap max-[564px]:justify-center"
      >
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

          <div onClick={handlecomment} className="cursor-pointer">
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
      </motion.div>
      <motion.div
        initial={{ translateY: 40, opacity: 0 }}
        whileInView={{ translateY: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-10/12 flex justify-start mt-2.5"
      >
        <Image
          src={individualPageData[0].img}
          alt="indi image"
          className="w-[1160px] h-[606px] max-[769px]:h-[350px] max-[426px]:h-[250px]"
        ></Image>
      </motion.div>
      <motion.div
      initial={{ translateY: 40, opacity: 0 }}
      whileInView={{ translateY: 0, opacity: 1 }}
      transition={{ duration: 1 }}
       className="w-10/12 flex justify-center items-center mt-10 gap-4">
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
      </motion.div>
      <motion.div
        initial={{ translateY: 40, opacity: 0 }}
        whileInView={{ translateY: -10, opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-10/12 flex justify-center items-center px-24 mt-[32px] italic text-center text-[19px] text-[#313131] max-[769px]:px-10 max-[426px]:px-4 max-[426px]:text-[15px]"
      >
        {individualPageData[0].desc}
      </motion.div>
      <motion.div
        initial={{ translateY: 40, opacity: 0 }}
        whileInView={{ translateY: -10, opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-10/12 flex justify-start items-center px-24 mt-[32px] text-start text-[19px] text-[#313131] p-10 max-[769px]:p-3 max-[769px]:text-[14px]"
      >
        {individualPageData[0].wholedata}
      </motion.div>
      <motion.div
        variants={containerVariants}
        initial="close"
        animate={containerControls}
        className="w-[400px] flex-col gap-4 justify-center bg-white fixed h-lvh top-0 right-0 z-[10000000] overflow-y-auto"
      >
        <div className="flex justify-between mx-4 mt-4 text-xl font-semibold">
          <div>
            Responses {"("}
            {post_data[index].comment}
            {")"}
          </div>
          <div onClick={handlecomment} className="cursor-pointer">
            <Image src={cross} alt="cross"></Image>
          </div>
        </div>
        <div>
          <div className="flex gap-4 h-auto justify-start px-4 mt-5 w-full items-center ">
            <div className="w-[80%]">
              <input
                type="text"
                placeholder="What are your thoughts?"
                className="rounded-md text-black w-full p-2 shadow-sm shadow-gray-400 placeholder:text-sm"
              ></input>
            </div>
            <div className="bg-white w-[17%] rounded-md flex justify-center items-center shadow-md shadow-gray-400 p-2">
              <button>
                <Image src={arrow_right} alt="arrow left"></Image>
              </button>
            </div>
          </div>
          <div className="flex justify-between mx-4 mt-4 text-xl font-semibold">
            {comment_comment}
          </div>
          <div className="flex flex-col w-full m-2 justify-center mt-4 text-xl font-semibold">
            {all_comments.map((item) => (
              <>
                <div className="flex flex-col w-11/12 m-2.5 shadow-sm shadow-gray-400 gap-2 p-4 rounded-md">
                  <div className="flex w-full gap-2">
                    <div className="rounded-full bg-gray-300 text-black uppercase px-4 text-sm flex items-center font-bold">
                      {item.user.substring(0, 1)}
                    </div>
                    <div className="capitalize flex-col gap-0.5 w-full font-bold tracking-wide">
                      <div>{item.user}</div>
                      <div className="w-full flex text-xs justify-start text-gray-600 ">
                        {item.date}
                      </div>
                    </div>
                  </div>
                  <div className="w-full px-1 text-[14px] text-normal my-2 text-left font-normal ">
                    {item.comment}
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </motion.div>
      <motion.div
      initial={{ translateY: -40, opacity: 0 }}
      whileInView={{ translateY: 0, opacity: 1 }}
      transition={{ duration: 1 }}
       className="w-full flex justify-center items-center mb-4">
        <div className="text-base">{some_few_blog}</div>
      </motion.div>
      <div className="w-10/12 flex">
        {index == 0 ? (
          <div className="flex gap-4">
            <motion.div
              initial={{ translateX: -40, opacity: 0 }}
              whileInView={{ translateX: 0, opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="flex flex-col justify-center items-center"
            >
              <Link href={`/blog/${index + 1}`}>
                <div>
                  <Image src={prev_next[index + 1]?.img} alt="img"></Image>
                </div>
              </Link>
              <div className="text-sm font-bold text-center max-[595px]:text-xs ">
                {prev_next[index + 1]?.title}
              </div>
              <div className="text-[10px] font-normal mt-3">
                {"~ "}
                {prev_next[index + 1]?.name}
              </div>
            </motion.div>
            <motion.div
               initial={{ translateX: 40, opacity: 0 }}
               whileInView={{ translateX: 0, opacity: 1 }}
               transition={{ duration: 1.5 }}
              className="flex flex-col justify-center items-center"
            >
              <Link href={`/blog/${index + 2}`}>
                <div>
                  <Image src={prev_next[index + 2]?.img} alt="img"></Image>
                </div>
              </Link>
              <div className="text-sm font-bold text-center max-[595px]:text-xs ">
                {prev_next[index + 2]?.title}
              </div>
              <div className="text-[10px] font-normal mt-3">
                {"~ "}
                {prev_next[index + 2]?.name}
              </div>
            </motion.div>
          </div>
        ) : index + 1 == prev_next.length ? (
          <>
            <div className="flex gap-4">
              <motion.div
                initial={{ translateX: -40, opacity: 0 }}
                whileInView={{ translateX: 0, opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="flex flex-col justify-center items-center"
              >
                <Link href={`/blog/${index - 1}`}>
                  <div>
                    <Image src={prev_next[index - 1]?.img} alt="img"></Image>
                  </div>
                </Link>
                <div className="text-sm font-bold text-center max-[595px]:text-xs ">
                  {prev_next[index - 2]?.title}
                </div>
                <div className="text-[10px] font-normal mt-3">
                  {"~ "}
                  {prev_next[index - 1]?.name}
                </div>
              </motion.div>
              <motion.div
                 initial={{ translateX: 40, opacity: 0 }}
                 whileInView={{ translateX: 0, opacity: 1 }}
                 transition={{ duration: 1.5 }}
                className="flex flex-col justify-center items-center"
              >
                <Link href={`/blog/${index - 2}`}>
                  <div>
                    <Image src={prev_next[index - 2]?.img} alt="img"></Image>
                  </div>
                </Link>
                <div className="text-sm font-bold text-center max-[595px]:text-xs ">
                  {prev_next[index - 1]?.title}
                </div>
                <div className="text-[10px] font-normal mt-3">
                  {"~ "}
                  {prev_next[index - 2]?.name}
                </div>
              </motion.div>
            </div>
          </>
        ) : (
          <>
            <div className="flex gap-4 p-4">
              <motion.div
                initial={{ translateX: -40, opacity: 0 }}
                whileInView={{ translateX: 0, opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="flex flex-col justify-center items-center"
              >
                <Link href={`/blog/${index + 1}`}>
                  <div>
                    <Image src={prev_next[index + 1]?.img} alt="img"></Image>
                  </div>
                </Link>
                <div className="text-sm font-bold text-center max-[595px]:text-xs ">
                  {prev_next[index - 1]?.title}
                </div>
                <div className="text-[10px] font-normal mt-3">
                  {"~ "}
                  {prev_next[index - 1]?.name}
                </div>
              </motion.div>
              <motion.div
                 initial={{ translateX: 40, opacity: 0 }}
                 whileInView={{ translateX: 0, opacity: 1 }}
                 transition={{ duration: 1.5 }}
                className="flex flex-col justify-center items-center"
              >
                <Link href={`/blog/${index + 1}`}>
                  <div>
                    <Image src={prev_next[index + 1]?.img} alt="img"></Image>
                  </div>
                </Link>
                <div className="text-sm font-bold text-center max-[595px]:text-xs ">
                  {prev_next[index + 1]?.title}
                </div>
                <div className="text-[10px] font-normal mt-3">
                  {"~ "}

                  {prev_next[index + 1]?.name}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </div>
      <motion.div
      initial={{ translateY: -40, opacity: 0 }}
      whileInView={{ translateY: 0, opacity: 1 }}
      transition={{ duration: 1 }}
       className="w-full flex justify-center items-center">
        <div>{Trending_post}</div>
      </motion.div>
      <div className="w-10/12 flex gap-4 justify-center items-center max-[769px]:grid max-[769px]:grid-cols-2 max-[769px]:grid-rows-2 max-[426px]:grid-cols-1 mt-10">
        {Trending_post_data.map((item, index) => (
          <>
            <motion.div
              initial={{ translateY: 40, opacity: 0 }}
              whileInView={{ translateY: -10, opacity: 1 }}
              transition={{ duration: 1 }}
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
            </motion.div>
          </>
        ))}
      </div>
    </div>
  );
}
