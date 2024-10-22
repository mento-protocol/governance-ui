import React from "react";

export enum TX_STATUS {
  PENDING = "PENDING",
  CONFIRMING = "CONFIRMING",
  AWAITING_SIGNATURE = "AWAITING_SIGNATURE",
  UNKNOWN = "UNKNOWN",
  ERROR = "ERROR",
}

interface UseTransactionModalProps {
  title: string;
  onConfirmation?: () => void;
}

export function useTransactionModal({
  title,
  onConfirmation,
}: UseTransactionModalProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [status, setStatus] = React.useState<TX_STATUS>(TX_STATUS.UNKNOWN);
  const [, setError] = React.useState<Error | null>(null);

  const open = () => setIsOpen(true);
  const close = () => {
    setIsOpen(false);
    setStatus(TX_STATUS.UNKNOWN);
    setError(null);
  };

  const updateStatus = (newStatus: TX_STATUS) => setStatus(newStatus);
  const setErrorState = (err: Error) => {
    setError(err);
    setStatus(TX_STATUS.ERROR);
  };

  const retry = () => {
    setStatus(TX_STATUS.UNKNOWN);
    setError(null);
  };

  return {
    isOpen,
    open,
    close,
    status,
    updateStatus,
    setErrorState,
    retry,
  };
}
