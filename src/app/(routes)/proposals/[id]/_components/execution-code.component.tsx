import BlockExplorerLink from "@/components/_shared/block-explorer-link/block-explorer-link.component";
import useGetContractsInfo from "@/lib/contracts/useGetContractsInfo";
import { ProposalCall } from "@/lib/graphql";

type Props = {
  calls: ProposalCall[];
};

export default function ExecutionCode({ calls }: Props) {
  const { formattedCalls } = useGetContractsInfo({ calls });

  return (
    <div>
      <h3 className="flex justify-center font-size-x6 line-height-x6 font-medium mb-x6">
        Execution Code
      </h3>
      <div className="rounded-[8px] border border-[#B3B3B3] p-4">
        {formattedCalls.map((call, index) => (
          <div key={call.target + call.id} className="break-words">
            {index > 0 && <hr className="my-4" />}
            <h5 className="font-semibold mb-1">Target {index + 1}</h5>
            <pre className="text-wrap">
              <BlockExplorerLink type="address" item={call.target}>
                {call.target}
              </BlockExplorerLink>
            </pre>
            <br />
            <h5 className="font-semibold mb-1">Calldata {index + 1}</h5>
            <pre className="text-wrap">{call.calldata}</pre>
            <br />
            <h5 className="font-semibold mb-1">Value {index + 1}</h5>
            <pre className="text-wrap">{call.value}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
