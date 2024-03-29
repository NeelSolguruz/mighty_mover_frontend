import LoginLogo from "@/app/assets/Images/icons/LoginLogo";
import { LOGIN } from "@/app/constant/constant";
import Link from "next/link";
import Image from "next/image";
export default function Login() {
    return (
        <>
            <div className="w-full flex justify-center">
                <div className="flex flex-col items-center gap-10 py-10 w-5/12
                max-lg:w-8/12
                max-sm:w-11/12
                ">
                    <div className="w-[180px]">
                        <LoginLogo />
                    </div>
                    <div className="w-full">
                        <div>
                            <h1 className="text-4xl font-bold">{LOGIN.sign_in}</h1>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold">{LOGIN.tagline}</h3>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="user" className="font-bold text-lg">Email Address</label>
                        <input type="text" id="username" placeholder="Enter your email address" className="p-3 w-full border border-gray-400 hover:border-black text-lg rounded-md
                    active:border active:border-blue-600
                    " />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <div className="flex justify-between">
                            <label htmlFor="password" className="font-bold text-lg">Password</label>
                            <Link href='/forgot-password' className="font-semibold text-blue-500 hover:text-blue-400 transition-all">Forgot password?</Link>
                        </div>
                        <input type="password" id="password" placeholder="Enter your password" className="p-3 w-full border border-gray-400 hover:border-black text-lg rounded-md
                    active:border active:border-blue-600
                    " />
                    </div>
                    <div className="w-full">
                        <button className="bg-yellow-500 w-full p-3 rounded-md font-bold hover:bg-yellow-400 transition-all text-lg">Submit</button>
                    </div>
                    <div className="w-full flex justify-center">
                        <div className="w-full flex text-center mt-[10px] mx-[0] mb-[20px]">
                            <div className="border border-gray-400 w-full" />
                            <h2 className="bg-[#fff] px-[10px] leading-[0.1em] py-[0] font-bold">OR</h2>
                            <div className="border border-gray-400 w-full" />
                        </div>
                    </div>
                    <div className="w-full">
                        <Link href="/register"><button className="w-full border-2 border-yellow-500 p-3 rounded-md font-bold transition-all text-lg text-yellow-500
                        hover:bg-yellow-400 hover:text-black 
                        hover:border-2 hover:border-yellow-400
                        ">Create your account</button></Link>
                    </div>

                </div>
            </div>
        </>
    );
}