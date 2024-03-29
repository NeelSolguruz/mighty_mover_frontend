import LoginLogo from "@/app/assets/Images/icons/LoginLogo";
import { FORGOT_PASSWORD } from "@/app/constant/constant";


export default function ForgotPassword() {
    return (
        <>
            <div className="w-full flex justify-center py-16">
                <div className="flex flex-col items-center gap-10 py-10 w-5/12
                max-lg:w-8/12
                max-sm:w-11/12
                ">
                    <div className="w-[180px]
                    max-sm:w-[150px]
                    ">
                        <LoginLogo />
                    </div>
                    <div className="w-full flex justify-center">
                        <h1 className="text-4xl font-semibold
                        max-sm:text-3xl
                        ">{FORGOT_PASSWORD.title}</h1>
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="user" className="font-bold text-lg">Email Address</label>
                        <input type="text" id="username" placeholder="Enter your email address" className="p-3 w-full border border-gray-400 text-lg rounded-md
                    " />
                    </div>
                    <div className="w-full">
                        <button className="bg-yellow-500 w-full p-3 rounded-md font-bold hover:bg-yellow-400 transition-all text-lg">Submit</button>
                    </div>
                </div>
            </div>
        </>
    );
}