import UserOrderList from "@/components/UserOrderList";
import React from "react";

export default function page() {
  return (
    <div className="p-8 h-full">
      <div className="flex justify-center">
        <div className="relative flex flex-col">
          <div className="w-full bg-white rounded-2xl shadow-xl min-h-full">
            <UserOrderList />
            {/* <div className="h-[180px] bg-gray-300 rounded-t-2xl" /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
