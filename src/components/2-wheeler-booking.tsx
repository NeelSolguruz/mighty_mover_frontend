"use client"
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import Map from "./Map";

const Twowheelerbooking = () => {
  return (
    <>
      <div className="flex flex-col w-full ">
        <div className="w-full flex gap-2">
          <div className="w-[30%] border">from to</div>
          <div className="w-full border">
            <Map/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Twowheelerbooking;
