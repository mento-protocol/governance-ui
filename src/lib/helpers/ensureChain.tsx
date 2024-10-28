"use client";
import { Alfajores, Celo } from "@/config/chains";
import { ReactNode, useCallback, useEffect, useState } from "react";
import {
  useAccount,
  useSwitchChain,
  createStorage,
  useDisconnect,
} from "wagmi";
import { IS_PROD } from "@/lib/constants/utils";
import { Modal } from "@/components/_shared/modal/modal.component";
import { Button } from "@/components/_shared";

export function EnsureChain({ children }: { children: ReactNode }) {
  const { isConnected, chainId } = useAccount();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();

  const [switching, setSwitching] = useState(false);
  const [incompatibleWalletModalActive, setModalActive] = useState(false);

  const setUpAndSwitch = useCallback(async () => {
    const storage = createStorage({ storage: localStorage });
    const recentConnectorId = await storage.getItem("recentConnectorId");
    switchChain({
      chainId: Celo.id,
    });
    if (recentConnectorId === "me.rainbow") {
      const directId = window.ethereum.chainId;
      const storeData: {
        state: {
          chainId: number;
        };
      } | null = await storage.getItem("store");
      // Adding networks not available on Rainbow wallet
      if (directId) {
        if (directId !== "0xa4ec" || directId !== "0xaef3") {
          disconnect();
          setModalActive(true);
        } else {
          setModalActive(false);
        }
      } else if (
        storeData?.state.chainId !== Celo.id ||
        storeData?.state.chainId !== Alfajores.id
      ) {
        disconnect();
        setModalActive(true);
      } else {
        setModalActive(false);
      }
    }
    setSwitching(false);
  }, [disconnect, switchChain]);

  useEffect(() => {
    if (isConnected) {
      if (
        (IS_PROD && chainId !== Celo.id) ||
        (!IS_PROD && chainId !== Celo.id && chainId !== Alfajores.id)
      ) {
        if (!switching) {
          setSwitching(true);
        }
      }
    }
  }, [chainId, isConnected, setUpAndSwitch, switchChain, switching]);

  useEffect(() => {
    if (switching) {
      setUpAndSwitch();
    }
  }, [setUpAndSwitch, switching]);

  return (
    <>
      {children}
      {incompatibleWalletModalActive && <IncompatibleWallet />}
    </>
  );
}

const IncompatibleWallet = () => {
  // Tailwind classes not rendering styles in this component

  return (
    <Modal isOpen={true} title={"Incompatible Wallet"}>
      <section className="text-left">
        <p
          style={{
            marginTop: "1rem",
          }}
        >
          Unfortunately, Rainbow wallet does not allow adding of new networks
          automatically.
        </p>
        <ol
          style={{
            listStyle: "decimal",
            margin: "1.25rem 0",
            paddingLeft: "1rem",
          }}
        >
          <li>You can add Celo manually by opening up Rainbow wallet.</li>
          <li>Click the menu button on the top right.</li>
          <li>Open the settings menu.</li>
          <li>Click &quot;Networks&quot;.</li>
          <li>Click &quot;Add Custom Network&quot;.</li>
          <li>Search for &quot;Celo&quot;.</li>
          <li>
            Once Celo is added, please click below to retry. <br />
            (Rainbow wallet might not update the network on time, please retry
            again if this screen happens again)
          </li>
          <Button
            fullwidth
            className="mt-4"
            onClick={() => {
              window.location.reload();
            }}
          >
            Retry
          </Button>
        </ol>
      </section>
    </Modal>
  );
};
