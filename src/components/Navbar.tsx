"use client"
import Link from "next/link";
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

  const handleClose = () => {
    setClicked(false);
  };

  return (
    <>
      <div className={`sticky top-0 flex shadow-md  border-2 w-full  h-16 items-center  justify-between bg-white text-zinc-900 z-10 `}>
        <div className="p-2">
          <Link href="/">
            <BrandLogo />
          </Link>
        </div>
        <div className="text-base flex gap-10 max-md:hidden">
          <Link
            href="/enterprise"
            className="hover:text-blue-500 hover:duration-300  text-black font-bold"
          >
            For Enterprise
          </Link>
          <Link
            href="/delivery-partner"
            className="hover:text-blue-500 duration-300  text-black font-bold"
          >
            Delivery Partners
          </Link>
          <Link
            href="/support"
            className=" font-bold hover:text-blue-500 duration-500"
          >
            Support
          </Link>
        </div>
        <div className="max-md:hidden" title="Sign Up?">
          <Link href="/login">
            <FaUserCircle
              className="w-16 h-8 hover:text-blue-500 hover:scale-105 transition-all"
            />
          </Link>
        </div>

        {/* side panel */}

        <div className="max-md:block hidden">
          <button onClick={handleClick}>
            <IoMenu className={`${clicked ? "hidden" : "block"} text-3xl mr-2`} />
          </button>
        </div>

        <div className="hidden max-md:block mt-64">
          <div className={`${clicked ? "block" : "hidden"} text-3xl w-full h-full max-sm:text-2xl`}>
            <div className="flex flex-col bg-white items-end p-2 shadow-md rounded-xl">
              <button onClick={handleClose}>
                <RxCross2 className="text-4xl" />
              </button>
              <Link
                onClick={handleClose}
                href="/"
                className="p-2 hover:text-blue-500 duration-300"
              >
                Home
              </Link>
              <Link
                onClick={handleClose}
                href="/enterprise"
                className="p-2 hover:text-blue-500 duration-300"
              >
                For Enterprise
              </Link>
              <Link
                onClick={handleClose}
                href="/delivery-partner"
                className="p-2 hover:text-blue-500 duration-300 "
              >
                Delivery Partner
              </Link>
              <Link
                onClick={handleClose}
                href="/support"
                className="p-2 hover:text-blue-500 duration-300"
              >
                Support
              </Link>
              <Link
                onClick={handleClose}
                href="/login"
                className=" bg-black text-white w-fit p-4 rounded-xl hover:bg-blue-600 hover:scale-105  duration-300"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
