"use client";
import http from "@/http/http";
import jsPDF from "jspdf";
import Loader from "react-js-loader";
import React, { useCallback, useEffect, useState } from "react";

interface userDetails {
  id: string;
  amount: string | number;
  delivery: string;
  driver: string;
  items: string;
  // Payment_Date: string;
  // Payment_status: string;
  payment_type: string;
  pickup: string;
  receiver_name: string;
  order_status: string;
  receiver_phone: string;
}

function UserOrderList() {
  const [userData, setUserData] = useState<userDetails[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchdata = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await http.get("/api/v1/bookings/order");
      console.log(response);
      if (response.status === 200) {
        setUserData(response.data.data);
        setIsLoading(false);
      }
      // setIsLoading(false);
      // setUserData(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const orderData = {
    orderId: "527376df-038d-4052-9a62-f417ee979be4",
    firstName: "tushar",
    lastName: "panchal",
    Pickup: "Usmanpura near hyatt regency",
    receiver_name: "Rahul",
    receiver_phone: "7623843497",
    Delivery: "Lal Darwaja",
    Driver: "Ketan",
    Items: "Mobile phones",
    Payment_type: "razorpay",
    transacation_id: "pay_O8M47oHc64Dp4s",
    Payment_status: "completed",
    Payment_Date: "2024-05-09T15:47:28.027Z",
    Amount: 70,
    order_status: "Delivered",
  };
  const downloadPdf = (orderData: any) => {
    const doc = new jsPDF("p", "mm", "a4");

    // Add a title
    doc.setTextColor(0, 0, 255); // Set text color to blue
    doc.setFontSize(20);
    doc.text("Receipt", 10, 10);

    doc.setFontSize(15);
    doc.setTextColor(0);
    doc.setFont("helvetica", "bold");
    doc.text("Mighty Movers", 80, 10);

    doc.setFontSize(8);
    doc.setTextColor(0);
    doc.setFont("helvetica", "normal");
    doc.text("Mighty Movers Head Office, 10, Sundarvan", 80, 15);
    doc.text("Society, Besides Hyatt Regency, Ashram Rd,", 80, 19);
    doc.text("Usmanpura, Ahmedabad, Gujarat 380014", 80, 23);

    doc.setFontSize(10);
    doc.setTextColor(0);
    doc.setFont("helvetica", "bold");
    doc.text("Order ID:", 170, 8);

    doc.setFontSize(7);
    doc.setTextColor(0);
    doc.setFont("helvetica", "normal");
    doc.text(orderData.orderId, 170, 12);

    doc.setTextColor(0); // Reset text color to black
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, 20);

    // Add bill details
    const billData = [
      { item: orderData.Items, quantity: 1, price: orderData.Amount },
    ];

    const startY = 30;
    const lineHeight = 10;
    const startX = 10;
    const cellWidth = 50;

    doc.setFontSize(12);
    doc.setTextColor(0); // Reset text color to black
    doc.text("Item", startX, startY);
    doc.text("Quantity", startX + cellWidth, startY);
    doc.text("Price", startX + cellWidth * 2, startY);

    billData.forEach((item, index) => {
      const y = startY + (index + 1) * lineHeight;
      doc.text(item.item, startX, y);
      doc.text(item.quantity.toString(), startX + cellWidth, y);
      doc.text(item.price.toString(), startX + cellWidth * 2, y);
    });

    // Add total
    const total = billData.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    doc.text(
      `Total: ${total}`,
      startX + cellWidth * 2,
      startY + (billData.length + 1) * lineHeight
    );

    doc.save("receipt.pdf");
  };

  const handleInvoicegenrator = () => {
    downloadPdf(orderData);
  };
  //   downloadPdf(orderData);

  useEffect(() => {
    void fetchdata();
  }, [fetchdata]);
  return (
    <>
      <div className="h-full">
        <table className="table-auto w-full text-sm text-left">
          <thead className="text-xs text-white text-center uppercase bg-[#2967ff] border w-full ">
            <tr>
              <th scope="col" className="px-3 py-3 ">
                Index
              </th>
              <th scope="col" className="px-3 py-3 ">
                Receiver Name
              </th>
              <th scope="col" className="px-3 py-3 ">
                Receiver Phone
              </th>
              <th scope="col" className="px-3 py-3 ">
                Paid Amount
              </th>
              <th scope="col" className="px-3 py-3 ">
                Pickup Location
              </th>
              <th scope="col" className="px-3 py-3 ">
                Delivery Location
              </th>
              <th scope="col" className="px-3 py-3 ">
                Driver Name
              </th>
              <th scope="col" className="px-3 py-3 ">
                category
              </th>

              <th scope="col" className="px-3 py-3 ">
                Payment type
              </th>
              {/* <th scope="col" className="px-3 py-3 ">
                Payment status
              </th> */}

              <th scope="col" className="px-6 py-3 ">
                order status
              </th>
              {/* <th scope="col" className="px-6 py-3 ">
              Action
            </th> */}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <>
                {/* <tr>
                  <td colSpan={10} className="text-center ">
                    <div className="flex flex-col items-center justify-center py-20">
                      <svg
                        className="w-20 h-20 text-gray-400 mb-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 16V12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 8H12.01"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                        No Data Found
                      </h2>
                      <p className="text-gray-500 mb-6">
                        It seems like there is no data to display at the moment.
                      </p>
                      <button
                        className="bg-[#2967ff] hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-md"
                        onClick={fetchdata}
                      >
                        Refresh
                      </button>
                    </div>
                  </td>
                </tr> */}
                <tr>
                  <td colSpan={10} className="text-center ">
                    {/* <Loader
                      type="spinner-default"
                      bgColor={"#2967ff"}
                      color={"#2967ff"}
                      size={100}
                    /> */}
                    <div className="flex flex-col justify-center items-center h-52">
                      <div className="loader ease-linear rounded-full border-8 border-t-8 border-[#2967ff] h-20 w-20"></div>
                      <p className="mt-4">Loading...</p>
                    </div>
                  </td>
                </tr>
              </>
            ) : userData.length === 0 ? (
              <>
                <tr>
                  <td colSpan={10} className="text-center ">
                    <div className="flex flex-col items-center justify-center py-20">
                      <svg
                        className="w-20 h-20 text-gray-400 mb-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 16V12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 8H12.01"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                        No Data Found
                      </h2>
                      <p className="text-gray-500 mb-6">
                        It seems like there is no data to display at the moment.
                      </p>
                      <button
                        className="bg-[#2967ff] hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-md"
                        onClick={fetchdata}
                      >
                        Refresh
                      </button>
                    </div>
                  </td>
                </tr>
              </>
            ) : (
              <>
                {userData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="  border-b  text-center  w-full hover:bg-gray-100 transition-all duration-300"
                    onClick={() => handleInvoicegenrator(item)}
                  >
                    <td className="px-6 py-3 border  whitespace-nowrap ">
                      {index + 1}
                    </td>
                    <td className="px-6 py-3 border">{item.receiver_name}</td>
                    <td className="px-6 py-3 border">{item.receiver_phone}</td>
                    <td className="px-6 py-3 border  whitespace-nowrap ">
                      {item.amount}
                    </td>
                    <td className="px-6 py-3 border">{item.pickup}</td>
                    <td className="px-6 py-3 border  whitespace-nowrap ">
                      {item.delivery}
                    </td>
                    <td className="px-6 py-3 border">{item.driver}</td>
                    <td className="px-6 py-3 border">{item.items}</td>
                    <td className="px-6 py-3 border">{item.payment_type}</td>

                    <td className="px-6 py-3 border">{item.order_status}</td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UserOrderList;
