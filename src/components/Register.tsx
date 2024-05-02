"use client";
import LoginLogo from "@/assets/Images/icons/LoginLogo";
import NavLogo from "@/assets/Images/icons/NavLogo";
import { SIGNUP } from "@/constant/constant";
import http from "@/http/http";
import { authregister } from "@/http/staticTokenService";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loader from "react-js-loader";
import { toast } from "sonner";
import login_image from "../assets/Images/icons/login_image.svg";
import Image from "next/image";


export default function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [contactno, setContactno] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setComfirmpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const resetform = () => {
    setFirstname("");
    setLastname("");
    setEmail("");
    setContactno("");
    setPassword("");
    setComfirmpassword("");
  };

  const handlesubmit = async () => {
    setLoading(true);
    let result = {
      first_name: firstname,
      last_name: lastname,
      email: email,
      contact: contactno,
      password: password,
    };
    console.log(result);
    try {
      const user_details_register = await authregister(result);
      toast.success(user_details_register.data.message);
      setLoading(false);
      router.push("/login", { scroll: false });
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
      resetform();
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
        <>
            <div className="h-screen flex items-center bg-[#e5edff] overflow-hidden">
            <div className="flex justify-center items-center w-full">
              <div className="w-full scale-[0.8] bg-white shadow-2xl shadow-gray-400 rounded-lg">
                <div className="grid grid-cols-2 max-lg:block">
                  <div className="w-full flex justify-center">
                    <div className="flex flex-col gap-2 max-lg:gap-4 max-md:gap-6 p-6 items-center w-11/12 max-lg:p-6 max-lg:w-full">
                      <div className="w-[180px] max-md:w-[140px]">
                        <NavLogo />
                      </div>
                      <div className="w-full">
                        <div className="flex flex-col items-center">
                          <h1 className="text-3xl font-bold max-md:text-2xl">{SIGNUP.title}</h1>
                          <h3 className="text-lg max-[368px]:text-base">
                            {SIGNUP.tagline}
                          </h3>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 w-11/12">
                        <div className="flex justify-between w-full max-md:flex-col">
                          <div className="w-[48%] max-md:w-full">
                            <label htmlFor="firstname" className="font-bold text-lg max:md-text-base">
                              First Name
                            </label>
                            <input
                              type="text"
                              id="firstname"
                              name="firstname"
                              value={firstname}
                              placeholder="Enter your first name"
                              className="p-2 text-lg max-md:text-base max-md:p-1 w-full border border-gray-300 transition duration-300 hover:border-black rounded-md focus:outline-blue-600"
                              onChange={(e) => setFirstname(e.target.value)}
                            />
                          </div>
                          <div className="w-[48%] max-md:w-full">
                            <label htmlFor="lastname" className="font-bold text-lg max-md:text-base">
                              Last Name
                            </label>
                            <input
                              type="text"
                              id="lastname"
                              name="lastname"
                              value={lastname}
                              placeholder="Enter your last name"
                              className="p-2 text-lg max-md:text-base max-md:p-1 w-full border border-gray-300 transition duration-300 hover:border-black rounded-md focus:outline-blue-600"
                              onChange={(e) => setLastname(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col w-full gap-2">
                          <div className="w-full">
                            <label htmlFor="email" className="font-bold text-lg max-md:text-base">
                              Email Address
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={email}
                              placeholder="Enter your email address"
                              className="p-2 text-lg max-md:text-base max-md:p-1 w-full border border-gray-300 transition duration-300 hover:border-black rounded-md focus:outline-blue-600"
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                          <div className="w-full">
                            <label htmlFor="number" className="font-bold text-lg max-md:text-base">
                              Contact Number
                            </label>
                            <input
                              type="text"
                              id="number"
                              name="contact"
                              value={contactno}
                              placeholder="Enter your contact number"
                              className="p-2 text-lg max-md:text-base max-md:p-1 w-full border border-gray-300 transition duration-300 hover:border-black rounded-md focus:outline-blue-600"
                              onChange={(e) => setContactno(e.target.value)}
                            />
                          </div>
                          <div className="w-full">
                            <div className="flex justify-between">
                              <label htmlFor="password" className="font-bold text-lg max-md:text-base">
                                Password
                              </label>
                            </div>
                            <input
                              type="password"
                              id="password"
                              name="password"
                              value={password}
                              placeholder="Enter your password"
                              className="p-2 text-lg max-md:text-base max-md:p-1 w-full border border-gray-300 transition duration-300 hover:border-black rounded-md focus:outline-blue-600"
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>
                          <div className="w-full">
                            <div className="flex justify-between">
                              <label htmlFor="cpassword" className="font-bold text-lg max-md:text-base">
                                Confirm Password
                              </label>
                            </div>
                            <input
                              type="password"
                              id="cpassword"
                              name="cpassword"
                              value={confirmpassword}
                              placeholder="Re-Enter your password"
                              className="p-2 text-lg max-md:text-base max-md:p-1 w-full border border-gray-300 transition duration-300 hover:border-black rounded-md focus:outline-blue-600"
                              onChange={(e) => setComfirmpassword(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="w-full flex flex-col gap-1 items-center">
                          <button
                            className="bg-[#2967ff] text-white w-full p-2 max-md:p-1 text-lg rounded-md font-bold hover:bg-blue-500 transition-all"
                            onClick={handlesubmit}
                          >
                            Create Account
                          </button>
                          <p className="font-bold text-gray-400">
                            Already have an account?{" "}
                            <Link href="/login" className="text-blue-600">
                              Sign In
                            </Link>
                          </p>
                        </div>
                      </div>
                      <div>
                      </div>
                    </div>
                  </div>
                  <div className="max-lg:hidden">
                    <Image src={login_image} alt="sign up image" className="object-cover w-full h-full rounded-r-lg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

