"use client";
import NavLogo from "@/assets/Images/icons/NavLogo";
import http from "@/http/http";
import axios, { AxiosError } from "axios";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Loader from "react-js-loader";
import { useDispatch } from "react-redux";
import { update_name } from "@/redux/userSlice";

export default function ProfilePage() {
  const [user_data, setuserdata] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [firstname, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await http.get("/api/v1/user/profile");
        setuserdata(response.data.data);
        setName(response.data.data.first_name);
        setLastName(response.data.data.last_name);
        setEmail(response.data.data.email);
        setContact(response.data.data.contact);

        setLoading(false);
      } catch (error) {
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
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlesubmit = async (e: any) => {
    e.preventDefault();
    try {
      const patch_data = await http.patch("/api/v1/user/profile", {
        firstname,
        lastname,
        contact,
      });
      dispatch(update_name(firstname))
      toast.success(patch_data.data.message);
    } catch (error) {
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
        <div className="w-full h-screen flex flex-col items-center gap-6 p-4 ">
          <div className="flex justify-center items-center gap-4 h-full w-full pb-4">
            <div className="bg-white h-auto rounded-lg shadow-lg shadow-gray-400 w-1/2 p-4 flex flex-col gap-4">
              <div className="h-full flex justify-between items-center w-full">
                <div className="w-[15%] h-[90px] bg-gray-300 text-white font-bold rounded-full flex justify-center items-center text-4xl">
                  {firstname.charAt(0).toUpperCase()}
                </div>
                <div className="w-[180px]">
                  <NavLogo />
                </div>
              </div>
              <form className="flex flex-col gap-4" onSubmit={handlesubmit}>
                <div className="flex w-full gap-4">
                  <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="user" className="font-bold text-lg">
                      First name
                    </label>
                    <input
                      type="text"
                      id="fname"
                      placeholder="Enter your first name"
                      className="p-3 w-full border border-gray-400 text-lg rounded-md
                  
                    "
                      value={firstname}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="user" className="font-bold text-lg">
                      Last name
                    </label>
                    <input
                      type="text"
                      id="lname"
                      placeholder="Enter your last name"
                      value={lastname}
                      className="p-3 w-full border border-gray-400 text-lg rounded-md
                  
                    "
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1 w-full ">
                  <label htmlFor="user" className="font-bold text-lg">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="username"
                    value={email}
                    placeholder="Enter your email address"
                    className="p-3 w-full border border-gray-400 text-lg rounded-md hover:cursor-not-allowed
                
                   
            "
                    disabled
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="user" className="font-bold text-lg">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    id="mobileno"
                    value={contact}
                    placeholder="Enter your Mobile Number"
                    className="p-3 w-full border border-gray-400 text-lg rounded-md"
                    onChange={(e) => setContact(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <button
                    className="w-full border-2 border-[#2967ff] p-3 rounded-md font-bold  text-xl text-white bg-[#2967ff]"
                    type="submit"
                  >
                    Update Details
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
