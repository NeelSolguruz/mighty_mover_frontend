"use client";
import React, {
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
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
import {
  category_interface,
  coupon,
  paymnet_type_interface,
  userSelectInterface,
} from "@/constant/type/data.type";
import { User_select } from "@/constant/twoWheeler";
import { FaIndianRupeeSign } from "react-icons/fa6";
import Animation from "./Animation";
import AnimationGif from "./Animation";
import { useRouter } from "next/navigation";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useAppSelector } from "@/redux/hooks";
import Payment_complete from "./Payment_complete";
// import Razorpay from "razorpay";
// Extend the Window interface to include Razorpay
// interface CustomWindow extends Window {
// Razorpay?: any; // Adjust the type according to your usage
// }

// Declare Razorpay on window
// declare const window: CustomWindow;

// Now you can use window.Razorpay without TypeScript errors
// window.Razorpay?.(options);

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
  const [distance, setdistance] = useState(0);
  const [couponData, setCouponData] = useState<coupon[]>([]);
  const [apply_coupon, setapply_coupon] = useState("");
  const [category, setCategory] = useState<category_interface[]>([]);
  const [couponid, setcouponid] = useState("");
  const [data_driverid, setDataDriverId] = useState("");
  const [modal, setmodal] = useState(false);
  const [proceed, setproceed] = useState(false);
  const [continue_text, setcontinue] = useState("");
  const [userSelect, setUserSelect] = useState<userSelectInterface[]>([]);
  const [Estimation, setEstimationAmount] = useState("");
  const [finalbill, setfinalbill] = useState("");
  const [netfare, setnefare] = useState("");
  const [showCouponInBill, setShowCouponInBill] = useState(false);
  const [finalcoupon, setfinalcoupon] = useState("");
  const [estimationid, setestimationid] = useState("");
  const [couponAmount, setCouponAmount] = useState("");
  const [userSelectEstimationId, setUserSelectEstimationId] = useState("");
  const [subCategory, setSubCategory] = useState<category_interface[]>([]);
  const [removeCoupon, setremoveCoupon] = useState(false);
  const [paymentType, setPaymentType] = useState<paymnet_type_interface[]>([]);
  const [paymentTypeName, setPaymentTypeName] = useState("cash");
  const [confirmPayModal, setConfirmPayModal] = useState(false);
  const [pickUpAddressId, setPickUpAddressId] = useState("");
  const [destinationAddressId, setDestinationAddressId] = useState("");
  const [finalTransactionId, setFinalTransactionId] = useState("");
  const [finalPaymentTypeId, setFinalPaymentTypeId] = useState("");
  const [finalSubCategoryId, setFinalSubCategoryId] = useState("");
  const [finalConfirmationModal, setFinalConfirmationModal] = useState(false);
  const [animationGif, setanimationGif] = useState(false);
  const [paymentVehicle, setPaymentTypeVehicle] = useState("");
  const [user, setUserName] = useState("");
  const [bookingID, setBookingID] = useState("");
  const router = useRouter();
  const vehiclephoto = {
    "2 wheeler": Bike,
    "Tata ace": small_truck2,
    auto: small_truck3,
    "3 wheeler": small_truck1,
    "8 ft": big_truck1,
    "14 ft": big_truck2,
    "1.7 ton": big_truck3,
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
    const origin_data = originRef.current.value;
    originRef.current.value = destiantionRef.current.value;
    destiantionRef.current.value = origin_data;
    const destLat = directionsResponse?.routes[0]?.legs[0]?.end_location?.lat();
    console.log("hello there : ", destLat);

    const destLng = directionsResponse?.routes[0]?.legs[0]?.end_location?.lng();
    fetchDestinationarea(destLat, destLng);
  };
  async function calculateRoute() {
    console.log(originRef.current.value);

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
      setPickUpAddressId(response.data.data.pickup_address_id);
      setDestinationAddressId(response.data.data.delivery_address_id);
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
      const response = await http.get(
        `/api/v1/estimation/${userSelectEstimationId}`
      );
      console.log(response);
      setfinalbill(response.data.data.total_amount);
      setnefare(response.data.data.total_amount);
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
  };
  const handleBook = async () => {
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
        const response = await http.post(`/api/v1/payments/${bookingID}`, {
          amount: finalbill,
          status: 0,
          payment_type: 0,
        });

        setanimationGif(true);
        toast.success(response.data.message);
        setTimeout(() => {
          router.push("/Booking");
        }, 2000);
        // setFinalTransactionId(response.data.data.id);
      } catch (error) {
        message_error(error);
      }
    } else if (paymentTypeName == "razorpay") {
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
        setFinalTransactionId(response.data.data.id);
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
        setFinalTransactionId(response.data.data.id);
        setFinalConfirmationModal(false);

        router.push(razorpayPaymentURL);
      } catch (error) {
        message_error(error);
      }
    } else {
      toast.error("Tommorow");
    }
  };

  // const downloadPdf = () => {
  //   const doc = new jsPDF("p", "mm", "a4");

  //   // Add a title
  //   doc.setTextColor(0, 0, 255); // Set text color to blue
  //   doc.setFontSize(20);
  //   doc.text("Receipt", 10, 10);

  //   doc.setFontSize(15);
  //   doc.setTextColor(0);
  //   doc.setFont("helvetica", "bold");
  //   doc.text("Mighty Movers", 80, 10);

  //   doc.setFontSize(8);
  //   doc.setTextColor(0);
  //   doc.setFont("helvetica", "normal");
  //   doc.text("Mighty Movers Head Office, 10, Sundarvan", 80, 15);
  //   doc.text("Society, Besides Hyatt Regency, Ashram Rd,", 80, 19);
  //   doc.text("Usmanpura, Ahmedabad, Gujarat 380014", 80, 23);

  //   doc.setFontSize(10);
  //   doc.setTextColor(0);
  //   doc.setFont("helvetica", "bold");
  //   doc.text("Order ID:", 170, 8);

  //   doc.setFontSize(7);
  //   doc.setTextColor(0);
  //   doc.setFont("helvetica", "normal");
  //   doc.text("123WSDSKJ231298Y98Y", 170, 12);

  //   doc.setTextColor(0); // Reset text color to black
  //   doc.setFontSize(12);
  //   doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, 20);

  //   // Add bill details
  //   const billData = [
  //     { item: "Item 1", quantity: 2, price: 10 },
  //     { item: "Item 2", quantity: 1, price: 20 },
  //     { item: "Item 3", quantity: 3, price: 15 },
  //   ];

  //   const startY = 30;
  //   const lineHeight = 10;
  //   const startX = 10;
  //   const cellWidth = 50;
  //   const cellPadding = 5;

  //   doc.setFontSize(12);
  //   doc.setTextColor(0); // Reset text color to black
  //   doc.text("Item", startX, startY);
  //   doc.text("Quantity", startX + cellWidth, startY);
  //   doc.text("Price", startX + cellWidth * 2, startY);

  //   billData.forEach((item, index) => {
  //     const y = startY + (index + 1) * lineHeight;
  //     doc.text(item.item, startX, y);
  //     doc.text(item.quantity.toString(), startX + cellWidth, y);
  //     doc.text(item.price.toString(), startX + cellWidth * 2, y);
  //   });

  //   // Add total
  //   const total = billData.reduce(
  //     (acc, item) => acc + item.quantity * item.price,
  //     0
  //   );
  //   doc.text(
  //     `Total: ${total}`,
  //     startX + cellWidth * 2,
  //     startY + (billData.length + 1) * lineHeight
  //   );

  //   doc.save("receipt.pdf");
  // };
  const userName = useAppSelector((state) => state.user.user.user);

  useEffect(() => {
    void fetchCategory();
    setUserName(userName || ""); // Provide a default value for the setUserName function
    void payment_type();
  }, [payment_type]);

  return isLoaded ? (
    <>
      {animationGif ? (
        <>
          <AnimationGif />
        </>
      ) : (
        <div
          className={`flex flex-col gap-4 p-4 w-full  ${
            animationGif ? "overflow-y-hidden" : "overflow-auto"
          }`}
        >
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
            <div className="flex flex-col max-w-1/4 justify-start items-center gap-4 rounded-2xl h-[80%] max-md:w-full">
              <div
                className={`flex w-auto gap-5 items-center border border-green-500`}
              >
                <form className="flex flex-col gap-2 w-auto max-[769px]:flex-row max-[769px]:gap-0 max-[426px]:flex-col max-[426px]:gap-2 ">
                  <div className="w-full flex gap-2 items-center max-[769px]:w-1/2 max-[426px]:w-full">
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
                            className={`pl-10 pr-4 py-2 text-sm border border-black rounded-lg w-full p-2 placeholder:text-gray placeholder:text-sm focus:outline-[#2967ff] ${
                              editloaction ? "cursor-not-allowed" : ""
                            }`}
                          ></input>
                        </Autocomplete>
                      </div>
                      <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
                        <Image
                          src={green_marker}
                          alt="green marker"
                          className="w-8 h-8"
                        ></Image>
                      </div>
                    </div>
                  </div>
                  <div className="w-full  flex gap-2 items-center max-[769px]:w-1/2 max-[426px]:w-full">
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
                            className={`pl-10 pr-4 py-2 text-sm border border-black rounded-lg w-full p-2 placeholder:text-gray placeholder:text-sm focus:outline-[#2967ff] ${
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
                        <Image
                          src={red_marker}
                          alt="green marker"
                          className="w-8 h-8"
                        ></Image>
                      </div>
                    </div>
                  </div>
                </form>
                <div
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
                </div>
              </div>
              <div className="w-full flex gap-2 items-center ">
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
                    <div className="w-full flex gap-2">
                      <form className="w-full  flex flex-col gap-2 h-full items-center max-[769px]:w-1/2">
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
                      <div className="max-[769px]:flex hidden w-1/2 justify-center items-center">
                        <div className="flex flex-col text-[40px] font-extrabold text-[#2967ff] justify-center items-end max-w-full px-3 ">
                          <div>{"Hai"}</div>

                          <div>{"Delivery?"}</div>
                          <div className="text-[#2152cc]">{"HoJayega!"}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </>
              ) : (
                <>
                  <div className="flex flex-col text-[40px] font-extrabold text-[#2967ff] justify-start items-start max-w-full px-3 py-10 max-[1261px]:text-[35px] max-[1024px]:text-[30px] max-[769px]:hidden">
                    <div>{"Delivery  Hai?"}</div>
                    <div className="text-[#2152cc]">{"HoJayega!"}</div>
                  </div>
                </>
              )}
            </div>
            <div className="w-3/4 max-w-1/4 border border-green-500 max-[769px]:w-full  max-[769px]:h-[450px] max-[426px]:h-[230px]">
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
          {finalConfirmationModal && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[1000000000000] flex justify-center items-center "
            >
              <div className="bg-white rounded-lg shadow-lg w-1/2  flex flex-col items-start justify-start p-4 gap-3">
                <div className="text-xl font-semibold">
                  Are you sure you want to book?
                </div>
                <div className="w-full items-center justify-end flex gap-2">
                  <button
                    className="bg-black text-white py-1 px-2 text-lg rounded-md hover:text-black hover:bg-white hover:border hover:border-black transition ease-in duration-150"
                    onClick={handleBook}
                  >
                    Ok
                  </button>
                  <button
                    className="border border-black text-black py-1 px-2 text-lg rounded-md hover:bg-red-600 hover:text-white transition ease-in duration-150 hover:border-red-600"
                    onClick={() => setFinalConfirmationModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          )}
          {}
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
                    className="flex flex-col gap-1 border rounded-lg"
                  >
                    <div className="flex">
                      {paymentType.map((item) => (
                        <div
                          key={item.id}
                          className={`border p-2 m-1 cursor-pointer rounded-t-lg focus:outline-none focus:bg-blue-200 ${
                            paymentTypeName === item.payment_type
                              ? "bg-blue-200 border-blue-400 text-blue-800"
                              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                          }`}
                          onClick={() => {
                            // setcard(!card);
                            setPaymentTypeName(item.payment_type);
                            setFinalPaymentTypeId(item.id);
                            console.log(
                              "setPaymentTypeName is :",
                              item.payment_type
                            );
                            console.log("setFinalPaymentTypeId is :", item.id);
                          }}
                        >
                          {item.payment_type}
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col gap-2 p-4">
                      <div className="flex flex-col gap-4 w-full">
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
                            className="p-2 w-3/4 border border-gray-400 text-sm rounded-md"
                            disabled={removeCoupon ? true : false}
                            value={finalcoupon}
                            onChange={(e) =>
                              removeCoupon
                                ? null
                                : setfinalcoupon(e.target.value)
                            }
                          />
                          <button
                            className="p-2 w-1/4 bg-black rounded-md text-white"
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
                              <div className="flex flex-col gap-2 px-2 pt-2 border rounded-md pb-2 shadow-sm shadow-gray-400 max-h-[200px] overflow-auto overflow-x-hidden">
                                {couponData.length !== 0 ? (
                                  <div className="flex flex-col gap-2 ">
                                    {couponData.map((item, index) => (
                                      <div
                                        className="flex flex-col gap-2 rounded-lg border-gray-400 hover:bg-gray-100 transition ease-in duration-300 p-2 border"
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
                                                apply_coupon ===
                                                item.coupon_code
                                                  ? "border-green-500 text-green-500"
                                                  : ""
                                              }`}
                                              onClick={() => {
                                                navigator.clipboard.writeText(
                                                  item.coupon_code
                                                );
                                                setapply_coupon(
                                                  item.coupon_code
                                                );
                                                setcouponid(item.id);
                                              }}
                                            >
                                              {apply_coupon ===
                                              item.coupon_code ? (
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
                        <div className="flex gap-2 w-full">
                          <div className="w-1/2 ">
                            <select
                              className="p-2 border border-black rounded-md w-full font-light text-black text-[10px] shadow-lg shadow-gray-400"
                              onChange={(e) =>
                                handlesubcategory(e.target.value)
                              }
                            >
                              <option
                                value="select your option"
                                // defaultValue={"select value"}
                              >
                                select your option
                              </option>
                              {category.map((item, index) => (
                                <option key={index} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="w-1/2">
                            <select
                              className="p-2 border border-black rounded-md w-full font-light text-black text-[10px] shadow-lg shadow-gray-400"
                              onChange={(e) =>
                                setFinalSubCategoryId(e.target.value)
                              }
                            >
                              <option
                                value="select your option"
                                // defaultValue={"select value"}
                              >
                                select your option
                              </option>
                              {subCategory.map((item, index) => (
                                <>
                                  <option key={index} value={item.id}>
                                    {item.name}
                                  </option>
                                </>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="flex w-full ">
                          <button
                            className="w-full bg-[#2967ff] text-white font-semibold text-lg p-2 rounded-md text-center"
                            onClick={final_Book}
                          >
                            Proceed
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
                <div className="bg-gray-100 w-1/2 rounded-lg flex flex-col gap-2 p-4 h-full">
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
                    <div className="text-4xl text-black font-bold max-[916px]:text-3xl">
                      Payment Details
                    </div>
                    <div className="text-md text-black font-light max-[916px]:text-sm">
                      Check your Payment Details
                    </div>
                    <div className=" border-b-2 border-black flex-row flex justify-between items-center">
                      <div className="flex flex-col gap-2 p-2">
                        <div className="text-2xl font-bold flex gap-2 items-center max-[916px]:text-lg ">
                          <Image src={green_marker} alt="green marker"></Image>
                          From:
                        </div>
                        <div className="text-start text-xs">
                          <div>{originRef?.current?.value}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center  min-w-[24px]">
                        <Image
                          src={arrow_right}
                          alt="arrow"
                          className="min-w-[24px]"
                        ></Image>
                      </div>
                      <div className="flex flex-col gap-2 p-2">
                        <div
                          className="text-2xl font-bold flex gap-2 items-end justify-end max-[916px]:text-lg
                  "
                        >
                          <Image src={red_marker} alt="red marker"></Image>
                          To:
                        </div>
                        <div className="text-end text-xs">
                          <div>{destiantionRef?.current?.value}</div>
                        </div>
                      </div>
                    </div>
                    <div className="px-2 font-bold">Fare Sumamary</div>
                    <div className="border border-dashed border-black rounded-md flex flex-col p-2 gap-2">
                      <div className="flex w-full justify-between items-center">
                        <div className="text-sm font-normal ">
                          Trip Fare {"(incl.Toll)"}
                        </div>
                        <div className="text-sm font-normal text-start flex items-center">
                          <FaIndianRupeeSign className="text-xs" />

                          {formatNumberWithCommas(netfare)}
                        </div>
                      </div>
                      <div className="flex w-full justify-between items-center">
                        <div className="text-sm font-normal cursor-pointer flex gap-2 items-center ">
                          <div
                            className="border border-black py-0 px-1 rounded-sm"
                            onClick={() => setmodal(true)}
                          >
                            Change
                          </div>
                          -{continue_text}
                        </div>
                      </div>
                      {showCouponInBill && (
                        <div className="flex w-full justify-between items-center">
                          <div className="text-sm font-normal">
                            Coupon discount - {finalcoupon}
                          </div>
                          <div className="text-sm font-normal text-green-500 text-start flex items-center">
                            -
                            <FaIndianRupeeSign className="text-xs" />
                            {formatNumberWithCommas(couponAmount)}
                          </div>
                        </div>
                      )}
                      <div className="flex w-full justify-between border-t border-gray-400 py-2 items-center">
                        <div className="text-sm font-normal">Net Fare</div>
                        <div className="text-sm font-normal text-start flex items-center">
                          <FaIndianRupeeSign className="text-xs" />

                          {formatNumberWithCommas(netfare)}
                        </div>
                      </div>
                      <div className="flex w-full justify-between border-t border-gray-400 py-2 items-center">
                        <div className="text-sm font-semibold">
                          Amount Payable
                        </div>
                        <div className="text-sm font-bold text-start flex items-center">
                          <FaIndianRupeeSign className="text-xs" />

                          {formatNumberWithCommas(finalbill)}
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full text-gray-400 justify-center items-center text-xs gap-1">
                      <Image src={lock} alt="lock" className="h-4 w-4"></Image>
                      Payments are secured and encrypted
                    </div>
                  </motion.div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  ) : (
    <></>
  );
}

// {true && (
//   <>
//     <div className="bg-gray-100 w-1/2 rounded-lg flex flex-col gap-2 p-4 h-full pdfdownload">
//       <div className="text-4xl text-black font-bold max-[916px]:text-3xl">
//         Payment Details
//       </div>
//       <div className="text-md text-black font-light max-[916px]:text-sm">
//         Check your Payment Details
//       </div>
//       <div className=" border-b-2 border-black flex-row flex justify-between items-center">
//         <div className="flex flex-col gap-2 p-2">
//           <div className="text-2xl font-bold flex gap-2 items-center max-[916px]:text-lg ">
//             <Image src={green_marker} alt="green marker"></Image>
//             From:
//           </div>
//           <div className="text-start text-xs">
//             <div>{originRef?.current?.value}</div>
//           </div>
//         </div>
//         <div className="flex items-center justify-center  min-w-[24px]">
//           <Image
//             src={arrow_right}
//             alt="arrow"
//             className="min-w-[24px]"
//           ></Image>
//         </div>
//         <div className="flex flex-col gap-2 p-2">
//           <div
//             className="text-2xl font-bold flex gap-2 items-end justify-end max-[916px]:text-lg
//             "
//           >
//             <Image src={red_marker} alt="red marker"></Image>
//             To:
//           </div>
//           <div className="text-end text-xs">
//             <div>{destiantionRef?.current?.value}</div>
//           </div>
//         </div>
//       </div>
//       <div className="px-2 font-bold">Fare Sumamary</div>
//       <div className="border border-dashed border-black rounded-md flex flex-col p-2 gap-2">
//         <div className="flex w-full justify-between items-center">
//           <div className="text-sm font-normal ">
//             Trip Fare {"(incl.Toll)"}
//           </div>
//           <div className="text-sm font-normal text-start flex items-center">
//             <FaIndianRupeeSign className="text-xs" />

//             {formatNumberWithCommas(netfare)}
//           </div>
//         </div>
//         <div className="flex w-full justify-between items-center">
//           <div className="text-sm font-normal cursor-pointer flex gap-2 items-center ">
//             {continue_text}
//           </div>
//         </div>
//         {showCouponInBill && (
//           <div className="flex w-full justify-between items-center">
//             <div className="text-sm font-normal">
//               Coupon discount - {finalcoupon}
//             </div>
//             <div className="text-sm font-normal text-green-500 text-start flex items-center">
//               -
//               <FaIndianRupeeSign className="text-xs" />
//               {formatNumberWithCommas(couponAmount)}
//             </div>
//           </div>
//         )}
//         <div className="flex w-full justify-between border-t border-gray-400 py-2 items-center">
//           <div className="text-sm font-normal">Net Fare</div>
//           <div className="text-sm font-normal text-start flex items-center">
//             <FaIndianRupeeSign className="text-xs" />

//             {formatNumberWithCommas(netfare)}
//           </div>
//         </div>
//         <div className="flex w-full justify-between border-t border-gray-400 py-2 items-center">
//           <div className="text-sm font-semibold">Amount Payable</div>
//           <div className="text-sm font-bold text-start flex items-center">
//             <FaIndianRupeeSign className="text-xs" />

//             {formatNumberWithCommas(finalbill)}
//           </div>
//         </div>
//       </div>
//       <div className="flex w-full text-gray-400 justify-center items-center text-xs gap-1">
//         <Image src={lock} alt="lock" className="h-4 w-4"></Image>
//         Payments are secured and encrypted
//       </div>
//     </div>
//     {/* <div>
//       <button onClick={downloadPdf}>Download</button>
//     </div> */}
//   </>
// )}
