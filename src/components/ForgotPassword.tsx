"use client";
import LoginLogo from "@/assets/Images/icons/LoginLogo";
import NavLogo from "@/assets/Images/icons/NavLogo";
import { FORGOT_PASSWORD } from "@/constant/constant";
import { forgotpassword_api } from "@/http/staticTokenService";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function ForgotPassword() {
  const router = useRouter();

  const [email, setemail] = useState("");
  const [loading, setLoading] = useState(false);
  const ForgotPassword = async () => {
    setLoading(true);

    try {
      const response = await forgotpassword_api({ email });
      toast.success(response.data.message);
      setemail("");

      router.push("/login", { scroll: false });
      console.log("Login successful");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError: any = error as AxiosError;
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
      // router.push('/', { scroll: false })
      setLoading(false);
      // resetForm();
    }
  };
  return (
    <>
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
            <h1
              className="text-4xl font-semibold
                        max-sm:text-3xl
                        "
            >
              {FORGOT_PASSWORD.title}
            </h1>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="user" className="font-bold text-lg">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              id="username"
              placeholder="Enter your email address"
              className="p-3 w-full border border-gray-400 text-lg rounded-md
                    "
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div className="w-full" onClick={ForgotPassword}>
            <button className="bg-[#2967ff] text-white w-full p-3 rounded-md font-bold hover:bg-blue-500 transition-all text-xl">
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
