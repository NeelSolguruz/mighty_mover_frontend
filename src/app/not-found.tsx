"use client"
import NotFound from "@/assets/Images/icons/NotFound";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function notFound() {
    return (
        <>
            <div className="w-screen h-screen flex items-center">
                <div className="flex justify-between w-full max-lg:flex-col-reverse max-lg:items-center">
                    <div className="flex flex-col w-5/12 justify-center items-end max-lg:w-full">
                        <div className="flex flex-col gap-5 w-11/12">
                            <h4 className="text-blue-600 font-bold max-lg:text-xl ">404 error</h4>
                            <h1 className="text-4xl max-lg:text-5xl font-semibold">Page Not Found</h1>
                            <p className="text-lg max-lg:text-xl font-semibold text-gray-500 max-sm:text-base">Sorry, the page you are looking for does not exists. Here are some helpful links:</p>
                            <div className="flex gap-3">
                                <button onClick={() => window.history.back()} className="bg-[#2967ff] p-2 rounded-lg font-semibold text-lg text-white hover:bg-blue-500 transition duration-200 flex items-center"><FaArrowLeft />Go back</button>
                                <Link href="/"><button className="bg-[#2967ff] p-2 rounded-lg font-semibold text-lg text-white hover:bg-blue-500 transition duration-200">Take Me Home</button></Link>
                            </div>
                        </div>
                    </div>
                    <div className="w-7/12 max-lg:w-full">
                        <div className="w-[100%] h-[100%]">
                            <NotFound />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}