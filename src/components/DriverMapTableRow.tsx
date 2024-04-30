"use client";
import InfoSvg from "@/assets/Images/icons/infoSvg";
import { cross } from "@/assets/Images/imageassets";
import { tableData } from "@/constant/driverOrderData";
import {
  DirectionsRenderer,
  GoogleMap,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import Image from "next/image";
import React, { useState } from "react";

interface ProductTableRowProps {
  id: number;
  orderId: string;
  customerName: string;
  pickupLocation: string;
  deliveryLocation: string;
  pickupTime: string;
  deliveryTime: string;
  status: string;
  paymentType: string;
  amountCollected: number;
  //   weight: string;
}
const ProductTableRow = () => {
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [infoWindowPosition, setInfoWindowPosition] = useState(null);
  const [infoWindowText, setInfoWindowText] = useState("");
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAVZWRn7jpEjdxVeIDNo5s6Tz3xJNB_PVE",
    libraries: ["places"],
  });
  const center_coordinates = { lat: 23.0225, lng: 72.5714 };
  const [detailModel, setDetailModel] = useState(false);
  const [selectedOrder, setSelectedOrder] =
    useState<ProductTableRowProps | null>(null);

  const handleMapButtonClick = (item: ProductTableRowProps) => {
    setSelectedOrder(item);
    setDetailModel(true);
  };

  const handleCloseDetailModel = () => {
    setDetailModel(false);
    setSelectedOrder(null);
  };
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
            <th scope="col" className="px-6 py-3 ">
              Index
            </th>
            <th scope="col" className="px-6 py-3 ">
              orderId
            </th>
            <th scope="col" className="px-6 py-3 ">
              customerName
            </th>
            <th scope="col" className="px-6 py-3 ">
              pickupLocation
            </th>
            <th scope="col" className="px-6 py-3 ">
              deliveryLocation
            </th>
            <th scope="col" className="px-6 py-3 ">
              pickupTime
            </th>
            <th scope="col" className="px-6 py-3 ">
              deliveryTime
            </th>
            <th scope="col" className="px-6 py-3 ">
              status
            </th>
            <th scope="col" className="px-6 py-3 ">
              paymentType
            </th>
            <th scope="col" className="px-6 py-3 ">
              amountCollected
            </th>
            <th scope="col" className="px-6 py-3 ">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item) => (
            <tr
              key={item.id}
              className="  border-b  text-center  w-full hover:bg-gray-100 transition-all duration-300"
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
                {item.id}
              </td>
              <td className="px-6 py-3 border  whitespace-nowrap ">
                {item.orderId}
              </td>
              <td className="px-6 py-3 border">{item.customerName}</td>
              <td className="px-6 py-3 border">{item.pickupLocation}</td>
              <td className="px-6 py-3 border">{item.deliveryLocation}</td>
              <td className="px-6 py-3 border">{item.pickupTime}</td>
              <td className="px-6 py-3 border">{item.deliveryTime}</td>
              {/* <td className="px-6 py-3 border">{price}</td> */}
              {/* <td className="px-6 py-3 border">{weight}</td> */}
              <td className="px-6 py-3 border">{item.status}</td>
              <td className="px-6 py-3 border">{item.paymentType}</td>
              <td className="px-6 py-3 border">{item.amountCollected}</td>
              <td className="flex items-center px-6 py-3 text-center">
                <button
                  className="font-medium text-blue-600 text-center px-6 py-5 "
                  onClick={() => handleMapButtonClick(item)}
                >
                  <InfoSvg />
                </button>
                {/* <button
                className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                onClick={() => handleRemoveButtonClick()}
              >
                Remove
              </button> */}
              </td>
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
                <p>Customer Name: {selectedOrder.customerName}</p>
                <p>Pickup Location: {selectedOrder.pickupLocation}</p>
                <p>Delivery Location: {selectedOrder.deliveryLocation}</p>
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
