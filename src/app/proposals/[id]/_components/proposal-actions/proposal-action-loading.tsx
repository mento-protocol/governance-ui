import { Loader } from "@/components/_shared";
import { ProposalActionTitle } from "./proposal-action-title";

export const ProposalActionLoading = () => {
  return (
    <>
      <ProposalActionTitle />
      <div className="mt-x2 flex flex-col gap-x3 text-center">
        <br />
        <Loader className="w-[100%]" isCenter color="dark:fill-mento-mint" />
        <br />
      </div>
    </>
  );
};
