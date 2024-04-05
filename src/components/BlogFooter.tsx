import React from "react";
import Link from "next/link";
import Image from "next/image";
import { footer_data, PORTER_BLOG } from "@/constant/blog";
export default function BlogFooter() {
  return (
    <div>
      <div className="w-full bg-gray-200 flex flex-col ">
        <div className="flex justify-between items-center px-[120px] pt-[60px] max-[1133px]:px-[50px] max-[850px]:px-[20px] max-[720px]:pt-[20px] max-[440px]:flex-col max-[440px]:items-start max-[440px]:gap-6">
          <div className="text-[28px] font-bold w-auto justify-center flex max-[709px]:w-10/12 max-[440px]:w-full max-[440px]:justify-start">{PORTER_BLOG}</div>
          <div className="flex gap-16 p-4 max-[1133px]:gap-8 max-[850px]:gap-4 max-[720px]:flex-col max-[440px]:p-0 ">
            {footer_data.map((item, index) => (
              <div key={index}>
                <Link
                  href={item.link}
                  className="text-base font-bold tracking-wider text-[#0A0A0A] hover:text-[#2967ff] transition-all duration-100"
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="pt-[0px] px-[120px] mt-2 text-[19.2px] text-[#5A5A5A] pb-10 max-[1133px]:px-[50px] max-[850px]:px-[20px] ">
          India’s Largest Marketplace for Intracity Logistics
        </div>
      </div>
    </div>
  );
}
