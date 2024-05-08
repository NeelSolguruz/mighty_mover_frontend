"use client";
import Image from "next/image";
import { FaRegAddressCard, FaTruck } from "react-icons/fa";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { use, useCallback, useEffect, useLayoutEffect, useState } from "react";
import NavLogo from "@/assets/Images/icons/NavLogo";
import { NAVBAR } from "@/constant/constant";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useradd, userlogout } from "@/redux/userSlice";
import { useAppSelector } from "@/redux/hooks";
import http, { ApiErrorData } from "@/http/http";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import Loader from "react-js-loader";
import {
  angle_down,
  arrow_right,
  cross,
  user_circle,
} from "@/assets/Images/imageassets";
import { motion, useAnimationControls } from "framer-motion";
import { useRouter } from "next/navigation";
import { driverAdd, driverLogout } from "@/redux/driverSlice";
import { IoMdNotificationsOutline } from "react-icons/io";
import DisplayNotifications from "./DisplayNotifications";
import { json } from "stream/consumers";

interface Address {
  id: string;
  state: string;
  district: string;
  area: string;
}
export default function Navbar() {
  const router = useRouter();

  const [clicked, setClicked] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState(null);
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [area, setArea] = useState("");

  const [profile, setprofile] = useState(false);
  const [addressesModel, setOpenAddressesModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show, setshow] = useState(false);
  const [addressData, setAddressData] = useState<Address>();
  const [displayAdressData, setDisplayAddressData] = useState<Address[]>([]);

  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user);
  const driver = useAppSelector((state) => state.driver);
  // console.log("user", user);
  // console.log("driver", driver);

  const handleClick = () => {
    setClicked(!clicked);
  };
  const handleProfile = () => {
    setprofile(!profile);
  };
  const containerVariants = {
    close: {
      x: "-300px",
      transition: {
        type: "spring",
        damping: 20,
        duration: 1,
      },
    },
    open: {
      x: "-3px",
      transition: {
        type: "spring",
        damping: 20,
        duration: 1,
      },
    },
  };
  const containerControls = useAnimationControls();

  const [notificationPanel, setNotificationPanel] = useState(false);

  const handleNotification = () => {
    setNotificationPanel(!notificationPanel);
  };

  const clearstorage = async () => {
    console.log("click");
    console.log("click", user);
    try {
      // console.log(user.user.user === "prit" || driver.driver.driver);
      const localUser = localStorage.getItem("user");
      const driverData = localStorage.getItem("driver");
      if (localUser) {
        const logout_data = await http.get("/api/v1/user/logout");
        toast.success(logout_data.data.message);
        console.log("api hit");
        dispatch(userlogout());
      } else if (driverData) {
        const logout_data = await http.get("/api/v1/driver/logout");
        toast.success(logout_data.data.message);
        dispatch(driverLogout());
      } else {
        console.log("tryagain");
      }
    } catch (error) {
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
    }
  };
  const handleClose = () => {
    setClicked(false);
  };
  const openprofile = () => {
    if (user) {
      console.log("user is logged in");
      router.push("/profile", { scroll: false });
    } else {
      console.log("driver is logged in");
      router.push("/driver-profile", { scroll: false });
    }
  };
  const [sidecomment, setsidecomment] = useState(false);

  // useEffect(() => {
  //   if (addressData) {
  //     const fetchAddressaData = async () => {
  //       try {
  //         const response = await http.get(
  //           `/api/v1/driver/address/${addressData}`
  //         );
  //         console.log(response.data.data);
  //         setAddressData(response.data.data.id);
  //         setState(response.data.data.state);
  //         setDistrict(response.data.data.district);
  //         setArea(response.data.data.area);
  //       } catch (error) {
  //         if (axios.isAxiosError(error)) {
  //           const axiosError = error as AxiosError<ApiErrorData>;
  //           if (axiosError.response) {
  //             console.log("Response Error", axiosError.response);
  //             toast.error(axiosError.response.data.message);
  //           } else if (axiosError.request) {
  //             console.log("Request Error", axiosError.request);
  //           } else {
  //             console.log("Error", axiosError.message);
  //           }
  //         }
  //       }
  //     };
  //     fetchAddressaData();
  //   }
  // }, [addressData]);
  //  const fetchAddressaData = async () => {
  //         try {
  //           const response = await http.get(
  //             `/api/v1/driver/address/${addressData}`
  //           );
  //           console.log(response.data.data);
  //           setAddressData(response.data.data.id);
  //           setState(response.data.data.state);
  //           setDistrict(response.data.data.district);
  //           setArea(response.data.data.area);
  //         } catch (error) {
  //           if (axios.isAxiosError(error)) {
  //             const axiosError = error as AxiosError<ApiErrorData>;
  //             if (axiosError.response) {
  //               console.log("Response Error", axiosError.response);
  //               toast.error(axiosError.response.data.message);
  //             } else if (axiosError.request) {
  //               console.log("Request Error", axiosError.request);
  //             } else {
  //               console.log("Error", axiosError.message);
  //             }
  //           }
  //         }
  //       };

  const fetchDriverData = useCallback(async () => {
    try {
      const response = await http.get("/api/v1/driver/address");
      console.log(response.data.data);
      setDisplayAddressData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // useEffect(() => {
  //   fetchDriverData;
  // }, [fetchDriverData]);

  useEffect(() => {
    if (clicked) {
      containerControls.start("open");
    } else {
      containerControls.start("close");
    }
    // fetchAddressaData();

    fetchDriverData;
  }, [clicked, containerControls, fetchDriverData]);

  const openAddressModel = () => {
    setOpenAddressesModel(true);
    fetchDriverData();
  };
  const handleCloseAddress = () => {
    setOpenAddressesModel(false);
    setState("");
    setDistrict("");
    setArea("");
  };
  const handleSaveAddress = async () => {
    // setLoading(true);
    try {
      const address_data = await http.post("/api/v1/driver/address", {
        state: state,
        district: district,
        area: area,
      });
      console.log(address_data.data.data.id);
      console.log(address_data);
      // setLoading(false);
      // setAddressData(address_data.data.data.id);
      toast.success(address_data.data.message);
      setOpenAddressesModel(false);
    } catch (error) {
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
    }
  };
  const handleUpdate = async () => {
    console.log(addressData);
    try {
      const response = await http.patch(
        `/api/v1/driver/address/${addressData}`,
        {
          state,
          district,
          area,
        }
      );
      console.log(response.data.data);
      toast.success(response.data.message);
      fetchDriverData();
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Failed to update data. Please try again.");
    }
  };

  const handleUpdateAdress = (address) => {
    console.log(address);
    console.log(address.id);

    setState(address.state);
    setDistrict(address.district);
    setArea(address.area);
    setAddressData(address.id);
    setOpenAddressesModel(true);
  };

  const handleDeleteAdress = async (address) => {
    try {
      const response = await http.delete(
        `/api/v1/driver/address/${address.id}`
      );
      toast.success(response.data.message);
      // Assuming you want to refresh the address list after deletion
      fetchDriverData();
    } catch (error) {
      console.error("Error deleting address:", error);
      toast.error("Failed to delete address. Please try again.");
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex w-full h-lvh justify-center items-center">
          <Loader
            type="spinner-default"
            bgColor={"#2967ff"}
            color={"#2967ff"}
            size={100}
          />
        </div>
      ) : (
        <div
          className={`sticky top-0 flex shadow-md  border-2 w-full  h-16 items-center  justify-between bg-white text-zinc-900 z-10 px-2`}
        >
          {clicked && (
            <motion.div
              variants={containerVariants}
              initial="close"
              animate={containerControls}
              className="w-[300px] bg-white opacity-95 h-lvh absolute top-0 left-0 overflow-y-auto z-[100000000] max-[324px]:w-[320px] "
            >
              <div className="flex flex-col w-full fixed top-0 left-0">
                <div className="mt-6">
                  <div className="flex justify-between">
                    <div className="flex w-full justify-center items-center mb-6 py-2 text-xl pl-6">
                      <div className="w-[130px]">
                        <NavLogo />
                      </div>
                    </div>
                    <div>
                      <button
                        className="text-3xl font-bold pr-4 py-2"
                        onClick={handleClick}
                      >
                        <Image src={cross} alt="cross"></Image>
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="w-full flex-col justify-center items-center gap-3">
                      <Link href="/enterprise">
                        <div className="w-full justify-start flex text-xl font-normal p-4 hover:shadow-md hover:shadow-gray-200 transition-all duration-300 hover:scale-100 hover:text-[22px]">
                          <div className="px-4">Enterprise</div>
                        </div>
                      </Link>
                      <Link href="/delivery-partner">
                        <div className="w-full justify-start flex text-xl font-normal p-4 hover:shadow-md hover:shadow-gray-200 transition-all duration-300 hover:scale-100 hover:text-[22px]">
                          <div className="px-4">Delivery Partner</div>
                        </div>
                      </Link>
                      <Link href="/support">
                        <div className="w-full justify-start flex text-xl font-normal p-4 hover:shadow-md hover:shadow-gray-200 transition-all duration-300 hover:scale-100 hover:text-[22px]">
                          <div className="px-4">Support</div>
                        </div>
                      </Link>

                      {user.user.email || driver?.driver?.email ? (
                        <div className="w-full justify-between items-center flex text-xl font-normal p-4 hover:shadow-md hover:shadow-gray-200 transition-all duration-300 hover:scale-100 hover:text-[22px]">
                          <div className="px-4">
                            <div className=" flex justify-start items-center gap-3">
                              {user ? (
                                <div className="bg-[#2967ff] text-white rounded-full py-2 px-4">
                                  {user?.user?.user?.split("")[0].toUpperCase()}
                                </div>
                              ) : (
                                <div className="bg-[#2967ff] text-white rounded-full h-[40px] w-[40px] flex justify-center items-center">
                                  <FaTruck />
                                </div>
                              )}
                              <div>
                                {user ? (
                                  <>{user?.user?.user?.toUpperCase()}</>
                                ) : (
                                  <>{driver?.driver?.driver?.toUpperCase()}</>
                                )}
                              </div>
                            </div>
                          </div>

                          <div
                            className="px-4 cursor-pointer"
                            onClick={() => setshow(!show)}
                          >
                            <Image src={angle_down} alt="arrow"></Image>
                          </div>
                        </div>
                      ) : (
                        <>
                          <Link href="/register">
                            <div className="w-full justify-start flex text-xl font-normal p-4 hover:shadow-md hover:shadow-gray-200 transition-all duration-300 hover:scale-100 hover:text-[22px]">
                              <div className="ml-4 px-4 text-[#2967ff] border border-[#2967ff] py-1 rounded-md hover:bg-[#2967ff] hover:text-white duration-100 transition-all">
                                Get Started
                              </div>
                            </div>
                          </Link>
                        </>
                      )}

                      {(user?.user?.email && show) ||
                      (driver?.driver?.email && show) ? (
                        <>
                          <motion.div
                            initial={{ height: "0px" }}
                            whileInView={{ height: "auto" }}
                            transition={{
                              type: "tween",
                              duration: 0.5,
                            }}
                            className="overflow-hidden"
                          >
                            <div
                              className="w-full justify-start flex text-xl font-normal p-4 hover:shadow-md hover:shadow-gray-200 transition-all duration-300 hover:scale-100 hover:text-[22px]"
                              onClick={openprofile}
                            >
                              <div className="px-4">Profile</div>
                            </div>
                            {user.user.user == null &&
                              driver.driver.driver !== null && (
                                <>
                                  <div
                                    className="p-2 w-full h-[30px] flex gap-4 justify-start items-center  border border-b-gray-300 rounded-b-lg cursor-pointer"
                                    onClick={() => openAddressModel()}
                                  >
                                    <div>
                                      <FaRegAddressCard className="h-[20px] w-[20px] text-bold" />
                                    </div>
                                    <div>address</div>
                                  </div>
                                </>
                              )}

                            <div
                              className="w-full justify-start flex text-xl font-normal border-red-600 border-2 p-4 hover:shadow-md hover:shadow-gray-200 transition-all duration-300 hover:scale-100 hover:text-[22px] cursor-pointer"
                              onClick={clearstorage}
                            >
                              <div className="px-4">logout</div>
                            </div>
                          </motion.div>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          <div className="pl-2 flex gap-2 ">
            <div className="max-lg:flex items-center hidden w-16 text-center justify-center">
              <button
                onClick={handleClick}
                className="w-full flex justify-center items-center"
              >
                <IoMenu className={`text-3xl`} />
              </button>
            </div>

            <div className="flex w-full">
              <Link href="/">
                <div className="w-[130px]">
                  <NavLogo />
                </div>
              </Link>
            </div>
          </div>

          <div className="flex mr-12 w-full gap-10 justify-center text-base max-lg:hidden">
            {NAVBAR.LAPTOP.map((item, index) => (
              <Link key={index} href={item.url} className={item.class}>
                {item.text}
              </Link>
            ))}
          </div>

          <div className="">
            {user?.user?.email || driver?.driver?.email ? (
              <div className="flex justify-end gap-2 items-center w-full px-2">
                <div>
                  <button
                    className="rounded-full hover:bg-gray-200 active:bg-gray-300 p-2"
                    onClick={handleNotification}
                  >
                    <IoMdNotificationsOutline className="size-8" />
                  </button>
                  {notificationPanel ? (
                    <motion.div
                      // initial={{ opacity: 0 }}
                      // whileInView={{ opacity: 1 }}
                      // transition={{ duration: 0.5 }}
                      initial={{ height: "0%" }}
                      whileInView={{ height: "auto" }}
                      transition={{
                        type: "fade",
                        damping: 15,
                        stiffness: 300,
                        duration: 0.3,
                      }}
                      className="fixed border shadow-md overflow-auto max-h-96 top-[64px] w-[400px] max-[531px]:w-[300px] max-[376px]:w-[200px] right-32 max-lg:right-12 bg-white z-[1000000] "
                    >
                      <DisplayNotifications />
                    </motion.div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="flex items-center max-lg:hidden">
                  <div className="bg-[#2967ff] text-white rounded-full h-[40px] w-[40px] flex justify-center items-center">
                    {user ? (
                      user?.user?.user?.split("")[0].toUpperCase()
                    ) : (
                      <FaTruck />
                    )}
                  </div>
                  <div onClick={handleProfile}>
                    <Image src={angle_down} alt="down arrow"></Image>
                  </div>
                </div>
                {profile ? (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      className="fixed top-[60px] right-5 w-[100px] bg-white z-[1000000] rounded-lg "
                    >
                      <div
                        className="p-2 w-full h-[30px] flex gap-4 justify-start items-center  border border-b-gray-300 cursor-pointer"
                        onClick={openprofile}
                      >
                        <div>
                          <Image
                            src={user_circle}
                            alt="user"
                            className="h-[24px] w-[24px] text-bold"
                          ></Image>
                        </div>
                        <div>Profile</div>
                      </div>
                      <div
                        className="p-2 w-full h-[30px] flex gap-4 justify-start items-center  border border-b-gray-300 rounded-b-lg cursor-pointer"
                        onClick={clearstorage}
                      >
                        <div>
                          <BiLogOut className="h-[20px] w-[20px] text-bold" />
                        </div>
                        <div>logout</div>
                      </div>
                      {user.user.user == null &&
                        driver.driver.driver !== null && (
                          <>
                            <div
                              className="p-2 w-full h-[30px] flex gap-4 justify-start items-center  border border-b-gray-300 rounded-b-lg cursor-pointer"
                              onClick={() => openAddressModel()}
                            >
                              <div>
                                <FaRegAddressCard className="h-[20px] w-[20px] text-bold" />
                              </div>
                              <div>address</div>
                            </div>
                          </>
                        )}
                      {addressesModel && (
                        <>
                          <div className="flex flex-row gap-4 w-full h-96 overflow-hidden">
                            <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center">
                              <div className="w-1/2 flex flex-row bg-white p-4 rounded-md">
                                <div className="w-1/3 overflow-auto p-4 ">
                                  <h2 className="text-lg font-semibold mb-2">
                                    {addressData
                                      ? "Update Address"
                                      : "Add Address"}
                                  </h2>
                                  <div className="mb-2">
                                    <label
                                      htmlFor="state"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      State
                                    </label>
                                    <input
                                      type="text"
                                      id="state"
                                      name="state"
                                      value={state}
                                      onChange={(e) => setState(e.target.value)}
                                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                    />
                                  </div>
                                  <div className="mb-2">
                                    <label
                                      htmlFor="district"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      District
                                    </label>
                                    <input
                                      type="text"
                                      id="district"
                                      name="district"
                                      value={district}
                                      onChange={(e) =>
                                        setDistrict(e.target.value)
                                      }
                                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                    />
                                  </div>
                                  <div className="mb-4">
                                    <label
                                      htmlFor="city"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      area
                                    </label>
                                    <input
                                      type="text"
                                      id="area"
                                      name="area"
                                      value={area}
                                      onChange={(e) => setArea(e.target.value)}
                                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                    />
                                  </div>
                                  <div className="w-full flex gap-2">
                                    <button
                                      onClick={
                                        addressData
                                          ? handleUpdate
                                          : handleSaveAddress
                                      }
                                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                    >
                                      {addressData ? "Update" : "Save"}
                                    </button>
                                    <button
                                      onClick={() => handleCloseAddress()}
                                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                                <div className="w-full h-96 overflow-auto border border-green-500 overflow-y-scroll">
                                  <table className="table-auto w-full text-sm text-left ">
                                    <thead className="text-xs text-white text-center uppercase bg-[#2967ff] border w-auto sticky">
                                      <tr>
                                        <th scope="col" className="px-6 py-3 ">
                                          Index
                                        </th>
                                        <th scope="col" className="px-6 py-3 ">
                                          State
                                        </th>
                                        <th scope="col" className="px-6 py-3 ">
                                          district
                                        </th>
                                        <th scope="col" className="px-6 py-3 ">
                                          area
                                        </th>
                                        <th scope="col" className="px-6 py-3 ">
                                          Action
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {displayAdressData.map((item, index) => (
                                        <tr
                                          key={item.id}
                                          className="border-b text-center w-auto hover:bg-gray-100 transition-all duration-300"
                                        >
                                          <td className=" border  whitespace-nowrap text-center">
                                            {index + 1}
                                          </td>
                                          <td className=" border text-center p-2">
                                            {item.state}
                                          </td>
                                          <td className="border text-center p-2">
                                            {item.district}
                                          </td>
                                          <td className=" border whitespace-nowrap text-center">
                                            {item.area}
                                          </td>
                                          <td className="text-center ">
                                            <button
                                              className="font-medium text-blue-600 text-center "
                                              onClick={() =>
                                                handleUpdateAdress(item)
                                              }
                                            >
                                              edit
                                            </button>
                                          </td>
                                          <td className="text-center ">
                                            <button
                                              className="font-medium text-blue-600 text-center "
                                              onClick={() =>
                                                handleDeleteAdress(item)
                                              }
                                            >
                                              Delete
                                            </button>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </motion.div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="w-full flex items-end justify-end px-2"
              >
                <FaUserCircle className="size-10 hover:text-[#2967ff] hover:scale-125 transition-all" />
              </Link>
            )}
            {/* <div>
            <Link href='/register'><button className="bg-[#2967ff] p-3 rounded-lg text-white font-semibold transition duration-300 hover:bg-blue-500 hover:scale-105">Get Started</button></Link>
          </div> */}
          </div>

          {/* side panel */}
        </div>
      )}
    </>
  );
}
