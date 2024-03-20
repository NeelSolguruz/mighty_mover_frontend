"use client";

import Image from "next/image";
import { useState } from "react";
import { DELIVERY_PARTNER_STRING } from "../constant/constant";
import Delivery from "../assets/Images/delivery.jpg";
import { FormData } from "../dto/data.type";
import  regularTrip from "../assets/Images/regularTrip.png"

export default function DeliveryPage(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    mobileNumber: "",
    city: "",
    vehicle: "",
    sources: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Form submitted:", formData);

    setFormData({
      name: "",
      mobileNumber: "",
      city: "",
      vehicle: "",
      sources: "",
    });
  };

  return (
    <>
      <div className="w-full">
        <div>
          <Image
            src={Delivery}
            className="w-full"
            alt="Picture of the Delivery"
          />
        </div>
      </div>
      <div className="w-full">
        <div className="text-3xl font-semibold text-center w-full">
          {DELIVERY_PARTNER_STRING.PORTER_ADVANTAGE}
        </div>
      </div>
      <div className="w-full">
        <div className="flex w-full justify-between p-10">
          <div className="w-1/2 flex gap-10 ml-24">
            {DELIVERY_PARTNER_STRING.PORTER_ADVANTAGE_DATA.map((item) => (
              <>
                <div className="flex flex-col justify-center gap-8 items-center p-2 w-2/5 ">
                  <div>
                    <Image
                      src={regularTrip}
                      alt="Logo"
                      className="w-42 h-42 rounded-full shadow-gray-400 shadow-md transition-all hover:scale-105"
                    ></Image>
                  </div>
                  <div className="text-xl font-semibold w-auto">
                    {item.title}
                  </div>
                  <div className="flex text-sm font-light text-center">
                    {item.description}
                  </div>
                </div>
              </>
            ))}
          </div>
          <div className="mr-14 w-4/12 p-10 rounded-3xl shadow-gray-400 shadow-md">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4 p-6">
                <div className="font-bold text-2xl text-center w-full">
                  {DELIVERY_PARTNER_STRING.FORM_HEADERS}
                </div>
                <div className="flex flex-col gap-4 relative">
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      // placeholder="Name"
                      className="w-full border-b rounded border-r-2 border-gray-300 py-1 focus:border-b-2 focus:border-amber-800 transition-colors focus:outline-none peer"
                      required
                    />
                    <label
                      htmlFor="name"
                      className="absolute pl-2 left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all font-semibold"
                    >
                      Name
                    </label>
                  </div>
                  <input
                    type="number"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    placeholder="Mobile Number"
                    className="w-full border-b rounded border-r-2 border-gray-300 py-1 focus:border-b-2 focus:border-amber-800 transition-colors focus:outline-none peer"
                    required
                  />
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="p-2 w-full border-b rounded border-r-2 border-gray-300 font-semibold"
                    required
                  >
                    <option value="">Select City</option>
                    {DELIVERY_PARTNER_STRING.FORM_CITIES.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  <select
                    name="vehicle"
                    value={formData.vehicle}
                    onChange={handleChange}
                    className="p-2 w-full border-b rounded border-r-2 border-gray-300 font-semibold"
                    required
                  >
                    <option value="">Select Vehicle</option>
                    {DELIVERY_PARTNER_STRING.FORM_VEHICLE.map((vehicle) => (
                      <option key={vehicle} value={vehicle}>
                        {vehicle}
                      </option>
                    ))}
                  </select>
                  <select
                    name="sources"
                    value={formData.sources}
                    onChange={handleChange}
                    className="p-2 w-full  border-b rounded border-r-2 border-gray-300 font-semibold"
                  >
                    <option value="">Select Sources</option>
                    {DELIVERY_PARTNER_STRING.FORM_SOURCES.map((source) => (
                      <option key={source} value={source}>
                        {source}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="w-full bg-amber-500 p-2 rounded text-blue-950 text-lg font-semibold hover:scale-105 transition-all transition-300"
                  >
                    Register
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
