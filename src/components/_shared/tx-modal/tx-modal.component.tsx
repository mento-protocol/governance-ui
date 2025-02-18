import { Button, Loader } from "@mento-protocol/ui-toolkit";
import { IModal, Modal } from "../modal/modal.component";

export interface ITxModal extends Omit<IModal, "children"> {
  error?: boolean;
  retry: () => void;
  message: React.ReactNode;
  title: string;
}

export const TxModal = ({
  isOpen,
  error,
  message,
  retry,
  title,
  onClose,
}: ITxModal) => {
  return (
    <Modal isOpen={isOpen} title={title}>
      <div className="mt-2">
        {error ? <ErrorMessage /> : <PendingMessage message={message} />}
      </div>
      {error && (
        <div className="mt-4 flex flex-row justify-center gap-x4">
          <Button theme="info" onClick={onClose}>
            Back
          </Button>
          <Button theme="primary" onClick={retry}>
            Retry
          </Button>
        </div>
      )}
    </Modal>
  );
};

const ErrorMessage = () => {
  return (
    <>
      <p className="text-center text-lg text-error dark:text-error-light">
        Transaction was rejected.
      </p>
    </>
  );
};

const PendingMessage = ({ message }: { message: React.ReactNode }) => {
  return (
    <>
      <div className="text-lg text-primary-dark dark:text-white">{message}</div>
      <Loader
        borderColor="before:border-mento-blue dark:before:border-mento-cyan"
        logoColor="fill-mento-dark dark:fill-mento-cyan"
        className="mx-auto my-8"
      />
    </>
  );
};
