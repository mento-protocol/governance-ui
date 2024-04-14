import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button, Loader } from "@/components/_shared";
import { MentoIcon } from "@/components/_icons";

interface IModal {
  isOpen: boolean;
  setOpen: (state: boolean) => void;
}

interface ICreateProposalModal extends IModal {
  error?: boolean;
  retry: () => void;
}

export const CreateProposalTxModal = ({
  isOpen,
  setOpen,
  error,
  retry,
}: ICreateProposalModal) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => {
          // Can't dismiss typically
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white px-12 py-7 align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-center text-3xl font-medium text-gray-900"
                >
                  Create New Proposal
                </Dialog.Title>
                <div className="mt-2">
                  {!error && (
                    <>
                      <p className="text-center text-lg text-primary-dark">
                        Please sign a transaction in connected wallet to publish
                        proposal onchain. You will be redirected to proposal
                        page once transaction is successful.
                      </p>
                      <Loader className="mx-auto my-8" />
                    </>
                  )}
                  {error && (
                    <>
                      <p className="text-center text-lg text-primary-dark">
                        Unfortunately, transaction was rejected.
                      </p>
                      <MentoIcon className="mx-auto my-8" />
                    </>
                  )}
                </div>

                {error && (
                  <div className="mt-4 flex flex-row justify-center gap-x4">
                    <Button theme="info" onClick={() => setOpen(false)}>
                      Back
                    </Button>
                    <Button theme="primary" onClick={retry}>
                      Retry
                    </Button>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
