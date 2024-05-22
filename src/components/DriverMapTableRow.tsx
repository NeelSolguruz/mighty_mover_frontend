"use client";
import InfoSvg from "@/assets/Images/icons/infoSvg";
import { cross } from "@/assets/Images/imageassets";
import { tableData } from "@/constant/driverOrderData";
import http from "@/http/http";
import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface ProductTableRowProps {
  orderId: number;
  firstName: string;
  lastName: string;
  contact: string;
  Pickup: string;
  Delivery: string;
  // pickupTime: string;
  // deliveryTime: string;
  Payment_status: string;
  Payment_type: string;
  Amount_collect: number;
  pickup_longitude: string;
  pickup_latitude: string;
  delivery_longitude: string;
  delivery_latitude: string;
  //   weight: string;
}
const ProductTableRow = () => {
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [infoWindowPosition, setInfoWindowPosition] = useState(null);
  const [infoWindowText, setInfoWindowText] = useState("");
  const [DisplayData, setDisplayData] = useState<ProductTableRowProps[]>([]);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAVZWRn7jpEjdxVeIDNo5s6Tz3xJNB_PVE",
    libraries: ["places"],
  });
  const center_coordinates = { lat: 23.0225, lng: 72.5714 };
  const [detailModel, setDetailModel] = useState(false);
  const [selectedOrder, setSelectedOrder] =
    useState<ProductTableRowProps | null>(null);

  const handleMapButtonClick = async (item: ProductTableRowProps) => {
    console.log(item.pickup_latitude);
    setSelectedOrder(item);
     const directionsService = new google.maps.DirectionsService();
    // const pickupLocation = {
    //   lat: parseFloat(item.pickup_latitude),
    //   lng: parseFloat(item.pickup_longitude),
    // };
    // const deliveryLocation = {
    //   lat: parseFloat(item.delivery_latitude),
    //   lng: parseFloat(item.delivery_longitude),
    // };
    const results = await directionsService.route({
      origin: item.Pickup,
      destination: item.Delivery,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    console.log(results);
    setDirectionsResponse(results);

    setDetailModel(true);
  };

  const handleCloseDetailModel = () => {
    setDetailModel(false);
    setSelectedOrder(null);
  };

  const fetchdata = async () => {
    try {
      const response = await http.get("/api/v1/driver-order/history");
      console.log(response);
      setDisplayData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <>
      <table className="table-auto w-full text-sm text-left">
        <thead className="text-xs text-white text-center uppercase bg-[#2967ff] border w-full ">
          <tr>
            {/* <th scope="col" className="p-4">
        <div className="flex items-center">
          <input
            id="checkbox-all-search"
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="checkbox-all-search"
            className="sr-only"
          >
            checkbox
          </label>
        </div>
      </th> */}
            <th scope="col" className="px-3 py-3 ">
              Index
            </th>

            <th scope="col" className="px-3 py-3 ">
              customer Name
            </th>
            <th scope="col" className="px-3 py-3 ">
              Contact Number
            </th>
            <th scope="col" className="px-3 py-3 ">
              pickup Location
            </th>
            <th scope="col" className="px-3 py-3 ">
              delivery Location
            </th>
            <th scope="col" className="px-3 py-3 ">
              Payment Type
            </th>
            <th scope="col" className="px-3 py-3 ">
              Payment Status
            </th>
            <th scope="col" className="px-3 py-3 ">
              Amount Collect
            </th>
            {/* <th scope="col" className="px-6 py-3 ">
              Action
            </th> */}
          </tr>
        </thead>
        <tbody>
          {DisplayData.map((item, index) => (
            <tr
              key={item.orderId}
              className="  border-b  text-center  w-full hover:bg-gray-100 transition-all duration-300"
              onClick={() => handleMapButtonClick(item)}
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
              <td className="px-6 py-3 border  whitespace-nowrap ">
                {item.firstName + " " + item.lastName}
              </td>
              <td className="px-6 py-3 border  whitespace-nowrap ">
                {item.contact}
              </td>
              <td className="px-6 py-3 border">{item.Pickup}</td>
              <td className="px-6 py-3 border">{item.Delivery}</td>
              <td className="px-6 py-3 border">{item.Payment_type}</td>
              <td className="px-6 py-3 border">{item.Payment_status}</td>
              <td className="px-6 py-3 border">{item.Amount_collect}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* model for display maps and other details in grid */}
      {detailModel && selectedOrder && (
        <div className="fixed inset-0  flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
          <div className=" fixed bg-white rounded-lg p-4  w-[80%] h-[80%] flex flex-col ">
            {/* div for order details and close button */}
            <div className="flex justify-end ">
              <div className="w-full px-3 py-3 flex justify-start">
                <h2 className="text-xl font-semibold">Order Details</h2>
              </div>
              <div className="w-auto px-3 py-3 flex justify-end mb-1">
                <Image src={cross} alt="" onClick={handleCloseDetailModel} />
              </div>
            </div>
            <div className="flex flex-row flex-grow w-full gap-4 p-4 ">
              <div className="w-auto h-auto">
                <p>Order ID: {selectedOrder.orderId}</p>
                <p>
                  Customer Name:{" "}
                  {selectedOrder.firstName + " " + selectedOrder.lastName}
                </p>
                <p>Pickup Location: {selectedOrder.Pickup}</p>
                <p>Delivery Location: {selectedOrder.Delivery}</p>
                <p>Payment Type: {selectedOrder.Payment_type}</p>
                <p>Payment Status: {selectedOrder.Payment_status}</p>
                <p>Amount Collect: {selectedOrder.Amount_collect}</p>
              </div>

              {isLoaded ? (
                <div className="w-full h-full px-1 py-1 shadow-sm rounded ">
                  <GoogleMap
                    center={center_coordinates}
                    zoom={15}
                    mapContainerStyle={{
                      height: "100%",
                      width: "100%",
                      borderRadius: "10px",
                      border: "1px solid #2967ff",
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
              ) : (
                <></>
              )}
              {/* <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"></button> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductTableRow;
