import LoginLogo from "@/app/assets/Images/icons/LoginLogo";
import { SIGNUP } from "@/app/constant/constant";
import Link from "next/link";
export default function Register() {
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
                            <h1 className="text-4xl font-bold">{SIGNUP.title}</h1>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold max-sm:text-lg">{SIGNUP.tagline}</h3>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="firstname" className="font-bold text-lg">First Name</label>
                        <input type="text" id="firstname" placeholder="Enter your first name" className="p-3 w-full border border-gray-400 hover:border-black text-lg rounded-md
                    active:border active:border-blue-600
                    " />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="lastname" className="font-bold text-lg">Last Name</label>
                        <input type="text" id="lastname" placeholder="Enter your last name" className="p-3 w-full border border-gray-400 hover:border-black text-lg rounded-md
                    active:border active:border-blue-600
                    " />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="email" className="font-bold text-lg">Email Address</label>
                        <input type="email" id="email" placeholder="Enter your email address" className="p-3 w-full border border-gray-400 hover:border-black text-lg rounded-md
                    active:border active:border-blue-600
                    " />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="number" className="font-bold text-lg">Contact Number</label>
                        <input type="text" id="number" placeholder="Enter your contact number" className="p-3 w-full border border-gray-400 hover:border-black text-lg rounded-md
                    active:border active:border-blue-600
                    " />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <div className="flex justify-between">
                            <label htmlFor="password" className="font-bold text-lg">Password</label>
                        </div>
                        <input type="password" id="password" placeholder="Enter your password" className="p-3 w-full border border-gray-400 hover:border-black text-lg rounded-md
                    active:border active:border-blue-600
                    " />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <div className="flex justify-between">
                            <label htmlFor="cpassword" className="font-bold text-lg">Confirm Password</label>
                        </div>
                        <input type="password" id="cpassword" placeholder="Re-Enter your password" className="p-3 w-full border border-gray-400 hover:border-black text-lg rounded-md
                    active:border active:border-blue-600
                    " />
                    </div>
                    <div className="w-full">
                        <button className="bg-yellow-500 w-full p-3 rounded-md font-bold hover:bg-yellow-400 transition-all text-lg">Create my Account</button>
                    </div>
                    <div>
                        <p className="font-semibold">Already have an account? <Link href='/login' className="text-blue-600">Sign In</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
}