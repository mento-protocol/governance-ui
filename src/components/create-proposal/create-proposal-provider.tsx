import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import useCreateProposalOnChain, {
  TransactionItem,
} from "@/lib/contracts/governor/useCreateProposalOnChain";
import { LocalStorageKeys, useLocalStorage } from "@/lib/hooks/useStorage";
import { useBlockNumber, useChainId } from "wagmi";
import { Loader } from "@/components/_shared";
import { CreateProposalTxModal } from "@/components/create-proposal/create-proposal-transaction.model";
import { useRouter } from "next/navigation";
import useProposals from "@/lib/contracts/governor/useProposals";

export enum CreateProposalStep {
  wallet = 1,
  content = 2,
  execution = 3,
  preview = 4,
}

export const enum CreateProposalCacheEntry {
  title = "title",
  description = "description",
  code = "code",
}

type Proposal = {
  title: string;
  description: string;
  code: string;
};

export interface ICreateProposalContext {
  step: CreateProposalStep;
  setStep: (step: CreateProposalStep) => void;
  newProposal: Proposal;
  updateProposal: (updatedProposal: Proposal) => void;
  submitProposal: () => void;
  setCacheItem: (itemKey: CreateProposalCacheEntry, value: string) => void;
  getCacheItem: (itemKey: CreateProposalCacheEntry) => string | null;
  removeCacheItem: (itemKey: CreateProposalCacheEntry) => void;
}

const CreateProposalContext = createContext<ICreateProposalContext | undefined>(
  undefined,
);

interface ICreateProposalProvider {
  children: ReactNode | ReactNode[];
}

export const CreateProposalProvider = ({
  children,
}: ICreateProposalProvider) => {
  const chainId = useChainId();
  const router = useRouter();
  const { proposalExists, refetchProposals } = useProposals();

  const [isOpen, setOpen] = useState(false);
  const [expectingId, setExpectingId] = useState<string | undefined>();

  const { data: blockNumber } = useBlockNumber({
    watch: true,
    query: {
      enabled: !!expectingId,
    },
  });

  const { canUseLocalStorage, getItem, setItem, removeItem } = useLocalStorage(
    LocalStorageKeys.CreateProposal,
  );

  const [step, setStep] = useState<CreateProposalStep>(
    CreateProposalStep.wallet,
  );

  const {
    createProposal,
    resetCreateProposalHook,
    createError,
    createProposalID,
    isSuccess,
  } = useCreateProposalOnChain();

  const [newProposal, updateProposalInternal] = useState({
    description: "",
    title: "",
    code: '[\n  {\n    "address": "0x0000000000000000000000000000000000000000",\n    "value": 0,\n    "data": "0x"\n  }\n]',
  });

  const [creationState, setCreationState] = useState<"mounting" | "ready">(
    "mounting",
  );

  const getCacheItem = useCallback(
    (key: CreateProposalCacheEntry) => getItem(`${chainId}/${key}`),
    [chainId, getItem],
  );

  const setCacheItem = useCallback(
    (key: CreateProposalCacheEntry, value: string) =>
      setItem(`${chainId}/${key}`, value),
    [chainId, setItem],
  );

  const removeCacheItem = useCallback(
    (key: CreateProposalCacheEntry) => removeItem(`${chainId}/${key}`),
    [chainId, removeItem],
  );

  const submitProposal = useCallback(() => {
    setOpen(true);
    let transactions: TransactionItem[] = [];
    try {
      transactions = JSON.parse(newProposal.code);
    } catch (e) {
      /* empty */
    }

    if (transactions.length === 0) {
      transactions = [
        {
          address: "0x0000000000000000000000000000000000000000",
          value: 0,
          data: "0x",
        },
      ];
    }
    const structuredProposal = {
      metadata: {
        title: newProposal.title,
        description: newProposal.description,
      },
      transactions,
    };

    setExpectingId(createProposalID(structuredProposal));

    createProposal(structuredProposal, undefined, (error) => {
      // TODO: Sentrify.
      console.error(error);
    });
  }, [
    createProposal,
    createProposalID,
    newProposal.code,
    newProposal.description,
    newProposal.title,
  ]);

  // Triggering fetches by block
  useEffect(() => {
    // TODO: if blocknumber only active when expecting is set, might be redundant
    if (!!expectingId && blockNumber) {
      refetchProposals();
    }
  }, [blockNumber, expectingId, refetchProposals]);

  useEffect(() => {
    if (!isOpen) return;
    if (isSuccess && expectingId && proposalExists(expectingId)) {
      if (canUseLocalStorage) {
        removeCacheItem(CreateProposalCacheEntry.title);
        removeCacheItem(CreateProposalCacheEntry.description);
        removeCacheItem(CreateProposalCacheEntry.code);
      }
      router.push(`/proposals/${expectingId.toString()}`);
    }
  }, [
    canUseLocalStorage,
    expectingId,
    isOpen,
    isSuccess,
    proposalExists,
    removeCacheItem,
    resetCreateProposalHook,
    router,
  ]);

  useEffect(() => {
    if (creationState === "ready") return;
    if (!canUseLocalStorage) {
      setCreationState("ready");
      return;
    }

    if (creationState === "mounting") {
      const title = getCacheItem(CreateProposalCacheEntry.title);
      const description = getCacheItem(CreateProposalCacheEntry.description);
      const code = getCacheItem(CreateProposalCacheEntry.code);

      updateProposalInternal({
        title: title || "",
        description: description || "",
        code: code || "",
      });

      setCreationState("ready");
    }
  }, [canUseLocalStorage, creationState, getCacheItem]);

  const updateProposal = useCallback(
    (proposal: Proposal) => {
      if (canUseLocalStorage) {
        setCacheItem(CreateProposalCacheEntry.title, proposal.title);
        setCacheItem(
          CreateProposalCacheEntry.description,
          proposal.description,
        );
        setCacheItem(CreateProposalCacheEntry.code, proposal.code);
      }

      updateProposalInternal(proposal);
    },
    [canUseLocalStorage, setCacheItem],
  );

  const retry = useCallback(() => {
    resetCreateProposalHook();
    submitProposal();
  }, [resetCreateProposalHook, submitProposal]);

  useEffect(() => {
    if (creationState === "ready") {
      setCreationState("mounting");
    }
    // Only update on chainID change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId]);

  return (
    <CreateProposalContext.Provider
      value={{
        step,
        setStep,
        newProposal,
        updateProposal,
        submitProposal,
        getCacheItem,
        setCacheItem,
        removeCacheItem,
      }}
    >
      {creationState === "ready" ? children : <Loader />}
      <CreateProposalTxModal
        isOpen={isOpen}
        setOpen={setOpen}
        retry={retry}
        error={!!createError}
      />
    </CreateProposalContext.Provider>
  );
};

export function useCreateProposal() {
  const context = useContext(CreateProposalContext);
  if (context === undefined) {
    throw new Error(
      "useCreateProposal must be used within a CreateProposalProvider",
    );
  }
  return context;
}
