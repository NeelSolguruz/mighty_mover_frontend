"use client";
import LoginLogo from "@/assets/Images/icons/LoginLogo";
import { SIGNUP } from "@/constant/constant";
import http from "@/http/http";
import { authregister } from "@/http/staticTokenService";
import Link from "next/link";
import { useState } from "react";
export default function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [contactno, setContactno] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setComfirmpassword] = useState("");
  const resetform=()=>{
    setFirstname("");
    setLastname("");
    setEmail("");
    setContactno("");
    setPassword("");
    setComfirmpassword("");
  }

  const handlesubmit = () => {
    let result = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      contact: contactno,
      password: password,
    };
    console.log(result);
    authregister( result )
      .then((res) => {
        console.log(res);
      })
      .catch((error: any) => {
        console.error("error:", error);
      });
    resetform()
  };
 

  return (
    <>
      <div className="w-full flex justify-center">
        <div
          className="flex flex-col items-center gap-10 py-10 w-5/12
                max-lg:w-8/12
                max-sm:w-11/12
                "
        >
          <div className="w-[180px]">
            <LoginLogo />
          </div>
          <div className="w-full">
            <div>
              <h1 className="text-4xl font-bold">{SIGNUP.title}</h1>
            </div>
            <div>
              <h3 className="text-xl font-semibold max-sm:text-lg">
                {SIGNUP.tagline}
              </h3>
            </div>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="firstname" className="font-bold text-lg">
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={firstname}
              placeholder="Enter your first name"
              className="p-3 w-full border border-gray-400 hover:border-black text-lg rounded-md
                    active:border active:border-blue-600
                    "
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="lastname" className="font-bold text-lg">
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={lastname}
              placeholder="Enter your last name"
              className="p-3 w-full border border-gray-400 hover:border-black text-lg rounded-md
                    active:border active:border-blue-600
                    
                    "
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="email" className="font-bold text-lg">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email address"
              className="p-3 w-full border border-gray-400 hover:border-black text-lg rounded-md
                    active:border active:border-blue-600
                    "
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="number" className="font-bold text-lg">
              Contact Number
            </label>
            <input
              type="text"
              id="number"
              name="contact"
              value={contactno}
              placeholder="Enter your contact number"
              className="p-3 w-full border border-gray-400 hover:border-black text-lg rounded-md
                    active:border active:border-blue-600
                    "
              onChange={(e) => setContactno(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <div className="flex justify-between">
              <label htmlFor="password" className="font-bold text-lg">
                Password
              </label>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              className="p-3 w-full border border-gray-400 hover:border-black text-lg rounded-md
                    active:border active:border-blue-600
                    "
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <div className="flex justify-between">
              <label htmlFor="cpassword" className="font-bold text-lg">
                Confirm Password
              </label>
            </div>
            <input
              type="password"
              id="cpassword"
              name="cpassword"
              value={confirmpassword}
              placeholder="Re-Enter your password"
              className="p-3 w-full border border-gray-400 hover:border-black text-lg rounded-md
                    active:border active:border-blue-600
                    "
              onChange={(e) => setComfirmpassword(e.target.value)}
            />
          </div>
          <div className="w-full">
            <button
              className="bg-[#2967ff] text-white w-full p-3 rounded-md font-bold hover:bg-blue-500 transition-all text-lg"
              onClick={handlesubmit}
            >
              Create my Account
            </button>
          </div>
          <div>
            <p className="font-semibold">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
// "use client"
// import { useState } from "react";
// import LoginLogo from "@/app/assets/Images/icons/LoginLogo";
// import { SIGNUP } from "@/app/constant/constant";
// import Link from "next/link";

// export default function Register() {
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [email, setEmail] = useState('');
//     const [contactNumber, setContactNumber] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');

//     const [firstNameError, setFirstNameError] = useState('');
//     const [lastNameError, setLastNameError] = useState('');
//     const [emailError, setEmailError] = useState('');
//     const [contactNumberError, setContactNumberError] = useState('');
//     const [passwordError, setPasswordError] = useState('');
//     const [confirmPasswordError, setConfirmPasswordError] = useState('');

//     const resetForm = () => {
//         setFirstName('');
//         setLastName('');
//         setEmail('');
//         setContactNumber('');
//         setPassword('');
//         setConfirmPassword('');
//         setFirstNameError('');
//         setLastNameError('');
//         setEmailError('');
//         setContactNumberError('');
//         setPasswordError('');
//         setConfirmPasswordError('');
//     }

//     const validateForm = () => {
//         let isValid = true;

//         // First Name validation
//         if (!firstName.trim()) {
//             setFirstNameError('First Name is required');
//             isValid = false;
//         } else {
//             setFirstNameError('');
//         }

//         // Last Name validation
//         if (!lastName.trim()) {
//             setLastNameError('Last Name is required');
//             isValid = false;
//         } else {
//             setLastNameError('');
//         }

//         // Email validation
//         if (!email.trim()) {
//             setEmailError('Email is required');
//             isValid = false;
//         } else if (!/\S+@\S+\.\S+/.test(email)) {
//             setEmailError('Invalid email address');
//             isValid = false;
//         } else {
//             setEmailError('');
//         }

//         // Contact Number validation (you can customize validation according to your requirements)
//         if (!contactNumber.trim()) {
//             setContactNumberError('Contact Number is required');
//             isValid = false;
//         } else {
//             setContactNumberError('');
//         }

//         // Password validation
//         if (!password.trim()) {
//             setPasswordError('Password is required');
//             isValid = false;
//         } else if (password.length < 6) {
//             setPasswordError('Password must be at least 6 characters');
//             isValid = false;
//         } else {
//             setPasswordError('');
//         }

//         // Confirm Password validation
//         if (!confirmPassword.trim()) {
//             setConfirmPasswordError('Confirm Password is required');
//             isValid = false;
//         } else if (confirmPassword !== password) {
//             setConfirmPasswordError('Passwords do not match');
//             isValid = false;
//         } else {
//             setConfirmPasswordError('');
//         }

//         return isValid;
//     };

//     const handleSubmit = (e: { preventDefault: () => void; }) => {
//         e.preventDefault();
//         if (validateForm()) {
//             // Submit the form or call API
//             console.log('Form is valid. Submitting...');
//         } else {
//             console.log('Form is invalid. Please correct the errors.');
//         }
//         resetForm();
//     };

//     return (
//         <>
//             <div className="w-full flex justify-center">
//                 <div className="flex flex-col items-center gap-10 py-10 w-5/12 max-lg:w-8/12 max-sm:w-11/12">
//                     <div className="w-[180px]">
//                         <LoginLogo />
//                     </div>
//                     <div className="w-full">
//                         <div>
//                             <h1 className="text-4xl font-bold">{SIGNUP.title}</h1>
//                         </div>
//                         <div>
//                             <h3 className="text-xl font-semibold max-sm:text-lg">{SIGNUP.tagline}</h3>
//                         </div>
//                     </div>
//                     <form onSubmit={handleSubmit} className="w-full flex flex-col gap-10">
//                         <div className="flex flex-col gap-1 w-full">
//                             <label htmlFor="firstname" className="font-bold text-lg">First Name</label>
//                             <input
//                                 type="text"
//                                 id="firstname"
//                                 placeholder="Enter your first name"
//                                 className={`p-3 w-full border transition-all border-gray-400 hover:border-black text-lg rounded-md
//                                 ${firstNameError ? ' border-red-500' : ''}`}
//                                 value={firstName}
//                                 onChange={(e) => setFirstName(e.target.value)}
//                             />
//                             <p className={`text-red-500 transition-all ${firstNameError ? 'opacity-100' : 'opacity-0'}`}>{firstNameError}</p>
//                         </div>
//                         <div className="flex flex-col gap-1 w-full">
//                             <label htmlFor="lastname" className="font-bold text-lg">Last Name</label>
//                             <input
//                                 type="text"
//                                 id="lastname"
//                                 placeholder="Enter your last name"
//                                 className={`p-3 w-full border transition-all border-gray-400 hover:border-black text-lg rounded-md
//                                 ${lastNameError ? ' border-red-500' : ''}`}
//                                 value={lastName}
//                                 onChange={(e) => setLastName(e.target.value)}
//                             />
//                             <p className={`text-red-500 transition-all ${lastNameError ? 'opacity-100' : 'opacity-0'}`}>{lastNameError}</p>
//                         </div>
//                         <div className="flex flex-col gap-1 w-full">
//                             <label htmlFor="email" className="font-bold text-lg">Email Address</label>
//                             <input
//                                 type="email"
//                                 id="email"
//                                 placeholder="Enter your email address"
//                                 className={`p-3 w-full border transition-all border-gray-400 hover:border-black text-lg rounded-md
//                                 ${emailError ? ' border-red-500' : ''}`}
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                             />
//                             <p className={`text-red-500 transition-all ${emailError ? 'opacity-100' : 'opacity-0'}`}>{emailError}</p>
//                         </div>
//                         <div className="flex flex-col gap-1 w-full">
//                             <label htmlFor="number" className="font-bold text-lg">Contact Number</label>
//                             <input
//                                 type="text"
//                                 id="number"
//                                 placeholder="Enter your contact number"
//                                 className={`p-3 w-full border transition-all border-gray-400 hover:border-black text-lg rounded-md
//                                 ${contactNumberError ? ' border-red-500' : ''}`}
//                                 value={contactNumber}
//                                 onChange={(e) => setContactNumber(e.target.value)}
//                             />
//                             <p className={`text-red-500 transition-all ${contactNumberError ? 'opacity-100' : 'opacity-0'}`}>{contactNumberError}</p>
//                         </div>
//                         <div className="flex flex-col gap-1 w-full">
//                             <label htmlFor="password" className="font-bold text-lg">Password</label>
//                             <input
//                                 type="password"
//                                 id="password"
//                                 placeholder="Enter your password"
//                                 className={`p-3 w-full border transition-all border-gray-400 hover:border-black text-lg rounded-md
//                                 ${passwordError ? ' border-red-500' : ''}`}
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                             />
//                             <p className={`text-red-500 transition-all ${passwordError ? 'opacity-100' : 'opacity-0'}`}>{passwordError}</p>
//                         </div>
//                         <div className="flex flex-col gap-1 w-full">
//                             <label htmlFor="cpassword" className="font-bold text-lg">Confirm Password</label>
//                             <input
//                                 type="password"
//                                 id="cpassword"
//                                 placeholder="Re-Enter your password"
//                                 className={`p-3 w-full border transition-all border-gray-400 hover:border-black text-lg rounded-md
//                                 ${confirmPasswordError ? ' border-red-500' : ''}`}
//                                 value={confirmPassword}
//                                 onChange={(e) => setConfirmPassword(e.target.value)}
//                             />
//                             <p className={`text-red-500 transition-all ${confirmPasswordError ? 'opacity-100' : 'opacity-0'}`}>{confirmPasswordError}</p>
//                         </div>
//                         <div className="w-full">
//                             <button className="bg-yellow-500 w-full p-3 rounded-md font-bold hover:bg-yellow-400 transition-all text-lg">Create my Account</button>
//                         </div>
//                         <div>
//                             <p className="font-semibold">Already have an account? <Link href='/login' className="text-blue-600">Sign In</Link></p>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </>
//     );
// }
