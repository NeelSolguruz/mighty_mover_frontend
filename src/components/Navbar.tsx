"use client"
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { BrandLogo, porter_logo } from "../assets/Images/imageassets";
import { NAVBAR } from "@/constant/constant";

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
        <div className="text-xl flex gap-10 max-md:hidden">
          {NAVBAR.LAPTOP.map((item, index) => (
            <Link key={index} href={item.url} className={item.class}>
              {item.text}
            </Link>
          ))}
        </div>
        <div className="max-md:hidden" title="Log in/ Sign up">
          <Link href="/login">
            <FaUserCircle
              className="w-20 size-10 hover:text-blue-500 hover:scale-105 transition-all"
            />
          </Link>
        </div>

        {/* side panel */}

        <div className="max-md:block hidden w-16 text-center">
          <button onClick={handleClick}>
            <IoMenu className={`${clicked ? "hidden" : "block"} text-3xl`} />
          </button>
        </div>

        <div className={`${clicked ? "hidden max-md:block mt-64" : "hidden"}`} >
          <div className={`${clicked ? "block" : "hidden"} text-3xl w-full h-full max-sm:text-2xl`}>
            <div className="flex flex-col bg-white items-end p-2 shadow-md rounded-xl max-sm:text-lg">
              <button onClick={handleClose}>
                <RxCross2 className="text-4xl" />
              </button>
              {NAVBAR.MOBILE.map((item, index) => (
                <Link key={index} href={item.url} className={item.class} onClick={handleClose}>
                  {item.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
