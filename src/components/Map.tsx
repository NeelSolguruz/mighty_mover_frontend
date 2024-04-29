"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Autocomplete,
  DirectionsRenderer,
  InfoWindow,
} from "@react-google-maps/api";
import {
  blue_marker,
  discount,
  exchange,
  green_marker,
  map_pin,
  red_marker,
} from "@/assets/Images/imageassets";
import Image from "next/image";
import { SocketAddress } from "net";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import http from "@/http/http";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
export default function Map() {
  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [infoWindowPosition, setInfoWindowPosition] = useState(null);
  const [infoWindowText, setInfoWindowText] = useState("");
  const [fromlocation, setfromlocation] = useState("");
  const [tolocation, settolocation] = useState("");
  const [recieverAdress, setRecieverAdress] = useState("");
  const [recieverName, setRecieverName] = useState("");
  const [recieverNo, setRecieverNo] = useState("");
  const [fromLats, setFromLats] = useState("");
  const [fromLng, setFromLng] = useState("");
  const [ToLats, setToLats] = useState("");
  const [ToLng, setToLng] = useState("");

  const [area, setarea] = useState("");
  const originRef = useRef();
  const destiantionRef = useRef();
  const [editloaction, seteditloaction] = useState(false);
  const [address, setadrress] = useState("");
  const [payment, setpayment] = useState(true);
  const center_coordinates = { lat: 23.0225, lng: 72.5714 };
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAVZWRn7jpEjdxVeIDNo5s6Tz3xJNB_PVE",
    libraries: ["places"],
  });
  const handleexchange = () => {
    console.log(originRef);

    const origin_data = originRef.current.value;
    originRef.current.value = destiantionRef.current.value;
    destiantionRef.current.value = origin_data;
    const destLat = directionsResponse.routes[0].legs[0].end_location.lat();
    const destLng = directionsResponse.routes[0].legs[0].end_location.lng();
    fetchDestinationarea(destLat, destLng);
  };
  async function calculateRoute() {
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setfromlocation(originRef.current.value);
    settolocation(destiantionRef.current.value);

    setDirectionsResponse(results);
    if (results && results.routes && results.routes.length > 0) {
      const route = results.routes[0];
      const distance = route.legs[0].distance.text;
      const duration = route.legs[0].duration.text;

      setInfoWindowPosition(route.legs[0].end_location);
      setInfoWindowText(`Distance: ${distance}<br>Duration: ${duration}`);
      fetchDestinationarea(
        results.routes[0].legs[0].end_location.lat(),
        results.routes[0].legs[0].end_location.lng()
      );
      seteditloaction(!editloaction);
    }
  }
  const handlepayment = async (e: any) => {
    e.preventDefault();
    try {
      const response = await http.post("api/v1/addresses", {
        From: {
          address_type: 0,
          full_address: fromlocation,
          receiver_name: recieverName,
          receiver_mobile_number: recieverNo,
          house_or_Apartment: recieverAdress,
        },
      });
    } catch (error) {
      message_error(error);
    }
    setpayment(true);
  };
  const message_error = (error: any) => {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{
        status: number;
        message: string;
      }>;
      if (axiosError.response) {
        console.log("Response Error", axiosError.response);
        toast.error(axiosError.response.data.message);
      } else if (axiosError.request) {
        console.log("Request Error", axiosError.request);
      } else {
        console.log("Error", axiosError.message);
      }
    }
  };
  const fetchDestinationarea = async (lat, lng) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAVZWRn7jpEjdxVeIDNo5s6Tz3xJNB_PVE`
    );
    const data = await response.json();
    console.log(data);

    if (data.results.length > 0) {
      const addressComponents = data.results[0].address_components;
      let fullAddress = "";
      for (let component of addressComponents) {
        fullAddress += component.long_name + ", ";
      }
      fullAddress = fullAddress.slice(0, -2); // Remove the last comma and space
      console.log("Full Address:", fullAddress);
      setadrress(fullAddress);
      for (let component of data.results[0].address_components) {
        if (
          component.types.includes("sublocality") ||
          component.types.includes("administrative_area_level_2")
        ) {
          setarea(component.long_name);
          break;
        }
      }
    }
  };

  return isLoaded ? (
    <div className="flex flex-col gap-4 p-4 w-full  ">
      <motion.div
        initial={{ translateY: 40, opacity: 0 }}
        whileInView={{ translateY: 0, opacity: 1 }}
        transition={{
          type: "spring",
          damping: 15,
          stiffness: 300,
          duration: 1,
        }}
        className="flex gap-4 p-4 "
      >
        <div className="flex flex-col w-1/4 justify-start items-center gap-4 rounded-2xl h-[80%]">
          <div className={`flex w-full items-center`}>
            <form className="flex flex-col gap-2 w-[90%]">
              <div className="w-full flex gap-2 items-center">
                <div>
                  <Image
                    src={green_marker}
                    alt="green marker"
                    className="w-8 h-8"
                  ></Image>
                </div>
                <div className="w-full">
                  <Autocomplete>
                    <input
                      required
                      type="text"
                      placeholder="From"
                      disabled={editloaction ? true : false}
                      ref={originRef}
                      value={fromlocation}
                      onChange={(e) => setfromlocation(e.target.value)}
                      className={`text-sm border border-black rounded-lg w-11/12 p-2 placeholder:text-gray placeholder:text-sm focus:outline-[#2967ff] ${
                        editloaction ? "cursor-not-allowed" : ""
                      }`}
                    ></input>
                  </Autocomplete>
                </div>
              </div>
              <div className="w-full  flex gap-2 items-center">
                <div>
                  <Image
                    src={red_marker}
                    alt="green marker"
                    className="w-8 h-8"
                  ></Image>
                </div>
                <div className="w-full">
                  <Autocomplete>
                    <input
                      type="text"
                      placeholder="To"
                      required
                      disabled={editloaction ? true : false}
                      className={`text-sm border border-black rounded-lg w-11/12 p-2 placeholder:text-gray placeholder:text-sm focus:outline-[#2967ff] ${
                        editloaction ? "cursor-not-allowed" : ""
                      }`}
                      value={tolocation}
                      onChange={(e) => settolocation(e.target.value)}
                      ref={destiantionRef}
                    ></input>
                  </Autocomplete>
                </div>
              </div>
            </form>
            <div
              className={`${
                editloaction ? "cursor-not-allowed" : ""
              } rounded-full h-10 w-10 border-none bg-[#2967ff] flex justify-center items-center hover:scale-[1.1] transition-all duration-200`}
            >
              <button
                onClick={handleexchange}
                className={`${editloaction ? "cursor-not-allowed" : ""}`}
                disabled={editloaction ? true : false}
              >
                <Image
                  src={exchange}
                  alt="exchange"
                  className="w-8 h-8"
                ></Image>
              </button>
            </div>
          </div>
          <div className="w-full flex gap-2 items-center px-4">
            {!editloaction == true ? (
              <div className="w-full">
                <button
                  className={`flex gap-2 text-white bg-black border rounded-lg border-none p-2 w-full font-semibold text-lg justify-center items-center${
                    editloaction ? "cursor-not-allowed" : ""
                  }`}
                  onClick={calculateRoute}
                  disabled={editloaction ? true : false}
                >
                  <div>Find Location</div>

                  <FaSearch className="text-white" />
                </button>
              </div>
            ) : (
              <div className={`w-full`}>
                <button
                  className={`flex text-[#2967ff] bg-white rounded-lg  p-2 w-full font-semibold text-lg border border-[#2967ff] justify-center items-center 
                
                `}
                  onClick={() => seteditloaction(false)}
                >
                  <div>Edit</div>
                  <div>
                    <Image src={blue_marker} alt="blue marker"></Image>
                  </div>
                </button>
              </div>
            )}
          </div>
          {editloaction ? (
            <>
              <motion.div
                initial={{ translateY: 40, opacity: 0 }}
                whileInView={{ translateY: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  damping: 15,
                  stiffness: 300,
                  duration: 1,
                }}
                className="w-full flex flex-col gap-2  h-full items-center py-4 "
              >
                {destiantionRef?.current?.value != null ? (
                  <div className="w-11/12 flex justify-start ">
                    <div className="flex gap-1 items-center">
                      <div>
                        <Image src={red_marker} alt="red marker"></Image>
                      </div>
                      <div className="flex flex-col gap-1 items-start">
                        <div>{area}</div>
                        <div className="text-[10px] text-gray-400">
                          {address.split(",").map((item, index) => (
                            <>{index <= 2 ? <>{item}</> : <>{"."}</>}</>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                <form className="w-full  flex flex-col gap-2 h-full items-center">
                  <div className="w-11/12">
                    <input
                      type="text"
                      value={recieverAdress}
                      placeholder="House/Apartment (optional)"
                      className="text-sm border border-black rounded-lg w-full p-2 placeholder:text-gray placeholder:text-sm focus:outline-[#2967ff]"
                      onChange={(e) => setRecieverAdress(e.target.value)}
                    ></input>
                  </div>

                  <div className="w-11/12">
                    <input
                      type="text"
                      value={recieverName}
                      placeholder="Receiver's Name"
                      className="text-sm border border-black rounded-lg w-full p-2 placeholder:text-gray placeholder:text-sm focus:outline-[#2967ff]"
                      onChange={(e) => setRecieverName(e.target.value)}
                    ></input>
                  </div>
                  <div className="w-11/12">
                    <input
                      type="text"
                      value={recieverNo}
                      placeholder="Receiver's Mobile Number"
                      className="text-sm border border-black rounded-lg w-full p-2 placeholder:text-gray placeholder:text-sm focus:outline-[#2967ff]"
                      onChange={(e) => setRecieverNo(e.target.value)}
                    ></input>
                  </div>
                  <div className="w-11/12">
                    <button
                      className={`flex  text-white bg-black border rounded-lg border-none p-2 w-full font-semibold text-lg justify-center items-center ${
                        !editloaction ? "cursor-not-allowed" : "cursor-pointer"
                      }`}
                      disabled={!editloaction ? true : false}
                      onClick={(e) => handlepayment(e)}
                    >
                      <div>Confirm And Proceed</div>
                    </button>
                  </div>
                </form>
              </motion.div>
            </>
          ) : (
            <>
              <div className="flex flex-col text-[45px] font-extrabold text-[#2967ff] justify-start items-start mt-10 max-w-full">
                <div>{"You think it "}</div>
                <div>{"We'll"}</div>
                <div>{"Deliver It"}</div>
              </div>
            </>
          )}
        </div>
        <div className="w-3/4">
          <GoogleMap
            center={center_coordinates}
            zoom={15}
            mapContainerStyle={{
              height: "100%",
              width: "100%",
              borderRadius: "10px",
            }}
            options={{
              zoomControl: false,

              mapTypeControl: false,
              fullscreenControl: false,
            }}
          >
            {directionsResponse && (
              <DirectionsRenderer
                options={{
                  polylineOptions: {
                    strokeColor: "#2967ff", // Red color
                    strokeOpacity: 1,
                    strokeWeight: 6,
                  },
                }}
                directions={directionsResponse}
              />
            )}
            {infoWindowPosition && (
              <InfoWindow
                position={infoWindowPosition}
                onCloseClick={() => setInfoWindowPosition(null)}
              >
                <div dangerouslySetInnerHTML={{ __html: infoWindowText }} />
              </InfoWindow>
            )}
          </GoogleMap>
        </div>
      </motion.div>
      {payment && (
        <>
          <div className="w-full border rounded-lg border-gray-400 flex gap-2 p-4">
            <div className="rounded-lg w-1/2 flex flex-col gap-4 item-start p-4">
              <div className="flex flex-col gap-2 border rounded-lg">
                <div className="flex">
                  <div className="border-r border-gray-400 p-2 rounded-t-lg shadow-[8px_0px_10px_-5px_rgba(239,239,240,1)]">
                    Credit/Debit
                  </div>
                  <div className="border-r border-gray-400 p-2 rounded-t-lg shadow-[8px_0px_10px_-5px_rgba(239,239,240,1)]">
                    Cash on Delivery
                  </div>
                </div>
                <div className="flex flex-col gap-2 p-4">
                  <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="user" className="font-bold text-sm">
                      <Image src={discount} alt="discount"></Image>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Apply Coupon Code"
                        className="p-2 w-3/4 border border-gray-400 text-sm rounded-md
                    "
                      />
                      <button className="p-2 w-1/4 bg-black rounded-md text-white">
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="flex flex-col gap-1 w-full">
                <label htmlFor="user" className="font-bold text-sm">
                  Card details
                </label>
                <div className="flex items-center justify-center bg-white overflow-hidden border border-black border-opacity-30 rounded-lg  h-9 w-3/4">
                  <input
                    className="w-full h-full border-none outline-none text-sm  text-gray-400 font-semibold caret-orange-500 pl-2 p-3"
                    type="text"
                    name="text"
                    id="input"
                    placeholder="0000 0000 0000 0000"
                  />
                  <div className="flex items-center justify-center relative w-10 h-6 bg-gray-800 border border-white border-opacity-20 rounded-md p-2">
                    <svg
                      className="text-white fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      width="23"
                      height="23"
                      viewBox="0 0 48 48"
                    >
                      <path
                        fill="#ff9800"
                        d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"
                      ></path>
                      <path
                        fill="#d50000"
                        d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"
                      ></path>
                      <path
                        fill="#ff3d00"
                        d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex items-center justify-center relative w-10 h-6 bg-gray-200 border border-white border-opacity-20 rounded-md mx-2 p-2">
                    <svg
                      viewBox="0 0 256 83"
                      width="33"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient
                          y2="100%"
                          y1="-2.006%"
                          x2="54.877%"
                          x1="45.974%"
                          id="logosVisa0"
                        >
                          <stop stop-color="#222357" offset="0%"></stop>
                          <stop stop-color="#254AA5" offset="100%"></stop>
                        </linearGradient>
                      </defs>
                      <path
                        transform="matrix(1 0 0 -1 0 82.668)"
                        d="M132.397 56.24c-.146-11.516 10.263-17.942 18.104-21.763c8.056-3.92 10.762-6.434 10.73-9.94c-.06-5.365-6.426-7.733-12.383-7.825c-10.393-.161-16.436 2.806-21.24 5.05l-3.744-17.519c4.82-2.221 13.745-4.158 23-4.243c21.725 0 35.938 10.724 36.015 27.351c.085 21.102-29.188 22.27-28.988 31.702c.069 2.86 2.798 5.912 8.778 6.688c2.96.392 11.131.692 20.395-3.574l3.636 16.95c-4.982 1.814-11.385 3.551-19.357 3.551c-20.448 0-34.83-10.87-34.946-26.428m89.241 24.968c-3.967 0-7.31-2.314-8.802-5.865L181.803 1.245h21.709l4.32 11.939h26.528l2.506-11.939H256l-16.697 79.963zm3.037-21.601l6.265-30.027h-17.158zm-118.599 21.6L88.964 1.246h20.687l17.104 79.963zm-30.603 0L53.941 26.782l-8.71 46.277c-1.022 5.166-5.058 8.149-9.54 8.149H.493L0 78.886c7.226-1.568 15.436-4.097 20.41-6.803c3.044-1.653 3.912-3.098 4.912-7.026L41.819 1.245H63.68l33.516 79.963z"
                        fill="url(#logosVisa0)"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div> */}
              <div></div>
            </div>
            <div className="bg-gray-100 w-1/2 rounded-lg">Total Bill</div>
          </div>
        </>
      )}
    </div>
  ) : (
    <></>
  );
}
