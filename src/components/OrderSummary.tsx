"use client";
import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import { motion, AnimatePresence } from "framer-motion";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoIosArrowRoundForward, IoMdClose } from "react-icons/io";
import { RiLockPasswordLine } from "react-icons/ri";

function OrderSummary() {
  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult | null>(null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAVZWRn7jpEjdxVeIDNo5s6Tz3xJNB_PVE",
    libraries: ["places"],
  });

  const center = { lat: 23.0225, lng: 72.5714 };

  useEffect(() => {
    async function displayMap() {
      if (!isLoaded) return;
      const directionsService = new window.google.maps.DirectionsService();
      console.log("Directions Service", directionsService);
      const results = await directionsService.route({
        origin: "Paldi, Ahmedabad, Gujarat, India",
        destination:
          "Thaltej Metro Station, Thaltej Road, Bhaikakanagar, Thaltej, Ahmedabad, Gujarat, India",
        travelMode: window.google.maps.TravelMode.DRIVING,
      });
      console.log("directionsResponse", directionsResponse);
      console.log("Results", origin);
      setDirectionsResponse(results);
    }
    displayMap();
  }, [isLoaded]);
  return (
    <>
      <div className="grid place-content-center w-auto p-5">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          className="bg-white w-full max-h-full overflow-auto rounded-xl shadow-2xl"
        >
          <div className="p-6 flex justify-between items-center border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Order Summary</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2  p-6 h-auto">
            <div className="overflow-auto max-md:mb-6">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Order #6544</p>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Thank you, James!
                  </h3>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  Order Status
                </h4>
                <p className="text-gray-600 text-sm">
                  You will receive order and shipping updates via email.
                </p>
              </div>

              {/* <div className="mb-6"> */}
              {/* {isLoaded ? (
                  <div className="w-full h-64 rounded-lg overflow-hidden shadow-md">
                    <GoogleMap
                      center={center}
                      zoom={13}
                      mapContainerStyle={{ width: "100%", height: "100%" }}
                      options={{ disableDefaultUI: true }}
                    >
                      {directionsResponse && (
                        <DirectionsRenderer
                          directions={directionsResponse}
                          options={{
                            polylineOptions: {
                              strokeColor: "#3B82F6",
                              strokeWeight: 6,
                            },
                            suppressMarkers: true,
                          }}
                        />
                      )}
                    </GoogleMap>
                  </div>
                ) : (
                  <div className="w-full h-64 bg-gray-200 rounded-lg animate-pulse" />
                )} */}
              {/* <button
                onClick={handleMapButtonClick}
                className="mt-4 bg-blue-500 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
              >
                Show Route
              </button> */}
              {/* </div> */}

              <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1 ">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">
                    Receiver Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex">
                      <span className="text-gray-600 w-24">Name:</span>
                      <span className="text-gray-800 font-medium">
                        James Kemp
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-600 w-24">Email:</span>
                      <span className="text-gray-800">test@iconicwp.com</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-600 w-24">Payment:</span>
                      <span className="text-gray-800">Check payments</span>
                    </div>
                  </div>
                </div>
                <div className="border-l border-slate-100 pl-8 ">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3 ">
                    Shipping Address
                  </h4>

                  <p className="text-gray-800 text-sm ">
                    James Kemp
                    <br />
                    7513 N Bray Rd
                    <br />
                    Mount Morris, MI 48458
                    <br />
                    United States
                  </p>
                </div>
              </div>
            </div>

            {/*payment status div */}
            <div className=" border-l-2 border-slate-100 p-6 overflow-auto max-md:border-t-2 max-md:border-l-0 ">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                  Payment Details
                </h3>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <HiOutlineLocationMarker className="text-green-500 text-xl mr-2" />
                      <div>
                        <p className="text-xs font-medium text-gray-600">
                          From
                        </p>
                        <p className="text-sm text-gray-800">
                          Paldi, Ahmedabad
                        </p>
                      </div>
                    </div>
                    <IoIosArrowRoundForward className="text-gray-400 text-xl" />
                    <div className="flex items-center">
                      <HiOutlineLocationMarker className="text-red-500 text-xl mr-2" />
                      <div>
                        <p className="text-xs font-medium text-gray-600">To</p>
                        <p className="text-sm text-gray-800">
                          Thaltej Metro Station
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  Fare Summary
                </h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-600">
                      Trip Fare (incl. Toll)
                    </span>
                    <div className="flex items-center text-gray-800 font-medium">
                      <FaIndianRupeeSign className="text-xs mr-1" />
                      <span className="text-sm">500</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <span className="text-sm text-gray-800 font-semibold">
                      Amount Payable
                    </span>
                    <div className="flex items-center text-gray-800 font-bold">
                      <FaIndianRupeeSign className="text-sm mr-1" />
                      <span className="text-sm">500</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-center text-gray-500 text-xs">
                  <RiLockPasswordLine className="text-base mr-1" />
                  <span>Payments are secured and encrypted</span>
                </div>
              </motion.div>
            </div>
          </div>
          {/* Map section */}
          {isLoaded ? (
            <div className="w-full h-64 rounded-lg p-6 border-t-2 border-slate-100 overflow-hidden shadow-md  ">
              {/* <div className="border-2 border-slate-100"></div> */}
              <GoogleMap
                center={center}
                zoom={13}
                mapContainerStyle={{ width: "100%", height: "100%" }}
                options={{ disableDefaultUI: true }}
              >
                {directionsResponse && (
                  <DirectionsRenderer
                    directions={directionsResponse}
                    options={{
                      polylineOptions: {
                        strokeColor: "#3B82F6",
                        strokeOpacity: 1,
                        strokeWeight: 6,
                      },
                      suppressMarkers: true,
                    }}
                  />
                )}
              </GoogleMap>
            </div>
          ) : (
            <div className="w-full h-64 bg-gray-200 rounded-lg animate-pulse" />
          )}
        </motion.div>
      </div>
    </>
  );
}

export default OrderSummary;
