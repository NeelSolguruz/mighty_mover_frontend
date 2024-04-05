import Link from "next/link";
import Image from "next/image";
import { QUICK_LINKS, COMPANY, SUPPORT, LOCATIONS } from "../constant/constant";
import BrandLogo from "../assets/Images/icons/BrandLogo";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube, FaTwitter } from "react-icons/fa";
import { google_play, app_store, porter_white } from "../assets/Images/imageassets";

export default function Footer() {
  return (
    <>
      <div className="bg-black text-white w-full">
        <div className="w-full flex flex-col items-center pt-5">
          <div className="grid grid-cols-5 max-lg:grid-cols-4 max-sm:grid-cols-2 max-sm:gap-5 w-11/12">
            <div className="items-start text-2xl font-semibold flex flex-col gap-2 max-lg:hidden">
              <div className="w-[150px]">
                <BrandLogo />
              </div>
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
                  <li key={index} className="hover:text-gray-400 text-sm">
                    <Link href={item.url}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="w-max max-md:mt-3.5 max-sm:mt-2 mb-2">
              <h1 className="text-xl font-semibold">Support</h1>
              <ul className="flex flex-col gap-2 mt-4">
                {SUPPORT.map((item, index) => (
                  <li key={index} className="hover:text-gray-400 text-sm">
                    <Link href={item.url}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="flex flex-col gap-3 max-sm:justify-center">
              <div>
                <Image
                  src={google_play}
                  alt="google play logo"
                  className="w-[200px] max-sm:w-[150px]"
                />
              </div>
              <div>
                <Image
                  src={app_store}
                  alt="app store logo"
                  className="w-[200px] max-sm:w-[150px]"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 w-11/12">
            <div className="text-lg mt-10 font-semibold flex justify-start"><p>We are here</p></div>
            <div
              className="text-sm grid grid-cols-5 gap-5 max-lg:grid-cols-4 max-xs:text-[12px]">
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
        </div>
        <div className="flex flex-col items-center pb-10">
          <div className="w-11/12 flex justify-between mt-8 mb-2 items-center max-md:flex-col max-md:gap-5">
            <div className="flex gap-5 ">
              <FaInstagram size={30} />
              <FaFacebook size={30} />
              <FaLinkedin size={30} />
              <FaYoutube size={30} />
              <FaTwitter size={30} />
            </div>
            <div className="text-gray-300 text-center text-sm">
              &copy;@2024 SolGuruz LLP Pvt. Ltd.  | CIN:1234567890123456789
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
