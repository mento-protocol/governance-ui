import { ITxModal, TxModal } from "../_shared/tx-modal/tx-modal.component";

interface ICreateProposalModal extends ITxModal {
  error?: boolean;
  retry: () => void;
}

export const CreateProposalTxModal = ({
  isOpen,
  onClose,
  error,
  retry,
  message,
  title,
}: ICreateProposalModal) => {
  return (
    <TxModal
      isOpen={isOpen}
      title={title}
      error={error}
      retry={retry}
      onClose={onClose}
      message={message}
    />
  );
};
