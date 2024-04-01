import Link from "next/link";
import Image from "next/image";
import { QUICK_LINKS, COMPANY, SUPPORT, LOCATIONS } from "../constant/constant";
import brand_logo from "../assets/images/Union.svg";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube, FaTwitter } from "react-icons/fa";
import { google_play, app_store,porter_white } from "../assets/Images/imageassets";

export default function Footer() {
  return (
    <>
      <div className="bg-black text-white p-4 font-Titillium w-full">
        <div
          className="text-sm grid grid-cols-5 mb-3 ml-4 
            max-lg:grid-cols-4 max-middle:grid-cols-3
            gap-5 max-xs:text-[12px]"
        >
          <div
            className="w-full items-start text-2xl font-semibold flex flex-col
                "
          >
            <Image
              src={brand_logo}
              height={100}
              alt="Brand Logo"
              className="m-4 w-24"
            />
            <div className="max-md:text-lg max-sm:text-md max-xs:text-sm max-xs:text-[12px]">
              <p>Send anything,</p>
              <p>anywhere,</p>
              <p>anytime</p>
            </div>
          </div>
          <div className="w-max  max-sm:mt-2 mb-2">
            <h1 className="text-xl font-semibold">Company</h1>
            <ul className="flex flex-col gap-2 mt-4">
              {COMPANY.map((item, index) => (
                <li key={index} className="hover:text-gray-400">
                  <Link href={item.url}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="text-xl font-semibold">Quick Links</h1>
            <ul className="flex flex-col gap-2 mt-4">
              {QUICK_LINKS.map((item, index) => (
                <li key={index} className="hover:text-gray-400">
                  <Link href={item.url}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="w-max max-md:mt-3.5 max-sm:mt-2 mb-2 
                
                "
          >
            <h1 className="text-xl font-semibold">Support</h1>
            <ul className="flex flex-col gap-2 mt-4">
              {SUPPORT.map((item, index) => (
                <li key={index} className="hover:text-gray-400">
                  <Link href={item.url}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="flex flex-col gap-3 max-middle:justify-center max-middle:items-center max-middle:flex-col max-middle:w-[200px] max-middle:pl-10 max-xs:w-[170px] max-xs:pl-6 
            max-lg:flex-row max-lg:w-[400px] max-md:w-[300px]
                
                "
          >
            <div>
              <Image
                src={google_play}
                alt="google play logo"
                className="max-lg:w-[400px]"
              />
            </div>
            <div>
              <Image
                src={app_store}
                alt="app store logo"
                className="max-lg:w-[400px]"
              />
            </div>
          </div>
        </div>
        <div className=" mt-10 text-2xl font-semibold ml-4 w-full flex justify-center items-center">We Are Here</div>
        <div className="flex justify-center items-center w-full">
          <div
            className="text-sm grid grid-cols-5 gap-5 w-full justify-items-center
            max-lg:grid-cols-4 mt-10 max-xs:text-[12px]
            "
          >
            {LOCATIONS.map((item, index) => (
              <>
                {index % 4 === 0 ? (
                  <>
                    <ul>
                      <li key={index}>{item}</li>
                    </ul>
                  </>
                ) : (
                  <ul>
                    <li key={index}>{item}</li>
                  </ul>
                )}
              </>
            ))}
          </div>
        </div>
        <div className=" flex justify-between mt-8 mb-2 items-center max-md:flex-col">
          <div className="flex gap-5 ml-4">
            <FaInstagram size={30} />
            <FaFacebook size={30} />
            <FaLinkedin size={30} />
            <FaYoutube size={30} />
            <FaTwitter size={30} />
          </div>
          <div className=" text-gray-500 mt-2 w-full text-center">
            &copy;@2024 SolGuruz LLP Pvt. Ltd. | CIN:U69T69K69A69R69S69H
          </div>
        </div>
      </div>
    </>
  );
}
