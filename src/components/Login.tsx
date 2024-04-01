"use client"
import { SetStateAction, useState } from "react";
import LoginLogo from "@/assets/Images/icons/LoginLogo";
import { LOGIN } from "@/constant/constant";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setEmailError('');
    setPasswordError('');
  }

  const validateEmail = (value: string | any) => {
    if (!value.trim()) {
      setEmailError('Email is required');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      setEmailError('Invalid email address');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const validatePassword = (value: string | any) => {
    if (!value.trim()) {
      setPasswordError('Password is required');
      return false;
    } else if (value.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const handleEmailChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  const handlePasswordChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (validateEmail(email) && validatePassword(password)) {
      // Submit the form or call API
      console.log('Form is valid. Submitting...');
      console.log(email)
      console.log(password)
    } else {
      console.log('Form is invalid. Please correct the errors.');
    }
    resetForm();
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="flex flex-col items-center gap-10 py-10 w-5/12 max-lg:w-8/12 max-sm:w-11/12">
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
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-10">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="user" className="font-bold text-lg">Email Address</label>
              <input
                type="text"
                id="username"
                placeholder="Enter your email address"
                className={`p-3 w-full border transition-all border-gray-400 hover:border-black text-lg rounded-md focus:outline-2 focus:outline-blue-500
                                ${emailError ? ' border-red-500' : ''}`}
                value={email}
                onChange={handleEmailChange}
              />
              <p className={`text-red-500 transition-all ${emailError ? 'opacity-100' : 'opacity-0'}`}>{emailError}</p>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <div className="flex justify-between">
                <label htmlFor="password" className="font-bold text-lg">Password</label>
                <Link href='/forgot-password' className="font-semibold text-blue-500 hover:text-blue-400 transition-all">Forgot password?</Link>
              </div>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className={`p-3 w-full border transition-all border-gray-400 hover:border-black text-lg rounded-md focus:outline-2 focus:outline-blue-500
                                ${passwordError ? 'border-red-500' : ''}`}
                value={password}
                onChange={handlePasswordChange}
              />
              <p className={`text-red-500 transition-all ${passwordError ? 'opacity-100' : 'opacity-0'}`}>{passwordError}</p>
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
              <Link href="/register"><button className="w-full border-2 border-yellow-500 p-3 rounded-md font-bold transition-all text-lg text-yellow-500 hover:bg-yellow-400 hover:text-black hover:border-2 hover:border-yellow-400">Create your account</button></Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}