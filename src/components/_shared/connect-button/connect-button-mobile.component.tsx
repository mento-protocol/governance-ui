"use client";
import { ConnectButton as RainbowConnectButton } from "@rainbow-me/rainbowkit";
import { Button, ButtonProps } from "@/components/_shared";
import { ChevronIcon } from "@/components/_icons";

import { cn } from "@/styles/helpers";

type ConnectButtonProps = ButtonProps;

export const ConnectButtonMobile = ({
  className,
  theme,
}: ConnectButtonProps) => {
  return (
    <RainbowConnectButton.Custom>
      {({ openConnectModal, mounted }) => {
        if (!mounted) return <></>;
        return (
          <Button
            theme={theme || "secondary"}
            fullwidth
            onClick={openConnectModal}
            className={cn(className)}
          >
            <div className="flex flex-row place-items-center justify-center gap-2">
              <div>Connect wallet</div>
              <ChevronIcon direction={"right"} />
            </div>
          </Button>
        );
      }}
    </RainbowConnectButton.Custom>
  );
};
