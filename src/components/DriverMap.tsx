"use client";

import React, { useState } from "react";
import ProductTableRow from "./DriverMapTableRow";
import { tableData } from "@/constant/driverOrderData";
import {
  useJsApiLoader,
  GoogleMap,
  //   Autocomplete,
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

function DriverMap() {
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [infoWindowPosition, setInfoWindowPosition] = useState(null);
  const [infoWindowText, setInfoWindowText] = useState("");
  const [showMap, setShowMap] = useState(false);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAVZWRn7jpEjdxVeIDNo5s6Tz3xJNB_PVE",
    libraries: ["places"],
  });
  const center_coordinates = { lat: 23.0225, lng: 72.5714 };
  return (
    <>
      <div className="full">
        <div className="flex flex-auto w-full justify-evenly gap-2 p-2">
          {/*  this div is for table */}
          <div className="w-[50%] h-96">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                    <th scope="col" className="px-6 py-3">
                      Product name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Color
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Accessories
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Available
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Weight
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((item) => (
                    <ProductTableRow
                      key={item.id}
                      id={item.id}
                      productName={item.productName}
                      color={item.color}
                      category={item.category}
                      accessories={item.accessories}
                      available={item.available}
                      price={item.price}
                      weight={item.weight}
                      setShowMap={setShowMap}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* this div is for map */}
          {showMap && isLoaded ? (
            <div className="w-[50%] px-3 py-6 border h-auto">
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
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default DriverMap;
