"use client";
import { useAccount } from "wagmi";
import { Card, ConnectButton, Loader, MentoLock } from "@/components/_shared";
import { LocksList } from "@/components/index";
import useLocksByAccount from "@/lib/contracts/locking/useLocksByAccount";
import { useAvailableToWithdraw } from "@/lib/contracts/locking/useAvailableToWithdraw";
import { useWithdraw } from "@/lib/contracts/locking/useWithdraw";
import React from "react";
import { TxModal } from "@/components/_shared/tx-modal/tx-modal.component";
import { toast } from "sonner";

const Page = () => {
  const { address, isConnecting } = useAccount();
  const { locks, refetch } = useLocksByAccount({ account: address! });
  const { availableToWithdraw, refetchAvailableToWithdraw } =
    useAvailableToWithdraw();

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState("");
  const [modalMessage, setModalMessage] = React.useState<React.ReactNode>(null);

  const handleWithdrawSuccess = React.useCallback(() => {
    refetchAvailableToWithdraw();
    setIsModalOpen(false);
    toast.success("Withdraw Successful", {
      unstyled: true,
      duration: 2000,
    });
  }, [refetchAvailableToWithdraw]);

  const { withdraw, isPending, isConfirming, error } = useWithdraw({
    onConfirmation: handleWithdrawSuccess,
  });

  const handleWithdraw = React.useCallback(() => {
    setModalTitle("Withdrawing");
    setModalMessage("Please confirm the transaction in your wallet.");
    setIsModalOpen(true);
    withdraw();
  }, [withdraw]);

  const closeModal = React.useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const retryWithdraw = React.useCallback(() => {
    withdraw();
  }, [withdraw]);

  React.useEffect(() => {
    if (isPending) {
      setModalTitle("Withdrawing");
      setModalMessage("Please confirm the transaction in your wallet.");
    } else if (isConfirming) {
      setModalTitle("Confirming Withdrawal");
      setModalMessage("Transaction is being confirmed on the blockchain.");
    } else if (error) {
      setModalTitle("Withdrawal Failed");
      setModalMessage("There was an error processing your withdrawal.");
    }
  }, [isPending, isConfirming, error]);

  return (
    <main className="flex flex-col place-items-center">
      <h2 className="mb-4 mt-8 text-[32px]/none font-medium">
        My Voting Power
      </h2>
      <Card className="flex min-h-60 items-center justify-center py-10" block>
        {address ? (
          <MentoLock
            onLockConfirmation={() => {
              refetch();
            }}
            className="max-w-[428px]"
          />
        ) : (
          <div className="flex flex-col gap-4 ">
            <span className="text-xl">Connect Wallet to Lock MENTO</span>
            <ConnectButton theme="primary" />
          </div>
        )}
      </Card>
      {address && (
        <>
          <h2 className="mb-4 mt-[56px] text-[32px]/none font-medium">
            My Locks
          </h2>
          <Card block>
            {address && !isConnecting && (
              <LocksList
                locks={locks}
                onExtend={refetch}
                account={address}
                availableToWithdraw={availableToWithdraw}
                onWithdraw={handleWithdraw}
              />
            )}
            {isConnecting && <Loader isCenter />}
          </Card>
        </>
      )}
      <TxModal
        isOpen={isModalOpen}
        onClose={closeModal}
        error={!!error}
        retry={retryWithdraw}
        title={modalTitle}
        message={modalMessage}
      />
    </main>
  );
};

export default Page;
