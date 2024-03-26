"use client"
import Link from "next/link"
import Image from "next/image"
import brand_logo from "../assets/images/Union.svg"
import { FaUserCircle } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";


import { useState } from "react";

export default function Navbar() {

  const [clicked, setClicked] = useState<boolean>(false)
  const handleClick = () => {
    setClicked(!clicked)
  }
  return (
    <>
      <div className="sticky  flex shadow-2xl  border-2 w-full  h-16 items-center  justify-between bg-white text-zinc-900 
        z-10
        ">
        <div className="p-2">
          <Link href='/'><Image src={brand_logo} width={70} alt="logo" /></Link>
        </div>
        <div className="text-xl flex gap-10
          max-md:hidden
          ">
          <Link href="/enterprise" className=" hover:text-yellow-500 
            hover:duration-300
            text-md text-black font-bold">For Enterprise</Link>
          <Link href="/deliveryPartner" className=" hover:text-yellow-500 duration-300 text-md text-black
            font-bold">Delivery Partners</Link>
          <Link href="/support" className="text-md font-bold
             hover:text-yellow-500 duration-500
             ">Support</Link>
        </div>
        <div className="
          max-md:hidden
          " 
          title="Sign Up?">
          <Link href='/login-or-sign-up'>
            <FaUserCircle
              className="w-16 h-8 
            hover:text-yellow-500
            hover:scale-150 transition-all
            "
            />
          </Link>
        </div>

        {/* side panel */}
        <div className="justify-center
          max-md:flex
          hidden
          
          ">
          <button onClick={handleClick}>
            {clicked ? (
              <RxCross2 className="text-3xl mr-2" />
            ) : (
              <IoMenu className="text-3xl mr-2" />
            )}
          </button>
        </div>

      </div>
      <div className={
        `${clicked ? ('flex') : ('hidden')} h-auto text-3xl text-black bg-white
          md:hidden
          flex flex-col
          gap-5
          p-4
          font-bold
          `
      }>
        <Link href="/enterprise" className="hover:text-yellow-400 duration-300">For Enterprise</Link>
        <Link href="/deliveryPartner" className="hover:text-yellow-400 duration-300">Delivery Partner</Link>
        <Link href="/support" className="hover:text-yellow-400 duration-300">Support</Link>
        <Link href="/login-or-sign-up" className=" bg-yellow-400 w-fit p-2 rounded-xl
            hover:text-white hover:bg-black hover:scale-105  duration-300
            " >Sign Up</Link>
      </div>
    </>
  )
}

