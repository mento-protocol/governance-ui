import { ExecutionCodeView } from "@/components/_shared";
import { TransactionItem } from "@/lib/contracts/governor/useCreateProposalOnChain";

const sampleCode: TransactionItem[] = [
  {
    address: "0x0000000000000000000000000000000000000000",
    value: 0,
    data: "0x",
  },
];

export const ExecutionExplanationModal = () => {
  return (
    <div>
      <ul className="list-disc font-light">
        <li className="ml-x4 mt-x1">It must be a valid JSON array.</li>
        <li className="ml-x4 mt-x1">
          Must only contain transaction objects in the array.
        </li>
        <li className="ml-x4 mt-x1">
          Must have at least one item in the array, an empty transaction like
          displayed here can be used.
        </li>
        <li className="ml-x4 mt-x1">
          Each element must have the following properties:
        </li>
        <ul className="ml-x4 mt-x1 list-disc font-light">
          <li className="ml-x3 mt-x1 flex gap-x1">
            <b>address:</b> Address(0xc0FfEe...1234)
          </li>
          <li className="ml-x3 mt-x1 flex gap-x1">
            <b>value:</b> Number | BigInt in hex string format
          </li>
          <li className="ml-x3 mt-x1 flex gap-x1">
            <b>data:</b> Hex string format
          </li>
        </ul>
      </ul>

      <h2 className="font-size-x4 mb-x4 mt-x4 font-semibold">Sample:</h2>
      <div className="max-w-[700px]">
        <ExecutionCodeView code={sampleCode} />
      </div>
    </div>
  );
};
