"use client";
import { useAppSelector } from "@/redux/hooks";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useLayoutEffect } from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import Footer from "./Footer";

function RoutePermission() {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAppSelector((state) => state.user.user.token);
  const protectedRoutes = [
    "/Booking",
    "/2-wheeler",
    "/order-history",
    "/orderSummary",
  ];

  useLayoutEffect(() => {
    if (protectedRoutes.includes(pathname) && !user) {
      router.push("/login");
    } else if (user && !protectedRoutes.includes(pathname)) {
      router.push("/Booking"); // Redirect to a default protected route or any other protected route
    }
  }, [router, user, pathname]);

  return (
    <>
      <Navbar />
      <Home />
      <Footer />
    </>
  );
}

export default RoutePermission;
