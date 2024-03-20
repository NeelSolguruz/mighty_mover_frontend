"use client";
import Image from "next/image";
import { useState } from "react";
import { DELIVERY_PARTNER_STRING } from "../constant/constant";
// import Delivery from "../assets/Images/delivery.jpg";
import { FormData } from "../dto/data.type";
// import  regularTrip from "../assets/Images/regularTrip.png"
import { Delivery, driverExperience } from "../assets/Images/imageassets";

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
        <div className="text-3xl font-semibold text-center w-full p-8">
          {DELIVERY_PARTNER_STRING.PORTER_ADVANTAGE}
        </div>
      </div>
      <div className="w-full">
        <div className="flex w-full justify-between p-10">
          <div className="w-1/2 flex gap-10 ml-24">
            {DELIVERY_PARTNER_STRING.PORTER_ADVANTAGE_DATA.map((item) => (
              <>
                <div
                  key={item.title}
                  className="flex flex-wrap flex-col justify-center gap-8 items-center p-2 w-full  md:w-2/5 lg:w-1/3"
                >
                  <div className="divForImage w-4/5 h-1/2 ">
                   <div className=" w-full h-full ">
                    <Image
                      src={item.images}
                      alt={item.title}
                      className="w-full h-full rounded-lg  object-contain shadow-gray-400 shadow-md transition-all hover:scale-105"
                      
                    ></Image>
                   </div>
                  </div>
                  <div className="divForDescription w-18 p-2">
                    <div className="divForTitle text-center text-xl font-semibold w-auto">
                      {item.title}
                    </div>
                    <div className="divForDes flex  text-sm font-light text-center">
                      {item.description}
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>

          <div className="mr-14 w-full  md:w-4/12 p-10 rounded-3xl shadow-gray-400 shadow-md">
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
                  <div className="relative">
                    <input
                      type="number"
                      id="mobilenumber"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      className="w-full border-b rounded border-r-2 border-gray-300 py-1 focus:border-b-2 focus:border-amber-800 transition-colors focus:outline-none peer"
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
      <div className="w-full bg-black text-white h-auto">
        <div className="text-3xl font-semibold text-center w-full p-8 text-white">
            {DELIVERY_PARTNER_STRING.MAKING_YOUR_LIFE_EASY}
          </div>
        <div className="mainSection bg-black w-full">
          <div className="float-left w-full h-96 bg-black  flex gap-10 items-center justify-center">
            <div className=" w-1/3 ">
              <Image
              src={driverExperience}
              // className="w-auto bg-black"
              className="w-full h-full rounded-lg  object-contain  shadow-md transition-all hover:scale-105"
              alt="Picture of the Delivery"
              ></Image>
            </div>
            <div className="w-2/5 font-semibold text-wrap  flex flex-wrap">
              {DELIVERY_PARTNER_STRING.MAKING_YOUR_LIFE_EASY_DATA}
            </div>
          </div>
        </div>
      </div>
      {/* ADDITIONAL BENEFITS __ start from here */}
      <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 p-10">
        {DELIVERY_PARTNER_STRING.ADDITIONAL_BENEFITS.map((item) => (
          <div key={item.title} className="flex flex-col justify-center gap-8 items-center">
            <div className="divForImage w-full h-48 relative">
              <Image src={item.images} alt={item.title} layout="fill" objectFit="cover" className="rounded-lg shadow-gray-400 shadow-md transition-all hover:scale-105" />
            </div>
            <div className="divForDescription p-2">
              <div className="divForTitle text-center text-xl font-semibold">{item.title}</div>
              <div className="divForDes text-sm font-light text-center">{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>


    </>
  );
}
