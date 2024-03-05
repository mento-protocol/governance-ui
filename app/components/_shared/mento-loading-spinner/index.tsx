"use client";
import React from "react";
import { MentoLoadingIcon } from "@/app/components/_icons";

const MentoLoadingAnimation = () => {
  return (
    <div className="w-20 h-20 mx-auto flex items-center justify-center p-1 border border-black dark:border-[white] rounded-full text-[#fffefe] dark:text-[white]">
      <MentoLoadingIcon className="animate-spin-slow w-full h-full" />
    </div>
  );
};

export default MentoLoadingAnimation;
