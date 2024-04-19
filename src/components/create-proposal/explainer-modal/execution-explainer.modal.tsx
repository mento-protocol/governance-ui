import { ExecutionCodeView } from "@/components/_shared";
import { IModal, Modal } from "@/components/_shared/modal/modal.component";
import { TransactionItem } from "@/lib/contracts/governor/useCreateProposalOnChain";

const sampleCode: TransactionItem[] = [
  {
    address: "0x0000000000000000000000000000000000000000",
    value: 0,
    data: "0x",
  },
];

interface IExecutionExplanationModal
  extends Omit<IModal, "title" | "children"> {}

export const ExecutionExplanationModal = ({
  isOpen,
  onClose,
}: IExecutionExplanationModal) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="The execution code must follow these rules:"
    >
      <div className="mx-auto">
        <ul className="mx-auto ml-3 mt-2 flex list-disc flex-col items-start gap-1 text-left font-light">
          <li className=" ">It must be a valid JSON array.</li>
          <li className=" ">
            Must only contain transaction objects in the array.
          </li>
          <li className="">
            Must have at least one item in the array, an empty transaction like
            displayed here can be used.
          </li>
          <li className="">Each element must have the following properties:</li>
          <ul className="list-disc font-light">
            <li className="flex gap-x1">
              <b>address:</b> Address(0xc0FfEe...1234)
            </li>
            <li className="flex gap-x1">
              <b>value:</b> Number | BigInt in hex string format
            </li>
            <li className="flex gap-x1">
              <b>data:</b> Hex string format
            </li>
          </ul>
        </ul>
        <h2 className="font-size-x4 mb-x4 mt-x4 font-semibold">Sample:</h2>
        <div className="max-w-[700px] text-left">
          <ExecutionCodeView code={sampleCode} />
        </div>
      </div>
    </Modal>
  );
};
