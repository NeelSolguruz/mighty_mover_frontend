"use client";
import Link from "next/link";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

import { useState } from "react";
import { BrandLogo, porter_logo } from "../assets/Images/imageassets";

export default function Navbar() {
  const [clicked, setClicked] = useState<boolean>(false);
  const handleClick = () => {
    setClicked(!clicked);
  };
  return (
    <>
      <div
        className="flex overflow-hidden shadow-md  border-2 w-full  h-16 items-center  justify-between bg-white text-zinc-900 
        z-10
        "
      >
        <div className="py-4 pl-10">
          <Link href="/">
            {/* <Image src={"#"} alt="porter logo" className="h-10 w-24"> */}
            <BrandLogo />
            {/* </Image> */}
          </Link>
        </div>
        <div
          className="text-base flex gap-10
          max-md:hidden
          "
        >
          <Link
            href="/enterprise"
            className=" hover:text-yellow-500 
            hover:duration-300
            text-md text-black font-bold"
          >
            For Enterprise
          </Link>
          <Link
            href="/delivery-partner"
            className=" hover:text-yellow-500 duration-300 text-md text-black
            font-bold"
          >
            Delivery Partners
          </Link>
          <Link
            href="/support"
            className="text-md font-bold
             hover:text-yellow-500 duration-500
             "
          >
            Support
          </Link>
        </div>
        <div
          className="
          max-md:hidden
          "
          title="Sign Up?"
        >
          <Link href="/login">
            <FaUserCircle
              className="w-16 h-8 
            hover:text-yellow-500
            hover:scale-150 transition-all
            "
            />
          </Link>
        </div>

        {/* side panel */}
        <div
          className="justify-center
          max-md:flex
          hidden
          
          "
        >
          <button onClick={handleClick}>
            {clicked ? (
              <RxCross2 className="text-3xl mr-2" />
            ) : (
              <IoMenu className="text-3xl mr-2" />
            )}
          </button>
        </div>
      </div>
      <div
        className={`${
          clicked ? "flex" : "hidden"
        } h-auto text-3xl text-black bg-white
          md:hidden
          flex flex-col
          gap-5
          p-4
          font-bold
          `}
      >
        <Link
          href="/enterprise"
          className="p-2 hover:text-yellow-500 duration-300 "
        >
          For Enterprise
        </Link>
        <Link
          href="/delivery-partner"
          className="p-2 hover:text-yellow-500 duration-300"
        >
          Delivery Partner
        </Link>
        <Link
          href="/support"
          className="p-2 hover:text-yellow-500 duration-300"
        >
          Support
        </Link>
        <Link
          href="/login"
          className=" bg-yellow-400 w-fit p-4 rounded-xl
         hover:text-white hover:bg-black hover:scale-105  duration-300
          "
        >
          Sign Up
        </Link>
      </div>
    </>
  );
}
