import Link from "next/link";


import { SUPPORT_STRING } from "../constant/constant"
import { FcCustomerSupport } from "react-icons/fc";
import { CgLoadbar } from "react-icons/cg";

export default function Support() {
    return (<>
        <div className="bg-black py-10">
            {/* title */}
            <div className="
                    flex flex-col items-center my-10
                    ">
                <div>
                    <h1 className="text-4xl text-white font-bold
                            max-lg:text-2xl
                            max-sm:text-2xl
                            ">
                        {SUPPORT_STRING.main_title}
                    </h1>
                </div>
                <div className="p-4">
                    <h3 className="text-xl text-white font-bold
                            max-lg:text-lg
                            max-sm:text-base
                            ">
                        {SUPPORT_STRING.main_desc}
                    </h3>
                </div>
            </div>


            {/* section1 */}
            <div className="flex justify-center">
                <div className="w-11/12 grid grid-cols-2
                        max-md:grid-cols-1
                        rounded-xl
                        bg-white
                        ">
                    {SUPPORT_STRING.SECTION_ONE.map((item, index) => (
                        <div className="flex p-10
                            border-2
                            rounded-xl
                            gap-4
                            " key={index}>
                            <div>
                                <FcCustomerSupport
                                    className="size-20
                                    max-lg:size-14
                                    max-sm:size-10
                                    "
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="text-lg font-bold
                                max-lg:text-base
                                ">
                                    {item.title}
                                </div>
                                <div className="text-gray-500 font-semibold text-sm
                                max-lg:text-xs
                                ">
                                    {item.desc}
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>


            <div className="my-20">
                <div className="flex flex-col items-center">
                    <div className="text-white text-4xl font-bold
                    max-sm:text-3xl
                    ">
                        {SUPPORT_STRING.office_heading}
                    </div>
                    <div className="text-white text-4xl
                    max-sm:text-3xl
                    ">
                        <CgLoadbar />
                    </div>
                </div>
                <div className="flex flex-col items-center mt-10">
                    <div className="text-white text-2xl font-bold">
                        {SUPPORT_STRING.head_office_heading}
                    </div>
                    <div className="text-white text-2xl">
                        <CgLoadbar />
                    </div>
                    <div className="flex flex-col text-white w-3/12 gap-4
                    max-sm:w-9/12
                    ">
                        <h2 className="text-2xl font-bold mt-5
                        max-sm:text-xl
                        ">{SUPPORT_STRING.head_office.city}</h2>
                        <p className="font-semibold
                        max-sm:text-sm
                        ">{SUPPORT_STRING.head_office.add}</p>
                        <Link href={SUPPORT_STRING.head_office.url}
                            className="w-fit
                                max-sm:text-sm
                                font-semibold
                                text-gray-400
                                hover:italic
                                "
                        >
                            {SUPPORT_STRING.head_office.url_text}
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col items-center text-white
                        mt-10
                        ">
                    <div className="text-2xl font-bold">
                        <h1>{SUPPORT_STRING.regional_office_heading}</h1>
                    </div>
                    <div className="text-2xl">
                        <CgLoadbar />
                    </div>
                </div>


                <div className="flex justify-center">
                    <div className="grid grid-cols-2 w-10/12
                max-sm:grid-cols-1
                ">
                        {SUPPORT_STRING.SECTION_TWO.map((item, index) => (
                            <div key={index} className="flex justify-center">
                                <div className="text-white
                                flex flex-col
                                gap-5
                                p-4
                                w-7/12
                                max-lg:w-9/12
                                max-sm:gap-3
                                max-sm:w-full
                                "
                                    key={index}>
                                    <h2
                                        className="text-2xl font-bold
                                    max-lg:text-2xl
                                    max-sm:text-xl
                                    "
                                    >{item.city}</h2>
                                    <p
                                        className="font-semibold
                                    max-lg:text-base
                                    max-sm:text-sm
                                    "
                                    >{item.add}</p>
                                    <Link href={item.url}
                                        className="text-gray-400 
                                    font-semibold
                                    hover:italic
                                    max-lg:text-sm
                                    max-sm:text-xs
                                    "
                                    >{item.url_text}</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    </>
    );
}