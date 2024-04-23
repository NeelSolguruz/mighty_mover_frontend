"use client"
import Footer from "@/components/Footer";
import Home from "@/components/Home";
import Navbar from "@/components/Navbar";
import useFcmToken from "@/utils/FCM/useFcmToken";
import { useSelector } from "react-redux";
import { Toaster } from "sonner";

export default function HomePage() {
  const fcm_token  = useFcmToken();
  if(fcm_token){
    console.log('token generated')
    localStorage.setItem('fcm_token',fcm_token)
  }else{
    console.log('token not generated')
  }
  return (
    <>
      <Navbar />
      <Home />
      <Footer />
    </>
  );
}
