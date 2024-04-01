"use client";
import Image from "next/image";
import { useState } from "react";
import { DELIVERY_PARTNER_STRING } from "../constant/constant";
// import Delivery from "../assets/Images/delivery.jpg";
import { FormData } from "../constant/type/data.type";
// import  regularTrip from "../assets/Images/regularTrip.png"

import {
  Delivery,
  driverExperience,
  ownVehicles,
} from "../assets/Images/imageassets";

export default function DeliveryPage(): JSX.Element {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

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
        <div className="text-3xl font-semibold text-center w-full p-8">
          {DELIVERY_PARTNER_STRING.PORTER_ADVANTAGE}
        </div>
      </div>
      {/* registration form __ section __ strat from here */}
      <div className="w-full">
        <div className="flex flex-col md:flex-col w-full justify-between p-5 md:p-10">
          <div className="w-full md:w-fit md:flex-row flex max-md:flex-wrap flex-nowrap justify-center gap-5 md:ml-0  middle:justify-center ">
            {DELIVERY_PARTNER_STRING.PORTER_ADVANTAGE_DATA.map((item) => (
              <div
                key={item.title}
                className="flex flex-col justify-center gap-5 items-center w-full md:w-1/2 lg:w-1/3"
              >
                <div className="w-full h-48">
                  <Image
                    src={item.images}
                    alt={item.title}
                    className="w-full h-full rounded-lg object-contain shadow-gray-400 shadow-md transition-all hover:scale-105"
                  />
                </div>
                <div className="p-2">
                  <div className="text-center text-xl font-semibold">
                    {item.title}
                  </div>
                  <div className="text-sm font-light text-center">
                    {item.description}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full md:w-full p-5 md:flex-row md:p-10 rounded-3xl shadow-gray-400 shadow-md ">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="font-bold text-2xl text-center">
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
                    className="w-full border-b rounded border-gray-300 py-1 focus:border-amber-800 transition-colors focus:outline-none peer"
                    required
                  />
                  <label
                    htmlFor="name"
                    className="absolute pl-2 left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all font-semibold"
                  >
                    Name
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    id="mobilenumber"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    className="w-full border-b rounded border-gray-300 py-1 focus:border-amber-800 transition-colors focus:outline-none peer"
                    required
                  />
                  <label
                    htmlFor="mobilenumber"
                    className="absolute pl-2 left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all font-semibold"
                  >
                    Mobile Number
                  </label>
                </div>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="p-2 w-full border-b rounded border-gray-300 font-semibold"
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
                  className="p-2 w-full border-b rounded border-gray-300 font-semibold"
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
                  className="p-2 w-full border-b rounded border-gray-300 font-semibold"
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
            </form>
          </div>
        </div>
      </div>

      {/* making your life easy__ section___ start from here */}
      <div className="w-full bg-black text-white">
        <div className="text-3xl font-semibold text-center p-8">
          {DELIVERY_PARTNER_STRING.MAKING_YOUR_LIFE_EASY}
        </div>
        <div className="mainSection bg-black w-full">
          <div className="flex flex-col md:flex-row gap-14 items-center justify-evenly px-24 ss:px-8 ss:py-8 ss:gap-1">
            <div className="w-full md:w-1/3">
              <Image
                src={driverExperience}
                className="w-full h-96 rounded-lg object-contain shadow-md transition-all hover:scale-105 p-2"
                alt="Picture of the Delivery"
              />
            </div>
            <div className="w-full md:w-2/3 font-semibold p-12 ss:p-0 ss:text-sm">
              {DELIVERY_PARTNER_STRING.MAKING_YOUR_LIFE_EASY_DATA}
            </div>
          </div>
        </div>
      </div>

      {/* ADDITIONAL BENEFITS __ start from here */}
      <div className="w-full">
        <div className="text-3xl font-semibold text-center p-8">
          {DELIVERY_PARTNER_STRING.ADDITIONAL_BENEFITS_TITLE}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 p-10 text-mint fill-current">
          {DELIVERY_PARTNER_STRING.ADDITIONAL_BENEFITS.map((item) => (
            <div key={item.title}>
              <div className="divForImage w-full max-h-48 h-44 relative">
                <Image
                  src={item.images}
                  alt={item.title}
                  layout="fill"
                  // width={250}
                  // height={250}
                  objectFit="contain"
                  className="rounded-lg shadow-gray-300 shadow-md transition-all hover:scale-105"
                />
              </div>
              <div className="divForDescription py-4">
                <div className="divForTitle text-center text-xl font-semibold">
                  {item.title}
                </div>
                <div className="divForDes text-sm font-light text-center">
                  {item.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* this is a CHANGING LIFE OF PEOPLE __section___ start from here */}
      <div className="w-full bg-black text-white h-auto ">
        <div className="text-3xl font-semibold text-center p-8">
          {DELIVERY_PARTNER_STRING.MAKING_YOUR_LIFE_EASY}
        </div>
        <div className="w-full flex justify-center">
          <div className="flex flex-wrap justify-center">
            {DELIVERY_PARTNER_STRING.PEOPLE_LIFE_DATA.map((item, index) => (
              <div
                key={index}
                className="flex flex-col justify-between max-w-xs mx-4 my-4 rounded-xl overflow-hidden bg-gray-900 hover:bg-gray-800 hover:scale-105 transition-all"
              >
                <div className="p-4">
                  <div className="flex items-center">
                    <Image
                      src={item.img}
                      alt="profile pic"
                      width={80}
                      height={80}
                      className="rounded-full"
                    />
                    <div className="ml-4">
                      <p className="text-lg font-semibold">{item.name}</p>
                      <p className="text-sm">{item.loc}</p>
                    </div>
                  </div>
                  <div className="mt-2 p-3">
                    <p className="text-xl">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* OWN MULTIPLE VEHICLES? sections */}

      <div className="w-full h-auto">
        <div className="text-3xl font-semibold text-center p-8">
          {DELIVERY_PARTNER_STRING.OWN_MULTI_VEHICLES_TITLE}
        </div>
        <div className="mainSection w-full">
          <div className="flex flex-col md:flex-row gap-10 items-center justify-center">
            <div className="w-full md:w-1/5">
              <Image
                src={ownVehicles}
                className="w-full h-full rounded-lg object-contain shadow-md transition-all hover:scale-105"
                alt="Picture of the Delivery"
              />
            </div>
            <div className="w-full md:w-2/5 font-medium text-wrap">
              <div className="font-bold">
                {DELIVERY_PARTNER_STRING.OWN_MULTI_VEHICLES_LINE1}
              </div>
              <br />
              {DELIVERY_PARTNER_STRING.OWN_MULTI_VEHICLES_LINE2}
              <br />
              <br />
              <button
                type="button"
                className="w-full bg-amber-500 p-2 rounded text-blue-950 text-lg font-semibold hover:scale-105 transition-all transition-300"
              >
                {DELIVERY_PARTNER_STRING.OWN_MULTI_VEHICLES_BUTTON}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DELIVERY_PARTNER_FAQ __ section__ start from here */}

      <div className="w-full h-auto mb-8">
        <div className="text-4xl font-semibold text-center p-10">
          {DELIVERY_PARTNER_STRING.DELIVERY_PARTNER_FAQ_TITLE}
        </div>

        <div className="flex flex-col gap-2 justify-center items-center">
          {DELIVERY_PARTNER_STRING.DELIVERY_PARTNER_FAQ_QUESTIONS.map(
            (item, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 p-4 w-full md:w-3/4 rounded-lg shadow-md transition duration-300 hover:scale-105"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="flex justify-between w-full"
                >
                  <span className="text-gray-600 text-md font-semibold">
                    {item.QUESTION}
                  </span>
                  <svg
                    className={`fill-amber-500 shrink-0 ml-8 transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      y="7"
                      width="16"
                      height="2"
                      rx="1"
                      className="transform origin-center transition duration-200 ease-out"
                    />
                    <rect
                      y="7"
                      width="16"
                      height="2"
                      rx="1"
                      className="transform origin-center rotate-90 transition duration-200 ease-out"
                    />
                  </svg>
                </button>
                <div
                  className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${
                    openIndex === index
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <span className="text-sm text-black">{item.ANSWER}</span>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}
