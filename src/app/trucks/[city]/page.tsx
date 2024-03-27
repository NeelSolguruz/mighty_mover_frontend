import React from "react";
import Image from "next/image";
import { truck_page_indi } from "@/app/assets/Images/imageassets";
export default function page() {
  return (
    <>
      <div className="flex gap-8 w-full h-auto">
        <div className="w-full">
          <Image src={truck_page_indi} alt="main page"></Image>
        </div>
      </div>
    </>
  );
}
