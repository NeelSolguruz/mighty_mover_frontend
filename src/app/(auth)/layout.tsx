import React from "react";
import { Toaster } from "sonner";
const layout = ({ children }: any) => {
  return <div>
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
    {children}
    </div>;
};

export default layout;
