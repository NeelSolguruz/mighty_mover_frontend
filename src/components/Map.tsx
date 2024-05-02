"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Autocomplete,
  DirectionsRenderer,
  InfoWindow,
  Circle,
  TrafficLayer,
  StreetViewPanorama,
} from "@react-google-maps/api";
import {
  Bike,
  arrow_right,
  big_truck1,
  big_truck2,
  big_truck3,
  bike_image,
  blue_marker,
  check,
  cross,
  discount,
  exchange,
  green_marker,
  info_svg,
  lock,
  map_pin,
  red_marker,
  small_truck1,
  small_truck2,
  small_truck3,
} from "@/assets/Images/imageassets";
import Image from "next/image";
import { SocketAddress } from "net";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import http from "@/http/http";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { get_coupon_all } from "@/http/staticTokenService";
import { coupon, userSelectInterface } from "@/constant/type/data.type";
import { User_select } from "@/constant/twoWheeler";
import { FaIndianRupeeSign } from "react-icons/fa6";
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
  const [coupon, setcoupon] = useState(false);
  const [area, setarea] = useState("");
  const originRef = useRef<any>(null);
  const destiantionRef = useRef<any>(null);
  const [editloaction, seteditloaction] = useState(false);
  const [address, setadrress] = useState("");
  const [payment, setpayment] = useState(false);
  const [card, setcard] = useState(true);
  const [distance, setdistance] = useState("");
  const [couponData, setCouponData] = useState<coupon[]>([]);
  const [apply_coupon, setapply_coupon] = useState("");
  const [apply, setapply] = useState(false);
  const [couponid, setcouponid] = useState("");
  const [data_driverid, setDataDriverId] = useState("");
  const [modal, setmodal] = useState(false);
  const [proceed, setproceed] = useState(false);
  const [continue_text, setcontinue] = useState("");
  const [userSelect, setUserSelect] = useState<userSelectInterface[]>([]);
  const [Estimation, setEstimationAmount] = useState("");
  const [finalbill, setfinalbill] = useState("");
  const [finalcoupon, setfinalcoupon] = useState("");
  const [estimationid, setestimationid] = useState("");
  const vehiclephoto = {
    "2 wheeler": Bike,
    "tata ace": small_truck2,
    auto: small_truck3,
    "3 wheeler": small_truck1,
    "8 ft": big_truck1,
    "14 ft": big_truck2,
    bolero: big_truck3,
    "tata 407 ": big_truck3,
  };

  const [center_coordinates, setcenter_coordinates] = useState({
    lat: 23.0225,
    lng: 72.5714,
  });
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
    setcenter_coordinates({
      lat: results.routes[0].legs[0].end_location.lat(),
      lng: results.routes[0].legs[0].end_location.lng(),
    });
    setDirectionsResponse(results);
    if (results && results.routes && results.routes.length > 0) {
      const route = results.routes[0];
      const distance1 = route.legs[0].distance.text;
      const distance2 = route.legs[0].distance;

      const duration = route.legs[0].duration.text;
      setdistance(distance2.value / 1000);

      setInfoWindowPosition(route.legs[0].end_location);
      setInfoWindowText(`Distance: ${distance1}<br>Duration: ${duration}`);
      fetchDestinationarea(
        results.routes[0].legs[0].end_location.lat(),
        results.routes[0].legs[0].end_location.lng()
      );
      seteditloaction(!editloaction);
    }
    setFromLats(String(results.routes[0].legs[0].start_location.lat()));
    setFromLng(String(results.routes[0].legs[0].start_location.lng()));
    setToLats(String(results.routes[0].legs[0].end_location.lat()));
    setToLng(String(results.routes[0].legs[0].end_location.lng()));
  }
  const handlepayment = async (e: any) => {
    e.preventDefault();
    try {
      const response = await http.post("api/v1/addresses", {
        from: {
          faddress_type: 0,
          ffull_address: originRef.current.value,
          freceiver_name: recieverName,
          freceiver_mobile_number: recieverNo,
          fhouse_or_Apartment: recieverAdress,
          flatitude: fromLats,
          flongitude: fromLng,
          fdistance: distance,
        },
        to: {
          taddress_type: 1,
          tfull_address: destiantionRef.current.value,
          treceiver_name: recieverName,
          treceiver_mobile_number: recieverNo,
          thouse_or_Apartment: recieverAdress,
          tlatitude: ToLats,
          tlongitude: ToLng,
        },
      });

      get_all_driver_data(response.data.data.pickup_address_id);
    } catch (error) {
      message_error(error);
    }
  };
  const get_all_driver_data = async (id: string) => {
    try {
      const response = await http.get(
        `/api/v1/estimation?pickup_address_id=${id}`
      );
      console.log(response.data.data);
      setUserSelect(response.data.data);
      setmodal(true);
    } catch (error) {
      message_error(error);
    }
  };

  const handleCheckCoupon = async () => {
    try {
      const response = await http.get(
        `/api/v1/applycoupon/${finalcoupon}?estimation_id=${estimationid}`
      );
    } catch (error) {
      message_error(error);
    }
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
  const handleGetEstimation = async () => {
    try {
      const response = await http.get(`/api/v1/estimation/${data_driverid}`);
      console.log(response);
      setfinalbill(response.data.data.total_amount);
      setestimationid(response.data.data.id);
      setpayment(true);
      setmodal(false);
    } catch (error) {
      message_error(error);
    }
  };
  const handleAddData = async (item: any) => {
    setproceed(true);
    setcontinue(item.vehicle_type);
    setDataDriverId(item.vehicle_id);
    setEstimationAmount(item.total_amount);
    try {
      const response = await http.post(
        `/api/v1/estimation/${item.vehicle_id}`,
        {
          vehicle_type: String(item.vehicle_type),
          total_amount: String(item.total_amount),
        }
      );
    } catch (error) {
      message_error(error);
    }
  };
  const fetchDestinationarea = async (lat: string, lng: string) => {
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
  const fetchCouponData = async () => {
    try {
      const response = await get_coupon_all();
      console.log(response.data.data);
      setCouponData(response.data.data);
    } catch (error) {
      message_error(error);
    }
  };
  useEffect(() => {
    fetchCouponData();
  }, []);

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
        className="flex gap-4 p-4 max-[769px]:flex-col"
      >
        <div className="flex flex-col max-w-1/4 justify-start items-center gap-4 rounded-2xl h-[80%] max-[769px]:w-full">
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
                  <Autocomplete
                    onLoad={(autocomplete) => {
                      autocomplete.setComponentRestrictions({ country: "in" }); // Restrict to India
                    }}
                  >
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
                  <Autocomplete
                    onLoad={(autocomplete) => {
                      autocomplete.setComponentRestrictions({ country: "in" }); // Restrict to India
                    }}
                  >
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
              <div className="flex flex-col text-[40px] font-extrabold text-[#2967ff] justify-start items-start max-w-full px-3 py-10 max-[1261px]:text-[35px] max-[1024px]:text-[30px] max-[769px]:hidden">
                <div>{"Delivery  Hai?"}</div>
                <div>{"HoJayega!"}</div>
              </div>
            </>
          )}
        </div>
        <div className="w-3/4 max-[769px]:w-full  max-[769px]:h-[700px]">
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
                    strokeColor: "#2967ff",
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

            <TrafficLayer
              options={{
                autoRefresh: true,
              }}
            />
          </GoogleMap>
        </div>
      </motion.div>

      {modal && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[1000000000000] flex justify-center items-center "
        >
          <div className="scrollbarmap bg-white rounded-lg shadow-lg w-1/2   overflow-auto overflow-x-hidden  flex flex-col items-center max-h-[400px] ">
            {userSelect.map((item, index) => (
              <>
                <button
                  className="w-full flex justify-between items-center border-b p-4 hover:bg-gray-50  transition-all ease-in-out  duration-200 cursor-pointer rounded-lg focus:bg-gray-100 focus:scale-100 "
                  key={index}
                  onClick={() => handleAddData(item)}
                >
                  <div className="flex w-1/2">
                    <div className="w-1/2">
                      <Image
                        src={vehiclephoto[String(item.vehicle_type)]}
                        alt="image"
                      ></Image>
                    </div>
                    <div className="flex flex-col justify-center items-start w-1/2">
                      <div className=" text-xl font-bold">
                        {item.vehicle_type}
                      </div>
                      <div className="text-xs flex gap-1 items-center">
                        <div className="font-medium text-gray-400 ">
                          {"Max Weigth:"}
                        </div>
                        <div className="text-xs font-light flex gap-1 items-center">
                          {item.max_weight}
                          <div>
                            <Image
                              src={info_svg}
                              alt="info"
                              className="h-3 w-3"
                            ></Image>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center text-sm">
                    <div>
                      <FaIndianRupeeSign className="text-sm" />
                    </div>
                    <div className="font-semibold">{item.total_amount}</div>
                  </div>
                </button>
              </>
            ))}
            <div className="sticky bottom-4  w-11/12">
              <button
                className={`w-full border-none ${
                  proceed ? "bg-black" : "bg-gray-200"
                } text-white p-2 font-semibold rounded-sm text-lg active:scale-95 transition-all ease-in`}
                onClick={handleGetEstimation}
              >
                Proceed{" "}
                {continue_text == "" ? (
                  <>{""}</>
                ) : (
                  <>
                    {"with"} {continue_text}
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      )}
      {payment && (
        <>
          <div className="w-full rounded-lg flex gap-2 p-4">
            <div className="rounded-lg w-1/2 flex flex-col gap-4 item-start p-4">
              <motion.div
                initial={{ translateY: 40, opacity: 0 }}
                whileInView={{ translateY: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  damping: 15,
                  stiffness: 300,
                  duration: 1,
                }}
                className="flex flex-col gap-2 border rounded-lg"
              >
                <div className="flex">
                  <div
                    className={`border-r border-gray-400 p-2 rounded-t-lg  ${
                      !card
                        ? "border-b "
                        : "shadow-[8px_0px_10px_rgba(239,239,240,1)]"
                    }`}
                    onClick={() => setcard(!card)}
                  >
                    Credit/Debit
                  </div>
                  <div
                    className={`border-r border-gray-400 p-2 rounded-t-lg  ${
                      card
                        ? "border-b "
                        : "shadow-[8px_0px_10px_rgba(239,239,240,1)]"
                    }`}
                    onClick={() => setcard(!card)}
                  >
                    Cash on Delivery
                  </div>
                </div>
                <div className="flex flex-col gap-2 p-4">
                  <div className="flex flex-col gap-4 w-full">
                    <label
                      htmlFor="user"
                      className="font-bold text-sm flex gap-2 items-center"
                      onClick={() => setcoupon(!coupon)}
                    >
                      <Image
                        src={discount}
                        alt="discount"
                        className="cursor-pointer"
                      ></Image>{" "}
                      <div className="text-[#318A5E] cursor-pointer">
                        See All Coupons
                      </div>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Apply Coupon Code"
                        className="p-2 w-3/4 border border-gray-400 text-sm rounded-md
                        
                        
                    "
                        value={finalcoupon}
                        onChange={(e) => setfinalcoupon(e.target.value)}
                      />
                      <button
                        className="p-2 w-1/4 bg-black rounded-md text-white"
                        onClick={handleCheckCoupon}
                      >
                        Apply
                      </button>
                    </div>
                    {coupon && (
                      <>
                        <div className="flex flex-col gap-4">
                          <div className="border-b border-gray-400 px-2 pt-2 font-semibold text-sm text-gray-400">
                            Available Coupons
                          </div>
                          <div className="flex flex-col gap-2 px-2 pt-2 border rounded-md pb-2 shadow-sm shadow-gray-400">
                            {couponData.length !== 0 ? (
                              <div>
                                {couponData.map((item, index) => (
                                  <div
                                    className="flex flex-col gap-2"
                                    key={index}
                                  >
                                    <div className="flex justify-between items-center">
                                      <div className="text-[#2967ff] border-2 border-[#2967ff] border-dashed flex  justify-center items-center rounded-sm">
                                        <div className="border-r-2 border-[#2967ff] border-dashed flex px-1 py-1">
                                          %
                                        </div>
                                        <div className="flex px-1 py-1">
                                          {item.coupon_code}
                                        </div>
                                      </div>
                                      <div>
                                        <button
                                          className={`px-2 py-1 border border-[#2967ff] rounded-md text-[#2967ff] transition-all duration-100 active:scale-90 ${
                                            apply && couponid == item.id
                                              ? "border-green-500 text-green-500"
                                              : ""
                                          }`}
                                          onClick={() => {
                                            navigator.clipboard.writeText(
                                              item.coupon_code
                                            );
                                            setapply_coupon(item.coupon_code);
                                            setcouponid(item.id);
                                            setapply(!apply);
                                          }}
                                        >
                                          {apply && couponid == item.id ? (
                                            <div className="flex items-center gap-2">
                                              <Image
                                                src={check}
                                                alt="check"
                                              ></Image>
                                              Copied
                                            </div>
                                          ) : (
                                            <>Copy</>
                                          )}
                                        </button>
                                      </div>
                                    </div>
                                    <div className="text-sm font-semibold">
                                      {item.description}
                                    </div>
                                    <div className="text-xs font-light">
                                      {item.description}
                                    </div>
                                    <div className="text-xs font-normal">
                                      valid till:{item.expiry_date}
                                    </div>
                                    <div className="text-xs font-normal">
                                      Max Usage:{item.max_usage_count}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="flex w-full items-center justify-center font-semibold text-gray-400">
                                No Coupons Available
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                    <div className="flex w-full ">
                      {card ? (
                        <>
                          <button className="w-full bg-[#2967ff] text-white font-semibold text-lg p-2 rounded-md text-center">
                            Proceed with Card
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="w-full bg-[#2967ff] text-white font-semibold text-lg p-2 rounded-md text-center">
                            Proceed with Cash
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="bg-gray-100 w-1/2 rounded-lg flex flex-col gap-2 p-4">
              <div className="text-4xl text-black font-bold">
                Payment Details
              </div>
              <div className="text-md text-black font-light">
                Check your Payment Details
              </div>
              <div className="flex w-full justify-between items-start border-b-2 border-black">
                <div className="flex flex-col gap-2 p-2">
                  <div className="text-2xl font-bold flex gap-2 items-center">
                    <Image src={green_marker} alt="green marker"></Image>
                    From:
                  </div>
                  <div className="text-start text-xs w-[170px]">
                    <div>{originRef?.current?.value}</div>
                  </div>
                </div>
                <div className="flex items-center h-full">
                  <Image src={arrow_right} alt="arrow"></Image>
                </div>
                <div className="flex flex-col gap-2 p-2">
                  <div
                    className="text-2xl font-bold flex gap-2 items-center
                  "
                  >
                    <Image src={red_marker} alt="red marker"></Image>
                    To:
                  </div>
                  <div className="text-start text-xs w-[170px]">
                    <div>{destiantionRef?.current?.value}</div>
                  </div>
                </div>
              </div>
              <div className="px-2 font-bold">Fare Sumamary</div>
              <div className="border border-dashed border-black rounded-md flex flex-col p-2 gap-2">
                <div className="flex w-full justify-between items-center">
                  <div className="text-sm font-normal">
                    Trip Fare {"(incl.Toll)"}
                  </div>
                  <div className="text-sm font-normal text-start">
                    {finalbill}
                  </div>
                </div>
                <div className="flex w-full justify-between items-center">
                  <div className="text-sm font-normal">
                    Coupon discount - AHMXS
                  </div>
                  <div className="text-sm font-normal text-green-500 text-start">
                    - Rs 20
                  </div>
                </div>
                <div className="flex w-full justify-between border-t border-gray-400 py-2 items-center">
                  <div className="text-sm font-normal">Net Fare</div>
                  <div className="text-sm font-normal text-start">
                    {finalbill}
                  </div>
                </div>
                <div className="flex w-full justify-between border-t border-gray-400 py-2 items-center">
                  <div className="text-sm font-semibold">Amount Payable</div>
                  <div className="text-sm font-semibold text-start">
                    {finalbill}
                  </div>
                </div>
              </div>
              <div className="flex w-full text-gray-400 justify-center items-center text-xs gap-1">
                <Image src={lock} alt="lock" className="h-4 w-4"></Image>
                Payments are secured and encrypted
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  ) : (
    <></>
  );
}
