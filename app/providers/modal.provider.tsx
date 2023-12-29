import {createContext, ReactNode, useContext, useState} from "react";
import modalStyles from "@styles/modal.module.scss";
import {Button, Card} from "@components/_shared";
import classNames from "classnames";

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

type ModalType = 'success' | 'error' | 'warning' | 'info';

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
        case 'success':
            return 'success';
        case 'error':
            return 'danger';
        case 'warning':
            return 'warning';
        case 'info':
            return 'info';
        default:
            return 'primary';
    }
}

const ModalContext = createContext({
    showModal: (value: ReactNode, options?: Partial<ModalOptions>): Promise<boolean> => Promise.resolve(false),
    showQuestion: (value: ReactNode, options?: Partial<ModalOptions>): Promise<boolean> => Promise.resolve(false),
});

const useModal = () => {
    const {showModal, showQuestion} = useContext(ModalContext);
    return {showModal, showQuestion};
}

const ModalWrapper = ({children, index, close, question, cancel, confirm, options}: ModalWrapperProps) => {
    return <div key={index} className={modalStyles.modal} style={{zIndex: 1000 + index}}>

        <div className={modalStyles.modal__content}>
            <Card className={classNames(modalStyles.modal__content__inner, modalStyles[options?.modalType || ''])}>
                <Card.Header className="flex justify-between">
                    <div className="font-semibold">{options?.title}</div>
                    <div className={modalStyles.modal__close} onClick={close}>
                        X
                    </div>
                </Card.Header>
                {children}
                {question && <Card.Footer className="flex justify-end gap-x2 mt-x4">
                    <Button theme="tertiary" onClick={cancel}>{options?.cancelText || 'Cancel'}</Button>
                    <Button theme={modalTypeToButtonThemeMap(options?.modalType)} onClick={confirm}>{options?.confirmText || 'Confirm'}</Button>
                </Card.Footer>}
            </Card>
        </div>
    </div>
}

export const ModalProvider = ({children}: ModalProviderProps) => {

    const [modalWrapperID, setModalWrapperID] = useState<string>(Math.random().toString(36).substring(7));

    const addModal = (modal: ModalInstance) => {
        modals.push(modal);
        setModalWrapperID(Math.random().toString(36).substring(7));
    }

    const removeModal = () => {
        modals.pop();
        setModalWrapperID(Math.random().toString(36).substring(7));
    }

    const renderModal = (value: ReactNode, isQuestion: boolean, options?: Partial<ModalOptions>) => {
        const id = Math.random().toString(36).substring(7);
        return new Promise<boolean>((resolve) => {

            const confirm = () => {
                removeModal();
                resolve(true);
            }

            const cancel = () => {
                removeModal();
                resolve(false);
            }

            const modal =
                    <ModalWrapper close={cancel}
                                  confirm={confirm}
                                  cancel={cancel}
                                  question={isQuestion}
                                  index={modals.length}
                                  options={options}>
                        {value}
                    </ModalWrapper>;

            const modalInstance: ModalInstance = {
                modal,
                isQuestion: true,
                options
            };
            addModal(modalInstance);
        });
    }

    const showModal = (value: ReactNode, options?: Partial<ModalOptions>) => {
        return renderModal(value, false, options);
    }

    const showQuestion = (value: ReactNode, options?: Partial<ModalOptions>) => {
        return renderModal(value, true, options);
    }

    return <ModalContext.Provider value={{
        showModal, showQuestion
    }}>
        {children}
        <div id={modalWrapperID}>
            {modals.map((modal, index) =>
                <div key={index}>
                    {modal.modal}
                </div>
            )}
        </div>
    </ModalContext.Provider>
}

export default useModal;