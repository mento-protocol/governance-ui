import { ExecutionCodeView } from "@components/_shared";

const sampleCode = [
  {
    address: "0x0000000000000000000000000000000000000000",
    value: 0,
    data: "0x",
  },
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
        <li className="ml-x4 mt-x1">It must be a valid JSON array</li>
        <li className="ml-x4 mt-x1">Must me an array</li>
        <li className="ml-x4 mt-x1">Must have at least one element</li>
        <li className="ml-x4 mt-x1">
          Each element must have the following properties:
        </li>
        <ul className="ml-x4 mt-x1 list-disc font-light">
          <li className="ml-x3 mt-x1 flex gap-x1">
            address: <pre>string</pre>
          </li>
          <li className="ml-x3 mt-x1 flex gap-x1">
            value: <pre>number</pre>
          </li>
          <li className="ml-x3 mt-x1 flex gap-x1">
            data: <pre>string</pre>
          </li>
        </ul>
      </ul>

      <h2 className="font-size-x4 mb-x4 mt-x4 font-semibold">Sample:</h2>
      <div className="max-w-[700px]">
        <ExecutionCodeView hideTitle code={sampleCode} />
      </div>
    </div>
  );
};
