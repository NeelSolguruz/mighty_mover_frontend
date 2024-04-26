"use client";
import React, { useState, useEffect } from "react";
import {
  Trending_post,
  Trending_post_data,
  all_comments,
  blogdata,
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
  login_blog,
  trending_post,
} from "@/assets/Images/imageassets";
import { motion } from "framer-motion";
import {
  Likes_api,
  Trending_post_api,
  comments_api,
  get_indi_blog_api,
} from "@/http/staticTokenService";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import http from "@/http/http";
import { DiAtlassian } from "react-icons/di";
import NavLogo from "@/assets/Images/icons/NavLogo";
export default function IndiviualBlog({ id }: any) {
  const [prevnextid, setprevnextid] = useState(-1);
  const [sidecomment, setsidecomment] = useState(false);
  const [indiblogdata, setindiblogdata] = useState<blogdata>({});
  const [trending_post, settrending_post] = useState<blogdata[]>([]);
  const [likes_indi, setlikes] = useState("");
  const [comments_indi, setcomments] = useState("");
  const [logindata, setlogindata] = useState(false);
  const index = post_data.findIndex(
    (item) => Number(item.id) === Number(id.indiblog)
  );
  console.log(index);
  const prev_next = post_data;

  const individualPageData = post_data.filter((item) => {
    return item.id == id.indiblog;
  });
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
    fetchData();
    fetchTrendingData();
    fetchLikes();
    fetchcomments();
  }, [sidecomment]);

  const fetchLikes = async () => {
    try {
      const response = await Likes_api(id.indiblog);
      setlikes(response.data.data.total_like);
    } catch (error) {
      message_error(error);
    }
  };
  const fetchcomments = async () => {
    try {
      const response = await comments_api(id.indiblog);
      setcomments(response.data.data.total_comment);
    } catch (error) {
      message_error(error);
    }
  };
  const fetchTrendingData = async () => {
    try {
      const response = await Trending_post_api();
      settrending_post(response.data.data);
    } catch (error) {
      message_error(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await get_indi_blog_api(id.indiblog);
      setindiblogdata(response.data.data);
    } catch (error) {
      message_error(error);
    }
  };
  const addlikesorunlikes = async () => {
    const data = localStorage.getItem("data") || null;
    if (data) {
      try {
        const response = await http.get(`/api/v1/blog/like/${id.indiblog}`);
        setlikes(response.data.data.total_like);
        fetchLikes();
      } catch (error) {
        message_error(error);
      }
    } else {
      setlogindata(true);
    }
  };
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
  const handlecomment = () => {
    setsidecomment(!sidecomment);
  };

  return (
    <>
      <div
        className={`w-full flex flex-col justify-center items-center relative 
        `}
      >
        {logindata && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[1000000000000] flex justify-center items-center  "
            
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="fixed bottom-0 left-0 right-0  h-full flex flex-col justify-center items-center w-full rounded-t-2xl "
            >
              <div className="w-[35%] flex flex-col justify-center items-center p-2 gap-4 bg-white py-10 rounded-lg">
                <div className="max-w-[130px] flex justify-center items-center">
                  <NavLogo />
                </div>
                  <div className="w-1/2 rounded-full text-center p-2 shadow-md shadow-gray-400 bg-[#2967ff] text-white font-semibold cursor-pointer">
                <Link href="/register">
                    Please Sign up
                </Link>
                  </div>
                  <div className="w-1/2 rounded-full text-center p-2 shadow-md shadow-gray-400 transition-all duration-300 font-semibold hover:bg-black hover:text-white cursor-pointer">
                <Link href="/login">
                    Already Have an account?
                </Link>
                  </div>
              </div>
            </motion.div>
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className={`w-10/12 flex justify-space between gap-4 mt-4 text-[11px] font-normal flex-wrap max-[564px]:justify-center`}
        >
          {/* <div>{indiblogdata.date}</div> */}
          <div className={`flex gap-1 items-center `}>
            <div>
              <Image src={eye} alt="eye" className="h-3 w-3"></Image>
            </div>
            <div>
              {indiblogdata.views >= 1000 ? (
                <>
                  {(indiblogdata.views / 1000).toFixed(1)}
                  {"K"} {"Views"}
                </>
              ) : (
                <>
                  {indiblogdata.views} {"Views"}
                </>
              )}
            </div>
          </div>
          <div className="flex gap-1 items-center cursor-pointer">
            <div>
              <Image src={comment} alt="comment" className="h-3 w-3"></Image>
            </div>

            <div onClick={handlecomment}>
              {comments_indi} {"Comments"}
            </div>
          </div>
          <div
            className="flex gap-1 items-center cursor-pointer"
            onClick={addlikesorunlikes}
          >
            <div>
              <Image src={Like} alt="like" className="w-3 h-3"></Image>
            </div>
            <div className="">
              {likes_indi} {"Likes"}
            </div>
          </div>
          <div className="flex gap-2">
            <div>{"~ Posted By"}</div>
            <div className="font-bold">{indiblogdata.author_name}</div>
          </div>
        </motion.div>
        <motion.div
          initial={{ translateY: 40, opacity: 0 }}
          whileInView={{ translateY: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-10/12 flex justify-start mt-2.5"
        >
          <Image
            src={indiblogdata.document}
            width={100}
            height={100}
            alt="indi image"
            className="w-[1160px] h-[606px] max-[769px]:h-[350px] max-[426px]:h-[250px]"
          ></Image>
        </motion.div>
        <motion.div
          initial={{ translateY: 40, opacity: 0 }}
          whileInView={{ translateY: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-10/12 flex justify-center items-center mt-10 gap-4"
        >
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
          {/* {indiblogdata.description.ops[]} */}
        </motion.div>
        <motion.div
          initial={{ translateY: 40, opacity: 0 }}
          whileInView={{ translateY: -10, opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-10/12 flex justify-start items-center px-24 mt-[32px] text-start text-[19px] text-[#313131] p-10 max-[769px]:p-3 max-[769px]:text-[14px]"
        >
          {/* {indiblogdata.description.ops[1].insert} */}
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
              {comments_indi}
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
        {/* <motion.div
      initial={{ translateY: -40, opacity: 0 }}
      whileInView={{ translateY: 0, opacity: 1 }}
      transition={{ duration: 1 }}
       className="w-full flex justify-center items-center mb-4">
        <div className="text-base">{some_few_blog}</div>
      </motion.div> */}
        {/* <div className="w-10/12 flex">
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
      </div> */}
        <motion.div
          initial={{ translateY: -40, opacity: 0 }}
          whileInView={{ translateY: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full flex justify-center items-center"
        >
          <div>{Trending_post}</div>
        </motion.div>
        <div className="w-10/12 flex gap-4 justify-center items-center max-[769px]:grid max-[769px]:grid-cols-2 max-[769px]:grid-rows-2 max-[426px]:grid-cols-1 mt-10">
          {trending_post.map((item, index) => (
            <>
              <Link href={`/blog/${item.id}`}>
                <motion.div
                  initial={{ translateY: 40, opacity: 0 }}
                  whileInView={{ translateY: -10, opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="flex flex-col justify-center items-center gap-2 w-full "
                  key={index}
                >
                  <div>
                    <Image
                      src={item.document}
                      alt="image"
                      width={100}
                      height={100}
                      className="w-[268px] h-[200px] "
                    ></Image>
                  </div>
                  <div className="text-center p-2 h-[80px]">{item.title}</div>
                </motion.div>
              </Link>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
