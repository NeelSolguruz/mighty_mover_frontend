import Image from "next/image"
import {ENTERPRISE_STRING} from "../constant/constant"
import enterprise from "../assets/Images/enterprise.jpg"
export default function page() {
  return (
    <div>
        <div className="w-full">
            <div>
            <Image src={enterprise} className="w-full" alt="Picture of the enterprise"/>
            </div>
        
         <div className="flex w-full justify-between p-10">
            <div>
                logo
            </div>
            <div>
                <form>
                    <div className="flex flex-col gap-4 ">
                  <div>
                    {ENTERPRISE_STRING.FOR_ENTERPRISE}
                  </div>
                  <div>
                    <select>
                        {

                        }
                    </select>
                  </div>
                    </div>
                </form>
            </div>
         </div>
        </div>

    </div>
  )
}
