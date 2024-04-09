"use client";
import { SetStateAction, useState } from "react";
import { LOGIN } from "@/constant/constant";
import Link from "next/link";
import http from "@/http/http";
import { authLogin } from "@/http/staticTokenService";
import axios, { AxiosError } from "axios";
import Loader from "react-js-loader";
import { useRouter } from 'next/navigation'
import NavLogo from "@/assets/Images/icons/NavLogo";
export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setEmailError("");
    setPasswordError("");
  };

  const validateEmail = (value: string | any) => {
    if (!value.trim()) {
      setEmailError("Email is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      setEmailError("Invalid email address");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };


  const handleEmailChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  const handlePasswordChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setPassword(e.target.value);
    // validatePassword(e.target.value);
  };

  const handleSubmit = async(e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authLogin({ email, password });
      router.push('/', { scroll: false })
      console.log('Login successful');

    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          console.log("Response Error", axiosError.response);
        } else if (axiosError.request) {
          console.log("Request Error", axiosError.request);
        } else {
          console.log("Error", axiosError.message);
        }
      }
    } finally {
      router.push('/', { scroll: false })
      setLoading(false);
      resetForm();
    }

  };

  return (
    <>
    {
      loading?(
        
        <div className="flex w-full h-lvh justify-center items-center">
          <Loader type="spinner-default" bgColor={"#2967ff"} color={"#2967ff"}  size={100} />
        </div>
      ):(
      
        <>
         <div className="w-full flex justify-center">
        <div className="flex flex-col items-center gap-10 py-10 w-5/12 max-lg:w-8/12 max-sm:w-11/12">
          <div className="w-[180px]">
           <NavLogo/>
          </div>
          <div className="w-full">
            <div>
              <h1 className="text-4xl font-bold">{LOGIN.sign_in}</h1>
            </div>
            <div>
              <h3 className="text-2xl font-semibold">{LOGIN.tagline}</h3>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-10">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="user" className="font-bold text-lg">
                {LOGIN.email_label}
              </label>
              <input
                type="text"
                id="username"
                placeholder="Enter your email address"
                className={`p-3 w-full border transition-all border-gray-400 hover:border-black text-lg rounded-md focus:outline-2 focus:outline-blue-500
                                ${emailError ? " border-red-500" : ""}`}
                value={email}
                onChange={handleEmailChange}
              />
              <p
                className={`text-red-500 transition-all ${
                  emailError ? "opacity-100" : "opacity-0"
                }`}
              >
                {emailError}
              </p>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <div className="flex justify-between">
                <label htmlFor="password" className="font-bold text-lg">
                  {LOGIN.password_label}
                </label>
                <Link
                  href={LOGIN.forgot_link}
                  className="font-semibold text-blue-500 hover:text-blue-400 transition-all"
                >
                  {LOGIN.forgot_text}
                </Link>
              </div>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className={`p-3 w-full border transition-all border-gray-400 hover:border-black text-lg rounded-md focus:outline-2 focus:outline-blue-500
                                ${passwordError ? "border-red-500" : ""}`}
                value={password}
                onChange={handlePasswordChange}
              />
              <p
                className={`text-red-500 transition-all ${
                  passwordError ? "opacity-100" : "opacity-0"
                }`}
              >
                {passwordError}
              </p>
            </div>
            <div className="w-full">
              <button className="bg-[#2967ff] text-white w-full p-3 rounded-md font-bold hover:bg-blue-500 transition-all text-xl">
                Submit
              </button>
            </div>
            <div className="w-full flex justify-center">
              <div className="w-full flex text-center mt-[10px] mx-[0] mb-[20px]">
                <div className="border border-gray-400 w-full" />
                <h2 className="bg-[#fff] px-[10px] leading-[0.1em] py-[0] font-bold">
                  OR
                </h2>
                <div className="border border-gray-400 w-full" />
              </div>
            </div>
            <div className="w-full">
              <Link href="/register">
                <button className="w-full border-2 border-[#2967ff] p-3 rounded-md font-bold transition-all text-xl text-[#2967ff] hover:text-white hover:bg-[#2967ff]">
                  Create your account
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
        </>
      )
    }
     
    </>
  );
}
