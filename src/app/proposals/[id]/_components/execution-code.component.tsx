import { BlockExplorerLink } from "@/components/_shared";
import useContractsInfo from "@/lib/contracts/useContractsInfo";
import { ProposalCall } from "@/lib/graphql";
import { Card } from "@mento-protocol/ui-toolkit";

type Props = {
  calls: ProposalCall[];
};

export default function ExecutionCode({ calls }: Props) {
  const { formattedCalls } = useContractsInfo({ calls });

  return (
    <div>
      <h3 className="my-8 hidden justify-center text-3xl font-medium md:flex">
        Execution Code
      </h3>
      <Card className="flex flex-col gap-6">
        <h3 className="text-center text-[32px]/none font-medium md:hidden">
          Execution Code
        </h3>
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
