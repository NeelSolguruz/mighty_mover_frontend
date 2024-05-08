import React, { useEffect } from "react";
import AnimationGif from "./Animation";
import http from "@/http/http";

function Payment_complete() {
  // const razorpayDetailsString = localStorage.getItem("razorpayDetails");
  // if (razorpayDetailsString) {
  //   const razorpayDetails = JSON.parse(razorpayDetailsString);
  //   // Use razorpayDetails in API call or wherever required
  //   console.log("Razorpay Details:", razorpayDetails);
  // }
  // const final_Book = async () => {
  //   try {
  //     const response = await http.post(
  //       `/api/v1/bookings/?pickup_address_id=${pickUpAddressId}&delivery_address_id=${destinationAddressId}&estimation_id=${estimationid}&payment_method_id=${finalPaymentTypeId}&subcategory_id=${finalSubCategoryId}`
  //     );
  //     console.log("final_book_response : ", response);
  //     // setanimationGif(true);
  //     // toast.success(response.data.message);
  //     // console.log("total price:", response.data.data[0].total_price);
  //     setfinalbill(response.data.data.total_price);
  //     setFinalConfirmationModal(true);
  //   } catch (error) {
  //     message_error(error);
  //   }
  // };

  // useEffect(() => {}, []);

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
