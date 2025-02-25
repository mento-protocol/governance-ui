import ErrorHelper from "@/lib/helpers/error.helper";
import { UserRejectedRequestError } from "viem";

export const ProposalActionError = ({
  error,
  errorHeading,
}: {
  error: Error;
  errorHeading: string;
}) => {
  if (error instanceof UserRejectedRequestError) {
    return null;
  }
  return (
    <div className="text-light-red flex w-full flex-col items-center justify-center gap-1 text-sm">
      <span>{errorHeading}</span>
      <span>{ErrorHelper.processWagmiErrorMessage(error)}</span>
    </div>
  );
};
