import { useAvailableToWithdraw } from "@/lib/contracts/locking/useAvailableToWithdraw";
import { Button } from "@/components/_shared";
import { formatUnits } from "viem";
import Link from "next/link";
import React from "react";
import useTokens from "@/lib/contracts/useTokens";
import { TxModal } from "@/components/_shared/tx-modal/tx-modal.component";
import { toast } from "sonner";
import { useWithdraw } from "@/lib/contracts/locking/useWithdraw";

export const WithdrawButton = () => {
  const { availableToWithdraw, refetchAvailableToWithdraw } =
    useAvailableToWithdraw();

  const {
    mentoContractData: { decimals: mentoDecimals },
  } = useTokens();

  const hasAmountToWithdraw = availableToWithdraw > BigInt(0);

  const availableToWithdrawFormatted = React.useMemo(() => {
    return Number(formatUnits(availableToWithdraw, mentoDecimals)).toFixed(3);
  }, [availableToWithdraw, mentoDecimals]);

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
    <>
      {hasAmountToWithdraw && (
        <>
          <Link
            href="#"
            onClick={handleWithdraw}
            className="text-primary underline hover:text-primary-dark dark:text-secondary md:hidden"
          >
            Withdraw <br /> {availableToWithdrawFormatted} MENTO
          </Link>

          <Button
            className="hidden text-center md:block"
            theme="clear"
            onClick={handleWithdraw}
          >
            Withdraw <br /> {availableToWithdrawFormatted} MENTO
          </Button>
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
    </>
  );
};
