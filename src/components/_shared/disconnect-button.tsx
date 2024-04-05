"use client";
import React from "react";
import { useDisconnect } from "wagmi";
import {
  Button,
  ButtonProps,
} from "@/components/_shared/button/button.component";

export const DisconnectButton = (props: ButtonProps) => {
  const { disconnect } = useDisconnect();
  return (
    // <ClientOnly>
    <Button {...props} onClick={() => disconnect()} />
    // </ClientOnly>
  );
};
