"use client";
import Footer from "@/components/Footer";
import Home from "@/components/Home";
import Navbar from "@/components/Navbar";
import useFcmToken from "@/utils/FCM/useFcmToken";
// import { usePathname, useRouter } from "next/navigation";
// import { useAppSelector } from "@/redux/hooks";
// import { useEffect } from "react";
export default function HomePage() {
  const fcm_token = useFcmToken();
  if (fcm_token) {
    localStorage.setItem("fcm_token", fcm_token);
  }
  // const router = useRouter();
  // const pathname = usePathname();
  // const user = useAppSelector((state) => state.user.user.token);
  // const protectedRoutes = ["/Booking", "/2-wheeler", "/order-history", ""];

  // useEffect(() => {
  //   //  const isProtectedRoute = protectedRoutes.includes(router.asPath);
  //   if (protectedRoutes.includes(pathname) && user !== null) {
  //     router.push("/Login");
  //   }
  // }, [router, user, pathname]);
  return (
    <>
      <Navbar />
      <Home />
      <Footer />
    </>
  );
}
