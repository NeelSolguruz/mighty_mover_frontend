import Enterprise from "@/components/Enterprise";
import React from "react";
import { Toaster } from "sonner";

function page() {
  return (
    <div>
      <Toaster
        duration={2000}
        richColors
        position="top-right"
        toastOptions={{
          style: {
            // background: "red",
            // zIndex: 100,
            // width:"250px",
          },
        }}
      />
      <Enterprise />
    </div>
  );
}

export default page;
