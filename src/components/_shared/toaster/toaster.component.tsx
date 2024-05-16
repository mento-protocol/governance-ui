import React from "react";
import { Toaster as SonnerToaster } from "sonner";

export const Toaster = () => {
  return (
    <>
      <SonnerToaster
        className="hidden md:block"
        position="bottom-right"
        toastOptions={{
          duration: 2000,
          unstyled: true,
          classNames: {
            toast:
              "flex items-center justify-center gap-4 rounded-lg  border  border-primary-dark  bg-white px-[20px] py-[16px] font-fg  text-black shadow-md transition-all duration-300",
            title: "flex flex-col items-center justify-end h-full",
            error: "bg-red-400",
            success: "bg-white",
          },
        }}
      />
      <SonnerToaster
        className="md:hidden"
        position="bottom-center"
        toastOptions={{
          duration: 2000,
          unstyled: true,
          classNames: {
            toast:
              "flex items-center justify-center gap-4 rounded-lg  border  border-primary-dark  bg-white px-[20px] py-[16px] font-fg  text-black shadow-md transition-all duration-300",
            title: "flex flex-col items-center justify-end h-full",
            error: "bg-red-400",
            success: "bg-white",
          },
        }}
      />
    </>
  );
};
