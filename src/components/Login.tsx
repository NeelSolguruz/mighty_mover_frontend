"use client";
import Image from "next/image";
import { ChangeEvent, SetStateAction, useState } from "react";
import { LOGIN } from "@/constant/constant";
import Link from "next/link";
import http from "@/http/http";
import { authLogin, verifyotp_api } from "@/http/staticTokenService";
import axios, { AxiosError } from "axios";
import Loader from "react-js-loader";
import { useRouter } from "next/navigation";
import NavLogo from "@/assets/Images/icons/NavLogo";
import { otp_page } from "@/assets/Images/imageassets";
import { useRef } from "react";
import { motion } from "framer-motion";
import {
  DID_NOT_GET,
  OTP_SENT_TO_EMAIL,
  OTP_VERIFICATION,
} from "@/constant/login";
import { useDispatch, useSelector } from "react-redux";
import { useradd } from "@/redux/userSlice";
import { toast } from "sonner";
import useFcmToken from "@/utils/FCM/useFcmToken";
import login_image from "../assets/Images/icons/login_image.svg";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [otppage, setotppage] = useState(false);
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  const resetForm = () => {
    setEmail("");
    setPassword("");
    setEmailError("");
    setPasswordError("");
  };

  const Verifyotp = async () => {
    setLoading(true);
    try {
      const ftoken = localStorage.getItem("fcm_token");
      const user_details = await verifyotp_api({
        email: email,
        OTP: otp,
        fcm_token: ftoken,
      });
      toast.success(user_details.data.message);
      dispatch(useradd(user_details.data.data));
      localStorage.setItem(
        "data",
        JSON.stringify({
          user: user_details.data.data.first_name,
          token: user_details.data.data.token,
          email: user_details.data.data.email,
        })
      );

      router.push("/Booking", { scroll: false });
      setLoading(false);
      resetForm();
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
      setOtp("");
    }
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

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authLogin({ email, password });
      console.log(response.data.message);
      toast.success(response.data.message);
      setotppage(true);
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
        resetForm();
      }
    } finally {
      // router.push('/', { scroll: false })
      setLoading(false);
      // resetForm();
    }
  };
  const inputs = useRef<HTMLInputElement[]>([]);

  const focusNextInput = (index: number) => {
    const nextIndex = index + 1;
    if (nextIndex < inputs.current.length) {
      inputs.current[nextIndex].focus();
    }
  };

  const handleInput = (e: any, index: number) => {
    const value = e.target.value;
    if (value.length > 0) {
      setOtp((prevOtp) => {
        const newOtp = prevOtp + value;
        if (newOtp.length === inputs.current.length) {
          console.log("Final OTP:", newOtp);
          setOtp(newOtp);
          console.log("otp state", otp);
        }
        return newOtp;
      });
      focusNextInput(index);
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
          <div className="w-full flex gap-2 h-screen justify-center items-center bg-[#e5edff] ">
            <div className="w-full flex gap-2 h-lvh bg-white rounded-lg scale-[0.8] shadow-xl shadow-gray-400  max-[742px]:h-[500px] max-[742px]:scale-[0.9] max-[643px]:h-[450px] max-[600px]:w-3/4  max-[421px]:scale-100 max-[421px]:p-4 max-[421px]:h-[60%]">
              <div className="w-1/2 h-full max-[600px]:hidden">
                <Image
                  src={login_image}
                  alt="image"
                  className="w-full h-full object-cover rounded-l-lg "
                ></Image>
              </div>
              <div
                className={`flex flex-col items-center gap-4 w-1/2 justify-center max-[600px]:w-full `}
              >
                {otppage ? (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[10] flex justify-center items-center"
                    >
                      <div className="w-[35%] flex justify-center items-center gap-2 p-10 bg-white rounded-lg max-[1228px]:w-[40%] max-[1025px]:w-[50%] max-[818px]:w-[60%] max-[683px]:w-[70%] max-[587px]:w-[80%] max-[517px]:w-[90%] max-[455px]:p-4 max-[386px]:p-2">
                        <div className="w-full flex flex-col justify-center p-4 gap-6 max-[455px]:p-0">
                          <div className="w-full flex justify-center">
                            <div className="w-[180px]">
                              <NavLogo />
                            </div>
                          </div>
                          <h1 className="text-4xl font-bold tracking-wide text-center max-[332px]:text-3xl ">
                            {OTP_VERIFICATION}
                          </h1>

                          <div className="flex justify-center gap-2 items-center ">
                            <div className="max-[455px]:text-sm w-full text-end max-[360px]:text-xs">
                              {OTP_SENT_TO_EMAIL}
                            </div>
                            <div>
                              <h5 className="text-lg font-bold text-center max-[332px]:text-sm">
                                {email.split("").map((item, index) => (
                                  <>{index <= 4 ? <>{"*"}</> : <>{item}</>}</>
                                ))}
                              </h5>
                            </div>
                          </div>
                          <div className="flex w-full justify-center items-center gap-4 ">
                            {[...Array(6)].map((_, index) => (
                              <input
                                key={index}
                                ref={(el) =>
                                (inputs.current[index] =
                                  el as HTMLInputElement)
                                }
                                type="text"
                                id={`otp${index + 1}`}
                                className="border border-black w-10 h-10 rounded-lg text-center text-xl font-medium max-[386px]:w-8 max-[386px]:h-8 "
                                maxLength={1}
                                onInput={(e) => handleInput(e, index)}
                              />
                            ))}
                          </div>
                          <div
                            className="flex w-full justify-end items-center text-gray-400 text-xs"
                            onClick={handleSubmit}
                          >
                            {DID_NOT_GET}
                          </div>
                          <div className="flex w-full justify-center items-center ">
                            <button
                              className="border-none bg-[#2967ff] text-white font-bold px-10 py-4 rounded-lg text-xl"
                              onClick={Verifyotp}
                            >
                              Verify OTP
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </>
                ) : (
                  <></>
                )}

                <>
                  <div className="w-full flex flex-col gap-3 items-center justify-center max-[643px]:gap-1 ">
                    <div className="w-[180px] max-[742px]:w-[140px] max-[421px]:w-[100px]">
                      <NavLogo />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold  max-[679px]:text-2xl max-[421px]:text-xl">
                        {LOGIN.sign_in}
                      </h1>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium  max-[679px]:text-sm max-[421px]:text-xs">
                        {LOGIN.tagline}
                      </h3>
                    </div>
                  </div>
                  <form
                    onSubmit={handleSubmit}
                    className="w-full flex flex-col gap-2 mt-4 items-center justify-center max-[643px]:gap-1"
                  >
                    <div className="flex flex-col gap-1 w-3/4 max-[643px]:w-full max-[643px]:px-4">
                      <label
                        htmlFor="user"
                        className="font-bold text-lg max-[643px]:text-sm max-[421px]:text-xs"
                      >
                        {LOGIN.email_label}
                      </label>
                      <input
                        type="text"
                        id="username"
                        placeholder="Enter your email address"
                        className={`p-2 w-full border transition-all border-gray-300 hover:border-black text-lg rounded-lg focus:outline-2 focus:outline-blue-500  max-[421px]:p-1 placeholder:max-[421px]:pl-1 max-[421px]:text-sm
                                ${emailError ? " border-red-500" : ""}`}
                        value={email}
                        onChange={handleEmailChange}
                      />
                      <p
                        className={`text-red-500 transition-all ${emailError ? "opacity-100" : "opacity-0"
                          }`}
                      >
                        {emailError}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1 w-3/4 max-[643px]:w-full max-[643px]:px-4">
                      <div className="flex justify-between">
                        <label
                          htmlFor="password"
                          className="font-bold text-lg max-[643px]:text-sm max-[421px]:text-xs"
                        >
                          {LOGIN.password_label}
                        </label>
                        <Link
                          href={LOGIN.forgot_link}
                          className="font-semibold text-blue-500 hover:text-blue-400 transition-all max-[643px]:text-sm max-[421px]:text-xs"
                        >
                          {LOGIN.forgot_text}
                        </Link>
                      </div>
                      <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        className={`p-2 w-full border transition-all border-gray-300 hover:border-black text-lg rounded-lg focus:outline-2 focus:outline-blue-500  max-[421px]:p-1 placeholder:max-[421px]:pl-1 max-[421px]:text-sm
                                ${passwordError ? "border-red-500" : ""}`}
                        value={password}
                        onChange={handlePasswordChange}
                      />
                      <p
                        className={`text-red-500 transition-all ${passwordError ? "opacity-100" : "opacity-0"
                          }`}
                      >
                        {passwordError}
                      </p>
                    </div>
                    <div className="w-3/4 mt-8 max-[643px]:mt-6 max-[643px]:w-full max-[643px]:px-4 max-[421px]:mt-4">
                      <button className="bg-[#2967ff] text-white w-full p-2 rounded-md font-bold hover:bg-blue-500 transition-all text-xl  max-[421px]:p-1 max-[421px]:text-sm">
                        Submit
                      </button>
                    </div>

                    <div className="w-full flex justify-center gap-2 items-center">
                      <div className="text-gray-400 font-bold max-[421px]:text-xs">
                        {"Don't have an account?"}
                      </div>
                      <div>
                        <Link
                          href="/register"
                          className="text-[#2967ff] font-bold max-[421px]:text-xs"
                        >
                          Sign Up
                        </Link>
                      </div>
                    </div>
                  </form>
                </>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
