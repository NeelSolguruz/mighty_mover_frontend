import Link from "next/link"
import Image from "next/image"
import brand_logo from "../assets/images/Designer.png"
export default function Navbar(){
    return (
        <>
        <div className="sticky flex shadow-2xl overflow-hidden border-2  w-full justify-between h-16 items-center  bg-white text-zinc-900 
        max-sm:flex
        z-10">
          <div className="ml-12 max-sm:ml-5">
           <Link href='/'><Image src={brand_logo} width={60}  alt="logo"/></Link>
          </div>
          <div className="max-sm:hidden">
            <Link href="/enterprise" className="mr-2 hover:text-yellow-500 text-md text-black font-bold">For Enterprise</Link> 
            <Link href="/deliveryPartner" className="ml-2 hover:text-yellow-500 text-md text-black
            font-bold" >Delivery Partners</Link>
          </div>
          <div className="max-sm:hidden mr-20">
            <Link href="" className="text-md font-bold
             hover:text-yellow-500
             ">Support</Link>
          </div>      
        </div>
        </>
    )
}

