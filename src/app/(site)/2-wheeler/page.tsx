"use client";
import Dashboard from "@/components/Dashboard";
import Map from "@/components/Map";
import React from "react";

export default function page() {
  return (
    <div>
      {/* <Map /> */}
      <Dashboard />
    </div>
  );
}

// "use client";
// import Map from "@/components/Map";
// import UserOrderList from "@/components/UserOrderList";
// import React, { useState } from "react";

// const Tab1Content = () => (
//   <div className="relative flex flex-col">
//     <div className="w-full bg-white rounded-lg border border-gray-200 shadow-md min-h-[480px]">
//       <Map />
//       {/* <div className="h-[180px] bg-gray-300 rounded-t-2xl" /> */}
//     </div>
//   </div>
// );

// const Tab2Content = () => (
//   <div className="relative flex flex-col">
//     <div className="w-full bg-white rounded-2xl shadow-xl min-h-[480px]">
//       <UserOrderList />
//       {/* <div className="h-[180px] bg-gray-300 rounded-t-2xl" /> */}
//     </div>
//   </div>
// );

// export default function Page() {
//   const [activeTab, setActiveTab] = useState(1);

//   return (
//     <div className="p-8">
//       <div className="flex justify-center">
//         <div className="max-w-[480px] w-full inline-flex flex-wrap justify-center bg-slate-200 rounded-[20px] p-1">
//           <button
//             className={`flex-1 text-sm font-medium h-8 px-4 rounded-2xl whitespace-nowrap focus-visible:outline-none ui-focus-visible:outline-none ui-focus-visible:ring ui-focus-visible:ring-indigo-300 transition-colors duration-150 ease-in-out ${
//               activeTab === 1
//                 ? "bg-white text-slate-900"
//                 : "text-slate-600 hover:text-slate-900"
//             }`}
//             onClick={() => setActiveTab(1)}
//           >
//             Map
//           </button>
//           <button
//             className={`flex-1 text-sm font-medium h-8 px-4 rounded-2xl whitespace-nowrap focus-visible:outline-none ui-focus-visible:outline-none ui-focus-visible:ring ui-focus-visible:ring-indigo-300 transition-colors duration-150 ease-in-out ${
//               activeTab === 2
//                 ? "bg-white text-slate-900"
//                 : "text-slate-600 hover:text-slate-900"
//             }`}
//             onClick={() => setActiveTab(2)}
//           >
//             User Order List
//           </button>
//         </div>
//       </div>
//       <div className="mt-2">
//         {activeTab === 1 && <Tab1Content />}
//         {activeTab === 2 && <Tab2Content />}
//       </div>
//     </div>
//   );
// }
