import Link from "next/link";
import Image from "next/image";
import { QUICK_LINKS,COMPANY,SUPPORT,LOCATIONS } from "../constant/constant";
import brand_logo from "../assets/images/Designer.png"
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube,FaTwitter } from "react-icons/fa";

export default function Footer(){
    return(
        <>
        <div className="bg-black text-white p-5">
            <div className=" grid grid-cols-4 mb-3 ml-4 max-md:grid-cols-2 max-sm:grid-cols-1">
                <div className="w-max text-2xl font-semibold flex flex-col">
                    <Image
                        src={brand_logo}
                        width={50}
                        alt="Brand Logo"
                    />
                    <p>Send anything,</p>
                    <p>anywhere,</p>
                    <p>anytime</p>
                </div>
                <div className="w-max  max-sm:mt-2 mb-2">
                    <h1 className="text-xl font-semibold">Company</h1>
                    <ul>
                        {COMPANY.map((item,index)=>(
                            <li key={index} className="hover:text-gray-400"><Link href={item.url}>{item.name}</Link></li>    
                        ))}
                    </ul>
                </div>
                <div className="w-max max-md:mt-5  max-sm:mt-2 mb-2">
                    <h1 className="text-xl font-semibold">Quick Links</h1>
                    <ul>
                        {QUICK_LINKS.map((item,index)=>(
                           <li key={index} className="hover:text-gray-400"><Link href={item.url}>{item.name}</Link></li>
                        ))}
                    </ul>
                </div>
                <div className="w-max max-md:mt-3.5 max-sm:mt-2 mb-2 ">
                    <h1 className="text-xl font-semibold">Support</h1>
                    <ul>    
                        {SUPPORT.map((item,index)=>(
                           <li key={index} className="hover:text-gray-400"><Link href={item.url}>{item.name}</Link></li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className=" mt-10 text-xl font-semibold ml-4">
                We Are Here
            </div>
            <div className=" grid grid-cols-5 max-md:grid-cols-3 ml-4 max-sm:grid-cols-2">
            <div>
                <ul>
                   <li>{LOCATIONS[0]}</li>
                   <li>{LOCATIONS[1]}</li>
                   <li>{LOCATIONS[2]}</li>
                   <li>{LOCATIONS[3]}</li>
                   {/* {LOCATIONS.map((item,index)=>(
                        while(index>4){
                        <li key={index}>{item}</li>
                        }
                   ))} */}
                </ul>
            </div>
                <div>
                <ul>
                   <li>{LOCATIONS[4]}</li>
                   <li>{LOCATIONS[5]}</li>
                   <li>{LOCATIONS[6]}</li>
                   <li>{LOCATIONS[7]}</li>
                </ul>
                </div>
                <div>
                <ul>
                   <li>{LOCATIONS[8]}</li>
                   <li>{LOCATIONS[9]}</li>
                   <li>{LOCATIONS[10]}</li>
                   <li>{LOCATIONS[11]}</li>
                </ul>
                </div>
                <div>
                <ul>
                   <li>{LOCATIONS[12]}</li>
                   <li>{LOCATIONS[13]}</li>
                   <li>{LOCATIONS[14]}</li>
                   <li>{LOCATIONS[15]}</li>
                </ul>
                </div>
                <ul>
                   <li>{LOCATIONS[16]}</li>
                   <li>{LOCATIONS[17]}</li>
                   <li>{LOCATIONS[18]}</li>
                   <li>{LOCATIONS[19]}</li>
                </ul>
            </div>
            <div className=" flex justify-between mt-5 mb-2 items-center max-md:flex-col">
                <div className="flex gap-5 ml-4">
                <FaInstagram size={30}/>
                <FaFacebook size={30}/>
                <FaLinkedin size={30}/>
                <FaYoutube size={30}/>
                <FaTwitter size={30}/>
                </div>
                <div className=" text-gray-500 mr-5 mt-2">
                   &copy;@2024 SolGuruz LLP Pvt. Ltd. | CIN:U69T69K69A69R69S69H
                </div>
            </div>
        </div>
        </>
    )
}