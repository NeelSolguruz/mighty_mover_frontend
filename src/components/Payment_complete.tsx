"use client";
import React, { useEffect } from "react";
import AnimationGif from "./Animation";
import http from "@/http/http";
import { toast } from "sonner";

function Payment_complete() {
  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Store necessary information in local storage indicating the completion of payment
        // localStorage.setItem("paymentCompleted", "true");

        // Redirect the user to a different route using a GET request
        window.location.href = "/2-wheeler";
      } catch (err) {
        console.log(err);
      }
    };

    handleCallback();
  }, []);

  return (
    <>
      <div>
        <div>
          <AnimationGif />
        </div>
      </div>
    </>
  );
}

export default Payment_complete;
