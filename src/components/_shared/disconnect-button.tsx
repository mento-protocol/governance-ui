"use client";
import { Button, ButtonProps } from "@mento-protocol/ui-toolkit";
import React from "react";
import { useDisconnect } from "wagmi";

export const DisconnectButton = (props: ButtonProps) => {
  const { disconnect } = useDisconnect();
  return <Button {...props} onClick={() => disconnect()} />;
};
