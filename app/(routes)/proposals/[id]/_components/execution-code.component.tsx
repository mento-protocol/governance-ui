import BlockExplorerLink from "@/app/components/_shared/block-explorer-link/block-explorer-link.component";
import type { ProposalCall } from "@/app/graphql";
import { useAccount } from "wagmi";

type Props = {
  calls: ProposalCall[];
};

export default function ExecutionCode({ calls }: Props) {
  const { chain } = useAccount();
  const blockExplorerUrl = chain?.blockExplorers?.default.url;
  return (
    <div>
      <h3 className="flex justify-center font-size-x6 line-height-x6 font-medium mb-x6">
        Execution Code
      </h3>
      <div className="rounded-lg border-2 p-4">
        {calls.map((call, index) => (
          <div key={index} className="break-words">
            {index > 0 && <hr className="my-4" />}
            <h5 className="font-semibold mb-1">Target {index + 1}</h5>
            <pre className="text-wrap">
              <BlockExplorerLink type="address" item={call.target.id}>
                {call.target.id}
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
