"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Autocomplete,
  DirectionsRenderer,
  GoogleMap,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
// import { toast } from "sonner";
import { useAppSelector } from "@/redux/hooks";
import http from "@/http/http";
import axios, { AxiosError } from "axios";
import {
  category_interface,
  coupon,
  paymnet_type_interface,
  userSelectInterface,
} from "@/constant/type/data.type";
import { useRouter } from "next/navigation";
import {
  Bike,
  arrow_right,
  big_truck1,
  big_truck2,
  big_truck3,
  bike_image,
  blue_marker,
  check,
  confirmPayment,
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
import { get_coupon_all } from "@/http/staticTokenService";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoIosArrowForward, IoIosArrowRoundForward } from "react-icons/io";
import { set } from "date-fns";
import { toast } from "sonner";

function Dashboard() {
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
  // const [card, setcard] = useState(true);
  const [distance, setdistance] = useState(0);
  const [couponData, setCouponData] = useState<coupon[]>([]);
  const [apply_coupon, setapply_coupon] = useState("");
  const [category, setCategory] = useState<category_interface[]>([]);
  const [couponid, setcouponid] = useState("");
  // const [data_driverid, setDataDriverId] = useState("");
  const [modal, setmodal] = useState(false);
  const [proceed, setproceed] = useState(false);
  const [continue_text, setcontinue] = useState("");
  const [userSelect, setUserSelect] = useState<userSelectInterface[]>([]);
  // const [Estimation, setEstimationAmount] = useState("");
  const [finalbill, setfinalbill] = useState("");
  const [netfare, setnefare] = useState("");
  const [showCouponInBill, setShowCouponInBill] = useState<boolean>(false);
  const [finalcoupon, setfinalcoupon] = useState("");
  const [estimationid, setestimationid] = useState("");
  const [couponAmount, setCouponAmount] = useState("");

  const [userSelectEstimationId, setUserSelectEstimationId] = useState("");
  const [subCategory, setSubCategory] = useState<category_interface[]>([]);
  const [removeCoupon, setremoveCoupon] = useState<boolean>(false);
  const [paymentType, setPaymentType] = useState<paymnet_type_interface[]>([]);
  const [paymentTypeName, setPaymentTypeName] = useState("Cash");
  // const [confirmPayModal, setConfirmPayModal] = useState<boolean>(false);
  const [pickUpAddressId, setPickUpAddressId] = useState("");
  const [destinationAddressId, setDestinationAddressId] = useState("");
  // const [finalTransactionId, setFinalTransactionId] = useState("");
  const [finalPaymentTypeId, setFinalPaymentTypeId] = useState("");
  const [finalSubCategoryId, setFinalSubCategoryId] = useState("");
  const [finalConfirmationModal, setFinalConfirmationModal] =
    useState<boolean>(false);
  // const [animationGif, setanimationGif] = useState<boolean>(false);
  const [paymentVehicle, setPaymentTypeVehicle] = useState("");
  const [user, setUserName] = useState("");
  const [mainmodel, setmainmodel] = useState<boolean>(true);
  const [bookingID, setBookingID] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);
  const router = useRouter();
  const vehiclephoto = {
    "2 wheeler": Bike,
    "Tata ace": small_truck2,
    "E loader": small_truck3,
    "3 wheeler": small_truck1,
    "8 ft": big_truck1,
    "Canter 14 ft": big_truck2,
    "1.7 ton": big_truck3,
    "tata 407": big_truck3,
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
    const origin_data = originRef.current.value;
    originRef.current.value = destiantionRef.current.value;
    destiantionRef.current.value = origin_data;
    const destLat = directionsResponse?.routes[0]?.legs[0]?.end_location?.lat();
    // console.log("hello there : ", destLat);

    const destLng = directionsResponse?.routes[0]?.legs[0]?.end_location?.lng();
    fetchDestinationarea(destLat, destLng);
  };
  async function calculateRoute() {
    // console.log(originRef.current.value);
    setmodal(false);

    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    console.log(results);

    setfromlocation(originRef.current.value);
    settolocation(destiantionRef.current.value);
    setcenter_coordinates({
      lat: results.routes[0].legs[0].end_location.lat(),
      lng: results.routes[0].legs[0].end_location.lng(),
    });

    setDirectionsResponse(results);

    if (results && results.routes && results.routes.length > 0) {
      const route = results.routes[0];
      const distance1 = route?.legs[0]?.distance?.text;
      const distance2 = route.legs[0].distance;

      const duration = route?.legs[0]?.duration?.text;
      if (distance2) {
        setdistance(distance2?.value / 1000);
      }

      setInfoWindowPosition(route.legs[0].end_location);
      setInfoWindowText(`Distance: ${distance1}<br>Duration: ${duration}`);
      fetchDestinationarea(
        results.routes[0]?.legs[0].end_location.lat(),
        results.routes[0].legs[0].end_location.lng()
      );
      seteditloaction(true);
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
      setPickUpAddressId(response.data.data.pickup_address_id);
      setDestinationAddressId(response.data.data.delivery_address_id);
      get_all_driver_data(response.data.data.pickup_address_id);
      setmodal(true);
      setIsLoading(true);
      setpayment(false);
    } catch (error) {
      message_error(error);
    }
  };
  const get_all_driver_data = async (id: string) => {
    // setIsLoading(true);
    try {
      const response = await http.get(
        `/api/v1/estimation?pickup_address_id=${id}`
      );
      console.log(response.data.data);
      setUserSelect(response.data.data);
      setIsLoading(false);
    } catch (error) {
      message_error(error);
    }
  };

  const handleCheckCoupon = async () => {
    if (removeCoupon) {
      try {
        const response = await http.get(
          `/api/v1/coupons/remove/${finalcoupon}?estimation_id=${estimationid}`
        );
        setfinalbill(response.data.data.total_amount);
        setShowCouponInBill(false);
        setfinalcoupon(response.data.data.coupon_code);
        setCouponAmount(response.data.data.coupon_amount);
        setremoveCoupon(false);
        setfinalcoupon("");
      } catch (error) {
        message_error(error);
      }
    } else {
      try {
        const response = await http.get(
          `/api/v1/coupons/apply/${finalcoupon}?estimation_id=${estimationid}`
        );
        setfinalbill(response.data.data.total_amount);
        setShowCouponInBill(true);
        setfinalcoupon(response.data.data.coupon_code);
        setCouponAmount(response.data.data.coupon_amount);
        setremoveCoupon(true);
      } catch (error) {
        message_error(error);
      }
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
        // toast.error(axiosError.response.data.message);
      } else if (axiosError.request) {
        console.log("Request Error", axiosError.request);
      } else {
        console.log("Error", axiosError.message);
      }
    }
  };
  const handleGetEstimation = async () => {
    try {
      const response = await http.get(
        `/api/v1/estimation/${userSelectEstimationId}`
      );
      console.log(response);
      setfinalbill(response.data.data.total_amount);
      setnefare(response.data.data.total_amount);
      setestimationid(response.data.data.id);
      setpayment(true);
      // setmodal(false);
      setmainmodel(false);
    } catch (error) {
      message_error(error);
    }
  };
  const handleAddData = async (item: any) => {
    // setIsLoading(true);
    setproceed(true);
    setcontinue(item.vehicle_type);
    // setDataDriverId(item.vehicle_id);
    // setEstimationAmount(item.total_amount);
    setPaymentTypeVehicle(item.vehicle_type);
    try {
      const response = await http.post(
        `/api/v1/estimation/${item.vehicle_id}`,
        {
          vehicle_type: String(item.vehicle_type),
          total_amount: String(item.total_amount),
        }
      );
      setUserSelectEstimationId(response.data.data.id);
      // setIsLoading(false);
    } catch (error) {
      message_error(error);
    }
  };
  const fetchDestinationarea = async (lat: number, lng: number) => {
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
          component.types.includes(
            "sublocality" || "administrative_area_level_2"
          )
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
      setcoupon(!coupon);
    } catch (error) {
      message_error(error);
    }
  };
  function formatNumberWithCommas(number: string) {
    const formatter = new Intl.NumberFormat("en-IN");
    return formatter.format(Number(number));
  }
  const fetchCategory = useCallback(async () => {
    try {
      const response = await http.get("/api/v1/Categories");
      setCategory(response.data.data);
    } catch (error) {
      message_error(error);
    }
  }, []);
  const handlesubcategory = async (id: string) => {
    try {
      const response = await http.get(
        `/api/v1/subcategories/?category_id=${id}`
      );
      setSubCategory(response.data.data);
    } catch (error) {
      message_error(error);
    }
  };
  const payment_type = useCallback(async () => {
    try {
      const response = await http.get("/api/v1/payment-method");
      setPaymentType(response.data.data);
      console.log(response.data.data);
      const payment_type_map = response.data.data;

      payment_type_map.map((item: any) => {
        item.name == "cash" && <>{setFinalPaymentTypeId(item.id)}</>;
        item.name == "stripe" && <>{setFinalPaymentTypeId(item.id)}</>;
        item.name == "razorpay" && <>{setFinalPaymentTypeId(item.id)}</>;
        console.log("hit against");
      });
    } catch (error) {
      message_error(error);
    }
  }, []);
  // const userName = localStorage.getItem("persist:root");
  // console.log(userName.user);
  const final_Book = async () => {
    if (paymentTypeName == "cash") {
      setFinalConfirmationModal(true);
      // try {
      //   const response = await http.post(`/api/v1/payments/`);
      // setanimationGif(true);
      // toast.success(response.data.message);

      // setFinalTransactionId(response.data.data.id);
      // } catch (error) {
      //   message_error(error);
      // }
    } else {
      try {
        const response = await http.post(
          `/api/v1/bookings/?pickup_address_id=${pickUpAddressId}&delivery_address_id=${destinationAddressId}&estimation_id=${estimationid}&payment_method_id=${finalPaymentTypeId}&subcategory_id=${finalSubCategoryId}`
        );
        console.log("final_book_response : ", response);
        // setanimationGif(true);
        // toast.success(response.data.message);
        // console.log("total price:", response.data.data[0].total_price);
        setfinalbill(response.data.data.total_price);
        setBookingID(response.data.data.id);
        setFinalConfirmationModal(true);
      } catch (error) {
        message_error(error);
      }
    }
  };
  const handleBook = async () => {
    setIsLoading(true);
    // <Payment_complete
    //   pickUpAddressId={pickUpAddressId}
    //   destinationAddressId={destinationAddressId}
    //   estimationid={estimationid}
    //   finalTransactionId={finalTransactionId}
    //   finalPaymentTypeId={finalPaymentTypeId}
    //   finalSubCategoryId={finalSubCategoryId}
    // />;

    console.log("finalbill: ", finalbill);

    if (paymentTypeName == "cash") {
      try {
        const response = await http.post(
          `/api/v1/bookings/?pickup_address_id=${pickUpAddressId}&delivery_address_id=${destinationAddressId}&estimation_id=${estimationid}&subcategory_id=${finalSubCategoryId}&payment_method_id=${finalPaymentTypeId}`
        );
        setConfirm(true);
        setIsLoading(false);
        setFinalConfirmationModal(false);
        // toast.success(
        //   <div className="flex items-center justify-center p-4 z-[10000] rounded-md">
        //     <div className="mr-4">
        //       <svg
        //         className="w-6 h-6 text-green-500 animate-bounce"
        //         viewBox="0 0 24 24"
        //         fill="none"
        //         stroke="currentColor"
        //       >
        //         <path
        //           strokeLinecap="round"
        //           strokeLinejoin="round"
        //           strokeWidth={2}
        //           d="M5 13l4 4L19 7"
        //         />
        //       </svg>
        //     </div>
        //     <div>
        //       <h3 className="text-lg font-semibold text-gray-800">
        //         Congratulations!
        //       </h3>
        //       <p className="text-gray-600">Your order has been created.</p>
        //     </div>
        //   </div>,
        //   // {
        //   //   position: "top",
        //   //   pauseOnHover: true,
        //   //   autoClose: false,
        //   // }
        //   { duration: 3000 }
        // );

        setTimeout(() => {
          router.push("/orderSummary");
        }, 3000);
      } catch (error) {
        message_error(error);
      } finally {
        setIsLoading(false);
        // setConfirm(false);
      }
    }
    if (paymentTypeName == "razorpay") {
      console.log("razorpay finalbill ", finalbill);

      try {
        const response = await http.post(
          `/api/v1/process-payment/razorpay?booking_id=${bookingID}`
        );
        const razorpayDetails = {
          pickUpAddressId: pickUpAddressId,
          destinationAddressId: destinationAddressId,
          estimationid: estimationid,
          // finalTransactionId: finalTransactionId,
          finalPaymentTypeId: finalPaymentTypeId,
          finalSubCategoryId: finalSubCategoryId,
        };
        localStorage.setItem(
          "razorpayDetails",
          JSON.stringify(razorpayDetails)
        );
        const razorpayPaymentURL = response.data.data;
        // const payment = new window.Razorpay(razorpayPaymentURL);
        // const paymentWindow = window.Razorpay(razorpayPaymentURL, "");
        console.log(response.data.data);
        // setFinalTransactionId(response.data.data.id);
        setFinalConfirmationModal(false);

        router.push(razorpayPaymentURL);
      } catch (error) {
        message_error(error);
      }
    } else if (paymentTypeName == "stripe") {
      console.log("stripe finalbill ", finalbill);

      try {
        const response = await http.post(
          `/api/v1/process-payment/stripe?booking_id=${bookingID}`,
          {
            amount: finalbill,
            vehicle_type: paymentVehicle,
            user_name: user,
          }
        );
        // const razorpayDetails = {
        //   pickUpAddressId: pickUpAddressId,
        //   destinationAddressId: destinationAddressId,
        //   estimationid: estimationid,
        //   // finalTransactionId: finalTransactionId,
        //   finalPaymentTypeId: finalPaymentTypeId,
        //   finalSubCategoryId: finalSubCategoryId,
        // };
        // localStorage.setItem(
        //   "razorpayDetails",
        //   JSON.stringify(razorpayDetails)
        // );
        const razorpayPaymentURL = response.data.data;
        // const payment = new window.Razorpay(razorpayPaymentURL);
        // const paymentWindow = window.Razorpay(razorpayPaymentURL, "");
        console.log("stripe response", response.data.data);
        // setFinalTransactionId(response.data.data.id);
        setFinalConfirmationModal(false);

        router.push(razorpayPaymentURL);
      } catch (error) {
        message_error(error);
      }
    } else {
      setFinalPaymentTypeId("");
      // toast.error("Tommorow");
    }
  };
  const userName = useAppSelector((state) => state.user.user.user);

  useEffect(() => {
    void fetchCategory();
    setUserName(userName || "");
    void payment_type();
  }, [payment_type, fetchCategory, userName]);

  return isLoaded ? (
    <>
      <div className={`flex h-full  flex-col gap-4 p-4 w-full overflow-auto `}>
        <motion.div
          initial={{ translateY: 40, opacity: 0 }}
          whileInView={{ translateY: 0, opacity: 1 }}
          transition={{
            type: "spring",
            damping: 15,
            stiffness: 300,
            duration: 1,
          }}
          className="flex gap-4 p-4 max-[769px]:flex-col w-full"
        >
          {mainmodel && (
            <>
              <div className="flex flex-col w-[30%] max-md:w-auto ">
                <div className=" w-full p-4 border shadow rounded flex flex-col gap-4">
                  <form className=" w-auto flex flex-col gap-2 ">
                    <div>
                      <h1 className="font-bold text-lg">Book A Percel</h1>
                    </div>
                    {/* Form input box */}
                    <div className="relative">
                      <div className="w-full">
                        <Autocomplete
                          onLoad={(autocomplete) => {
                            autocomplete.setComponentRestrictions({
                              country: "in",
                            }); // Restrict to India
                          }}
                        >
                          <input
                            required
                            type="text"
                            placeholder="From"
                            disabled={editloaction ? true : false}
                            ref={originRef}
                            value={fromlocation}
                            onChange={(e) =>
                              editloaction
                                ? null
                                : setfromlocation(e.target.value)
                            }
                            className={`pl-10 pr-4 py-2 text-sm border  rounded-lg w-full p-2 placeholder:text-gray placeholder:text-sm focus:outline-[#2967ff] ${
                              editloaction ? "cursor-not-allowed" : ""
                            }`}
                          ></input>
                        </Autocomplete>
                      </div>
                      <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
                        {/* <Image
                      src={green_marker}
                      alt="green marker"
                      className="w-6 h-6"
                    ></Image> */}
                        <HiOutlineLocationMarker className="text-green-500 text-xl w-5 h-5 ml-2" />
                      </div>
                    </div>
                    {/* TO input box */}
                    <div className="relative">
                      <div className="w-full">
                        <Autocomplete
                          onLoad={(autocomplete) => {
                            autocomplete.setComponentRestrictions({
                              country: "in",
                            }); // Restrict to India
                          }}
                        >
                          <input
                            type="text"
                            placeholder="To"
                            required
                            disabled={editloaction ? true : false}
                            className={`pl-10 pr-4 py-2 text-sm border  rounded-lg w-full p-2 placeholder:text-gray placeholder:text-sm focus:outline-[#2967ff] ${
                              editloaction ? "cursor-not-allowed" : ""
                            }`}
                            value={tolocation}
                            onChange={(e) =>
                              editloaction
                                ? null
                                : settolocation(e.target.value)
                            }
                            ref={destiantionRef}
                          ></input>
                        </Autocomplete>
                      </div>
                      <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
                        {/* <Image
                      src={red_marker}
                      alt="red marker"
                      className="w-6 h-6"
                    ></Image> */}
                        <HiOutlineLocationMarker className="text-red-500 text-xl w-5 h-5 ml-2" />
                      </div>
                    </div>
                  </form>
                  {/* <div
                className={`${
                  editloaction ? "cursor-not-allowed" : ""
                } rounded-full h-8 w-8 border-none bg-[#2967ff] flex justify-center items-center hover:scale-[1.1] transition-all duration-200 `}
              >
                <button
                  onClick={handleexchange}
                  className={`${editloaction ? "cursor-not-allowed" : ""}`}
                  disabled={editloaction ? true : false}
                >
                  <Image
                    src={exchange}
                    alt="exchange"
                    className="w-6 h-6"
                  ></Image>
                </button>
              </div> */}
                  <div className="w-auto flex gap-2 ">
                    {!editloaction == true ? (
                      <div className="w-full">
                        <button
                          className={`flex gap-2 text-white bg-[#2967ff] border rounded-lg border-none p-2 w-full font-semibold text-lg justify-center items-center${
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
                          onClick={() => {
                            seteditloaction(false);
                            setmodal(false);
                          }}
                        >
                          <div>Edit</div>
                          <div>
                            <Image src={blue_marker} alt="blue marker"></Image>
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                  {editloaction && (
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
                        className="w-auto flex flex-col gap-2   h-full py-4 "
                      >
                        {tolocation != null ? (
                          <div className="w-auto flex justify-start ">
                            <div className="flex gap-1 items-center">
                              <div>
                                {/* <Image src={red_marker} alt="red marker"></Image> */}
                                <HiOutlineLocationMarker className="text-red-500 text-xl w-5 h-5 ml-2" />
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
                        <div className="w-auto flex gap-2">
                          <form className="w-full  flex flex-col gap-2 h-full items-center">
                            <div className="w-full">
                              <input
                                type="text"
                                value={recieverAdress}
                                placeholder="House/Apartment (optional)"
                                className="text-sm border  rounded-lg w-full p-2 placeholder:text-gray placeholder:text-sm focus:outline-[#2967ff]"
                                onChange={(e) =>
                                  setRecieverAdress(e.target.value)
                                }
                              ></input>
                            </div>

                            <div className="w-full">
                              <input
                                type="text"
                                value={recieverName}
                                placeholder="Receiver's Name"
                                className="text-sm border  rounded-lg w-full p-2 placeholder:text-gray placeholder:text-sm focus:outline-[#2967ff]"
                                onChange={(e) =>
                                  setRecieverName(e.target.value)
                                }
                              ></input>
                            </div>
                            <div className="w-full">
                              <input
                                type="text"
                                value={recieverNo}
                                placeholder="Receiver's Mobile Number"
                                className="text-sm border  rounded-lg w-full p-2 placeholder:text-gray placeholder:text-sm focus:outline-[#2967ff]"
                                onChange={(e) => setRecieverNo(e.target.value)}
                              ></input>
                            </div>
                            <div className="w-full">
                              <button
                                className={`flex  text-white bg-[#2967ff] border rounded-lg border-none p-2 w-full font-semibold text-lg justify-center items-center ${
                                  !editloaction
                                    ? "cursor-not-allowed"
                                    : "cursor-pointer"
                                }`}
                                disabled={!editloaction ? true : false}
                                onClick={(e) => handlepayment(e)}
                              >
                                <div>Confirm And Proceed</div>
                              </button>
                            </div>
                          </form>
                          {/* <div className="max-[769px]:flex hidden w-1/2 justify-center items-center">
                        <div className="flex flex-col text-[40px] font-extrabold text-[#2967ff] justify-center items-end max-w-full px-3 ">
                          <div>{"Hai"}</div>

                          <div>{"Delivery?"}</div>
                          <div className="text-[#2152cc]">{"HoJayega!"}</div>
                        </div>
                      </div> */}
                        </div>
                      </motion.div>
                    </>
                  )}
                </div>
              </div>
              {modal && (
                <div className="w-[50%] max-md:w-auto h-[500px]">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full"
                  >
                    <div className="h-full scrollbarmap bg-white rounded-lg shadow overflow-auto flex flex-col items-center  ">
                      {isLoading ? (
                        <div className="flex justify-center items-center h-full">
                          <div className="loader ease-linear rounded-full border-8 border-t-8 border-[#2967ff] h-20 w-20"></div>
                        </div>
                      ) : (
                        <>
                          {userSelect.map((item, index) => (
                            <>
                              <button
                                className="w-full flex justify-between items-center border-b p-4 hover:bg-gray-50  transition-all ease-in-out  duration-200 cursor-pointer"
                                key={index}
                                onClick={() => handleAddData(item)}
                              >
                                <div className="flex w-auto p-1 gap-4">
                                  <div className="w-1/2">
                                    <Image
                                      src={
                                        vehiclephoto[String(item.vehicle_type)]
                                      }
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
                                  <div className="font-semibold">
                                    {item.total_amount}
                                  </div>
                                </div>
                              </button>
                            </>
                          ))}
                          <div className="w-1/2 p-1 flex justify-center">
                            <button
                              className={`w-full border-none ${
                                proceed ? "bg-[#2967ff]" : "bg-gray-200"
                              } text-white p-2 font-semibold rounded-lg text-md active:scale-95 transition-all ease-in`}
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
                            {/* </div> */}
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                </div>
              )}

              <div className="w-full  flex max-md:w-full max-md:h-[450px] ">
                {/* google maps is here */}

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
                      <div
                        dangerouslySetInnerHTML={{ __html: infoWindowText }}
                      />
                    </InfoWindow>
                  )}
                </GoogleMap>
              </div>
            </>
          )}

          {/* this is a estimate model */}
        </motion.div>

        {payment && (
          <>
            <div className="w-full rounded-lg flex gap-2 p-4 max-md:flex max-md:flex-col max-md:w-auto ">
              <div className="rounded-lg w-1/2 flex flex-col gap-4 item-start p-2 max-md:w-full">
                <motion.div
                  initial={{ translateY: 40, opacity: 0 }}
                  whileInView={{ translateY: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    damping: 15,
                    stiffness: 300,
                    duration: 1,
                  }}
                  className="flex flex-col gap-1 border rounded-lg"
                >
                  <div className="flex flex-wrap items-center justify-center">
                    {paymentType.map((item) => (
                      <button
                        key={item.id}
                        className={`flex items-center justify-center px-4 py-2 m-1 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          paymentTypeName === item.payment_type
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                        onClick={() => {
                          setPaymentTypeName(item.payment_type);
                          setFinalPaymentTypeId(item.id);
                        }}
                      >
                        {item.payment_type}
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2 p-4">
                    <div className="flex flex-col gap-2 w-full">
                      <label
                        htmlFor="user"
                        className="font-bold text-sm flex gap-2 items-center"
                        onClick={fetchCouponData}
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
                          className="p-2 w-full border border-gray-400 text-sm rounded-md focus:outline-[#2967ff]"
                          disabled={removeCoupon ? true : false}
                          value={finalcoupon}
                          onChange={(e) =>
                            removeCoupon ? null : setfinalcoupon(e.target.value)
                          }
                        />
                        <button
                          className=" w-1/4 bg-[#2967ff] rounded-md text-white font-semibold text-lg p-2 max-md:text-base "
                          onClick={handleCheckCoupon}
                        >
                          {removeCoupon ? <>{"remove"}</> : <>{"Apply"}</>}
                        </button>
                      </div>
                      <div></div>
                      {coupon && (
                        <>
                          <div className="flex flex-col gap-4">
                            <div className="border-b border-gray-400 px-2 pt-2 font-semibold text-sm text-gray-400">
                              Available Coupons
                            </div>
                            <div className="flex flex-col gap-2 px-2 pt-2 border rounded-md pb-2  max-h-[200px] overflow-auto overflow-x-hidden">
                              {couponData.length !== 0 ? (
                                <div className="flex flex-col gap-2 ">
                                  {couponData.map((item, index) => (
                                    <div
                                      className="flex flex-col gap-2 hover:bg-gray-100 transition ease-in duration-300 p-2 border"
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
                                              apply_coupon === item.coupon_code
                                                ? "border-green-500 text-green-500"
                                                : ""
                                            }`}
                                            onClick={() => {
                                              navigator.clipboard.writeText(
                                                item.coupon_code
                                              );
                                              setapply_coupon(item.coupon_code);
                                              setcouponid(item.id);
                                            }}
                                          >
                                            {apply_coupon ===
                                            item.coupon_code ? (
                                              <div className="flex items-center gap-2 ">
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
                      <div className="flex gap-2 w-full max-md:flex-col max-md:w-full">
                        <div className="w-1/2 max-md:w-auto">
                          <label
                            htmlFor="categories"
                            className="text-sm font-medium mb-1 max-md:text-xs max-md:font-normal"
                          >
                            Select Categories
                            <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="categories"
                            className="p-2 focus:outline-[#2967ff] border border-gray-400 rounded-md w-full font-medium text-black text-sm max-md:text-xs"
                            onChange={(e) => handlesubcategory(e.target.value)}
                            defaultValue="select your option" // Add this line
                          >
                            <option value="select your option" disabled>
                              Select your option
                            </option>
                            {category.map((item, index) => (
                              <option key={index} value={item.id}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="w-1/2 max-md:w-auto">
                          <label
                            htmlFor="subcategories"
                            className="text-sm font-medium mb-1 max-md:text-xs max-md:font-normal"
                          >
                            Select Subcategories
                            <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="subcategories"
                            className="p-2 focus:outline-[#2967ff] border border-gray-400 rounded-md w-full font-medium text-black text-sm max-md:text-xs"
                            onChange={(e) =>
                              setFinalSubCategoryId(e.target.value)
                            }
                            required
                            defaultValue="select your option"
                          >
                            <option value="select your option" disabled>
                              Select your option
                            </option>
                            {subCategory.map((item, index) => (
                              <option key={index} value={item.id}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="flex w-full ">
                        <button
                          className="w-full bg-[#2967ff] text-white font-semibold text-lg p-2 rounded-md text-center max-md:text-base"
                          onClick={final_Book}
                        >
                          Proceed
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              <div className="bg-gray-100 w-full lg:w-1/2 rounded-lg flex flex-col gap-4 p-6 h-full">
                <motion.div
                  initial={{ translateY: 40, opacity: 0 }}
                  whileInView={{ translateY: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    damping: 15,
                    stiffness: 300,
                    duration: 1,
                  }}
                  className="flex flex-col gap-2 border rounded-lg bg-white shadow-md p-6"
                >
                  <h2 className="text-3xl font-bold text-gray-800 max-[916px]:text-2xl">
                    Payment Details
                  </h2>
                  <p className="text-md text-gray-600 font-light max-[916px]:text-sm">
                    Check your Payment Details
                  </p>
                  <div className="border-b border-gray-300 w-full flex justify-between items-center py-4 max-md:flex-col ">
                    <div className="flex items-center gap-2 ">
                      <HiOutlineLocationMarker className="text-green-500 text-xl" />
                      <div>
                        <p className="text-sm font-semibold text-gray-700">
                          From
                        </p>
                        <p className="text-sm text-gray-600 break-words max-md:text-clip max-md:w-auto">
                          {fromlocation}
                        </p>
                      </div>
                    </div>

                    <div className="mx-4 max-md:m-3">
                      <IoIosArrowRoundForward className="text-gray-400 text-2xl max-md:rotate-90 " />
                    </div>

                    <div className="flex items-center gap-2">
                      <HiOutlineLocationMarker className="text-red-500 text-xl" />
                      <div>
                        <p className="text-sm font-semibold text-gray-700">
                          To
                        </p>
                        <p className="text-sm text-gray-600 break-words max-md:text-clip max-md:w-auto">
                          {tolocation}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="px-2 font-bold text-gray-800">
                    Fare Summary
                  </div>
                  <div className="border border-dashed border-gray-300 rounded-md flex flex-col gap-2 p-4">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600">
                        Trip Fare (incl. Toll)
                      </p>
                      <div className="text-sm text-gray-600 flex items-center">
                        <FaIndianRupeeSign className="text-xs" />
                        <span>{formatNumberWithCommas(netfare)}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600 cursor-pointer flex gap-2 items-center">
                        <button
                          className="border border-gray-400 py-1 px-2 rounded-sm hover:bg-gray-100 transition-colors duration-200"
                          onClick={() => {
                            setmodal(true);
                            setpayment(false);
                            setmainmodel(true);
                          }}
                        >
                          Change
                        </button>
                        <span>-{continue_text}</span>
                      </div>
                    </div>
                    {showCouponInBill && (
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-600">
                          Coupon discount - {finalcoupon}
                        </p>
                        <div className="text-sm text-green-600 flex items-center">
                          <span>-</span>
                          <FaIndianRupeeSign className="text-xs" />
                          <span>{formatNumberWithCommas(couponAmount)}</span>
                        </div>
                      </div>
                    )}
                    <div className="flex justify-between items-center border-t border-gray-300 py-2">
                      <p className="text-sm text-gray-600">Net Fare</p>
                      <div className="text-sm text-gray-600 flex items-center">
                        <FaIndianRupeeSign className="text-xs" />
                        <span>{formatNumberWithCommas(netfare)}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center border-t border-gray-300 py-2">
                      <p className="text-sm font-semibold text-gray-800">
                        Amount Payable
                      </p>
                      <div className="text-sm font-bold text-gray-800 flex items-center">
                        <FaIndianRupeeSign className="text-xs" />
                        <span>{formatNumberWithCommas(finalbill)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center text-gray-500 text-xs gap-1">
                    <RiLockPasswordLine className="text-base" />
                    <span>Payments are secured and encrypted</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </>
        )}

        {/* final confirmation model */}
        {finalConfirmationModal && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full h-full max-md:overflow-hidden bg-black bg-opacity-50 z-[100] flex justify-center items-center "
          >
            <div className="bg-white rounded-lg shadow-lg w-1/2 max-md:w-auto  flex flex-col items-start justify-start p-4 gap-3">
              <div className="text-xl font-semibold ">
                Are you sure you want to book?
              </div>
              <div className="w-full items-center justify-end flex gap-2 ">
                <div className="w-2/5 max-md:w-auto flex gap-4">
                  <button
                    className={`w-1/2 max-md:w-auto bg-[#2967ff] py-1 px-2 text-lg rounded text-white hover:bg-[#2152cc] transition ease-in duration-150 flex items-center justify-center ${
                      isLoading ? "opacity-75 cursor-not-allowed" : ""
                    }`}
                    onClick={handleBook}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center ">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span className="ml-2">Loading...</span>
                      </div>
                    ) : (
                      "Confirm"
                    )}
                  </button>
                  <button
                    className={`w-1/2 border border-black text-black py-1 px-2 text-lg rounded-md hover:border-[#2967ff] transition ease-in duration-150 ${
                      isLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() => setFinalConfirmationModal(false)}
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {confirm && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 grid place-items-center">
              <div className="bg-white rounded-xl shadow-lg p-4 text-center w-[300px]">
                <div className="mx-auto  grid place-content-center w-full">
                  <Image
                    src={confirmPayment}
                    width={200}
                    height={200}
                    alt="Confirmation mark"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Congratulations!
                </h3>
                <p className="text-gray-600">Your order has been created.</p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  ) : (
    <></>
  );
}

export default Dashboard;