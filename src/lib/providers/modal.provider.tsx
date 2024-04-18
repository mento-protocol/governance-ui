import { createContext, ReactNode, useContext, useState } from "react";
import modalStyles from "@/styles/modal.module.scss";
import { Button, Card } from "@/components/_shared";
import { cn } from "@/styles/helpers";

interface ModalProviderProps {
  children: ReactNode;
}

const modals: ModalInstance[] = [];

interface ModalWrapperProps {
  children: ReactNode;
  index: number;
  question?: boolean;
  close: () => void;
  confirm?: () => void;
  cancel?: () => void;
  options?: ModalOptions;
}

type ModalType = "success" | "error" | "warning" | "info";

interface ModalOptions {
  title?: string;
  confirmText?: string;
  cancelText?: string;
  modalType?: ModalType;
}

interface ModalInstance {
  modal: ReactNode | string;
  isQuestion: boolean;
  options?: ModalOptions;
}

const modalTypeToButtonThemeMap = (modalType?: ModalType) => {
  switch (modalType) {
    case "success":
      return "success";
    case "error":
      return "danger";
    case "warning":
      return "warning";
    case "info":
      return "info";
    default:
      return "primary";
  }
};

const ModalContext = createContext({
  showModal: (
    value: ReactNode,
    options?: Partial<ModalOptions>,
  ): Promise<boolean> => Promise.resolve(false),
  showConfirm: (
    value: ReactNode,
    options?: Partial<ModalOptions>,
  ): Promise<boolean> => Promise.resolve(false),
});

const useModal = () => {
  const { showModal, showConfirm } = useContext(ModalContext);
  return { showModal, showConfirm };
};

// TODO: tailwind conversion ignored, modal overcomplicated
const ModalWrapper = ({
  children,
  index,
  close,
  question,
  cancel,
  confirm,
  options,
}: ModalWrapperProps) => {
  return (
    <div
      key={index}
      className={cn(modalStyles.modal, modalStyles.opened)}
      style={{ zIndex: 1000 + index }}
    >
      <div className={modalStyles.modal__content}>
        <Card
          className={cn(
            "relative",
            modalStyles.modal__content__inner,
            modalStyles[options?.modalType || ""],
          )}
        >
          <Card.Header className="!pb-x6">
            <div className="font-semibold">
              {options?.title || (question ? "Confirm" : " ")}
            </div>
            <div className={modalStyles.modal__close} onClick={close}>
              X
            </div>
          </Card.Header>
          <div className="ma-x4">{children}</div>
          {question && (
            <Card.Footer className="mt-x4 flex justify-end gap-x2">
              <Button theme="info" onClick={cancel}>
                {options?.cancelText || "Cancel"}
              </Button>
              <Button
                theme={modalTypeToButtonThemeMap(options?.modalType)}
                onClick={confirm}
              >
                {options?.confirmText || "Confirm"}
              </Button>
            </Card.Footer>
          )}
        </Card>
      </div>
    </div>
  );
};

// TODO: Provider redundant, modal is a wrapper, no need for this.
export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modalWrapperID, setModalWrapperID] = useState<string>(
    Math.random().toString(36).substring(7),
  );

  const addModal = (modal: ModalInstance) => {
    modals.push(modal);
    setModalWrapperID(Math.random().toString(36).substring(7));
  };

  const removeModal = () => {
    modals.pop();
    setModalWrapperID(Math.random().toString(36).substring(7));
  };

  const renderModal = (
    value: ReactNode,
    isQuestion: boolean,
    options?: Partial<ModalOptions>,
  ) => {
    return new Promise<boolean>((resolve) => {
      const confirm = () => {
        removeModal();
        resolve(true);
      };

      const cancel = () => {
        removeModal();
        resolve(false);
      };

      const modal = (
        <ModalWrapper
          close={cancel}
          confirm={confirm}
          cancel={cancel}
          question={isQuestion}
          index={modals.length}
          options={options}
        >
          {value}
        </ModalWrapper>
      );

      const modalInstance: ModalInstance = {
        modal,
        isQuestion: true,
        options,
      };
      addModal(modalInstance);
    });
  };

  const showModal = (value: ReactNode, options?: Partial<ModalOptions>) => {
    return renderModal(value, false, options);
  };

  const showConfirm = (value: ReactNode, options?: Partial<ModalOptions>) => {
    return renderModal(value, true, options);
  };

  return (
    <ModalContext.Provider
      value={{
        showModal,
        showConfirm,
      }}
    >
      {children}
      <div id={modalWrapperID}>
        {modals.map((modal, index) => (
          <div key={index}>{modal.modal}</div>
        ))}
      </div>
    </ModalContext.Provider>
  );
};

export default useModal;
