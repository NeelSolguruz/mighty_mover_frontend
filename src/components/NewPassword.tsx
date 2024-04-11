"use client"
import NavLogo from "@/assets/Images/icons/NavLogo";
import React, { useState } from "react";
import { toast } from "sonner";

export default function NewPassword({ id }: any) {
    const [password,setpassword]=useState("")
    const [cpassword,setcpassword]=useState("")

    const handlesubmit=async()=>{
       if (password===cpassword){
            // try{

            // const response=await new_password_api(password,id)
            // }
       }
       else{
        toast.error("Please Enter Same Password In Both Fields")
       }

    }
  return (
    <div className="w-full flex justify-center py-16">
    <div
      className="flex flex-col items-center gap-10 py-10 w-5/12
            max-lg:w-8/12
            max-sm:w-11/12
            "
    >
      <div
        className="w-[180px]
                max-sm:w-[150px]
                "
      >
        <NavLogo />
      </div>
      <div className="w-full flex justify-center">
      </div>
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="user" className="font-bold text-lg">
          New Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e)=>setpassword(e.target.value)}
          placeholder="Enter your New Password"
          className="p-3 w-full border border-gray-400 text-lg rounded-md
                "
        />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="user" className="font-bold text-lg">
         Confirm Password
        </label>
        <input
          type="password"
          id="cpassword"
          value={cpassword}
          onChange={(e)=>setcpassword(e.target.value)}
          placeholder="Confirm your Password"
          className="p-3 w-full border border-gray-400 text-lg rounded-md
                "
        />
      </div>
      <div className="w-full" onClick={handlesubmit} >
        <button className="bg-[#2967ff] text-white w-full p-3 rounded-md font-bold hover:bg-blue-500 transition-all text-xl">
          Submit
        </button>
      </div>
    </div>
  </div>
  );
}
