import { useAvailableToWithdraw } from "@/lib/contracts/locking/useAvailableToWithdraw";
import { Button } from "@/components/_shared";
import { formatUnits } from "viem";
import React from "react";
import useTokens from "@/lib/contracts/useTokens";
import { TxModal } from "@/components/_shared/tx-modal/tx-modal.component";
import { toast } from "sonner";
import { useWithdraw } from "@/lib/contracts/locking/useWithdraw";
import { useLockInfo } from "@/lib/hooks/useLockInfo";
import { useAccount } from "wagmi";

export const WithdrawButton = () => {
  const { availableToWithdraw, refetchAvailableToWithdraw } =
    useAvailableToWithdraw();

  const { address } = useAccount();

  const { refetch } = useLockInfo(address);

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
    refetch();
    setIsModalOpen(false);
    toast.success("Withdraw Successful", {
      unstyled: true,
      duration: 2000,
    });
  }, [refetchAvailableToWithdraw, refetch]);

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

  if (!hasAmountToWithdraw) return <Button disabled>Withdraw</Button>;

  return (
    <>
      {hasAmountToWithdraw && (
        <>
          <button
            className="w-fit self-end border-none p-0 text-left text-black underline transition-[color] duration-200 ease-out visited:text-primary-dark hover:text-primary active:text-primary-dark dark:text-white md:hidden "
            onClick={handleWithdraw}
          >
            Withdraw <br /> {availableToWithdrawFormatted} MENTO
          </button>

          <Button
            className="hidden w-fit text-center md:block"
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
