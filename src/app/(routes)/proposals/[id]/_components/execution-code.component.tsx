import { BlockExplorerLink, Card } from "@/components/_shared";
import useContractsInfo from "@/lib/contracts/useContractsInfo";
import { ProposalCall } from "@/lib/graphql";

type Props = {
  calls: ProposalCall[];
};

export default function ExecutionCode({ calls }: Props) {
  const { formattedCalls } = useContractsInfo({ calls });

  return (
    <div>
      <h3 className="font-size-x6 line-height-x6 mb-x6 flex justify-center font-medium">
        Execution Code
      </h3>
      <Card>
        {formattedCalls.map((call, index) => (
          <div key={index} className="break-words">
            {index > 0 && <hr className="my-4" />}
            <h5 className="mb-1 font-semibold">Target {index + 1}</h5>
            <pre className="text-wrap">
              <BlockExplorerLink type="address" item={call.target}>
                {call.target}
              </BlockExplorerLink>
            </pre>
            <br />
            <h5 className="mb-1 font-semibold">Calldata {index + 1}</h5>
            <pre className="text-wrap">{call.calldata}</pre>
            <br />
            <h5 className="mb-1 font-semibold">Value {index + 1}</h5>
            <pre className="text-wrap">{call.value}</pre>
          </div>
        ))}
      </Card>
    </div>
  );
}
