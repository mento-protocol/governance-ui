"use client";
import * as React from "react";
import BaseComponentProps from "@/interfaces/base-component-props.interface";
import { centerEllipsis } from "@/lib/helpers/string.service";
import { BlockExplorerLink, cn } from "@mento-protocol/ui-toolkit";

interface WalletAddressProps extends BaseComponentProps {
  address: string;
  remaining?: number;
}

export const WalletAddress = ({
  address,
  className,
  remaining,
}: WalletAddressProps) => {
  return (
    <BlockExplorerLink
      className={cn("no-underline", className)}
      type="address"
      item={address}
    >
      {centerEllipsis(address, remaining)}
    </BlockExplorerLink>
  );
};
