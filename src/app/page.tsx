"use client"
import Footer from "@/components/Footer";
import Home from "@/components/Home";
import Navbar from "@/components/Navbar";
import useFcmToken from "@/utils/FCM/useFcmToken";


export default function HomePage() {
  const fcm_token  = useFcmToken();
  if(fcm_token){
    localStorage.setItem('fcm_token',fcm_token)
  }
  return (
    <>
      <Navbar />
      <Home />
      <Footer />
    </>
  );
}
