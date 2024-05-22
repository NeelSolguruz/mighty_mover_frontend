"use client";
import http from "@/http/http";
import jsPDF from "jspdf";
import React, { useCallback, useEffect, useState } from "react";

interface userDetails {
  id: string;
  Amount: string | number;
  Delivery: string;
  Driver: string;
  Items: string;
  Payment_Date: string;
  Payment_status: string;
  Payment_type: string;
  Pickup: string;
  receiver_name: string;
  order_status: string;
  receiver_phone:string;
}

function UserOrderList() {
  const [userData, setUserData] = useState<userDetails[]>([]);
  const fetchdata = useCallback(async () => {
    try {
      const response = await http.get("/api/v1/bookings/order");
      console.log(response.data.data);
      setUserData(response.data.data);
    } catch (error) {
      console.log(error);
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
                Booking Date
              </th>
              <th scope="col" className="px-3 py-3 ">
                Payment status
              </th>
              <th scope="col" className="px-3 py-3 ">
                Payment type
              </th>

              <th scope="col" className="px-6 py-3 ">
                order status
              </th>
              {/* <th scope="col" className="px-6 py-3 ">
              Action
            </th> */}
            </tr>
          </thead>
          <tbody>
            {userData.map((item, index) => (
              <tr
                key={item.id}
                className="  border-b  text-center  w-full hover:bg-gray-100 transition-all duration-300"
                onClick={() => handleInvoicegenrator(item)}
              >
                {/* <td className="w-4 p-4">
          <div className="flex items-center">
            <input
              id={`checkbox-table-search-${item.id}`}
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor={`checkbox-table-search-${item.id}`} className="sr-only">
              checkbox
            </label>
          </div>
        </td> */}
                <td className="px-6 py-3 border  whitespace-nowrap ">
                  {index + 1}
                </td>
                <td className="px-6 py-3 border">{item.receiver_name}</td>
                <td className="px-6 py-3 border">{item.receiver_phone}</td>
                <td className="px-6 py-3 border  whitespace-nowrap ">
                  {item.Amount}
                </td>
                <td className="px-6 py-3 border">{item.Pickup}</td>
                <td className="px-6 py-3 border  whitespace-nowrap ">
                  {item.Delivery}
                </td>
                <td className="px-6 py-3 border">{item.Driver}</td>
                <td className="px-6 py-3 border">{item.Items}</td>
                <td className="px-6 py-3 border">
                  {item.Payment_Date.split("T")[0]}
                </td>
                <td className="px-6 py-3 border">{item.Payment_status}</td>
                <td className="px-6 py-3 border">{item.Payment_type}</td>
                {/* <td className="px-6 py-3 border">{price}</td> */}
                {/* <td className="px-6 py-3 border">{weight}</td> */}

                <td className="px-6 py-3 border">{item.order_status}</td>
                {/* <td className="flex items-center px-6 py-3 text-center"> */}
                {/* <button
                  className="font-medium text-blue-600 text-center px-6 py-5 "
                >
                  <InfoSvg />
                </button> */}
                {/* <button
                className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                onClick={() => handleRemoveButtonClick()}
              >
                Remove
              </button> */}
                {/* </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UserOrderList;
