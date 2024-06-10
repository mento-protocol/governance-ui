import { GetContractsInfoQuery, ProposalCall } from "@/lib/graphql";
import { useGetContractsInfoQuery } from "@/lib/graphql/celo-explorer/generated/celoGraph";
import { useMemo } from "react";
import { decodeFunctionData } from "viem";
import { useAccount } from "wagmi";

/**
 * The Celo Explorer API returns nothing (as in not even undefined) for
 * non-existing addresses. So we can't rely on the input amount of
 * addresses to equal the output amount of addresses as the output amount
 * might be lower than the input amount. Hence this `reduce` to create a map
 * of addresses to contract names and ABIs.
 */
function getContractMetadata(
  data: GetContractsInfoQuery | undefined,
): ContractInfo | undefined {
  return data?.addresses?.reduce((acc, address) => {
    if (address && address.hash) {
      acc[address.hash] = {
        abi: address.smartContract?.abi ?? undefined,
        name: address.smartContract?.name ?? undefined,
      };
    }

    return acc;
  }, {} as ContractInfo);
}

function decodeCalldata(
  call: ProposalCall,
  contractMetadata: ContractInfo | undefined,
) {
  const address = call.target.id;
  const abiRaw = contractMetadata?.[address]?.abi;

  if (!address || !abiRaw) return call.calldata;
  if (typeof abiRaw === "string") {
    let abi;

    try {
      abi = JSON.parse(abiRaw);
    } catch (error) {
      // TODO: Sentrify me
      console.error(
        "Failed to parse ABI. Falling back to returning raw calldata",
        error,
      );

      return call.calldata;
    }

    let data;

    if (call.calldata.startsWith("0x")) {
      try {
        data = decodeFunctionData({ abi, data: call.calldata });
      } catch (error) {
        // TODO: Sentrify me
        console.error("Failed to decode calldata", error);
      }
    }

    if (data?.functionName) {
      // output example: `transfer(0x1234etc, 100)`
      return `${data.functionName}(${data.args?.length ? data.args.join(", ") : ""})`;
    } else {
      return call.calldata;
    }
  }
}

function formatCall(
  call: ProposalCall,
  contractMetadata: ContractInfo | undefined,
) {
  const address = call.target.id;
  const contractName = contractMetadata?.[address]?.name ?? undefined;
  const decodedCalldata = decodeCalldata(call, contractMetadata);

  return {
    ...call,
    target: contractName ? `${contractName} (${address})` : address,
    calldata: decodedCalldata || call.calldata,
  };
}

type Props = {
  calls: ProposalCall[];
};

type ContractInfo = {
  [address: string]: {
    abi?: string;
    name?: string;
  };
};

const useContractsInfo = ({ calls }: Props) => {
  const { chainId } = useAccount();

  const { data, error: apolloError } = useGetContractsInfoQuery({
    variables: {
      addresses: calls.map((call) => call.target.id),
    },
    context: {
      apiName: chainId === 44787 ? "celoExplorerAlfajores" : "celoExplorer",
    },
    skip: !calls.length,
  });

  if (apolloError) {
    // TODO: Sentrify me
    console.error(
      "Failed to fetch contract metadata from Celo Explorer",
      apolloError,
    );
  }
  const contractMetadata = getContractMetadata(data);

  const formattedCalls = useMemo(
    () => calls.map((call) => formatCall(call, contractMetadata)),
    [calls, contractMetadata],
  );

  return {
    formattedCalls,
  };
};

export default useContractsInfo;
