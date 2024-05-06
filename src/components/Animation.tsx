import { successAnimationGIFimage } from "@/assets/Images/imageassets";
import Image from "next/image";
import React from "react";

export default function AnimationGif() {
  return (
    <div className="w-full h-full bg-white flex justify-center items-center z-[10000] absolute top-0 left-0 overflow-y-hidden">
      <Image src={successAnimationGIFimage} alt="animation"></Image>
    </div>
  );
}
