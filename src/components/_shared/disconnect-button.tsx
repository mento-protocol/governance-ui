"use client";
import { Button, ButtonProps } from "@/components/_shared";
import React from "react";
import { useDisconnect } from "wagmi";

export const DisconnectButton = (props: ButtonProps) => {
  const { disconnect } = useDisconnect();
  return (
    // <ClientOnly>
    <Button {...props} onClick={() => disconnect()} />
    // </ClientOnly>
  );
};
