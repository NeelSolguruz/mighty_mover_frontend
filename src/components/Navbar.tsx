"use client";

import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useLayoutEffect, useState } from "react";
import NavLogo from "@/assets/Images/icons/NavLogo";
import { NAVBAR } from "@/constant/constant";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useradd, userlogout } from "@/redux/userSlice";
import { useAppSelector } from "@/redux/hooks";
import http from "@/http/http";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import Loader from "react-js-loader";

export default function Navbar() {
  const [clicked, setClicked] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState(null);
  const [modal, setmodal] = useState(false);
  const localData = localStorage.getItem("data") || null;

  const localUser = localData && JSON.parse(localData);

  const [loading, setLoading] = useState(false);
  const user = useAppSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (localUser) {
      dispatch(useradd(localUser));
    }
  }, [dispatch, localUser, user]);

  const handleClick = () => {
    setClicked(!clicked);
  };

  // useLayoutEffect(() => {
  //   const localToken =
  //     typeof window !== "undefined" ? localStorage.getItem("data") : null;
  //   const token = localToken && JSON.parse(localToken);
  //   if (token) {
  //     dispatch(
  //       useradd({
  //         token: token.token,
  //         firstname: token.user,
  //         email: token.email,
  //       })
  //     );
  //     const fetchdata = async () => {
  //       setLoading(true);
  //       try {
  //         const res = await http.get("/api/v1/user/profile");
  //         setLoading(false);
  //         setUserData(res.data.data);
  //       } catch (error) {
  //         if (axios.isAxiosError(error)) {
  //           const axiosError = error as AxiosError<{
  //             status: number;
  //             message: string;
  //           }>;
  //           if (axiosError.response) {
  //             console.log("Response Error", axiosError.response);
  //             toast.error(axiosError.response.data.message);
  //           } else if (axiosError.request) {
  //             console.log("Request Error", axiosError.request);
  //           } else {
  //             console.log("Error", axiosError.message);
  //           }
  //         }
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     fetchdata();
  //   }
  // }, [dispatch]);
  const clearstorage = async() => {
    try{

      const logout_data=await http.get("/api/v1/user/logout")
      toast.success(logout_data.data.message)
          dispatch(userlogout());

        // .then(() => {
        //   dispatch(userlogout());
        //   openmodal();
        // })
        // .catch((error) => {
        //   console.error("Logout error:", error);
        // });
    }
    catch(error){
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
  const handleClose = () => {
    setClicked(false);
  };
  const openmodal = () => {
    setmodal(!modal);
  };

  return (
    <>
      {loading ? (
        <div className="flex w-full h-lvh justify-center items-center">
          <Loader
            type="spinner-default"
            bgColor={"#2967ff"}
            color={"#2967ff"}
            size={100}
          />
        </div>
      ) : (
        <div
          className={`sticky top-0 flex shadow-md  border-2 w-full  h-16 items-center  justify-between bg-white text-zinc-900 z-10 `}
        >
          <div className="ml-10 max-md:ml-2">
            <Link href="/">
              <div className="w-[130px]">
                <NavLogo />
              </div>
            </Link>
          </div>

          <div className="flex mr-12 gap-10 text-base max-lg:hidden">
            {NAVBAR.LAPTOP.map((item, index) => (
              <Link key={index} href={item.url} className={item.class}>
                {item.text}
              </Link>
            ))}
          </div>

          <div className="flex justify-center max-lg:hidden w-1/12">
            {user.email ? (
              <div className="flex gap-2 justify-end items-center w-full">
                <div
                  className="bg-[#2967ff] text-white rounded-full h-[40px] w-[40px] flex justify-center items-center"
                  onClick={openmodal}
                >
                  {user.user}
                </div>
                <div
                  className="border border-red-600 rounded-lg p-3 w-auto h-full flex justify-center items-center bg-red-100text-white mr-2"
                  onClick={clearstorage}
                >
                  <BiLogOut className="text-red-600 font-bold" />
                </div>
              </div>
            ) : (
              <Link href="/login">
                <FaUserCircle className="size-10 hover:text-[#2967ff] hover:scale-125 transition-all" />
              </Link>
            )}
            {/* <div>
            <Link href='/register'><button className="bg-[#2967ff] p-3 rounded-lg text-white font-semibold transition duration-300 hover:bg-blue-500 hover:scale-105">Get Started</button></Link>
          </div> */}
          </div>

          {/* side panel */}

          <div className="max-lg:block hidden w-16 text-center mr-3 max-sm:mr-0">
            <button onClick={handleClick}>
              <IoMenu className={`${clicked ? "hidden" : "block"} text-3xl`} />
            </button>
          </div>

          <div
            className={`${clicked ? "hidden max-lg:block mt-64" : "hidden"}`}
          >
            <div
              className={`${
                clicked ? "block" : "hidden"
              } text-3xl w-full h-full max-sm:text-2xl`}
            >
              <div className="flex flex-col bg-white items-end p-2 shadow-md rounded-xl max-sm:text-lg">
                <button onClick={handleClose}>
                  <RxCross2 className="text-4xl" />
                </button>
                {NAVBAR.MOBILE.map((item, index) => (
                  <Link
                    key={index}
                    href={item.url}
                    className={item.class}
                    onClick={handleClose}
                  >
                    {item.text}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
