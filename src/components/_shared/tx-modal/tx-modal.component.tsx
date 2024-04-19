import { Button, Loader } from "@/components/_shared";
import { MentoIcon } from "@/components/_icons";
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
      <p className="text-center text-lg text-primary-dark">
        Unfortunately, transaction was rejected.
      </p>
      <MentoIcon className="mx-auto my-8" />
    </>
  );
};

const PendingMessage = ({ message }: { message: React.ReactNode }) => {
  return (
    <>
      <p className="text-center text-lg text-primary-dark">{message}</p>
      <Loader className="mx-auto my-8" />
    </>
  );
};
